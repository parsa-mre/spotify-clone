# Generated by Django 4.2.5 on 2023-09-19 15:36

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('music', '0006_playlist_trackcount'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='track',
            name='trackcount',
        ),
    ]
