"""Package and module dependency imports."""
from flask import Flask
from flask_cors import CORS
from server.config import Config

app = Flask(__name__)

app.config.from_object(Config)  # For environment setup

# mongo = Pymongo(app)  # For database setup
# db = mongo.db

CORS(app)  # To enable cross origin access from client to server
