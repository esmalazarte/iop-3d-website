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

// Opens a new browser window to the URL passed to it
// Usage: Attach to any entity and pass the url attribute
AFRAME.registerComponent('url-on-click-window', {
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
        window.open(data.url);
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

    // // Remove checkpoints from the scene
    // while (checkpoints.hasChildNodes()) {
    //   checkpoints.removeChild(checkpoints.firstChild);
    // }

    if (AFRAME.utils.device.isMobile()) {
      // Add appropriate movement controls for mobile devices (touchscreen)
      el.setAttribute('movement-controls', 'controls: keyboard, checkpoint, nipple; constrainToNavMesh: false');
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
      el.setAttribute('position', '0 0.6 0');
      el.setAttribute('movement-controls', 'controls: keyboard, trackpad, gamepad, checkpoint; constrainToNavMesh: true');
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

    // REMOVE CHECKPOINTS FOR ALL CASES
    // Remove checkpoints from the scene
    while (checkpoints.hasChildNodes()) {
      checkpoints.removeChild(checkpoints.firstChild);
    }

    // // Add components for checkpoint movement
    // el.setAttribute('checkpoint-controls', 'mode: animate; animateSpeed: 13.0');
    // el.setAttribute('event-set__start', '_target: #blink; _event: navigation-start; animation.property: opacity; animation.to: 1; animation.dur: 150; animation.easing: easeOutQuart');
    // el.setAttribute('event-set__end', '_target: #blink; _event: navigation-end; animation.to: 0');

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
        // cameraRig.setAttribute('rotation', data.rot);
        el.emit('animationend');
      }, 1000);
    });

    el.setAttribute('event-set__end', '_target: #blink; _event: animationend; animation.to: 0');
  }
});

AFRAME.registerComponent('model-opacity', {
  schema: {default: 1.0},
  init: function () {
    this.el.addEventListener('model-loaded', this.update.bind(this));
  },
  update: function () {
    var mesh = this.el.getObject3D('mesh');
    var data = this.data;
    if (!mesh) { return; }
    mesh.traverse(function (node) {
      if (node.isMesh) {
        node.material.opacity = data;
        node.material.transparent = data < 1.0;
        node.material.needsUpdate = true;
      }
    });
  }
});

AFRAME.registerComponent('diorama', {
    init: function () {
        let dioramamodel = document.createElement("a-entity");
        let lobbyBtn = document.createElement("a-box");
        let pubsBtn = document.createElement("a-box");
        let iscoBtn = document.createElement("a-box");
        let projsBtn = document.createElement("a-box");
        let aboutBtn = document.createElement("a-box");
        
        dioramamodel.setAttribute("gltf-model", "#diorama");
        dioramamodel.setAttribute("scale", "0.02 0.02 0.02");

        lobbyBtn.setAttribute("class", "clickable");
        lobbyBtn.setAttribute("color", "red");
        lobbyBtn.setAttribute("event-set__enter", "_event: mouseenter; color: green");
        lobbyBtn.setAttribute("event-set__leave" , "_event: mouseleave; color: red");
        lobbyBtn.setAttribute("scale", "0.07 0.2 0.07");
        lobbyBtn.setAttribute("position", "0.07 0.01 -0.055");
        lobbyBtn.setAttribute("teleport", "pos: 2.75 0 -2.8");

        pubsBtn.setAttribute("class", "clickable");
        pubsBtn.setAttribute("color", "red");
        pubsBtn.setAttribute("event-set__enter", "_event: mouseenter; color: green");
        pubsBtn.setAttribute("event-set__leave" , "_event: mouseleave; color: red");
        pubsBtn.setAttribute("scale", "0.07 0.2 0.07");
        pubsBtn.setAttribute("position", "-0.3 0.01 -0.075");
        pubsBtn.setAttribute("teleport", "pos: -15.3 0 -2.75");

        iscoBtn.setAttribute("class", "clickable");
        iscoBtn.setAttribute("color", "red");
        iscoBtn.setAttribute("event-set__enter", "_event: mouseenter; color: green");
        iscoBtn.setAttribute("event-set__leave" , "_event: mouseleave; color: red");
        iscoBtn.setAttribute("scale", "0.07 0.2 0.07");
        iscoBtn.setAttribute("position", "-0.25 0.01 0.235");
        iscoBtn.setAttribute("teleport", "pos: -12.4 0 10.5");

        projsBtn.setAttribute("class", "clickable");
        projsBtn.setAttribute("color", "red");
        projsBtn.setAttribute("event-set__enter", "_event: mouseenter; color: green");
        projsBtn.setAttribute("event-set__leave" , "_event: mouseleave; color: red");
        projsBtn.setAttribute("scale", "0.07 0.2 0.07");
        projsBtn.setAttribute("position", "-0.0001 0.01 0.285");
        projsBtn.setAttribute("teleport", "pos: 0.2 0 13");

        aboutBtn.setAttribute("class", "clickable");
        aboutBtn.setAttribute("color", "red");
        aboutBtn.setAttribute("event-set__enter", "_event: mouseenter; color: green");
        aboutBtn.setAttribute("event-set__leave" , "_event: mouseleave; color: red");
        aboutBtn.setAttribute("scale", "0.07 0.2 0.07");
        aboutBtn.setAttribute("position", "0.32 0.01 0.07");
        aboutBtn.setAttribute("teleport", "pos: 15.5 0 3.5");

        this.el.appendChild(dioramamodel);
        this.el.appendChild(lobbyBtn);
        this.el.appendChild(pubsBtn);
        this.el.appendChild(iscoBtn);
        this.el.appendChild(projsBtn);
        this.el.appendChild(aboutBtn);
    },
});
