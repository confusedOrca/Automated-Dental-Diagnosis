from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
import os

from .utils.save_upload import save_uploaded_image
from .utils.dummy import dummy_processing


class UploadView(APIView):
    def post(self, request, *args, **kwargs):
        file_path = save_uploaded_image(request.FILES['file'])
        image_url = request.build_absolute_uri(f"/media/images/{os.path.basename(file_path)}")
        mask_url, report_url = dummy_processing(image_url)
        mask_url = request.build_absolute_uri(f"/media/masks/{os.path.basename(mask_url)}")
        report_url = request.build_absolute_uri(f"/media/reports/{os.path.basename(report_url)}")
        
        return Response({
            "imageUrl": image_url, 
            "maskUrl": mask_url,
            "report": report_url
        }, status=status.HTTP_201_CREATED)


class ResetView(APIView):
    def post(self, request, uuid, *args, **kwargs):
        base_image_path = os.path.join(settings.MEDIA_ROOT, "images", f"{uuid}.jpg")
        base_mask_path = os.path.join(settings.MEDIA_ROOT, "masks", f"{uuid}.png")
        base_report_path = os.path.join(settings.MEDIA_ROOT, "reports", f"{uuid}.txt")
        
        response = {}
        for file_path in [base_image_path, base_mask_path, base_report_path]:
            if os.path.exists(file_path):
                os.remove(file_path)
                response[file_path] = "Deleted"
            else:
                response[file_path] = "Not found"
        
        return Response(response, status=status.HTTP_200_OK)
