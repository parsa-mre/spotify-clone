# Generated by Django 4.2.5 on 2023-09-18 06:12

from django.db import migrations, models
import django.db.models.deletion
import music.utils


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('profiles', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Album',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('release_date', models.DateTimeField()),
                ('genre', models.CharField(max_length=255)),
                ('image', models.ImageField(null=True, upload_to='images/')),
            ],
        ),
        migrations.CreateModel(
            name='Artist',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('biography', models.TextField()),
                ('image', models.ImageField(null=True, upload_to='images/')),
                ('monthly_listeners', models.IntegerField(default=0)),
                ('followers_count', models.IntegerField(default=0)),
            ],
        ),
        migrations.CreateModel(
            name='Track',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('track_number', models.PositiveSmallIntegerField(default=1, verbose_name='track number')),
                ('playcount', models.PositiveIntegerField(default=0, verbose_name='plays')),
                ('album', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='tracks', to='music.album')),
                ('artists', models.ManyToManyField(related_name='tracks', to='music.artist')),
            ],
            options={
                'ordering': ['track_number'],
                'unique_together': {('album', 'track_number')},
            },
        ),
        migrations.CreateModel(
            name='Playlist',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('image', models.ImageField(null=True, upload_to=music.utils.upload_to)),
                ('followers_count', models.IntegerField(default=0)),
                ('created_at', models.DateField(auto_now_add=True, verbose_name='created at')),
                ('profile', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='playlists', to='profiles.profile')),
                ('tracks', models.ManyToManyField(related_name='playlists', to='music.track')),
            ],
        ),
        migrations.CreateModel(
            name='FollowsPlaylist',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('playlist', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='music.playlist')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='profiles.profile')),
            ],
        ),
        migrations.CreateModel(
            name='FollowsArtists',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('artist', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='music.artist')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='profiles.profile')),
            ],
        ),
        migrations.AddField(
            model_name='album',
            name='artist',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='albums', to='music.artist'),
        ),
    ]
