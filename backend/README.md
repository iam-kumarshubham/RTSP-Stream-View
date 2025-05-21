# Backend (Django)

## Setup
1. Create and activate a virtualenv.
2. Install requirements: `pip install -r requirements.txt`
3. Run migrations: `python manage.py migrate`
4. Start server: `python manage.py runserver`

## Features
- Accept RTSP URLs
- Stream video frames via WebSocket
- Uses FFmpeg for RTSP input
