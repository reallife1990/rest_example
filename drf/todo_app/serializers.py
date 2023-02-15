from time import strftime

from rest_framework.serializers import HyperlinkedModelSerializer, ModelSerializer
from .models import ToDo, Project
from app.serializers import UserShowModelSerializer, UserModelSerializer


class ProjectShowModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = Project
        fields = ['id', 'project_name']
class ProjectModelSerializer(ModelSerializer):
    #user = UserShowModelSerializer(many=True)

    class Meta:
        model = Project
        fields = '__all__'


class ToDoModelSerializer(ModelSerializer):
    #created_user = UserShowModelSerializer(many=True)
    #project = ProjectShowModelSerializer()
    class Meta:
        model = ToDo
        fields = '__all__'
