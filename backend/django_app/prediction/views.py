
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from .utils import ingest_data


# Create your views here.
# Class based view to predict based on IRIS model
class LLMPredictionView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    doc_executor = ingest_data.get_doc_executor()
    def post(self, request, format=None):
        data = request.data
        # # Process non-file data
        # keys = []
        # values = []
        # for key in data:
        #     keys.append(key)
        #     values.append(data[key])
        response = LLMPredictionView.doc_executor.invoke(data['message'])
        response_dict = {"response": response}
        return Response(response_dict, status=200)

class FileUploadView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def post(self, request, format=None):
        files = request.FILES

        # Process file upload
        if 'file' in files:
            uploaded_file = files['file']
            if not default_storage.exists(uploaded_file.name):
                # If the file doesn't exist, save it
                file_name = default_storage.save(uploaded_file.name, ContentFile(uploaded_file.read()))
                file_url = default_storage.url(file_name)
            else:
                # If the file exists, get the file URL without saving
                file_name = uploaded_file.name
                file_url = default_storage.url(file_name)
            
            ingest_data.upload_pdf_data(file_url,file_name)
            file_message = f"File uploaded successfully: {file_name}"
        else:
            file_message = "No file uploaded"

        return Response({"File Upload Status": file_message}, status=200)
