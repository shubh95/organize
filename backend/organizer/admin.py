from django.contrib import admin
from .models import Task, Note, MindMap, ConceptLink, Goal

admin.site.register(Task)
admin.site.register(Note)
admin.site.register(MindMap)
admin.site.register(ConceptLink)
admin.site.register(Goal)
