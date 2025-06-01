from flask import Flask, request, jsonify, session
from flask_cors import CORS
import os
import logging

logging.basicConfig(level=logging.INFO)

app = Flask(__name__)
app.secret_key = os.environ.get('SECRET_KEY')
CORS(app, supports_credentials=True)

PASSWORD = os.environ.get('PASSWORD')

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    password = data.get('password', '')
    logging.info(f"Received password: {password}")
    if password == PASSWORD:
        session['logged_in'] = True
        logging.info("Login successful")
        return jsonify({'success': True}), 200
    else:
        session['logged_in'] = False
        logging.info("Login failed")
        return jsonify({'success': False, 'error': 'Incorrect password'}), 401

@app.route('/check', methods=['GET'])
def check():
    return jsonify({'logged_in': session.get('logged_in', False)})

@app.route('/')
def index():
    return 'Backend running.'

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)
