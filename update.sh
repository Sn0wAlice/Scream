curl -X POST http://127.0.0.1:3000/admin/status/set \
-H "Content-Type: application/json" \
-H "Authorization: Bearer your-secret-token" \
-d '{"status": "ok"}'
