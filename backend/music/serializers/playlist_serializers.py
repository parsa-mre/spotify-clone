from rest_framework import serializers
from music.models import Track, Playlist, PlaylistTrack
from profiles.serializers import ProfileSerializer
from music.serializers import TrackSerializer


class PlaylistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Playlist
        fields = [
            "name",
            "image",
            "id",
            "created_at",
            "followers_count",
            "private",
        ]
        read_only_fields = ["id", "created_at", "followers_count"]

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data["profile"] = ProfileSerializer(instance=instance.profile).data
        if "profile" in data:
            profile_data = data["profile"]

            fields_to_remove = [
                "modified_at",
                "birth_date",
                "country",
                "gender",
                "followers_count",
                "following_count",
                "playlist_count",
                "is_active",
            ]

            for field_name in fields_to_remove:
                if field_name in profile_data:
                    del profile_data[field_name]

        return data


# class TrackField(serializers.RelatedField):
#     def get_queryset(self):
#         return Track.objects.all()

#     def to_representation(self, value):
#         return {"id": value.id, "name": value.name}

#     def to_internal_value(self, data):
#         if isinstance(data, list):
#             artist_ids = []
#             for item in data:
#                 artist = self.get_artist_by_id(item)
#                 artist_ids.append(artist)
#             return artist_ids
#         else:
#             artist = self.get_artist_by_id(data)
#             return artist

#     def get_artist_by_id(self, artist_id):
#         try:
#             artist_id = int(artist_id)
#             return self.get_queryset().get(id=artist_id)
#         except (ValueError, Artist.DoesNotExist):
#             raise serializers.ValidationError(f"Invalid artist ID: {artist_id}")


class PlaylistTrackSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlaylistTrack
        fields = "__all__"
        read_only_fields = ["id", "created_at"]


class PlaylistTrackReadOnlySerializer(serializers.ModelSerializer):
    track = TrackSerializer()

    class Meta:
        model = PlaylistTrack
        fields = "__all__"
        read_only_fields = ["id", "track", "name", "created_at"]
