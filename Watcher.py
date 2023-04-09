from googleapiclient.errors import HttpError
from googleapiclient.discovery import build
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
import json
import os

# Set up the Google Drive API client
SCOPES = ['https://www.googleapis.com/auth/drive']
creds = None
if os.path.exists('token.json'):
    creds = Credentials.from_authorized_user_file('token.json', SCOPES)
if not creds or not creds.valid:
    if creds and creds.expired and creds.refresh_token:
        creds.refresh(Request())
    else:
        flow = InstalledAppFlow.from_client_secrets_file(
            'client_secret.json', SCOPES)
        creds = flow.run_local_server(port=0)
    # Save the credentials for the next run
    with open('token.json', 'w') as token:
        token.write(creds.to_json())
service = build('drive', 'v3', credentials=creds)

# Set up the watch request
file_id = '1_tW5JuFDcIm04oMRv7lY0oxdiKqjFO5O'
url = 'https://localhost:8080/'
body = {
    'id': 'myFile',
    'type': 'web_hook',
    'address': url,
}
try:
    watch = service.files().watch(fileId=file_id, body=body).execute()
    print(json.dumps(watch, indent=2))
except HttpError as error:
    print(f'An error occurred: {error}')