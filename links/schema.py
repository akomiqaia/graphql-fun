import graphene

from graphene_django.types import DjangoObjectType

from .models import Link


class LinkType(DjangoObjectType):
    class Meta:
        model = Link


class Query(object):
    links = graphene.List(LinkType)

    def resolve_links(self, info, **kwargs):
        return Link.objects.all()

    def resolve_link(self, infor, **kwargs):
        id = kwargs.get('id')
        name = kwargs.get('name')

        if id is not None:
            return Link.objects.get(id=id)

        if name is not None:
            return Link.objects.get(name=name)

        return None