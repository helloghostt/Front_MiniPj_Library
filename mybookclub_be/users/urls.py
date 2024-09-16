from django.urls import path
from .views import UserDetailView, UserSignupView, UserLoginView, UserLogoutView

urlpatterns = [
    path("api/auth/signup/", UserSignupView.as_view(), name="user_signup"),
    path("api/auth/login/", UserLoginView.as_view(), name="user_login"),
    path("api/auth/logout/", UserLogoutView.as_view(), name="user_logout"),
    path("api/auth/me/", UserDetailView.as_view(), name="user_detail"),
]
