from .views import ProfileRetrieveUpdateAPIView, PersonalProfileView
from django.urls import path, include


urlpatterns = [
    path("profiles/<int:id>/", ProfileRetrieveUpdateAPIView.as_view()),
    path("me/", PersonalProfileView.as_view(), name="personal profile view"),
]
