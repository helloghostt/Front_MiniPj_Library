from django.urls import path, include
from rest_framework_nested import routers
from .views import BookViewSet, ReviewViewSet, search_books

router = routers.DefaultRouter()
router.register(r"books", BookViewSet, basename="book")

books_router = routers.NestedDefaultRouter(router, r"books", lookup="book")
books_router.register(r"reviews", ReviewViewSet, basename="book-reviews")

urlpatterns = [
    path("", include(router.urls)),
    path("", include(books_router.urls)),
    path("books/search/", search_books, name="search_books"),
]
