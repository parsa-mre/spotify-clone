from rest_framework import permissions


class IsOwner(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method == "GET":
            return True
        if request.user.is_authenticated:
            return True
        return False

    def has_object_permission(self, request, view, obj):
        if obj.profile.user == request.user:
            return True
        return False


class IsOwnerOrNotPrivate(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method == "GET":
            return True

        if request.user.is_authenticated:
            return True
        return False

    def has_object_permission(self, request, view, obj):
        if request.method == "GET":
            if not obj.private or obj.profile.user == request.user:
                return True
        elif obj.profile.user == request.user:
            return True
        else:
            return False
