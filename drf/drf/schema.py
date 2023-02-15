import graphene
from graphene_django import DjangoObjectType
from app.models import Author, User
from todo_app.models import ToDo, Project


class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = '__all__'


class ToDoType(DjangoObjectType):
    class Meta:
        model = ToDo
        fields = '__all__'


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'


class Query(graphene.ObjectType):
    users = graphene.List(UserType)
    projects = graphene.List(ProjectType)
    todos = graphene.List(ToDoType)
    hello = graphene.String(default_value="Hi!")
    uncomplete_todos = graphene.List(ToDoType, completed=graphene.Boolean(required=False),
                                     user=graphene.String(required=False))


    def resolve_users(root, info):
        return User.objects.all()

    def resolve_projects(root, info):
        return Project.objects.all()

    def resolve_todos(root, info):
        return ToDo.objects.all()

    def resolve_uncomplete_todos(root, info, user=None, completed=False):
        todos = ToDo.objects.filter(completed=completed)
        if user:
            todos.filter(Project__project_name=user)
        return todos



schema = graphene.Schema(query=Query)
