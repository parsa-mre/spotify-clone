from django.db import models
from django.utils.translation import gettext_lazy as _
from .artist import Artist


class Album(models.Model):
    name = models.CharField(max_length=255)
    artist = models.ForeignKey(Artist, on_delete=models.CASCADE, related_name="albums")
    release_date = models.DateTimeField()
    genre = models.CharField(max_length=255)
    image = models.ImageField(upload_to="images/", null=True)
