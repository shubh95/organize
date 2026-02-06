from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models


class TimestampedModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Task(TimestampedModel):
    title = models.CharField(max_length=160)
    description = models.TextField(blank=True, default='')
    category = models.CharField(max_length=80, default='general')
    priority = models.CharField(max_length=20, default='medium')
    due_date = models.DateField(null=True, blank=True)
    completed = models.BooleanField(default=False)
    estimated_minutes = models.PositiveIntegerField(default=30)

    def __str__(self) -> str:
        return f'{self.title} ({"done" if self.completed else "pending"})'


class Note(TimestampedModel):
    title = models.CharField(max_length=160)
    content = models.TextField()
    tags = models.CharField(max_length=200, blank=True, default='')
    source_url = models.URLField(blank=True, default='')

    def __str__(self) -> str:
        return self.title


class MindMap(TimestampedModel):
    title = models.CharField(max_length=160)
    data = models.JSONField(default=dict)

    def __str__(self) -> str:
        return self.title


class ConceptLink(TimestampedModel):
    source = models.CharField(max_length=120)
    target = models.CharField(max_length=120)
    relation = models.CharField(max_length=120)
    confidence = models.FloatField(default=0.8, validators=[MinValueValidator(0.0), MaxValueValidator(1.0)])

    def __str__(self) -> str:
        return f'{self.source} -> {self.target}'


class Goal(TimestampedModel):
    SHORT_TERM = 'short_term'
    LONG_TERM = 'long_term'
    TYPE_CHOICES = [(SHORT_TERM, 'Short Term'), (LONG_TERM, 'Long Term')]

    title = models.CharField(max_length=180)
    goal_type = models.CharField(max_length=20, choices=TYPE_CHOICES, default=SHORT_TERM)
    target_date = models.DateField(null=True, blank=True)
    progress = models.PositiveSmallIntegerField(
        default=0,
        validators=[MinValueValidator(0), MaxValueValidator(100)],
    )
    plan = models.TextField(blank=True, default='')

    def __str__(self) -> str:
        return f'{self.title} ({self.goal_type})'
