from rest_framework import serializers
from .models import Profile
from accounts.serializers import UserSerializer
from django.contrib.auth import get_user_model

User = get_user_model()


class UserField(serializers.RelatedField):
    def get_queryset(self):
        return User.objects.all()

    def to_representation(self, value):
        return {"id": value.id, "username": value.username}


class ProfileSerializer(serializers.ModelSerializer):
    user = UserField(many=False)

    class Meta:
        model = Profile
        fields = "__all__"
        read_only_fields = [
            "id",
            "user",
            "followers_count",
            "following_count",
            "playlist_count",
            "is_premium",
            "premium_until",
            "is_active",
        ]

    def to_representation(self, instance):
        data = super().to_representation(instance)
        request = self.context.get("request")

        if request and request.user != instance.user:
            data.pop("is_premium", None)
            data.pop("premium_until", None)

        return data


class ProfileCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ["birth_date", "country", "gender"]
