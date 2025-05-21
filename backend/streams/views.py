from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from .models import Stream
from .serializers import StreamSerializer

class StreamViewSet(viewsets.ModelViewSet):
    queryset = Stream.objects.all()
    serializer_class = StreamSerializer
