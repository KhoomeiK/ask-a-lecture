import os, config
from flask import Flask, session, request
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

app.config.from_pyfile('../config.py') 
db = SQLAlchemy(app)

import backend.views
