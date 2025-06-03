from django.urls import path
from .views import signup
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
urlpatterns = [
    path('signup/', signup),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),   # Login endpoint
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),  # Refresh token endpoint
]