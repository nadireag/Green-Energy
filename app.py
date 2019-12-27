# import dependencies
import os

import pandas as pd
import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy




app = Flask(__name__)




@app.route("/")
def landing_page():

    return render_template("index.html")





@app.route("/index.html")
def index():

    return render_template("index.html")

        



@app.route("/map.html")
def map():

    return render_template("map.html")





@app.route("/plots.html")
def plots():

    return render_template("plots.html")




if __name__ == "__main__":
    app.run(debug=True)