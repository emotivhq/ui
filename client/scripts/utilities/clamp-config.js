var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
var viewMores,
    campaignTitles;
function clampText() {
     viewMores = document.querySelectorAll('.usercampaign__list, useridea__productlist');
     campaignTitles = document.querySelectorAll('.usercampaign__itemstitle, .useridea__producttitle');
    if (campaignTitles) {
        function cropText() {
            [].forEach.call(campaignTitles, function(title) {
                clamp(title, 2);
            });
        }
        cropText();
    }
    if(viewMores) {
        // create an observer instance
        var observer = new MutationObserver(function(mutations) {
          mutations.forEach(function() {
            campaignTitles = document.querySelectorAll('.usercampaign__itemstitle, .useridea__producttitle');
            cropText();
          });
        });
        // configuration of the observer:
        var config = { attributes: false, childList: true, characterData: true };
        // pass in the target node, as well as the observer options
        [].forEach.call(viewMores, function(viewMore) {
            observer.observe(viewMore, config);
        });
    }
}

window.addEventListener('load', clampText);
window.addEventListener('resize', clampText);





