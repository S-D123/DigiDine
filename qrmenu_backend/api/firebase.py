import os
import json
import sys
import firebase_admin
from firebase_admin import credentials, firestore, db
from dotenv import load_dotenv
load_dotenv()

def get_service_account_from_env():
    # Map to expected JSON keys
    mapping = {
        "type": "GOOGLE_TYPE",
        "project_id": "GOOGLE_PROJECT_ID",
        "private_key_id": "GOOGLE_PRIVATE_KEY_ID",
        "private_key": "GOOGLE_PRIVATE_KEY",
        "client_email": "GOOGLE_CLIENT_EMAIL",
        "client_id": "GOOGLE_CLIENT_ID",
        "auth_uri": "GOOGLE_AUTH_URI",
        "token_uri": "GOOGLE_TOKEN_URI",
        "auth_provider_x509_cert_url": "GOOGLE_AUTH_PROVIDER_X509_CERT_URL",
        "client_x509_cert_url": "GOOGLE_CLIENT_X509_CERT_URL",
        "universe_domain": "GOOGLE_UNIVERSE_DOMAIN"
    }
    
    json_dict = {}
    for json_key, env_key in mapping.items():
        val = os.environ.get(env_key)
        if val:
            if json_key == "private_key":
                # Strip leading/trailing quotes and replace escaped newlines
                val = val.strip().strip('\'"').replace('\\n', '\n')
            json_dict[json_key] = val
            
    return json_dict

# Try to get credentials from env, fallback to file if not present
if os.environ.get("GOOGLE_CLIENT_EMAIL") and os.environ.get("GOOGLE_PRIVATE_KEY"):
    service_account = get_service_account_from_env()
    cred = credentials.Certificate(service_account)
else:
    key_path = os.environ.get('GOOGLE_APPLICATION_CREDENTIALS') or os.path.join(os.path.dirname(__file__), 'gcp-key.json')
    if not os.path.exists(key_path):
        sys.exit(f"Service account file not found: {key_path}")
    cred = credentials.Certificate(key_path)

firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://digidine-ee170-default-rtdb.asia-southeast1.firebasedatabase.app/'
})

firestore_db = firestore.client()
realtime_db = db.reference('/')