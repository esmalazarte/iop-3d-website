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

AFRAME.registerComponent('detect-ua', {
    init: function () {
      var el = this.el;

      if (AFRAME.utils.device.isMobile()) {
        // Add appropriate movement controls for mobile devices (touchscreen)
        el.setAttribute('movement-controls', 'controls: keyboard, nipple');
        el.setAttribute('nipple-controls', 'mode: static; lookJoystickEnabled: false; moveJoystickPosition: left');
      } else {
        // Otherwise, fall back on just keyboard movement controls
        el.setAttribute('movement-controls', 'controls: keyboard');
      }
    },
});