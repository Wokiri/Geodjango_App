# GEODJANGO APPLICATION

This is a GeoDjango App that shows the various relationships (spatial and otherwise) between offices of a given organization (theoratical) in Kenya.


## Concept and Requisites

Being a dynamic (geo)django app, this application requires a python run-time environment to test and to run.
It therefore requires an SQL database (preferably postgres to utilize the much power of postgis).
Now postgis is a Postgres extention that gives the database its spatial functionalities; these two must therefore be availed.

Also. django itself must be installed.

In the making of this app, I used Django version 3.1 and run it in a python 3.8.6 environment.

To display the spatial results processed in the packend, and to enable visualization and user interaction with maps, I used OpenLayers javascript library.
