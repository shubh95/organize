from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('organizer', '0002_expand_knowledge_models'),
    ]

    operations = [
        migrations.AlterField(
            model_name='conceptlink',
            name='confidence',
            field=models.FloatField(default=0.8, validators=[MinValueValidator(0.0), MaxValueValidator(1.0)]),
        ),
        migrations.AlterField(
            model_name='goal',
            name='progress',
            field=models.PositiveSmallIntegerField(default=0, validators=[MinValueValidator(0), MaxValueValidator(100)]),
        ),
    ]
