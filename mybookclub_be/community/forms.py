from .models import Comment
from django import forms

class CommentForm(forms.ModelForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['content'].widget.attrs.update({'class': 'form-control', 'rows': '3'})
        self.fields['content'].label = False
    
    class Meta:
        model = Comment
        fields = ['content']