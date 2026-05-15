from django import forms
from .models import Task

class TaskForm(forms.ModelForm):
    class Meta:
        model = Task
        fields = ['title', 'priority', 'date', 'time', 'category', 'subtasks']

        widgets = {
            'title': forms.TextInput(attrs={'class': 'form-control'}),
            'priority': forms.Select(attrs={'class': 'form-control'}),
            'date': forms.DateInput(attrs={'type': 'date', 'class': 'form-control'}),
            'time': forms.TimeInput(attrs={'type': 'time', 'class': 'form-control'}),
            'category': forms.TextInput(attrs={'class': 'form-control'}),
            'subtasks': forms.TextInput(attrs={'class': 'form-control'}),
        }