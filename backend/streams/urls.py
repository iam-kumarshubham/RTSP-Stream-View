from rest_framework.routers import DefaultRouter
from .views import StreamViewSet

router = DefaultRouter()
router.register(r'streams', StreamViewSet, basename='stream')

urlpatterns = router.urls
