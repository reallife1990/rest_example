from rest_framework.serializers import HyperlinkedModelSerializer
from .models import Author, User

class AuthorModelSerializer(HyperlinkedModelSerializer):
    class Meta:

        model = Author
        fields = '__all__'


class UserModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name','email', 'birthday_year']


class UserShowModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['id','first_name', 'last_name']