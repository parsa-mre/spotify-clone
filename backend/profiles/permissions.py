from rest_framework import permissions


class ProfilePermission(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.user.is_authenticated or request.method == "GET":
            return True
        return False

    def has_object_permission(self, request, view, obj):
        if obj.user == request.user or request.method == "GET":
            return True
        return False
