from rest_framework_nested import routers
from django.urls import path, include
from .views import CommentViewSet, PostViewSet

router = routers.DefaultRouter()
router.register(r"posts", PostViewSet, basename="post")

posts_router = routers.NestedDefaultRouter(router, r"posts", lookup="post")
posts_router.register(r"comments", CommentViewSet, basename="post-comments")

urlpatterns = [
    path("", include(router.urls)),
    path("", include(posts_router.urls)),
    path(
        "posts/<str:post_pk>/new_comment/",
        CommentViewSet.as_view({"post": "create"}),
        name="create_comment",
    ),
    path(
        "comments/<str:pk>/update/",
        CommentViewSet.as_view({"put": "update"}),
        name="update_comment",
    ),
    path(
        "comments/<str:pk>/delete/",
        CommentViewSet.as_view({"delete": "destroy"}),
        name="delete_comment",
    ),
]
