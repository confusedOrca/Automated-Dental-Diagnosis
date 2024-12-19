from django.urls import path
from .views import UploadView, ResetView

urlpatterns = [
    path('upload/', UploadView.as_view(), name='upload'),
    path('reset/<uuid:uuid>/', ResetView.as_view(), name='reset'),
]
