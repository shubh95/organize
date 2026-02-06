import os
from collections import Counter
from datetime import timedelta
from typing import Iterable

from django.utils import timezone

from .models import Task, Goal


def _task_metrics(tasks: list[Task]) -> dict:
    total = len(tasks)
    completed = sum(1 for task in tasks if task.completed)
    completion_rate = round((completed / total) * 100, 2) if total else 0
    category_counter = Counter(task.category for task in tasks)
    top_category = category_counter.most_common(1)[0][0] if category_counter else 'n/a'
    total_estimated = sum(task.estimated_minutes for task in tasks)
    return {
        'total_tasks': total,
        'completed_tasks': completed,
        'completion_rate': completion_rate,
        'top_category': top_category,
        'estimated_minutes': total_estimated,
    }


def _advice_from_metrics(metrics: dict) -> str:
    if metrics['estimated_minutes'] > 360:
        return 'High workload detected. Time-box top priorities into 25-minute sprints and defer low impact tasks.'
    if metrics['completion_rate'] < 50:
        return 'Low completion rate. Start with 2 high-leverage tasks before checking messages and social feeds.'
    return 'Solid progress. Keep grouping similar tasks and reserve one daily slot for learning.'


def build_heuristic_insight(tasks: Iterable[Task]) -> dict:
    task_list = list(tasks)
    metrics = _task_metrics(task_list)
    recommendation = _advice_from_metrics(metrics)
    return {**metrics, 'recommendation': recommendation}


def _goal_plans(goals) -> dict:
    short_term = goals.filter(goal_type=Goal.SHORT_TERM)
    long_term = goals.filter(goal_type=Goal.LONG_TERM)
    return {
        'short_term_plan': [
            {'goal': goal.title, 'next_action': 'Break down into 3 milestones this week.'}
            for goal in short_term[:5]
        ],
        'long_term_plan': [
            {'goal': goal.title, 'next_action': 'Define monthly checkpoint and success metric.'}
            for goal in long_term[:5]
        ],
    }


def build_periodic_insights() -> dict:
    now = timezone.now()
    daily = Task.objects.filter(created_at__date=now.date())
    weekly = Task.objects.filter(created_at__gte=now - timedelta(days=7))
    goals = Goal.objects.all()

    daily_metrics = build_heuristic_insight(daily)
    weekly_metrics = build_heuristic_insight(weekly)
    progress_report = {
        'goal_completion_average': round(sum(goal.progress for goal in goals) / len(goals), 2) if goals else 0,
        'active_short_term_goals': goals.filter(goal_type=Goal.SHORT_TERM).count(),
        'active_long_term_goals': goals.filter(goal_type=Goal.LONG_TERM).count(),
    }

    return {
        'daily_insights': daily_metrics,
        'weekly_insights': weekly_metrics,
        'progress_report': progress_report,
        'advice': {
            'focus_today': _advice_from_metrics(daily_metrics),
            'focus_this_week': _advice_from_metrics(weekly_metrics),
        },
        'goal_planning': _goal_plans(goals),
        'information_structure_plan': [
            'Capture notes with tags and source links.',
            'Connect ideas with ConceptLink relations.',
            'Promote repeated themes into MindMap nodes.',
            'Attach each note or concept to short/long-term goals.',
        ],
    }


def build_ai_insight(tasks: Iterable[Task]) -> dict:
    api_key = os.getenv('OPENAI_API_KEY')
    model = os.getenv('OPENAI_MODEL', 'gpt-4o-mini')
    heuristic = build_heuristic_insight(tasks)

    if not api_key:
        return {
            'mode': 'heuristic',
            'summary': (
                f"Completion rate is {heuristic['completion_rate']}%. "
                f"Most active category is {heuristic['top_category']}."
            ),
            'recommendation': heuristic['recommendation'],
            'metrics': heuristic,
        }

    from openai import OpenAI

    client = OpenAI(api_key=api_key)
    prompt = (
        'You are a productivity coach and knowledge architect. Return concise JSON with keys: '
        'summary, recommendation, weekly_plan, short_term_goal_plan, long_term_goal_plan.\n'
        f'Data: {heuristic}'
    )
    response = client.responses.create(model=model, input=prompt)

    return {
        'mode': 'ai',
        'raw_response': response.output_text,
        'metrics': heuristic,
    }
