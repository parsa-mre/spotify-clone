from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.utils.translation import gettext_lazy as _


class User(AbstractUser):
    first_name = None
    last_name = None

    username = models.CharField(
        _("user name"),
        max_length=150,
        unique=True,
        blank=False,
        null=False,
        help_text=_(
            "Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only."
        ),
        error_messages={
            "unique": _("A user with that username already exists."),
        },
    )

    email = models.EmailField(
        _("email address"),
        unique=True,
        null=False,
        blank=False,
        error_messages={
            "unique": _("A user with that email already exists."),
        },
    )

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]
