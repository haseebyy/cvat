"""Annotation analytics from CVAT's existing PostgreSQL-backed models.

Counting scope: top-level, visible LabeledShape records belonging to
normal annotation jobs. Tags, tracks, and nested skeleton elements are
excluded and documented intentionally. Each stored shape is counted once.
"""
from django.db.models import Count
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.exceptions import PermissionDenied

from cvat.apps.engine.models import JobType, LabeledShape, Task
from cvat.apps.engine.permissions import TaskPermission


def get_annotation_counts(task_id: int):
    """One grouped DB query: Job -> Segment -> Task, Shape -> Label."""
    rows = (
        LabeledShape.objects.filter(
            job__segment__task_id=task_id,
            job__type=JobType.ANNOTATION.value,
            parent__isnull=True,
            outside=False,
        )
        .values("label__name")
        .annotate(count=Count("id"))
        .order_by("-count", "label__name")
    )
    counts = [{"label": row["label__name"], "count": row["count"]} for row in rows]
    return counts


class AnnotationCountsView(APIView):
    # CVAT's own authentication backend (session/token) via DRF defaults.
    # We apply the task-specific CVAT OPA VIEW policy explicitly below.
    permission_classes = [IsAuthenticated]

    def get(self, request, task_id: int):
        task = get_object_or_404(Task, pk=task_id)
        permission = TaskPermission.create_scope_view(request, task)
        if not permission.check_access().allow:
            raise PermissionDenied("You are not permitted to view this task")

        counts = get_annotation_counts(task_id)
        return Response({
            "task_id": task_id,
            "total_annotations": sum(item["count"] for item in counts),
            "classes_count": len(counts),
            "counts": counts,
            "counting_scope": "top-level visible shapes in annotation jobs",
        })
