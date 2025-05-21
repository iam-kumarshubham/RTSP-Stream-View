from rest_framework import serializers
from .models import Stream

class StreamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stream
        fields = ['id', 'url', 'name', 'status', 'created_at', 'updated_at', 'last_error']
        read_only_fields = ['status', 'created_at', 'updated_at', 'last_error']
