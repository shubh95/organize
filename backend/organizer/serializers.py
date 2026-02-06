from rest_framework import serializers
from .models import Task, Note, MindMap, ConceptLink, Goal


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'


class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = '__all__'


class MindMapSerializer(serializers.ModelSerializer):
    class Meta:
        model = MindMap
        fields = '__all__'


class ConceptLinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = ConceptLink
        fields = '__all__'


class GoalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Goal
        fields = '__all__'
