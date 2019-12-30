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

import json
from decimal import Decimal

from config import HEROKU_PG_URI

app = Flask(__name__)

db_uri = HEROKU_PG_URI

# app config
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = db_uri

# db setup
db = SQLAlchemy(app)

# reflect an existing database into a new model
Base = automap_base()

# reflect the tables
Base.prepare(db.engine, reflect=True)

# Save references to each table
Energy_Comparison = Base.classes.energy_comparison
Green_Energy = Base.classes.green_energy


# View routes
@app.route("/")
def landing_page():
    return render_template("index.html")

@app.route("/map")
def map():
    return render_template("map.html")

@app.route("/plots")
def plots():
    return render_template("plots.html")


# API routes
@app.route("/api/energy_comparison/<rank>")
def get_energy_comparison_data(rank):
    sel = [
        Energy_Comparison.rank,
        Energy_Comparison.state,
        Energy_Comparison.total_energy_consumed_gwh,
        Energy_Comparison.total_renewable,
        Energy_Comparison.energy_difference
    ]

    results = db.session.query(*sel).filter(Energy_Comparison.rank == rank).all()

    # Create a dictionary entry for each row of metadata information
    energy_comparison = {}
    for result in results:
        # rank = Decimal(result[0])
        json.dumps( { 'rank': float(result[0]) } )
        energy_comparison["rank"] = rank
        energy_comparison["state"] = result[0]
        energy_comparison["total_energy_consumed_gwh"] = result[2]
        energy_comparison["total_renewable"] = result[3]
        energy_comparison["energy_difference"] = result[4]

    return jsonify(energy_comparison)



if __name__ == "__main__":
    app.run(debug=True)