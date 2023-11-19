from rest_framework.views import APIView
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework import generics
from music.models import Playlist, PlaylistTrack, Track
from music.permissions import IsOwner, IsOwnerOrNotPrivate
from music.serializers import (
    PlaylistSerializer,
    TrackSerializer,
    PlaylistTrackSerializer,
    PlaylistTrackReadOnlySerializer,
)
from rest_framework import status
from rest_framework import viewsets
from rest_framework import generics
from django.shortcuts import get_object_or_404
from django.db import models
from django.http import Http404
from rest_framework import permissions
from rest_framework import mixins


class PlaylistViewSet(
    mixins.CreateModelMixin,
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    mixins.DestroyModelMixin,
    viewsets.GenericViewSet,
):
    serializer_class = PlaylistSerializer
    permission_classes = [IsOwnerOrNotPrivate]
    queryset = Playlist.objects.all()

    def get_serializer_context(self):
        return {"request": self.request}

    def perform_create(self, serializer):
        requesting_user_profile = self.request.user.profile
        serializer.save(profile=requesting_user_profile)
        requesting_user_profile.playlist_count += 1
        requesting_user_profile.save()

    def perform_destroy(self, instance):
        instance.profile.playlist_count = max(instance.profile.playlist_count - 1, 0)
        instance.profile.save()
        instance.delete()


class PlayListTracksView(APIView):
    permission_classes = [IsOwnerOrNotPrivate]

    def get(self, request: Request, id):
        playlist = get_object_or_404(
            Playlist.objects.prefetch_related(
                "tracks",
                "tracks__track",
                "tracks__track__artists",
                "tracks__track__album",
            ),
            id=id,
        )

        tracks = PlaylistTrackReadOnlySerializer(playlist.tracks.all(), many=True)
        return Response({"tracks": tracks.data}, status=status.HTTP_200_OK)

    def post(self, request: Request, id):
        playlist = get_object_or_404(Playlist, id=id)
        track_id = request.data.get("track_id")
        playlist_track_serializer = PlaylistTrackSerializer(
            data={
                "playlist": playlist.id,
                "position": playlist.trackcount,
                "track": track_id,
            }
        )
        playlist_track_serializer.is_valid(raise_exception=True)
        playlist_track_serializer.save()
        playlist.trackcount += 1
        playlist.save()
        return Response(playlist_track_serializer.data, status=status.HTTP_201_CREATED)

    def put(self, request: Request, id):
        playlist_track = get_object_or_404(PlaylistTrack, id=id)
        track_id = playlist_track.track.id
        new_position = request.data.get("new_position")

        playlist_track_serializer = PlaylistTrackSerializer(
            data={
                "playlist": playlist_track.playlist.id,
                "track": track_id,
                "position": new_position,
            }
        )
        playlist_track_serializer.is_valid(raise_exception=True)
        track = get_object_or_404(Track, id=track_id)
        self.reorder_track(playlist_track.playlist.id, track.id, new_position)
        playlist_track = PlaylistTrack.objects.get(
            track=track.id, playlist=playlist_track.playlist.id
        )
        playlist_track_serializer = PlaylistTrackSerializer(instance=playlist_track)
        return Response(playlist_track_serializer.data)

    def delete(self, request: Request, id):
        position = request.data.get("position")
        PlaylistSerializer(
            data={"position": position, "playlist": id, "name": "1", "track": 1}
        ).is_valid(raise_exception=True)

        playlist_track = get_object_or_404(
            PlaylistTrack, playlist=id, position=position
        )
        n = playlist_track.playlist.trackcount

        self.reorder_track(
            playlist_id=id,
            track_id=playlist_track.track.id,
            new_position=n,
        )

        playlist_track.playlist.trackcount = max(
            0, playlist_track.playlist.trackcount - 1
        )
        playlist_track.playlist.save()
        playlist_track = PlaylistTrack.objects().get(id=id)
        playlist_track.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def reorder_track(playlist_id, track_id, new_position):
        current_position = PlaylistTrack.objects.get(
            playlist_id=playlist_id, track_id=track_id
        ).position

        PlaylistTrack.objects.filter(playlist_id=playlist_id, track_id=track_id).update(
            position=new_position
        )

        if new_position < current_position:
            tracks_to_update = PlaylistTrack.objects.filter(
                playlist_id=playlist_id,
                position__gte=new_position,
                position__lt=current_position,
            )
            tracks_to_update.update(position=models.F("position") + 1)

        elif new_position > current_position:
            tracks_to_update = PlaylistTrack.objects.filter(
                playlist_id=playlist_id,
                position__gt=current_position,
                position__lte=new_position,
            )
            tracks_to_update.update(position=models.F("position") - 1)
