from django.db import models

class Task(models.Model):
    PRIORITY_CHOICES = [
        ('high', 'High'),
        ('medium', 'Medium'),
        ('low', 'Low'),
    ]

    title = models.CharField(max_length=255)
    priority = models.CharField(max_length=10, choices=PRIORITY_CHOICES, default='medium')
    date = models.DateField(null=True, blank=True)
    time = models.TimeField(null=True, blank=True)
    category = models.CharField(max_length=100, default="General")
    subtasks = models.TextField(blank=True, null=True)
    completed = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title