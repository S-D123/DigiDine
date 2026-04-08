from django.shortcuts import render

# Create your views here.

import json
from django.http import JsonResponse
from .firebase import firestore_db, realtime_db
from django.views.decorators.csrf import csrf_exempt

from django.shortcuts import render

def serve_index(request):
    return render(request, 'index.html')

@csrf_exempt
def get_order_history(request):
    if request.method == 'GET':
        try:
            ref = realtime_db.child('live_orders')
            orders_data = ref.get()
            
            history_list = []
            
            if orders_data:
                for order_id, order_info in orders_data.items():
                    # Only grab orders that have been marked as 'completed'
                    if order_info.get('status') == 'completed':
                        order_info['id'] = order_id 
                        history_list.append(order_info)
                        
            return JsonResponse({'orders': history_list})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)

@csrf_exempt
def get_live_orders(request):
    if request.method == 'GET':
        try:
            # Fetch all orders from the 'live_orders' node
            ref = realtime_db.child('live_orders')
            orders_data = ref.get()
            
            live_orders_list = []
            
            if orders_data:
                # Firebase returns a dictionary where keys are the random IDs
                for order_id, order_info in orders_data.items():
                    # We only want to show active orders on the dashboard
                    if order_info.get('status') in ['pending', 'preparing', 'ready']:
                        order_info['id'] = order_id # Attach the Firebase ID to the object
                        live_orders_list.append(order_info)
                        
            return JsonResponse({'orders': live_orders_list})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)

@csrf_exempt
def update_order_status(request, order_id):
    print(f"\n--- Updating Order {order_id} ---")
    print(f"Method: {request.method}")
    
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            new_status = data.get('status')
            print(f"Requested Status: {new_status}")
            
            if not new_status:
                return JsonResponse({'error': 'No status provided'}, status=400)
                
            # Target the exact order ID and update only its 'status' field
            realtime_db.child('live_orders').child(order_id).update({'status': new_status})
            print("Successfully updated in Firebase!")
            
            return JsonResponse({'status': 'success'})
                
        except Exception as e:
            print("CRASH REASON:", str(e))
            return JsonResponse({'error': str(e)}, status=400)
            
    return JsonResponse({'error': 'Only POST allowed'}, status=405)

@csrf_exempt # Disables CSRF protection for this API endpoint during local testing
def place_order(request):
    if request.method == 'POST':
        try:
            # 1. Get the order data sent from JavaScript
            order_data = json.loads(request.body)
            
            # 2. Reference the 'live_orders' node in Realtime Database
            ref = realtime_db.child('live_orders')
            
            # 3. .push() generates a unique random ID and saves the data
            new_order_ref = ref.push(order_data)
            
            return JsonResponse({
                'status': 'success', 
                'message': 'Order sent to kitchen!',
                'order_id': new_order_ref.key
            })
            
        except Exception as e:
            print("CRASH REASON:", str(e))
            return JsonResponse({'error': str(e)}, status=400)
            
    return JsonResponse({'error': 'Only POST requests allowed'}, status=405)

def get_restaurant(request, restaurant_id):
    doc_ref = firestore_db.collection('restaurants').document(restaurant_id)
    doc = doc_ref.get()
    if doc.exists:
        return JsonResponse({"id": doc.id, **doc.to_dict()})
    return JsonResponse({'error': 'Restaurant not found'}, status=404)

def get_menu(request, restaurant_id):
    menu_ref = firestore_db.collection('restaurants').document(restaurant_id).collection('menu-items')
    docs = menu_ref.stream()
    
    items = []
    for doc in docs:
        items.append({"id": doc.id, **doc.to_dict()})
        
    return JsonResponse({'items': items})