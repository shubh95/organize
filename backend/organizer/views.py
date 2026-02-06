from django.db.models import Q
from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .insight_service import build_heuristic_insight, build_ai_insight, build_periodic_insights
from .models import Task, Note, MindMap, ConceptLink, Goal
from .serializers import (
    TaskSerializer,
    NoteSerializer,
    MindMapSerializer,
    ConceptLinkSerializer,
    GoalSerializer,
)


class TaskListCreateView(generics.ListCreateAPIView):
    queryset = Task.objects.order_by('-created_at')
    serializer_class = TaskSerializer


class TaskUpdateView(generics.RetrieveUpdateAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer


class NoteListCreateView(generics.ListCreateAPIView):
    queryset = Note.objects.order_by('-created_at')
    serializer_class = NoteSerializer


class MindMapListCreateView(generics.ListCreateAPIView):
    queryset = MindMap.objects.order_by('-created_at')
    serializer_class = MindMapSerializer


class ConceptLinkListCreateView(generics.ListCreateAPIView):
    queryset = ConceptLink.objects.order_by('-created_at')
    serializer_class = ConceptLinkSerializer


class GoalListCreateView(generics.ListCreateAPIView):
    queryset = Goal.objects.order_by('-created_at')
    serializer_class = GoalSerializer


@api_view(['GET'])
def analysis_overview(request):
    tasks = Task.objects.all()
    return Response(build_heuristic_insight(tasks))


@api_view(['POST'])
def ai_insights(request):
    tasks = Task.objects.all()
    return Response(build_ai_insight(tasks))


@api_view(['GET'])
def periodic_insights(request):
    return Response(build_periodic_insights())


@api_view(['GET'])
def unified_search(request):
    query = request.GET.get('q', '').strip()
    if not query:
        return Response({'query': '', 'results': []})

    task_results = Task.objects.filter(Q(title__icontains=query) | Q(description__icontains=query))[:10]
    note_results = Note.objects.filter(Q(title__icontains=query) | Q(content__icontains=query) | Q(tags__icontains=query))[:10]
    goal_results = Goal.objects.filter(Q(title__icontains=query) | Q(plan__icontains=query))[:10]

    results = {
        'tasks': TaskSerializer(task_results, many=True).data,
        'notes': NoteSerializer(note_results, many=True).data,
        'goals': GoalSerializer(goal_results, many=True).data,
    }
    return Response({'query': query, 'results': results})
