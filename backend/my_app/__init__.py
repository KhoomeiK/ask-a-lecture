import os, config
from flask import Flask, session, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)

cors = CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

app.config.from_pyfile('../config.py') 
db = SQLAlchemy(app)

import my_app.views
