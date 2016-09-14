// Fill colors 
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

// Query parameter extraction plugin
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

// Convenience function to format a big number
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

