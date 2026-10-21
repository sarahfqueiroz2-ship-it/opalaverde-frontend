# Opala Verde — Configurações reais

## Instalação
1. Faça backup das pastas e do banco `db.sqlite3` atual.
2. Extraia os ZIPs completos. Os ZIPs não incluem banco de dados nem `.env`.
3. No backend atualizado, copie seu `db.sqlite3` original (com Django parado) caso esteja em outra pasta.
4. Execute `python3 manage.py migrate` **após o backup**, para criar a tabela `accounts_siteconfiguration`.
5. Inicie o backend e o frontend como antes. Entre como administrador e acesse `configuracoes-do-site-admin.html`.

## Escopo
A página salva e lê nome, frase, descrição e contatos no banco Django via `/api/accounts/admin-site-settings/`, disponível apenas para admins autenticados. Essas informações ainda não são aplicadas automaticamente às demais páginas públicas.

Os botões antigos que fingiam testar pagamento, enviar e-mail, limpar cache e ativar manutenção foram removidos. Pagamentos, taxas, comissões, manutenção e chaves de API exigem integrações reais e não foram ativados. Nenhum dado financeiro ou pedido foi alterado.
