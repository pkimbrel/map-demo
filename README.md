Map Demo
========

Where to get data?
------------------

Why, http://census.gov of course!

Go Geography -> Maps & Data -> TIGER Products -> TIGER/Line Shape Files

http://www.census.gov/geo/maps-data/data/tiger-line.html

But it's not that easy.  The population data comes with topography data, but it's
not topography data you want to show.  It's "real" boundries which doesn't include 
lake bounderies.  And it doesn't have a decent mapping between states and counties.

Fortunately, the county boundries can also be downloaded separately.

<strong>Census data:</strong><br>
https://www2.census.gov/geo/tiger/TIGER2010DP1/<br>
County_2010Census_DP1.zip

<strong>Topology data:</strong><br>
https://www.census.gov/geo/maps-data/data/cbf/cbf_counties.html<br>
cb_2015_us_county_5m.zip

Download those files to "raw/data" and unzip them there.

Map the Data
------------

`bin/extractCounties`

Filter/Reduce the Data
----------------------

`bin/reduceCounties`

Filter/Reduce the Topography Data
---------------------------------

`bin/reduceTopography`
