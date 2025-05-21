import asyncio
import cv2
import base64
from channels.generic.websocket import AsyncWebsocketConsumer
import json

class RTSPStreamConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()
        self.rtsp_url = None
        self.streaming_task = None

    async def disconnect(self, close_code):
        if self.streaming_task:
            self.streaming_task.cancel()

    async def receive(self, text_data):
        data = json.loads(text_data)
        if data.get('action') == 'start':
            self.rtsp_url = data.get('url')
            if self.rtsp_url:
                self.streaming_task = asyncio.create_task(self.stream_rtsp())
        elif data.get('action') == 'stop':
            if self.streaming_task:
                self.streaming_task.cancel()

    async def stream_rtsp(self):
        try:
            cap = cv2.VideoCapture(self.rtsp_url)
            while True:
                ret, frame = cap.read()
                if not ret:
                    await asyncio.sleep(0.5)
                    continue
                _, jpeg = cv2.imencode('.jpg', frame)
                jpg_as_text = base64.b64encode(jpeg.tobytes()).decode('utf-8')
                await self.send(text_data=json.dumps({'frame': jpg_as_text}))
                await asyncio.sleep(0.04)  # ~25fps
        except asyncio.CancelledError:
            pass
        finally:
            if 'cap' in locals():
                cap.release()
