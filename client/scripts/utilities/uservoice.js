/**
 * Created by Stuart on 11/13/14.
 */

// Include the UserVoice JavaScript SDK (only needed once on a page)
UserVoice=window.UserVoice||[];(function(){var uv=document.createElement('script');uv.type='text/javascript';uv.async=true;uv.src='//widget.uservoice.com/N48EEGX3xi555mzpZNQw.js';var s=document.getElementsByTagName('script')[0];s.parentNode.insertBefore(uv,s)})();

// Set colors
UserVoice.push(['set', {
    accent_color: '#e23a39',
    trigger_color: 'white',
    trigger_background_color: '#df484b'
}]);

// Identify the user and pass traits
// To enable, replace sample data with actual user traits and uncomment the line
UserVoice.push(['identify', {}]);

// Autoprompt for Satisfaction and SmartVote (only displayed under certain conditions)
UserVoice.push(['autoprompt', {}]);