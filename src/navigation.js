// This file contains scripts for navigation e.g. redirecting to other sites, movement controls, etc


// Redirects the browser to the URL passes to it
// Usage: Attach to any entity and pass the url attribute
AFRAME.registerComponent('url-on-click', {
    schema: {
        url: {type: 'string', default: '' }
    },
    
    init: function () {
        let el = this.el;
        let data = this.data;
        
        el.addEventListener('click', function () {
            window.location.href = data.url;
        });
    }
});