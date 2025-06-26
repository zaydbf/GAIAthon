from django.urls import path
from .views import signup, signin, chatbot_response, ai_prediction
    from rest_framework_simplejwt.views import (
        TokenObtainPairView,
        TokenRefreshView,
    )

urlpatterns = [
    path('signup/', signup, name='signup'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('chatbot/response/', chatbot_response, name='chatbot_response'),
    path('ai-predict/<str:gas>/<str:region>', ai_prediction, name="ai_predict")
]