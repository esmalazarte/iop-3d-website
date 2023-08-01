// This file contains components used for displaying content from the CMS onto the scene

// UP Color Scheme + other combinations
const colorScheme = {
    upmaroon: "#8e1537",
    forestgreen: "#00573f",
    gold: "#ffb81c",
    darkgray: "#4D4457",
    offwhite: "#F6F7EB",
    lightbrown: "#7C6F6A",
    cyan: "#49A3B7"
}
  
// Given a URL to a specific Post ID in WordPress, display its content on a plane.
// IMPORTANT: Must be a child of a "container" e.g. a background screen or plane
// Limitations: Only processes text. Images are inconsistent in geometry
// Sample URL: https://samplewordpress.com/index.php/wp-json/wp/v2/posts/1
// Attach to an a-entity e.g. <a-entity postview="url: <post url>">
AFRAME.registerComponent('postview', {
    schema: {
        url: {type: 'string', default: ''},
        width: {type: 'int', default: 5},
        wrapCount: {type: 'int', default: 60},
        bgColor: {default: colorScheme.darkgray},
        textColor: {default: colorScheme.offwhite},
        font: {default: 'sourcecodepro'}
    },

    init: async function () {
        // Fetch post from CMS
        let response = await fetch(this.data.url);
        let post = await response.json();

        // Set text properties and value (Title + Text-only Content)
        this.el.setAttribute('text', {
            font: this.data.font,
            color: this.data.textColor,
            wrapCount: this.data.wrapCount,
            width: this.data.width,
            baseline: 'top',
            zOffset: 0.005,
            value: post.title.rendered + '\n' + post.content.rendered.replace(/<[^<>]*>/g, '').replace(/\n{3,}/g, '\n\n'),
        });

        // Set position to near top of container screen
        let container = this.el.parentElement;
        this.el.object3D.position.y = container.getAttribute('geometry').height / 2.25
    },
});

// Adds scroll controls to the post view i.e. click arrow buttons to scroll
// IMPORTANT: Previous sibling must be an entity with the 'postview' component
// Attach to an a-entity right after to a postview
AFRAME.registerComponent('scrollcontrols', {
    init: function () {
        // Get reference to post viewport
        let post = this.el.previousElementSibling;
    
        // Initialize scroll entities
        let scrollUp = document.createElement('a-circle');
        let scrollUpArrow = document.createElement('a-text');
        let scrollDown = document.createElement('a-circle');
        let scrollDownArrow = document.createElement('a-text');
    
        // Sync values to postview
        let xoffset = post.getAttribute('postview').width / 2 + 1;
        let arrowBGcolor = post.getAttribute('postview').bgColor;
        let arrowcolor = post.getAttribute('postview').textColor;
    
        // Scroll button properties (static)
        scrollUp.setAttribute('radius', '0.5');
        scrollUp.setAttribute('color', arrowBGcolor);
        scrollUpArrow.setAttribute('value', '>');
        scrollUpArrow.setAttribute('color', arrowcolor);
        scrollUpArrow.setAttribute('position', '-0.06 -0.4 0.005');
        scrollUpArrow.setAttribute('rotation', '0 0 90');
        scrollUpArrow.setAttribute('scale', '5 5 5');
        scrollUp.setAttribute('position', xoffset + ' 0.75 0');
    
        scrollDown.setAttribute('radius', '0.5');
        scrollDown.setAttribute('color', arrowBGcolor);
        scrollDownArrow.setAttribute('value', '<');
        scrollDownArrow.setAttribute('color', arrowcolor);
        scrollDownArrow.setAttribute('position', '-0.06 -0.4 0.005');
        scrollDownArrow.setAttribute('rotation', '0 0 90');
        scrollDownArrow.setAttribute('scale', '5 5 5');
        scrollDown.setAttribute('position', xoffset + ' -0.75 0');
    
        // Moves post's y position depending on button click
        scrollUp.addEventListener('click', function(){
            post.object3D.position.y -= 1
        })
    
        scrollDown.addEventListener('click', function(){
            post.object3D.position.y += 1
        })
    
        // Add to scene
        scrollUp.appendChild(scrollUpArrow);
        scrollDown.appendChild(scrollDownArrow);
        this.el.appendChild(scrollUp);
        this.el.appendChild(scrollDown);
    },
});