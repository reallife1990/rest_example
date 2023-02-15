from django_filters import rest_framework as filters
from .models import Project


# класс фильтраций для частичного поиска
class ProjectFilter(filters.FilterSet):
    project_name = filters.CharFilter(lookup_expr='contains')
    # contains- поиск по части совпадения

    class Meta:
        model = Project
        fields = ['project_name']