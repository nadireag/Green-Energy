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
@app.route("/api/energy_comparison")
def get_energy_comparison_data():
    sel = [
        Energy_Comparison.rank,
        Energy_Comparison.state,
        Energy_Comparison.total_energy_consumed_gwh,
        Energy_Comparison.total_renewable,
        Energy_Comparison.energy_difference
    ]

    results = db.session.query(*sel).all()

    return jsonify(results)


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

    return jsonify(results)

if __name__ == "__main__":
    app.run(debug=True)