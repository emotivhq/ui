/**
 * Created by stuart on 7/3/14.
 */

var authResponse = (function(a) {
    if (a == "") return {};
    var b = {};
    for (var i = 0; i < a.length; ++i)
    {
        var p=a[i].split('=');
        if (p.length != 2) continue;
        b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
    }
    return b;
})(window.location.search.substr(1).split('&'));

try {
    window.opener.googlePlusCallback(authResponse);
    window.close();
} catch(err) {
    console.log(err);
}
