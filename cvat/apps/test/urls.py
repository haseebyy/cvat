from django.urls import path
from .views import AnnotationCountsView

urlpatterns = [
    path(
        "tasks/<int:task_id>/annotation-counts/",
        AnnotationCountsView.as_view(),
        name="test-annotation-counts",
    ),
]
