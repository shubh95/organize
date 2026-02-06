from django.urls import path
from .views import (
    TaskListCreateView,
    TaskUpdateView,
    NoteListCreateView,
    MindMapListCreateView,
    ConceptLinkListCreateView,
    GoalListCreateView,
    analysis_overview,
    ai_insights,
    periodic_insights,
    unified_search,
)

urlpatterns = [
    path('tasks/', TaskListCreateView.as_view(), name='task-list-create'),
    path('tasks/<int:pk>/', TaskUpdateView.as_view(), name='task-update'),
    path('notes/', NoteListCreateView.as_view(), name='note-list-create'),
    path('mind-maps/', MindMapListCreateView.as_view(), name='mind-map-list-create'),
    path('concept-links/', ConceptLinkListCreateView.as_view(), name='concept-link-list-create'),
    path('goals/', GoalListCreateView.as_view(), name='goal-list-create'),
    path('analysis/overview/', analysis_overview, name='analysis-overview'),
    path('analysis/ai-insights/', ai_insights, name='analysis-ai-insights'),
    path('analysis/periodic-insights/', periodic_insights, name='analysis-periodic-insights'),
    path('search/', unified_search, name='unified-search'),
]
