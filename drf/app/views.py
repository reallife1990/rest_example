from django.shortcuts import render
from rest_framework import viewsets, mixins
from rest_framework.permissions import IsAuthenticated

from .models import Author, User
from .serializers import AuthorModelSerializer, UserModelSerializer, UserShowModelSerializer


class AuthorModelViewSet(viewsets.ModelViewSet):
    queryset = Author.objects.all()
    serializer_class = AuthorModelSerializer
    #filterset_fields =['first_name']


class UserModelViewSet(viewsets.GenericViewSet, mixins.ListModelMixin,
                       mixins.RetrieveModelMixin, mixins.UpdateModelMixin):
    queryset = User.objects.all()
    serializer_class = UserModelSerializer
    permission_classes = [IsAuthenticated]

    def get_serializer_class(self):
        if self.request.version == '2.0':
            return UserShowModelSerializer
        return UserModelSerializer
