/**
 * Created by stuart on 6/25/14.
 */

function getQueryVariable(variable)
{
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if(pair[0] == variable){return pair[1];}
    }
    return(false);
}

var oauthToken = getQueryVariable('oauth_token');
var oauthVerifier = getQueryVariable('oauth_verifier');

try {
    window.opener.twitterOauthCallback(oauthToken, oauthVerifier);
    window.close();
} catch(err) {
    console.log(err);
}

