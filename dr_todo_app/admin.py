from django.contrib import admin
from .models import Todo

# Create Todo model to display in admin page
class TodoAdmin(admin.ModelAdmin):
    list_display = ("event","detail","completed")

# Register Model in admin site
admin.site.register(Todo, TodoAdmin)