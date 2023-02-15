from django.db import models
from app.models import User
from uuid import uuid4
# Create your models here.


class Project(models.Model):
    id = models.AutoField(primary_key=True)
    project_name = models.CharField(max_length=128, verbose_name='Имя проекта')
    description = models.TextField(blank=True, verbose_name='Описание')
    link = models.TextField(blank=True, verbose_name='Ссылка на проект')
    user = models.ForeignKey(User, verbose_name='Автор', on_delete=models.SET_NULL, null=True)


class ToDo(models.Model):
    id = models.AutoField(primary_key=True, verbose_name='id заметки')
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    text = models.TextField(blank=False, verbose_name='Заметка')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Создана')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='Обновлена')
    created_user = models.ForeignKey(User, verbose_name='Автор', on_delete=models.SET_NULL, null=True)
    completed = models.BooleanField(default=False, verbose_name='Готовность')

#8e090b74839e4eb798881d5359706276