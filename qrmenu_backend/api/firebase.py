import os
import json
import sys
import firebase_admin
from firebase_admin import credentials, firestore, db

# choose service account: env var preferred, fallback to local file next to this script
key_path = os.environ.get('GOOGLE_APPLICATION_CREDENTIALS') or os.path.join(os.path.dirname(__file__), 'gcp-key.json')

if not os.path.exists(key_path):
    sys.exit(f"Service account file not found: {key_path}")

# basic validation of the JSON key
try:
    with open(key_path, 'r', encoding='utf-8') as fh:
        service_account = json.load(fh)
    if not service_account.get('client_email') or not service_account.get('private_key'):
        sys.exit("Invalid service account JSON: missing client_email or private_key.")
except Exception as e:
    sys.exit(f"Failed to read/parse service account JSON: {e}")

cred = credentials.Certificate(key_path)
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://digidine-ee170-default-rtdb.asia-southeast1.firebasedatabase.app/'
})

firestore_db = firestore.client()
realtime_db = db.reference('/')
