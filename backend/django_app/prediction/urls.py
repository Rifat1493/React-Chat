from django.urls import path
from .views import LLMPredictionView, FileUploadView
from .chat_views import ChatView

urlpatterns = [
    path('predict/', LLMPredictionView.as_view(), name='llm_predict'),
    path('upload/', FileUploadView.as_view(), name='file_upload'),
    path('chats/', ChatView.as_view(), name='chat_view'),
]