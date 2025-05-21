from django.urls import re_path
from streams.consumers import RTSPStreamConsumer

websocket_urlpatterns = [
    re_path(r'ws/stream/$', RTSPStreamConsumer.as_asgi()),
]
