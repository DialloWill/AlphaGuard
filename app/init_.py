# app/__init__.py
from flask import Flask

app = Flask(__name__)

# Import the routes after app initialization
from . import routes
