# RTSP Stream Viewer

**🌐 Deployed Apps:**
- Frontend: [https://iam-kumarshubham.github.io/RTSP-Stream-View](https://iam-kumarshubham.github.io/RTSP-Stream-View)
- Backend API: [https://rtsp-stream-view.onrender.com/](https://rtsp-stream-view.onrender.com/)
- WebSocket Endpoint: `wss://rtsp-stream-view.onrender.com/ws/stream/`

A full-stack web application to view live RTSP streams in your browser, with a modern React frontend and a Django backend using Channels and OpenCV/FFmpeg.

---

## 🚀 Features
- Add, remove, and view RTSP stream URLs
- View multiple live streams simultaneously in a responsive grid
- Play/pause controls for each stream
- Real-time video via WebSocket (Django Channels)
- Friendly error handling for failed streams
- Modern UI with Material-UI (MUI)

---

## 📦 Project Structure
- `frontend/` — React app (deployed to GitHub Pages)
- `backend/` — Django app (deployed to Heroku/Render/etc.)

---

## 🛠️ Quick Start

### 1. Clone the repository
```sh
git clone https://github.com/iam-kumarshubham/RTSP-Stream-View.git
cd RTSP-Stream-View
```

### 2. Backend Setup (Django)
See [`backend/README.md`](backend/README.md) for full instructions.
- Python 3.8+
- Install dependencies: `pip install -r requirements.txt`
- Run migrations: `python manage.py migrate`
- Start server: `python manage.py runserver` (or use Daphne for Channels)

### 3. Frontend Setup (React)
See [`frontend/README.md`](frontend/README.md) for full instructions.
- Node.js 16+
- Install dependencies: `npm install`
- Start dev server: `npm start`

---

## 🌐 Deployment

### Frontend (GitHub Pages)
- Set the `homepage` field in `frontend/package.json` to your repo URL.
- Deploy with:
  ```sh
  cd frontend
  npm run deploy
  ```
- Live demo: [https://iam-kumarshubham.github.io/RTSP-Stream-View](https://iam-kumarshubham.github.io/RTSP-Stream-View)

### Backend (Heroku/Render/Other)
- Deploy the Django backend to your preferred platform.
- Ensure WebSocket support (Daphne/uvicorn for ASGI).
- Expose the backend's WebSocket endpoint publicly.

---

## 🖥️ Usage
1. Enter a public RTSP stream URL in the input box.
2. Click **Add** to start viewing the stream.
3. Use play/pause controls on each stream card.
4. Remove streams as needed.

---

## ❗ Troubleshooting
- **Stream fails to open?**
  - Make sure your backend server can access the RTSP URL (test with ffmpeg/VLC).
  - Ensure OpenCV is installed with FFmpeg support.
  - Check backend logs for error details.
- **WebSocket connection fails?**
  - Make sure the backend is running and accessible from the frontend.
  - For production, set correct CORS and WebSocket origins.
- **Frontend not updating?**
  - Clear browser cache or do a hard reload after deployment.

---

## 📄 License
MIT

## Credits
- [React](https://reactjs.org/), [Material-UI](https://mui.com/), [Django](https://www.djangoproject.com/), [Django Channels](https://channels.readthedocs.io/), [OpenCV](https://opencv.org/)

---

For more details, see the `backend/README.md` and `frontend/README.md` in their respective folders.
