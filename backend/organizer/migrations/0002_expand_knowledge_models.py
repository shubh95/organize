from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('organizer', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='task',
            name='description',
            field=models.TextField(blank=True, default=''),
        ),
        migrations.CreateModel(
            name='ConceptLink',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('source', models.CharField(max_length=120)),
                ('target', models.CharField(max_length=120)),
                ('relation', models.CharField(max_length=120)),
                ('confidence', models.FloatField(default=0.8)),
            ],
        ),
        migrations.CreateModel(
            name='Goal',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('title', models.CharField(max_length=180)),
                ('goal_type', models.CharField(choices=[('short_term', 'Short Term'), ('long_term', 'Long Term')], default='short_term', max_length=20)),
                ('target_date', models.DateField(blank=True, null=True)),
                ('progress', models.PositiveSmallIntegerField(default=0)),
                ('plan', models.TextField(blank=True, default='')),
            ],
        ),
        migrations.CreateModel(
            name='MindMap',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('title', models.CharField(max_length=160)),
                ('data', models.JSONField(default=dict)),
            ],
        ),
        migrations.CreateModel(
            name='Note',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('title', models.CharField(max_length=160)),
                ('content', models.TextField()),
                ('tags', models.CharField(blank=True, default='', max_length=200)),
                ('source_url', models.URLField(blank=True, default='')),
            ],
        ),
    ]
