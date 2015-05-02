function loadHandler() {
    var titles = document.querySelectorAll('.usercampaign__itemstitle, ');
    [].forEach.call(titles, function(title) {
         $clamp(title, {clamp: 2});
    });
}

window.addEventListener('load', loadHandler);
window.addEventListener('resize', loadHandler);