# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Company',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('full_name', models.CharField(max_length=30, verbose_name=b's')),
                ('address', models.CharField(max_length=50, verbose_name=b'a')),
                ('tel', models.CharField(max_length=15, verbose_name=b'q', blank=True)),
            ],
        ),
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('product_name', models.CharField(max_length=30, verbose_name=b'as')),
                ('price', models.FloatField(verbose_name=b'qew')),
                ('stock', models.IntegerField(max_length=5, verbose_name=b'swq')),
                ('create_date', models.DateField(verbose_name=b'qewas')),
                ('company', models.ForeignKey(to='cps.Company')),
            ],
            options={
                'ordering': ['create_date'],
            },
        ),
    ]
