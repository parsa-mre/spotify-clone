from rest_framework.routers import DefaultRouter
from .views import (
    ArtistViewSet,
    ArtistAlbumsView,
    AlbumViewSet,
    TrackViewSet,
    TrackUpload,
    AlbumTracksAPIView,
    ArtistTopTracks,
    PlayListTracksView,
    PlaylistViewSet,
)
from django.urls import path, include
from django.contrib.auth.models import UserManager

router = DefaultRouter()
router.register(r"artists", ArtistViewSet)
router.register(r"albums", AlbumViewSet)
router.register(r"tracks", TrackViewSet)
router.register(r"playlists", PlaylistViewSet)

urlpatterns = [
    path("playlists/<int:id>/tracks/", PlayListTracksView.as_view()),
    path("albums/<int:id>/tracks/", AlbumTracksAPIView.as_view(), name="album-tracks"),
    path("", include(router.urls)),
    path("artists/<int:id>/albums/", ArtistAlbumsView.as_view(), name="artist-albums"),
    path(
        "artists/<int:id>/top-tracks/",
        ArtistTopTracks.as_view(),
        name="artist-top-tracks",
    ),
    path("upload/track/", TrackUpload.as_view(), name="track-upload"),
    # path("playlists/<int:id>/tracks/", PlayListTracksView.as_view()),
]
