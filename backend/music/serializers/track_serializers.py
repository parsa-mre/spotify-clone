from rest_framework import serializers
from music.models import Track, Artist, Album


class ArtistField(serializers.RelatedField):
    def get_queryset(self):
        return Artist.objects.all()

    def to_representation(self, value):
        return {"id": value.id, "name": value.name}

    def to_internal_value(self, data):
        if isinstance(data, list):
            artist_ids = []
            for item in data:
                artist = self.get_artist_by_id(item)
                artist_ids.append(artist)
            return artist_ids
        else:
            artist = self.get_artist_by_id(data)
            return artist

    def get_artist_by_id(self, artist_id):
        try:
            artist_id = int(artist_id)
            return self.get_queryset().get(id=artist_id)
        except (ValueError, Artist.DoesNotExist):
            raise serializers.ValidationError(f"Invalid artist ID: {artist_id}")


class AlbumField(serializers.RelatedField):
    def get_queryset(self):
        return Album.objects.all()

    def to_representation(self, value):
        return {"id": value.id, "name": value.name}

    def to_internal_value(self, value):
        try:
            album_id = int(value)
            return self.get_queryset().get(id=album_id)
        except (ValueError, Artist.DoesNotExist):
            raise serializers.ValidationError(f"Invalid artist ID: {album_id}")


class TrackSerializer(serializers.ModelSerializer):
    artists = ArtistField(many=True)
    album = AlbumField(many=False)

    class Meta:
        model = Track
        fields = ["id", "name", "artists", "album", "playcount", "track_number"]
        read_only_fields = ["id", "playcount"]
