from django.db import models
from django.utils.translation import gettext_lazy as _
from .track import Track
from profiles.models import Profile
from music.utils import upload_to


class Playlist(models.Model):
    name = models.CharField(max_length=255)
    profile = models.ForeignKey(
        Profile, on_delete=models.CASCADE, related_name="playlists"
    )
    private = models.BooleanField(default=False)
    image = models.ImageField(upload_to=upload_to, null=True)
    followers_count = models.IntegerField(default=0)
    trackcount = models.PositiveIntegerField(_("track count"), default=0)
    created_at = models.DateField(_("created at"), auto_now_add=True)


class PlaylistTrack(models.Model):
    playlist = models.ForeignKey(
        Playlist, on_delete=models.CASCADE, related_name="tracks"
    )
    track = models.ForeignKey(Track, on_delete=models.CASCADE, related_name="playlists")
    position = models.PositiveIntegerField(null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ["playlist", "position"]
