from rest_framework import viewsets
from rest_framework.permissions import IsAdminUser
from music.models import Album
from music.serializers import AlbumSerializer, TrackSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404


class AlbumViewSet(viewsets.ModelViewSet):
    queryset = Album.objects.all()
    serializer_class = AlbumSerializer

    def get_permissions(self):
        if self.action == "retrieve":
            return []

        return [IsAdminUser()]


class AlbumTracksAPIView(APIView):
    def get(self, request, id):
        album = get_object_or_404(Album.objects.prefetch_related("tracks"), pk=id)
        tracks = TrackSerializer(album.tracks.all(), many=True)
        return Response(tracks.data, 200)
