from django.db import models

class Stream(models.Model):
    url = models.CharField(max_length=512, unique=True)
    name = models.CharField(max_length=255, blank=True)
    status = models.CharField(max_length=20, choices=[('active', 'Active'), ('inactive', 'Inactive'), ('error', 'Error')], default='inactive')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    last_error = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name or self.url
