from django.urls import path
from . import views

urlpatterns = [
    path('restaurants/<str:restaurant_id>/', views.get_restaurant),
    path('restaurants/<str:restaurant_id>/menu-items/', views.get_menu),

    # for real time order
    path('orders/place/', views.place_order),
    path('orders/live/', views.get_live_orders, name='get_live_orders'),
    path('orders/<str:order_id>/status/', views.update_order_status, name='update_order_status'),

    # order history
    path('orders/history/', views.get_order_history, name='get_order_history'),

    # for payments
    path('payments/create/', views.create_payment, name='create_payment'),
]