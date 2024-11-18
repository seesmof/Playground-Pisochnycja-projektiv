from django import template
from django.http import HttpResponse
from django.template import loader
from .models import Member


def members(request):
    given_members=Member.objects.all().values()
    template=loader.get_template('all_members.html')
    context={
        'given_members':given_members
    }
    return HttpResponse(template.render(context=context,request=request))

def details(request,id):
    member=Member.objects.get(id=id)
    template=loader.get_template('details.html')
    context={
        'member':member
    }
    return HttpResponse(template.render(context=context,request=request))

def index(request):
    template=loader.get_template('index.html')
    return HttpResponse(template.render())

def testing(request):
    members=Member.objects.all().values()
    first_names=Member.objects.values_list('first_name')
    johns=Member.objects.filter(first_name='John').values()
    ms=Member.objects.filter(first_name__startswith='M').values()
    ordered_members=Member.objects.all().order_by('first_name').values()
    template=loader.get_template('template.html')
    context={
        'members':members,
        'first_names':first_names,
        'johns':johns,
        'ms':ms,
        'ordered_members':ordered_members,
    }
    return HttpResponse(template.render(context=context,request=request))