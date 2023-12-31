# Generated by Django 4.2.6 on 2023-10-12 08:50

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Todo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('event', models.TextField(max_length=100)),
                ('detail', models.TextField()),
                ('completed', models.BooleanField(default=False)),
            ],
        ),
    ]
