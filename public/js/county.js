(function($) {
    $.QueryString = (function(a) {
        if (a == "") return {};
        var b = {};
        for (var i = 0; i < a.length; ++i)
        {
            var p=a[i].split('=', 2);
            if (p.length != 2) continue;
            b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
        }
        return b;
    })(window.location.search.substr(1).split('&'))
})(jQuery);

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

$.get('/data/counties.population.json', function (population) {
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