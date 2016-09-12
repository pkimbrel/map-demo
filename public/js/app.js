$.get("data/states.info.json", function(stateData) {
    var reverseMap = {};
    for (state in stateData) {
        var stateName = stateData[state].name;
        reverseMap[stateName] = stateData[state];
        reverseMap[stateName].abbr = state;
    }
    var map = new Datamap({
        scope: 'usa',
        element: $("#map")[0],
        responsive: true,
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
