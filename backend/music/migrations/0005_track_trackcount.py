# Generated by Django 4.2.5 on 2023-09-19 15:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('music', '0004_playlisttrack'),
    ]

    operations = [
        migrations.AddField(
            model_name='track',
            name='trackcount',
            field=models.PositiveIntegerField(default=0, verbose_name='track count'),
        ),
    ]
