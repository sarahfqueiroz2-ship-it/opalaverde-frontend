# Área administrativa com dados reais

Arquivos alterados: inicial-admin.html, relatorio-financeiro-admin.html, gerenciar-usuarios-admin.html, gerenciar-pedidos-admin.html e links nas três outras páginas administrativas.

O dashboard, a lista de usuários, a lista de pedidos e o relatório financeiro consultam `/api/accounts/admin-overview/`, que exige autenticação de usuário com `user_type=admin` ativo. Não são usados dados fictícios nesses quatro painéis.

## Instalação
1. Faça backup das pastas atuais e do banco de dados.
2. Substitua os arquivos do frontend pelos deste ZIP (preserve seu `api.js` se tiver alterado a URL da API).
3. No backend, adicione `accounts/admin_api.py` e substitua `accounts/urls.py` pela versão deste ZIP. **Preserve outras alterações locais no backend** (especialmente `orders/chat.py` com `start_support` se você o alterou depois de gerar o ZIP enviado).
4. Reinicie o servidor Django e faça login com a conta admin.
5. Acesse `inicial-admin.html`.

## Limites honestos
- Os relatórios mostram pedidos pagos confirmados, não lucro nem comissão; não há modelo de repasses financeiros.
- A listagem está limitada aos 500 registros mais recentes; é somente leitura.
- A página de configurações original continua salvando preferências no navegador, não no servidor. A gestão de categorias e a comunicação existentes foram preservadas.
- Não foi possível executar testes integrados contra seu banco local, pois ele não está nos ZIPs.
