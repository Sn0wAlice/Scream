curl -X POST http://127.0.0.1:8300/admin/status/set \
-H "Content-Type: application/json" \
-H "Authorization: Bearer my-secret-token" \
-d '{"status": "ok"}'
