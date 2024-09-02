from django.urls import path
import prediction.views as views
urlpatterns = [
    path('predict/', views.LLM_Inference_View.as_view(), name = 'api_predict'),
]