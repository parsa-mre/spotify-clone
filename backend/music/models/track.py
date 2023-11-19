from django.db import models
from django.utils.translation import gettext_lazy as _
from .artist import Artist
from .album import Album


class Track(models.Model):
    name = models.CharField(max_length=255)
    artists = models.ManyToManyField(Artist, related_name="tracks")
    album = models.ForeignKey(Album, on_delete=models.CASCADE, related_name="tracks")
    track_number = models.PositiveSmallIntegerField(_("track number"), default=1)
    playcount = models.PositiveIntegerField(_("plays"), default=0)

    class Meta:
        unique_together = ["album", "track_number"]
        ordering = ["track_number"]
