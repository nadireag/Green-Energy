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

import psycopg2
import sys

import simplejson


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



@app.route("/data")
def jsonify_data():

    con = psycopg2.connect("host='ec2-107-21-214-26.compute-1.amazonaws.com' dbname='d2h03dui2ottoc' user='zofuoyzecnqaev' password='d3eb573f21fa96d331efb6cdbd41a1de7720a22a36aafd44c90e728bbefabf76'")  
    cur = con.cursor()
    cur.execute("""select * from green_energy""")
    data = [col for col in cur]
    cur.close()
    return jsonify(data)




if __name__ == "__main__":
    app.run(debug=True)