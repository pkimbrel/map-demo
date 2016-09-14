// Convert population to fillKey (found in the app.js)
function getFillKey(population) {
    var fillKey = "pop1";
    if (population >= 4000000) {
        fillKey = "pop10";
    } else if (population >= 1000000) {
        fillKey = "pop9";
    } else if (population >= 800000) {
        fillKey = "pop8";
    } else if (population >= 600000) {
        fillKey = "pop7";
    } else if (population >= 400000) {
        fillKey = "pop6";
    } else if (population >= 100000) {
        fillKey = "pop5";
    } else if (population >= 50000) {
        fillKey = "pop4";
    } else if (population >= 20000) {
        fillKey = "pop3";
    } else if (population >= 10000) {
        fillKey = "pop2";
    }

    return fillKey;
}

var year = $.QueryString.year;
if (year === undefined) {
    year = 2010
}

$.get('/data/counties.population.range.json', function (allPopulation) {
    var population = allPopulation[year];
    for (county in population) {
        // Add fillKey because that's visual data
        population[county].fillKey = getFillKey(population[county].population);
    }

    $.get("/data/states.info.json", function(stateData) {
        var state = $.QueryString.state;
        var stateInfo = stateData[state];
        var stateUrl = "/data/topology/counties/" + state + ".topo.json";

        var map = new Datamap({
            scope: state,
            element: $("#map")[0],
            responsive: true,
            geographyConfig: {
                dataUrl: stateUrl,
                borderColor: '#444',
                popupTemplate: function(geography, data) {
                    return '<div class="hoverinfo" style="text-align: center"><strong>' + geography.properties.name + '</strong><br>Population: ' + numberWithCommas(data.population) + '</div>';
                }
            },
            fills: fills,
            data: population,
            setProjection: function(element, options) {
                var scaleFactor = stateInfo.scale;

                if (scaleFactor === undefined) {
                    scaleFactor = 4;
                }

                var projection, path;
                projection = d3.geo.mercator()
                    .center([stateInfo.center.longitude, stateInfo.center.latitude - 1])
                    .scale(element.offsetWidth * scaleFactor)
                    .translate([element.offsetWidth / 2, element.offsetHeight / 2]);

                path = d3.geo.path()
                    .projection( projection );

                return {path: path, projection: projection};
                }
        });

        $(window).on('resize', function() {
            map.resize();
        });
    });
});