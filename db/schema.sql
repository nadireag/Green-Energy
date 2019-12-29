-- Database schema

DROP DATABASE IF EXISTS project2;
CREATE DATABASE project2;

DROP TABLE green_energy;

CREATE TABLE green_energy (
    id serial PRIMARY KEY,
    state character varying(30) NOT NULL,
    urban_solar numeric,
    rural_solar numeric,
    rooftop_solar numeric,
    csp_solar numeric,
    onshore_wind numeric,
    offshore_wind numeric,
    biopower_solid numeric,
    biopower_gaseous numeric,
    geotermal_hydrothermal numeric,
    egs_geothermal numeric,
    hydropower numeric,
    rank numeric,
    energy_consumption numeric,
    population numeric
);

select * from green_energy;