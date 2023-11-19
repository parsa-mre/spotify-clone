from rest_framework import generics
from .models import Profile
from .serializers import ProfileSerializer
from rest_framework import permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .permissions import ProfilePermission


class ProfileRetrieveUpdateAPIView(generics.RetrieveUpdateAPIView):
    lookup_field = "id"
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    parser_classes = [ProfilePermission | permissions.IsAdminUser]

    def get_serializer_context(self):
        return {"request": self.request}


class PersonalProfileView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user

        user_info = {
            "user": {"username": user.username, "email": user.email},
            "profile": ProfileSerializer(instance=user.profile).data,
        }

        return Response(user_info, status=status.HTTP_200_OK)
