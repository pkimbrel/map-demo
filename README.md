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

What gets created?
------------------

Well, a bunch of raw "geojson" data gets generated under `raw/geojson`.  That's
temporary stuff.  You can nuke it.

The displayable stuff ends up in `public/data`:

~~~~
public/data/states.population.json - State population data
public/data/counties.population.json - County population data
public/data/counties - Topology data for the counties per states
~~~~

There is one special file:

~~~~
public/data/states.info.json
~~~~

That was a lovingly handcrafted state file.  I need to find a way to generate this.
