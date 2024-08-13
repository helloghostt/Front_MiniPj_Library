from django.urls import path
from .views import UserDetailView, UserSignupView, UserLoginView, UserLogoutView

urlpatterns = [
    path("users/auth/signup/", UserSignupView.as_view(), name="user_signup"),
    path("users/auth/login/", UserLoginView.as_view(), name="user_login"),
    path("users/auth/logout/", UserLogoutView.as_view(), name="user_logout"),
    path("users/auth/me/", UserDetailView.as_view(), name="user_detail"),
]
