# Dados reais — Opala Verde

- Página inicial: remove seis produtos de exemplo; consulta `/api/catalog/products/` com paginação. Falha de rede não vira produto fictício.
- Depoimentos: remove os três depoimentos fictícios e deixa de exibir feedback salvo apenas no navegador como se fosse público. O formulário legado foi ocultado porque não persistia no backend.
- Painel administrativo de comunicação: tela simulada substituída por redirecionamento para `conversas.html`, que usa a API de conversas.
- Catálogo principal já consultava a API e foi preservado.

## Atenção
Outras páginas do frontend legado podem ter números ou listas estáticas. Esta atualização não comprova que todos os painéis já sejam 100% dinâmicos. Nenhum dado real do banco foi excluído.

## Antes de publicar
Validar autenticação, migrações, CORS, listagem, criação de pedidos e conversas em ambiente de testes. Não implantar sem testar.
