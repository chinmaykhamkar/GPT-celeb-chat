from flask import Flask, request
import json
import requests
import os

app = Flask(__name__)

@app.route('/', methods=['GET'])
def index():
    return 'Hello World'

@app.route('/update_url', methods=['POST'])
def update_file():
    file_path = './url.txt'
    data = request.json
    download_file(data['url'])
    return 'File updated successfully.'

def download_file(url):
    response = requests.get(url)
    file_name = 'audio.wav'
    file_path = os.path.join(app.root_path, file_name)
    with open(file_path, 'wb') as f:
        f.write(response.content)

@app.route('/get_audio')
def get_audio():    
    audio_path = '/audio.wav'    
    return send_file(audio_path, mimetype='audio/mp3', as_attachment=True, attachment_filename='audio.wav')

if __name__ == "__main__":
    app.run(host='127.0.0.1', port=8080, debug=True)
