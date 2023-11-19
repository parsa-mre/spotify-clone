# from rest_framework.generics import CreateAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework import generics
from .serializers import UserRegisterSerializer
from profiles.serializers import ProfileCreateSerializer
from profiles.models import Profile
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken


class LoginView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        refresh = str(response.data["refresh"])
        access = str(response.data["access"])

        return Response(
            {
                "auth": {"access": access, "refresh": refresh},
            }
        )


class RegisterView(APIView):
    def post(self, request):
        user_serializer = UserRegisterSerializer(
            data={
                field: request.data.get(field)
                for field in UserRegisterSerializer.Meta.fields
            }
        )
        user_serializer.is_valid(raise_exception=True)

        profile_serializer = ProfileCreateSerializer(
            data={
                field: request.data.get(field)
                for field in ProfileCreateSerializer.Meta.fields
            }
        )
        profile_serializer.is_valid(raise_exception=True)

        user_instance = user_serializer.save()
        validated_data = profile_serializer.validated_data
        validated_data["user"] = user_instance
        profile_instance = Profile.objects.create(**validated_data)

        refresh = RefreshToken.for_user(user_instance)
        access = refresh.access_token

        refresh, access = str(refresh), str(access)

        return Response(
            {
                "auth": {"access": access, "refresh": refresh},
            }
        )
