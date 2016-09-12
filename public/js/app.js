var fills = {
    'pop1': '#EDFED2',
    'pop2': '#FDFCBC',
    'pop3': '#F5FBA6',
    'pop4': '#FAF191',
    'pop5': '#F9DB7C',
    'pop6': '#F8BE67',
    'pop7': '#F79C52',
    'pop8': '#F6633D',
    'pop9': '#F54429',
    'pop10': '#F4151A'
};

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

$.get("data/state.population.json", function(stateData) {
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
