from rest_framework.views import APIView
from rest_framework.request import Request
from rest_framework.response import Response
from music.serializers import TrackSerializer
from music.models import Track
from rest_framework.permissions import IsAdminUser
from rest_framework import status
import os
from music.processors import process_audio_to_hls
from django.conf import settings
from rest_framework import viewsets


class TrackViewSet(viewsets.ModelViewSet):
    serializer_class = TrackSerializer
    queryset = Track.objects.all()
    permission_classes = [IsAdminUser]

    def get_queryset(self):
        if self.action == "retrive":
            return Track.objects.prefetch_related("artists").all()
        return Track.objects.all()

    def get_permissions(self):
        if self.action == "retrieve":
            return []

        return [IsAdminUser()]


class TrackUpload(APIView):
    permission_classes = [IsAdminUser]

    def post(self, request: Request):
        try:
            target_id = request.data.get("id")
            try:
                track = Track.objects.get(id=target_id)
            except Track.DoesNotExist:
                return Response(
                    {"error": "Track not found"}, status=status.HTTP_404_NOT_FOUND
                )

            uploaded_file = request.data.get("file")
            if not uploaded_file:
                return Response(
                    {"error": "No file provided"}, status=status.HTTP_400_BAD_REQUEST
                )

            if not uploaded_file.content_type.startswith("audio"):
                return Response(
                    {"error": "Invalid file format"}, status=status.HTTP_400_BAD_REQUEST
                )

            work_dir = os.path.join(settings.AUDIO_ROOT, f"{target_id}")
            os.makedirs(work_dir, exist_ok=True)
            not_proccessed_path = os.path.join(work_dir, settings.NOT_PROCCESSED_AUDIO)
            with open(not_proccessed_path, "wb") as temp_file:
                for chunk in uploaded_file.chunks():
                    temp_file.write(chunk)

            print(process_audio_to_hls.delay(not_proccessed_path, work_dir))

        except Exception as e:
            return Response(
                {"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
        return Response(
            {"message": "audio processing started"}, status=status.HTTP_202_ACCEPTED
        )
