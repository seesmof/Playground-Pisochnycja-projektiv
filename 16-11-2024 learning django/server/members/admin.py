from django.contrib import admin

from .models import Member

class MemberAdmin(admin.ModelAdmin):
    list_display=('first_name','last_name','joined_date')

admin.site.register(Member,MemberAdmin)