from django.db import models
from django.utils.translation import gettext_lazy as _
from .artist import Artist
from .playlist import Playlist
from profiles.models import Profile


class FollowsArtists(models.Model):
    user = models.ForeignKey(Profile, on_delete=models.CASCADE)
    artist = models.ForeignKey(Artist, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)


class FollowsPlaylist(models.Model):
    user = models.ForeignKey(Profile, on_delete=models.CASCADE)
    playlist = models.ForeignKey(Playlist, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
