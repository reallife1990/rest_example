import json
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate,APIClient,APISimpleTestCase, APITestCase
from django.contrib.auth.models import User
from .views import AuthorModelViewSet, UserModelViewSet
from .models import Author
from .models import User as User1
from todo_app.models import Project
from todo_app.views import ProjectModelViewSet, ToDoModelViewSet

# 0:48 video
class TestAuthorViewSet(TestCase):

    def test_get_list(self):
        factory = APIRequestFactory()
        request = factory.get('/api/authors/')
        view = AuthorModelViewSet.as_view({'get':'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_guest(self):
        factory = APIRequestFactory()
        request = factory.post('/api/authors/', {
            "first_name": "one",
            "last_name": "two",
            "birthday_year": 1234
        })
        view = AuthorModelViewSet.as_view({'post':'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        #401 на выходе ибо допуск на создание только аворизованным

    def test_create_admin(self):
        factory = APIRequestFactory()
        request = factory.post('/api/authors/', {
            "first_name": "one",
            "last_name": "two",
            "birthday_year": 1234
        })
        admin = User.objects.create_superuser('adm','adm@adm.rt','adm')
        force_authenticate(request,admin)
        view = AuthorModelViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_details(self):
        author = Author.objects.create(first_name="one", last_name="two", birthday_year=1234)
        print(author.id)
        client = APIClient()
        response = client.get(f'/api/authors/{author.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_edit_guest(self):
        author = Author.objects.create(first_name="one", last_name="two", birthday_year=1234)
        client = APIClient()
        response = client.put(f'/api/authors/{author.id}/',{"first_name": "1one",
            "last_name": "t1wo",
            "birthday_year": 7234})
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_edit_admin(self):
        author = Author.objects.create(first_name="one", last_name="two", birthday_year=1234)
        client = APIClient()
        admin = User.objects.create_superuser('adm', 'adm@adm.rt', 'adm')
        client.login(username='adm', password='adm')
        response = client.put(f'/api/authors/{author.id}/',{"first_name": "1one",
            "last_name": "t1wo",
            "birthday_year": 7234})
        author =Author.objects.get(pk=author.id)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(author.first_name,'1one')
        self.assertEqual(author.last_name, 't1wo')
        self.assertEqual(author.birthday_year, 7234)
        client.logout()

class TestUserViewSet(APITestCase):
    def test_user_list_admin(self):
        admin = User.objects.create_superuser('adm', 'adm@adm.rt', 'adm')
        self.client.login(username='adm', password='adm')
        response = self.client.get('/api/users/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.client.logout()

    def test_user_guest(self):
        response = self.client.get('/api/users/')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

class TestProjectViewSet(APITestCase):
    def test_change_project(self):
        user1 = User1.objects.create(username='test1',
                                   first_name='qwe',
                                   last_name ='rty',
                                   birthday_year=1234,
                                   email='qwe@rty.yu')
        print(user1.id)
        project = Project.objects.create(project_name='pr_test',
                                         description='description')
        project.user.add(user1)
        project.save()
        admin = User.objects.create_superuser('adm', 'adm@adm.rt', 'adm')
        self.client.login(username='adm', password='adm')
        response = self.client.put(f'/api/projects/{project.id}/', {"project_name": "1one",
                "description": "t1wo",
                "user": user1.id
                })
        print(response.json())
        project = Project.objects.get(pk=project.id)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(project.project_name, "1one")
        self.assertEqual(project.description, "t1wo")
