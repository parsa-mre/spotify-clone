# Generated by Django 4.2.5 on 2023-09-18 08:43

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('profiles', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='premium_until',
            field=models.DateField(default=datetime.date(1999, 1, 1), verbose_name='premium until'),
        ),
    ]
