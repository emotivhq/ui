/* 
 * Custom Toast Module 
 * Load toastr, customize the config. 
 * Oct 29 - @fedora - this doesn't fucking work. i tore it up, 
 * so may need ot be put back together.
*/
var toast = angular.module('toast', ['toastr'])

toast.config(['toastr']);


/* 
 * ********
 * To configure the container - modify the toastrConfig:
 * ********
.config(function (toastrConfig) {
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
        templates: {
            toast: 'directives/toast/toast.html',
            progressbar: 'directives/progressbar/progressbar.html'
        },
        timeOut: 5000,
        titleClass: 'toast-title',
        toastClass: 'toast'
    });    
});
*/