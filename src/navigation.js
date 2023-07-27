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
      var cursor = document.querySelector("#cursor");
      var checkpoints = document.querySelector("#checkpoints");

      if (AFRAME.utils.device.isMobile()) {
        // Add appropriate movement controls for mobile devices (touchscreen)
        el.setAttribute('movement-controls', 'controls: keyboard, nipple; constrainToNavMesh: true');
        el.setAttribute('nipple-controls', 'mode: static; lookJoystickEnabled: false; moveJoystickPosition: left');
      } else if (AFRAME.utils.device.checkHeadsetConnected()) {
        // If the user is using a VR headset, remove the cursor
        cursor.remove();
        el.setAttribute('movement-controls', 'controls: keyboard, checkpoint; constrainToNavMesh: true');
        // Add components for checkpoint movement
        el.setAttribute('checkpoint-controls', 'mode: animate; animateSpeed: 13.0');
        el.setAttribute('event-set__start', '_target: #blink; _event: navigation-start; animation.property: opacity; animation.to: 1; animation.dur: 150; animation.easing: easeOutQuart');
        el.setAttribute('event-set__end', '_target: #blink; _event: navigation-end; animation.to: 0');
      } else {
        // Otherwise, fall back on just keyboard movement controls
        el.setAttribute('movement-controls', 'controls: keyboard; constrainToNavMesh: true');
        // Remove checkpoints from the scene
        while (checkpoints.hasChildNodes()) {
          checkpoints.removeChild(checkpoints.firstChild);
        }
      }
    },
});

AFRAME.registerComponent('footsteps', {
  init: function () {
    // Do something when component first attached.
    var el = this.el;

    el.addEventListener('navigation-start', function () {
      el.components.sound.playSound();
    });
  }
});