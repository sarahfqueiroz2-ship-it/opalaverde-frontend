/**
 * api.js — Camada de comunicação com o backend Django do OpalaVerde.
 * Incluir este arquivo em TODAS as páginas antes do script da própria página:
 *   <script src="api.js"></script>
 *
 * IMPORTANTE: troque API_BASE_URL para a URL do backend publicado no Render
 * quando for para produção (ex: 'https://opalaverde-backend.onrender.com/api').
 */

const API_BASE_URL = "https://opalaverde-backend-sps4.onrender.com/api";
// ===== GERENCIAMENTO DE TOKENS (JWT) =====
const TokenManager = {
    getAccess: () => localStorage.getItem('access_token'),
    getRefresh: () => localStorage.getItem('refresh_token'),
    setTokens: (access, refresh) => {
        if (access) localStorage.setItem('access_token', access);
        if (refresh) localStorage.setItem('refresh_token', refresh);
    },
    clear: () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
    },
};

async function refreshAccessToken() {
    const refresh = TokenManager.getRefresh();
    if (!refresh) return false;

    try {
        const res = await fetch(`${API_BASE_URL}/auth/token/refresh/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refresh }),
        });
        if (!res.ok) return false;
        const data = await res.json();
        TokenManager.setTokens(data.access, null);
        return true;
    } catch (error) {
        console.error('Erro ao renovar token:', error);
        return false;
    }
}

/**
 * Wrapper de fetch que já adiciona o token de autenticação e tenta renovar
 * automaticamente se o token expirou (erro 401), refazendo a requisição uma vez.
 */
async function apiFetch(path, options = {}) {
    const url = path.startsWith('http') ? path : `${API_BASE_URL}${path}`;
    const headers = { ...(options.headers || {}) };

    if (!(options.body instanceof FormData) && !headers['Content-Type']) {
        headers['Content-Type'] = 'application/json';
    }

    const access = TokenManager.getAccess();
    if (access) headers['Authorization'] = `Bearer ${access}`;

    let response = await fetch(url, { ...options, headers });

    if (response.status === 401 && TokenManager.getRefresh()) {
        const refreshed = await refreshAccessToken();
        if (refreshed) {
            headers['Authorization'] = `Bearer ${TokenManager.getAccess()}`;
            response = await fetch(url, { ...options, headers });
        }
    }

    return response;
}

/** Faz apiFetch e já retorna o JSON, lançando erro (com .status e .data) se falhar. */
async function apiFetchJSON(path, options = {}) {
    const response = await apiFetch(path, options);
    let data = null;
    try {
        data = await response.json();
    } catch (error) {
        data = null;
    }
    if (!response.ok) {
        const error = new Error('Erro na requisição à API');
        error.status = response.status;
        error.data = data;
        throw error;
    }
    return data;
}

// ===== AUTENTICAÇÃO =====
async function apiRegister(payload) {
    const res = await fetch(`${API_BASE_URL}/accounts/register/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) {
        const error = new Error('Erro no cadastro');
        error.status = res.status;
        error.data = data;
        throw error;
    }
    return data;
}

async function apiLogin(email, password) {
    const res = await fetch(`${API_BASE_URL}/auth/token/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) {
        const error = new Error('Erro no login');
        error.status = res.status;
        error.data = data;
        throw error;
    }
    TokenManager.setTokens(data.access, data.refresh);
    localStorage.setItem('currentUserData', JSON.stringify(data.user));
    return data;
}

function apiLogout() {
    TokenManager.clear();
    localStorage.removeItem('currentUserData');
}

function getCurrentUserData() {
    try {
        const user = JSON.parse(localStorage.getItem('currentUserData') || 'null');
        // Alias de compatibilidade: o código das páginas (herdado da versão
        // antiga) usa "currentUserData.name"; a API retorna "first_name".
        if (user && !user.name) {
            user.name = user.first_name;
        }
        return user;
    } catch (error) {
        return null;
    }
}

/**
 * Garante que o usuário está logado (e, opcionalmente, que é de um dos tipos
 * permitidos). Se não estiver, redireciona para o login. Use no topo de
 * cada página protegida.
 */
/**
 * Preenche um elemento de avatar com a foto real do usuário (se existir)
 * ou a inicial do nome como fallback. Use em toda página que mostra avatar,
 * assim a foto trocada em um lugar aparece em todo o site.
 */
function renderAvatar(element, user) {
    if (!element || !user) return;
    if (user.avatar) {
        element.innerHTML = `<img src="${user.avatar}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">`;
    } else {
        element.textContent = (user.name || user.first_name || '?').charAt(0).toUpperCase();
    }
    element.setAttribute('title', user.email || '');
}

function requireAuth(allowedTypes) {
    const user = getCurrentUserData();
    if (!user || !TokenManager.getAccess()) {
        window.location.href = 'login.html';
        return null;
    }
    if (allowedTypes && !allowedTypes.includes(user.user_type)) {
        window.location.href = 'login.html';
        return null;
    }
    return user;
}
