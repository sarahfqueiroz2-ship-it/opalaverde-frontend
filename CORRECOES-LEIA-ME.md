# Correções do Opala Verde (versão inicial)

## Instalação
1. Publique o backend atualizado e execute `python manage.py migrate` com as variáveis de ambiente existentes.
2. Publique o frontend atualizado, inclusive `conversas.html`.
3. Faça login com contas de cliente e produtor, crie um pedido e use o botão de conversa na tela de confirmação.
4. Acesse `conversas.html` como produtor para responder. A mesma página permite responder como administrador quando uma conversa for iniciada com a conta admin.

## API
- `GET /api/orders/conversations/`: conversas do usuário autenticado
- `POST /api/orders/conversations/start/`: `{ "recipient": ID_DO_PRODUTOR, "order": ID_DO_PEDIDO }` (pedido opcional)
- `POST /api/orders/conversations/{id}/send/`: `{ "content": "Olá" }`
- `PATCH /api/orders/orders/{id}/payment/`: `{ "payment_status": "agreed", "payment_method": "Pix" }`; após combinado, `paid` para confirmação manual.

## Limites
- Pagamento é combinado fora do site; não há integração de Pix nem validação bancária.
- Chat atualiza por consulta periódica (12 s), não WebSocket.
- Pedidos com vários produtores têm pagamento no nível do pedido, não por produtor; não confirmar como pago até todos os pagamentos estarem resolvidos.
- Telas legadas de chat/admin e outros indicadores financeiros ainda precisam ser migrados para a API real; não use os dados simulados como registros verdadeiros.
- Ainda são necessários testes integrados com banco e implantação reais.
