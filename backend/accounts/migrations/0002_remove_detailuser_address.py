# Generated by Django 4.2.7 on 2024-05-13 08:23

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='detailuser',
            name='address',
        ),
    ]
