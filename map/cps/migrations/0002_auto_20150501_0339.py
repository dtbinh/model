# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('cps', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Branch',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('bus_id', models.IntegerField(max_length=5, verbose_name=b'id')),
                ('status', models.IntegerField(max_length=1, verbose_name=b'status')),
                ('Pf', models.FloatField(verbose_name=b'Pf')),
                ('Qf', models.FloatField(verbose_name=b'Qf')),
                ('Pt', models.FloatField(verbose_name=b'Pt')),
                ('Qt', models.FloatField(verbose_name=b'Qt')),
                ('injection', models.FloatField(verbose_name=b'injection')),
            ],
        ),
        migrations.CreateModel(
            name='Bus',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('bus_id', models.IntegerField(max_length=5, verbose_name=b'id')),
                ('type', models.CharField(max_length=50, verbose_name=b'type')),
                ('status', models.IntegerField(max_length=1, verbose_name=b'status')),
                ('Pd', models.FloatField(verbose_name=b'Pd')),
                ('Qd', models.FloatField(verbose_name=b'Qd')),
                ('Pg', models.FloatField(verbose_name=b'Pg')),
                ('Qg', models.FloatField(verbose_name=b'Qg')),
                ('Vm', models.FloatField(verbose_name=b'Vm')),
                ('Va', models.FloatField(verbose_name=b'Va')),
            ],
        ),
        migrations.RemoveField(
            model_name='product',
            name='company',
        ),
        migrations.DeleteModel(
            name='Company',
        ),
        migrations.DeleteModel(
            name='Product',
        ),
    ]
