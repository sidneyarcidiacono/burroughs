"""Package and module dependency imports."""
from flask import Flask
from flask_cors import CORS
from flask_pymongo import PyMongo
from server.config import Config

app = Flask(__name__)

app.config.from_object(Config)  # For environment setup

mongo = PyMongo(app)  # For database setup
db = mongo.db

CORS(app)  # To enable cross origin access from client to server

# Import blueprinted routes and register blueprints
# Blueprints may be a bit unecessary for the size of my API, but,
# I like the format

from server.main.routes import main

app.register_blueprint(main)
