// Convert population to fillKey (found in the app.js)
function getFillKey(population) {
    var fillKey = "pop1";

    if (population >= 25000000) {
        fillKey = "pop10";
    } else if (population >= 20000000) {
        fillKey = "pop9";
    } else if (population >= 10000000) {
        fillKey = "pop8";
    } else if (population >= 5000000) {
        fillKey = "pop7";
    } else if (population >= 4000000) {
        fillKey = "pop6";
    } else if (population >= 3000000) {
        fillKey = "pop5";
    } else if (population >= 2000000) {
        fillKey = "pop4";
    } else if (population >= 1000000) {
        fillKey = "pop3";
    } else if (population >= 500000) {
        fillKey = "pop2";
    }

    return fillKey;
}

// Retrieve the state data
$.get("data/state.population.json", function(stateData) {
    // Build a reverse map to make it easier to show the name 
    // and population in the pop-up later
    var reverseMap = {};
    for (state in stateData) {
        var stateName = stateData[state].name;
        reverseMap[stateName] = stateData[state];
        reverseMap[stateName].abbr = state;

        // Add fillKey because that's visual data
        stateData[state].fillKey = getFillKey(stateData[state].population);
    }

    // Scope is "usa" because I'm lazy and using the built in AlbersUsa projection here
    var map = new Datamap({
        scope: 'usa',
        element: $("#map")[0],
        responsive: true,
        geographyConfig: {
            borderColor: '#444',
            popupTemplate: function(geography, data) {
                return '<div class="hoverinfo" style="text-align: center"><strong>' + geography.properties.name + '</strong><br>Population: ' + numberWithCommas(data.population) + '</div>';
            }
        },
        fills: fills,
        data: stateData,
        done: function(datamap) {
            datamap.svg.selectAll('.datamaps-subunit').on('click', function(geography) {
                window.location = "/county?state=" + reverseMap[geography.properties.name].abbr;
            });
        }
    });

    $(window).on('resize', function() {
        map.resize();
    });
});
