// This file contains scripts for navigation e.g. redirecting to other sites, movement controls, etc


// Redirects the browser to the URL passes to it
// Usage: Attach to any entity and pass the url attribute
AFRAME.registerComponent('url-on-click', {
  schema: {
    url: { type: 'string', default: '' }
  },

  init: function () {
    let el = this.el;
    let data = this.data;

    el.setAttribute('event-set__click', '_target: #blink; _event: click; animation.property: opacity; animation.to: 1; animation.dur: 1000; animation.easing: easeOutQuart; animation.delay: 300');

    el.addEventListener('click', function () {
      setTimeout(function () {
        el.sceneEl.exitVR();
        window.location.href = data.url;
      }, 1000);
    });
  }
});

AFRAME.registerComponent('button-press', {
  init: function () {
    var el = this.el;

    el.addEventListener('click', function () {
      el.components.sound.playSound();
    });
  }
});


AFRAME.registerComponent('detect-ua', {
  init: function () {
    var el = this.el;
    var scene = document.querySelector("a-scene");
    var checkpoints = document.querySelector("#checkpoints");

    // Cursors
    var cursor = document.querySelector("#cursor");
    var mouseCursor = document.querySelector("#mouseCursor");
    var interactionCursor = document.querySelector("#interactionCursor");
    var interactionMouseCursor = document.querySelector("#interactionMouseCursor");

    if (AFRAME.utils.device.isMobile()) {
      // Add appropriate movement controls for mobile devices (touchscreen)
      el.setAttribute('movement-controls', 'controls: keyboard, checkpoint, nipple; constrainToNavMesh: true');
      el.setAttribute('nipple-controls', 'mode: static; lookJoystickEnabled: true; moveJoystickPosition: left');
      // Add components for checkpoint movement
      el.setAttribute('checkpoint-controls', 'mode: animate; animateSpeed: 13.0');
      el.setAttribute('event-set__start', '_target: #blink; _event: navigation-start; animation.property: opacity; animation.to: 1; animation.dur: 150; animation.easing: easeOutQuart');
      el.setAttribute('event-set__end', '_target: #blink; _event: navigation-end; animation.to: 0');
      /*
      Gaze-based interactions note:
      Unless explicitly set to false, a-cursor fuses by default when on a mobile device
      */
      // Disable cursor and enable screen touch interactions by default
      cursor.object3D.visible = false;
      cursor.setAttribute('raycaster', 'objects: .disabled');
      // Enable cursor when entering vr, and vice-versa
      scene.addEventListener('enter-vr', function () {
        cursor.object3D.visible = true;
        cursor.setAttribute('raycaster', 'objects: .clickable');
      });
      scene.addEventListener('exit-vr', function () {
        cursor.object3D.visible = false;
        cursor.setAttribute('raycaster', 'objects: .disabled');
      });
    } else if (AFRAME.utils.device.checkHeadsetConnected()) {
      // If the user is using a VR headset, use the appropriate controls
      cursor.remove();
      mouseCursor.remove();
      interactionCursor.remove();
      el.setAttribute('movement-controls', 'controls: keyboard, checkpoint; constrainToNavMesh: true');
      // Add components for checkpoint movement
      el.setAttribute('checkpoint-controls', 'mode: animate; animateSpeed: 13.0');
      el.setAttribute('event-set__start', '_target: #blink; _event: navigation-start; animation.property: opacity; animation.to: 1; animation.dur: 150; animation.easing: easeOutQuart');
      el.setAttribute('event-set__end', '_target: #blink; _event: navigation-end; animation.to: 0');
    } else {
      // Otherwise, fall back on just keyboard movement controls
      mouseCursor.remove();
      el.setAttribute('movement-controls', 'controls: keyboard; constrainToNavMesh: true');
      // Remove checkpoints from the scene
      while (checkpoints.hasChildNodes()) {
        checkpoints.removeChild(checkpoints.firstChild);
      }
    }

  }
});

AFRAME.registerComponent('footsteps', {
  init: function () {
    var el = this.el;

    el.addEventListener('navigation-start', function () {
      el.components.sound.playSound();
    });
  }
});

AFRAME.registerComponent('overlay', {
  init: function () {
    var el = this.el;

    el.sceneEl.renderer.sortObjects = false;
    el.components.material.material.depthTest = false;
  }
});

AFRAME.registerComponent('tp-destination', {
  schema: {
    type: 'vec3'
  }
});

AFRAME.registerComponent('tp-rotation', {
  schema: {
    type: 'vec3'
  }
});

AFRAME.registerComponent('teleport', {
  schema: {
    pos: {type: 'vec3', default: {x: 0, y: 0, z: 0}},
    rot: {type: 'vec3'}
  },

  init: function () {
    // Do something when component first attached.
    var el = this.el;
    var data = this.data;
    var cameraRig = document.querySelector("#rig");

    el.setAttribute('event-set__click', '_target: #blink; _event: click; animation.property: opacity; animation.to: 1; animation.dur: 1000; animation.easing: easeOutQuart; animation.delay: 300');

    el.addEventListener('click', function () {
      setTimeout(function () {
        // cameraRig.setAttribute('position', tpDestination);
        // cameraRig.setAttribute('rotation', tpRotation);
        cameraRig.setAttribute('position', data.pos);
        cameraRig.setAttribute('rotation', data.rot);
        el.emit('animationend');
      }, 1000);
    });

    el.setAttribute('event-set__end', '_target: #blink; _event: animationend; animation.to: 0');
  }
});
