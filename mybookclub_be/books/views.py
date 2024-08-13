from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import viewsets, permissions, filters
from rest_framework.pagination import PageNumberPagination
from django_filters.rest_framework import DjangoFilterBackend
from .models import Book, Review
from .serializers import BookSerializer, ReviewSerializer


class StandardResultsSetPagination(PageNumberPagination):
    page_size = 20
    page_size_query_param = "page_size"
    max_page_size = 100


class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all().order_by("id")
    serializer_class = BookSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    pagination_class = StandardResultsSetPagination
    filter_backends = [
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter,
    ]
    filterset_fields = ["genre"]
    search_fields = ["title", "author"]
    ordering_fields = ["published_date", "title"]


class ReviewViewSet(viewsets.ModelViewSet):
    serializer_class = ReviewSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        return Review.objects.filter(book_id=self.kwargs.get("book_pk"))

    def perform_create(self, serializer):
        book_id = self.kwargs.get("book_pk")
        book = Book.objects.get(pk=book_id)
        serializer.save(user=self.request.user, book=book)


@api_view(["GET"])
def fetchbooks(request):
    books = Book.objects.all()
    paginator = StandardResultsSetPagination()
    result_page = paginator.paginate_queryset(books, request)
    serializer = BookSerializer(result_page, many=True)
    return paginator.get_paginated_response(serializer.data)


@api_view(["GET"])
def search_books(request):
    query = request.GET.get("q", "")
    books = Book.objects.filter(title__icontains=query) | Book.objects.filter(
        author__icontains=query
    )
    paginator = StandardResultsSetPagination()
    result_page = paginator.paginate_queryset(books, request)
    serializer = BookSerializer(result_page, many=True)
    return paginator.get_paginated_response(serializer.data)
