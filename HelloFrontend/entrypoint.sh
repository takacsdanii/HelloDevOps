echo "window.__env__ = { API_URL: '${API_URL:-http://hello-backend:8080}' };" > /usr/share/nginx/html/env.js

nginx -g 'daemon off;'
