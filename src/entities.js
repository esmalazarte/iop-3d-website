// This file declares components that can be attached to an a-entity to be used as custom entities

// Creates a rotating sphere with the UPOU logo that can be used as a centerpiece
// Make sure to define the image to be displayed in the <a-assets> section first
// Attach to an a-entity e.g. <a-entity centerpiece></a-entity>
AFRAME.registerComponent('centerpiece', {
    schema: {
        image1: {type: 'string', default: '#header'},
        image2: {type: 'string', default: '#header'},
    },

    init: function () {
        let rotatingElement = document.createElement('a-entity');
        let curvedimage1 = document.createElement('a-cylinder');
        let curvedimage2 = document.createElement('a-cylinder');
        let innerSphere = document.createElement('a-sphere');
        let base = document.createElement('a-cylinder');

        rotatingElement.setAttribute('position', '0 2 0');
        rotatingElement.setAttribute('animation', {
            property: 'rotation',
            to: '0 360 0',
            dur: '100000',
            easing: 'linear',
            loop: 'true'
        });

        curvedimage1.setAttribute('material', {
            src: this.data.image1,
            side: 'double',
            transparent: 'true'
        });
        curvedimage1.setAttribute('open-ended', 'true');
        curvedimage1.setAttribute('rotation', '0 0 0');
        curvedimage1.setAttribute('theta-start', '10');
        curvedimage1.setAttribute('theta-length', '170')

        curvedimage2.setAttribute('material', {
            src: this.data.image2,
            side: 'double',
            transparent: 'true'
        });
        curvedimage2.setAttribute('open-ended', 'true');
        curvedimage2.setAttribute('rotation', '0 180 0');
        curvedimage2.setAttribute('theta-start', '10');
        curvedimage2.setAttribute('theta-length', '170');

        innerSphere.setAttribute('color', colorScheme.upmaroon);
        innerSphere.setAttribute('radius', '0.9');

        base.setAttribute('color', colorScheme.upmaroon);
        base.setAttribute('height', '0.5');

        rotatingElement.appendChild(curvedimage1);
        rotatingElement.appendChild(curvedimage2);
        rotatingElement.appendChild(innerSphere);

        this.el.appendChild(rotatingElement);
        this.el.appendChild(base);
    },
});

// Creates a rectangular box that functions as a rectangular room
// Different from a-box since this component can modify floor, ceiling, and wall colors
// Has a wall thickness of 0.5 unlike an a-box which has 0 thickness
// Usage: Attach to an a-entity and pass the necessary attributes
AFRAME.registerComponent('rectangle-room', {
    schema: {
        length: {type: 'int', default: 10},
        width: {type: 'int', default: 10},
        height: {type: 'int', default: 5},
        wall_color: {default: '#FFFFFF'},
        floor_color: {default: '#FFFFFF'},
        ceiling_color: {default: '#FFFFFF'}
    },

    init: function () {
        let el = this.el;
        let data = this.data;

        // Initialize floor, ceiling, and walls
        let floor = document.createElement('a-plane');
        let ceiling = document.createElement('a-plane');
        let wall_X1 = document.createElement('a-box');
        let wall_X2 = document.createElement('a-box');
        let wall_Z1 = document.createElement('a-box');
        let wall_Z2 = document.createElement('a-box');

        // Set attributes of floor
        floor.setAttribute('scale', data.length + ' ' + data.width + ' 0');
        floor.setAttribute('color', data.floor_color);
        floor.setAttribute('rotation', '-90 0 0');

        // Set attributes of ceiling
        ceiling.setAttribute('position', '0 ' + data.height + ' 0');
        ceiling.setAttribute('scale', data.length + ' ' + data.width + ' 0');
        ceiling.setAttribute('color', data.ceiling_color);
        ceiling.setAttribute('rotation', '90 0 0');

        // Set attributes of left wall
        wall_X1.setAttribute('position', data.length / -2  + ' ' + data.height / 2 + ' 0');
        wall_X1.setAttribute('scale', '0.5 ' + data.height + ' ' + data.width);
        wall_X1.setAttribute('color', data.wall_color);

        // Set attributes of right wall
        wall_X2.setAttribute('position', data.length / 2  + ' ' + data.height / 2 + ' 0');
        wall_X2.setAttribute('scale', '0.5 ' + data.height + ' ' + data.width);
        wall_X2.setAttribute('color', data.wall_color);

        // Set attributes of front wall
        wall_Z1.setAttribute('position', '0 ' + data.height / 2 + ' ' + data.width / -2);
        wall_Z1.setAttribute('scale', data.length + ' ' + data.height + ' ' + ' 0.5');
        wall_Z1.setAttribute('color', data.wall_color);

        // Set attributes of back wall
        wall_Z2.setAttribute('position', '0 ' + data.height / 2 + ' ' + data.width / 2);
        wall_Z2.setAttribute('scale', data.length + ' ' + data.height + ' ' + ' 0.5');
        wall_Z2.setAttribute('color', data.wall_color);

        // Add to a-entity element
        el.appendChild(floor);
        el.appendChild(ceiling);
        el.appendChild(wall_X1);
        el.appendChild(wall_X2);
        el.appendChild(wall_Z1);
        el.appendChild(wall_Z2);
    },
});