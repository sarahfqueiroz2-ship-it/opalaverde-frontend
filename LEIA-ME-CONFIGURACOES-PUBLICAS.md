# Configurações públicas — Opala Verde

- Endpoint público somente leitura: `GET /api/accounts/site-settings/public/`.
- Página administrativa mantém `PUT /api/accounts/admin-site-settings/` com autenticação de admin.
- `site-config-public.js` carrega os dados em páginas de cliente e produtor.
- Nome da plataforma atualiza títulos e cabeçalhos H1 de marca.
- Contatos são atualizados em `contate-nos.html` e `contate-nos_fornecedor.html`.
- Campos como endereço, descrição e frase de apresentação estão disponíveis pela API, mas só aparecerão em páginas com elementos marcados `data-site-field`.
- Se o backend estiver offline, os valores padrão permanecem.
- Configure o endereço do endpoint em `site-config-public.js` ao publicar em produção.
- Não há alteração de preços, taxas, manutenção, envio de e-mail nem integrações de pagamento.
- O banco de dados e arquivos .env não são incluídos no ZIP: mantenha os seus arquivos locais existentes.
