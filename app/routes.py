# app/routes.py
from flask import render_template, request
from . import app

@app.route('/')
def index():
    return render_template('index.html')
import random
import string
from flask import render_template, request
from . import app

def generate_password(length, include_numbers, include_special):
    chars = string.ascii_letters  # A-Z, a-z
    if include_numbers:
        chars += string.digits  # 0-9
    if include_special:
        chars += string.punctuation  # Special characters like !@#

    password = ''.join(random.choice(chars) for _ in range(length))
    return password

@app.route('/', methods=['GET', 'POST'])
def index():
    password = None
    if request.method == 'POST':
        length = int(request.form['length'])
        include_numbers = 'include_numbers' in request.form
        include_special = 'include_special' in request.form
        password = generate_password(length, include_numbers, include_special)

    return render_template('index.html', password=password)

