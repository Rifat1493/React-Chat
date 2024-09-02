from dj_rest_auth.registration.views import RegisterView
from dj_rest_auth.views import LoginView, LogoutView
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
# Create your views here.

class APILogoutView(LogoutView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
class APILoginView(LoginView):
    pass

class APISignupView(RegisterView):
    pass  # Use the default behavior or customize if needed
