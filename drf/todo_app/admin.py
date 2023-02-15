from django.contrib import admin
from .models import ToDo, Project


class ToDoAdmin(admin.ModelAdmin):
    list_display = ['text', 'id']


class ProjectAdmin(admin.ModelAdmin):
    list_display = ['project_name', 'id']

admin.site.register(ToDo, ToDoAdmin)
admin.site.register(Project, ProjectAdmin)