import datetime

from rest_framework.viewsets import ModelViewSet, ViewSet
from rest_framework import viewsets
from .models import Project, ToDo
from .serializers import ProjectModelSerializer, ToDoModelSerializer
from .filters import ProjectFilter
from rest_framework.response import Response
from rest_framework.pagination import LimitOffsetPagination, PageNumberPagination

class ProjectLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 30


class ToDoLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 20




class ProjectModelViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer
    filterset_class = ProjectFilter
    pagination_class = ProjectLimitOffsetPagination


class ToDoModelViewSet(viewsets.ModelViewSet):
    queryset = ToDo.objects.all()
    serializer_class = ToDoModelSerializer
    pagination_class = ToDoLimitOffsetPagination

    def destroy(self, request, *args, **kwargs): # 79278681839
        instance = self.get_object()
        if instance.completed is False:
            print(instance)
            instance.completed = True
            instance.updated_at = datetime.datetime.now()
            instance.save()
            return Response({'data':'COMPLETED'})
        else:
            print('hgg')
        return Response()

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        print(request)
        return Response(instance)
