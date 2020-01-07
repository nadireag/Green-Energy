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

from dotenv import load_dotenv
load_dotenv()


# create the flask app
app = Flask(__name__, static_url_path="/static")

# get the heroku database url from environment
db_uri = os.environ["DATABASE_URL"]

# app configuration
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
    return render_template("map.html", API_KEY=os.environ["API_KEY"])

@app.route("/plots")
def plots():
    return render_template("plots.html")


# API routes
@app.route("/api/energy_comparison")
def get_energy_comparison_data():
    sel = [
        Energy_Comparison.rank,
        Energy_Comparison.state,
        Energy_Comparison.total_energy_consumed_gwh,
        Energy_Comparison.total_renewable,
        Energy_Comparison.energy_difference,
        Energy_Comparison.lattitude,
        Energy_Comparison.longitude
    ]

    results = db.session.query(*sel).all()

    # create a dictionary for each row of comparison data
    comparison_data = {
        
        "rank": [result[0] for result in results],
        "state": [result[1] for result in results],
        "total_energy_consumed_gwh" : [result[2] for result in results],
        "renewable_total" : [result[3] for result in results],
        "energy_difference" : [result[4] for result in results],
        "lat": [result[5] for result in results],
        "long":[result[6] for result in results]
    }
    # jsonify the dictionary
    return jsonify(comparison_data)


@app.route("/api/green_energy")
def get_green_energy_data():
    sel = [
        Green_Energy.id,
        Green_Energy.state,
        Green_Energy.urban_solar,
        Green_Energy.rural_solar,
        Green_Energy.rooftop_solar,
        Green_Energy.csp_solar,
        Green_Energy.onshore_wind,
        Green_Energy.offshore_wind,
        Green_Energy.biopower_solid,
        Green_Energy.biopower_gaseous,
        Green_Energy.geotermal_hydrothermal,
        Green_Energy.egs_geothermal,
        Green_Energy.hydropower,
        Green_Energy.rank,
        Green_Energy.energy_consumption,
        Green_Energy.population
    ]

    results = db.session.query(*sel).all()

    # create a dictionary for green energy data to format and send as jsonify
    green_energy_data = {
        
        "id": [result[0] for result in results],
        "state": [result[1] for result in results],
        "urban_solar": [result[2] for result in results],
        "rural_solar": [result[3] for result in results],
        "rooftop_solar": [result[4] for result in results],
        "csp_solar": [result[5] for result in results],
        "onshore_wind": [result[6] for result in results],
        "offshore_wind": [result[7] for result in results],
        "biopower_solid": [result[8] for result in results],
        "biopower_gaseous": [result[9] for result in results],
        "geotermal_hydrothermal": [result[10] for result in results],
        "egs_geothermal":[result[11] for result in results],
        "hydropower":[result[12] for result in results], 
        "rank": [result[13] for result in results],
        "energy_consumption": [result[14] for result in results],
        "population": [result[15] for result in results]
    }


    return jsonify(green_energy_data)

if __name__ == "__main__":
    app.run(debug=True)
