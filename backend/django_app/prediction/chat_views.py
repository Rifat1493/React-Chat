# views.py

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from .models import Chat
from .serializers import ChatSerializer

class ChatView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Fetch all chats for the logged-in user
        user_chats = Chat.objects.filter(user=request.user).order_by('timestamp')
        serializer = ChatSerializer(user_chats, many=True)
        return Response(serializer.data)

    def post(self, request):
        # Store a new chat message for the logged-in user
        message = request.data.get('message')
        result = request.data.get('result')
        new_chat = Chat.objects.create(user=request.user, message=message, result=result)
        return Response({'message': 'Chat saved successfully!', 'chat': ChatSerializer(new_chat).data})
