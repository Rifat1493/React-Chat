from django.urls import path
from .views import APISignupView, APILoginView, APILogoutView

urlpatterns = [
    path('signup/', APISignupView.as_view(), name='signup'),
    path('login/', APILoginView.as_view(), name='login'),
    path('logout/', APILogoutView.as_view(), name='logout'),
]
