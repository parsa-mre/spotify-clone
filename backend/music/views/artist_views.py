from rest_framework import viewsets
from rest_framework.permissions import IsAdminUser, IsAuthenticatedOrReadOnly
from music.models import Artist, Album
from music.serializers import ArtistSerializer, AlbumSerializer, TrackSerializer
from rest_framework import generics
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView


class ArtistViewSet(viewsets.ModelViewSet):
    queryset = Artist.objects.all()
    serializer_class = ArtistSerializer

    def get_permissions(self):
        if self.action == "retrieve":
            return []

        return [IsAdminUser()]


class ArtistAlbumsView(generics.ListAPIView):
    serializer_class = AlbumSerializer

    def get_queryset(self):
        artist_id = self.kwargs["id"]
        return Album.objects.filter(artist_id=artist_id)


class ArtistAlbumsView(APIView):
    def get(self, request, id):
        artist = get_object_or_404(Artist.objects.prefetch_related("albums"), pk=id)
        albums = AlbumSerializer(artist.albums.all(), many=True)
        return Response(albums.data, 200)


class ArtistTopTracks(APIView):
    def get(self, request, id):
        artist = get_object_or_404(
            Artist.objects.order_by().prefetch_related("tracks"), pk=id
        )
        tracks = TrackSerializer(artist.tracks.order_by("-playcount")[:5], many=True)
        return Response(tracks.data, 200)
