/* 
 * Custom Toast Service
 * Load toastr, customize the config, and make available to all controllers
 * Oct 29 - @fedora - this doesn't fucking work. i tore it up,
 * so may need ot be put back together.
 */
GiftStarterApp.service('Toast', ['$rootScope', 'toastr', Toast]);

function Toast($rootScope, toastr) {
    function(toastrConfig) {
        angular.extend(toastrConfig, {
            allowHtml: false,
            closeButton: true,
            closeHtml: '<button>&times;</button>',
            extendedTimeOut: 1000,
            iconClasses: {
                error: 'toast-error',
                info: 'toast-info',
                success: 'toast-success',
                warning: 'toast-warning'
            },
            messageClass: 'toast-message',
            onHidden: null,
            onShown: null,
            onTap: null,
            progressBar: false,
            tapToDismiss: true,
            timeOut: 5000,
            titleClass: 'toast-title',
            toastClass: 'toast'
        });
    };
}