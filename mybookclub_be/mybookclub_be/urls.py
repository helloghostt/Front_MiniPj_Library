from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter

router = DefaultRouter()

urlpatterns = [
    path("admin/", admin.site.urls),
    path(
        "api/",
        include(
            [
                path("", include(router.urls)),
                path("", include("books.urls")),
                path("", include("community.urls")),
                path("", include("users.urls")),
            ]
        ),
    ),
]
