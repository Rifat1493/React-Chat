# Generated by Django 5.1.1 on 2024-09-29 16:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('prediction', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='chat',
            name='result',
            field=models.TextField(default='unavailable'),
            preserve_default=False,
        ),
    ]
