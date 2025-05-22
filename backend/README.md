# Backend (Django)

**🌐 Deployed Backend:**
- API Root: https://rtsp-stream-view.onrender.com/
- WebSocket Endpoint: wss://rtsp-stream-view.onrender.com/ws/stream/

## Setup
1. Create and activate a virtualenv.
2. Install requirements: `pip install -r requirements.txt`
3. Run migrations: `python manage.py migrate`
4. Start server: `python manage.py runserver`

## Features
- Accept RTSP URLs
- Stream video frames via WebSocket
- Uses FFmpeg for RTSP input

---

## 🚀 Deploying to Render (Recommended)

1. Push your code to a public GitHub repository.
2. [Sign up for Render](https://dashboard.render.com/) and click **New +** → **Web Service**.
3. Connect your GitHub repo and set the root directory to `backend`.
4. **Build Command:**
   ```sh
   pip install -r requirements.txt
   ```
5. **Start Command:**
   ```sh
   daphne -b 0.0.0.0 -p 10000 rtsp_viewer.asgi:application
   ```
6. **Environment:**
   - Python 3.10+
   - Add any required environment variables (e.g., `DJANGO_SECRET_KEY`)
7. **Procfile:**
   - Ensure your `backend/Procfile` contains:
     ```
     web: daphne -b 0.0.0.0 -p 10000 rtsp_viewer.asgi:application
     ```
8. Once deployed, your WebSocket endpoint will be:
   ```
   wss://<your-render-url>.onrender.com/ws/stream/
   ```

For more, see https://render.com/docs/deploy-django or the main project README.
