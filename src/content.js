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
// Sample URL: https://samplewordpress.com/index.php/wp-json/wp/v2/posts/1
// Attach to an a-entity e.g. <a-entity postview="url: <post url>">
AFRAME.registerComponent('postview', {
    schema: {
        url: {type: 'string', default: ''},
        width: {type: 'int', default: 10},
        bgColor: {default: colorScheme.darkgray},
        textColor: {default: colorScheme.offwhite},
        font: {default: 'sourcecodepro'}
    },

    init: async function () {
        let response = await fetch(this.data.url);
        let post = await response.json();

        this.el.setAttribute('geometry', {
            primitive: 'plane',
            height: 'auto',
            width: this.data.width
        });

        this.el.setAttribute('material', {
            color: this.data.bgColor
        });

        this.el.setAttribute('text', {
            font: this.data.font,
            color: this.data.textColor,
            zOffset: 0.005,
            value: post.title.rendered + '\n' + post.content.rendered.replace(/<[^<>]*>/g, '').replace(/\n{3,}/g, '\n\n'),
        });
    },
});