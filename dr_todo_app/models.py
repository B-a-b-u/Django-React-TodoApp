from django.db import models

# Create your models here.
class Todo(models.Model):
    event = models.TextField(max_length=100)
    detail = models.TextField()
    completed = models.BooleanField(default=False)

    def __str__(self):
        return self.event