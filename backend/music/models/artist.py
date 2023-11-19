from django.db import models
from django.utils.translation import gettext_lazy as _

# this is a test 

class Artist(models.Model):
    name = models.CharField(max_length=255)
    biography = models.TextField()
    image = models.ImageField(upload_to="images/", null=True)
    monthly_listeners = models.IntegerField(default=0)
    followers_count = models.IntegerField(default=0)
