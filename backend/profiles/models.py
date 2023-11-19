from django.db import models
from django.utils.translation import gettext_lazy as _
from .choices import COUNTRY_CHOICES, GENDER_CHOICES
from django.contrib.auth import get_user_model
import datetime


class Profile(models.Model):
    user = models.OneToOneField(
        get_user_model(), models.CASCADE, unique=True, related_name="profile"
    )
    modified_at = models.DateTimeField(_("modified at"), auto_now=True)

    birth_date = models.DateField(_("birth date"))
    country = models.CharField(_("country"), max_length=2, choices=COUNTRY_CHOICES)
    gender = models.CharField(_("gender"), max_length=1, choices=GENDER_CHOICES)

    followers_count = models.PositiveIntegerField(_("followers count"), default=0)
    following_count = models.PositiveIntegerField(_("following count"), default=0)
    playlist_count = models.PositiveBigIntegerField(_("playlist count"), default=0)

    is_premium = models.BooleanField(_("is premium"), default=False)
    premium_until = models.DateField(
        _("premium until"), default=datetime.date(1999, 1, 1)
    )

    is_active = models.BooleanField(_("is active"), default=False)

    class Meta:
        verbose_name = _("User Profile")
        verbose_name_plural = _("User Profiles")

    def __str__(self):
        return self.user.username


class FollowProfile(models.Model):
    follower = models.ForeignKey(
        Profile, on_delete=models.CASCADE, related_name="following"
    )
    following = models.ForeignKey(
        Profile, on_delete=models.CASCADE, related_name="followers"
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ["follower", "following"]
