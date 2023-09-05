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

function filterText(text){
    text = text.replace(/<style>.*<\/style>/g, ''); // filter style tag
    text = text.replace(/<[^<>]*>/g, '');           // filter html tags
    text = text.replace(/\n{3,}/g, '\n\n');         // replace 3 or more newlines to 2
    text = text.replace(/&nbsp;/g, ' ');            // replace non-breaking space
    text = text.replace(/&lt;/g, '<');              // replace less than sign
    text = text.replace(/&gt;/g, '>');              // replace greater than sign
    text = text.replace(/&amp;/g, '&');             // replace ampersand sign
    text = text.replace(/&#8216;/g, "'");           // replace apostrophe sign
    text = text.replace(/&#8217;/g, "'");           // replace apostrophe sign
    text = text.replace(/’/g, "'");                 // replace apostrophe sign
    text = text.replace(/&#8220;/g, '"');           // replace quotation sign
    text = text.replace(/&#8221;/g, '"');           // replace quotation sign
    text = text.replace(/ñ/g, 'n');                 // replace enye (html cannot render it)

    return text;
}

// Given a URL to a specific Post ID in WordPress, display its content on a plane.
// IMPORTANT: Must be a child of a "container" e.g. a background screen or plane
// Limitations: Only processes text. Images are inconsistent in geometry
// Sample URL: https://example.com/index.php/wp-json/wp/v2/posts/1
// Attach to an a-entity e.g. <a-entity postview="url: <post url>">
AFRAME.registerComponent('postview', {
    schema: {
        url: {type: 'string', default: ''},
        width: {type: 'float', default: 5},
        wrapCount: {type: 'int', default: 60},
        bgColor: {default: 'black'},
        textColor: {default: 'white'},
        font: {default: 'sourcecodepro'},
        category: {type: 'int', default: 3}
    },

    init: async function () {
        let response, post;

        if (this.data.url == '') {
            // Fetch most recent post from category if no URL given
            response = await fetch('https://iop.upou.edu.ph/index.php/wp-json/wp/v2/posts?categories='+this.data.category);
            let posts = await response.json();
            post = posts[0];
        } else {
            // Fetch post from CMS
            response = await fetch(this.data.url);
            post = await response.json();
        }
        
        // Set text properties and value (Title + Text-only Content)
        this.el.setAttribute('text', {
            font: this.data.font,
            color: this.data.textColor,
            wrapCount: this.data.wrapCount,
            width: this.data.width,
            baseline: 'top',
            zOffset: 0.005,
            value: filterText(post.title.rendered) + '\n' + filterText(post.content.rendered),
        });

        // Set position to near top of container screen
        let container = this.el.parentElement;
        this.el.object3D.position.y = container.getAttribute('geometry').height / 2.25
    },
});

// Adds scroll controls to the post view i.e. click arrow buttons to scroll
// Attach to an a-entity and set target ID to a postview or listposts component
// IMPORTANT: DO NOT NEST INSIDE AN A-ENTITY WITH CUSTOM SCALE, this will break the scroll limits
AFRAME.registerComponent('scrollcontrols', {
    schema: {
        targetID: {type: 'string'},
        bgColor: {default: "#a8adbb"},
        textColor: {default: "#979797"},
        scrollDistance: {type: 'float', default: 1}
    },

    init: function () {
        let data = this.data;

        // Get reference to target viewport
        let target = document.querySelector(this.data.targetID);
        let targetObj = target.object3D;
        let parentObj = target.parentElement.object3D;
        let containerbound = new THREE.Box3().setFromObject(parentObj);
        let targetWorldPos = new THREE.Vector3();
        let parentWorldPos = new THREE.Vector3();

        // Initialize scroll entities
        let scrollUp = document.createElement('a-cylinder');
        let scrollUpArrow = document.createElement('a-text');
        let scrollDown = document.createElement('a-cylinder');
        let scrollDownArrow = document.createElement('a-text');

        // Scroll button properties (static)
        scrollUp.setAttribute('class', 'clickable');
        scrollUp.setAttribute('radius', '0.25');
        scrollUp.setAttribute('height', '0.05');
        scrollUp.setAttribute('rotation', '90 0 0');
        scrollUp.setAttribute('color', this.data.bgColor);
        scrollUp.setAttribute('position', '-0.25 0 0');
        scrollUp.setAttribute('scale', '0.5 0.5 0.5');
        scrollUpArrow.setAttribute('value', '>');
        scrollUpArrow.setAttribute('color', this.data.textColor);
        scrollUpArrow.setAttribute('position', '-0.275 0.025 0.1');
        scrollUpArrow.setAttribute('rotation', '-90 0 90');
        scrollUpArrow.setAttribute('scale', '2.5 2.5 2.5');
        scrollUpArrow.setAttribute('font', 'mozillavr')

        scrollDown.setAttribute('class', 'clickable');
        scrollDown.setAttribute('radius', '0.25');
        scrollDown.setAttribute('height', '0.05');
        scrollDown.setAttribute('rotation', '90 0 0');
        scrollDown.setAttribute('color', this.data.bgColor);
        scrollDown.setAttribute('position', '0.25 0 0');
        scrollDown.setAttribute('scale', '0.5 0.5 0.5');
        scrollDownArrow.setAttribute('value', '<');
        scrollDownArrow.setAttribute('color', this.data.textColor);
        scrollDownArrow.setAttribute('position', '-0.275 0.025 0.1');
        scrollDownArrow.setAttribute('rotation', '-90 0 90');
        scrollDownArrow.setAttribute('scale', '2.5 2.5 2.5');
        scrollDownArrow.setAttribute('font', 'mozillavr')
        
        // Moves target's y position depending on button click
        scrollUp.addEventListener('click', function(){
            // let thisbound = new THREE.Box3().setFromObject(targetObj);
            // if (thisbound.max.y > containerbound.max.y + parentObj.getWorldPosition(parentWorldPos).y){
            targetObj.position.y -= data.scrollDistance;
            // }
            // console.log(thisbound.max.y+ ' ' +thisbound.min.y)
        });

        scrollDown.addEventListener('click', function(){
            // let thisbound = new THREE.Box3().setFromObject(targetObj);
            // if (thisbound.min.y < containerbound.min.y + parentObj.getWorldPosition(parentWorldPos).y){ 
            targetObj.position.y += data.scrollDistance;
            // }
        });

        // Change button color on hover
        scrollUp.addEventListener('mouseenter', function() {
            scrollUp.setAttribute('material', {
                color: data.textColor
            });
            scrollUpArrow.setAttribute('text', {
                color: data.bgColor
            });
        });

        scrollDown.addEventListener('mouseenter', function() {
            scrollDown.setAttribute('material', {
                color: data.textColor
            });
            scrollDownArrow.setAttribute('text', {
                color: data.bgColor
            });
        });

        scrollUp.addEventListener('mouseleave', function() {
            scrollUp.setAttribute('material', {
                color: data.bgColor
            });
            scrollUpArrow.setAttribute('text', {
                color: data.textColor
            });
        });

        scrollDown.addEventListener('mouseleave', function() {
            scrollDown.setAttribute('material', {
                color: data.bgColor
            });
            scrollDownArrow.setAttribute('text', {
                color: data.textColor
            });
        });

        // Add to scene
        scrollUp.appendChild(scrollUpArrow);
        scrollDown.appendChild(scrollDownArrow);
        this.el.appendChild(scrollUp);
        this.el.appendChild(scrollDown);
    },
});

// Lists the Titles of every Post in the given URL. User can click a title card to view the post in the postview component
// Sample URL: https://example.com/index.php/wp-json/wp/v2/posts?categories=1
// IMPORTANT: Must be a child of a "container" e.g. a background screen or plane
// Attach to an a-entity e.g. <a-entity listposts="target: #id; url: <post url with category filter>">
// Categories (IOP WordPress):
// 1 - Uncategorized
// 3 - News
// 4 - Projects
// 5 - Publications
AFRAME.registerComponent('listposts', {
    schema: {
        url: {type: 'string', default: ''},
        cardHeight: {type: 'float', default: 1},
        cardWidth: {type: 'float', default: 2},
        wrapCount: {type: 'int', default: 20},
        bgColor: {default: "black"},
        textColor: {default: "white"},
        font: {default: 'sourcecodepro'},
        targetID: {type: 'string'}
    },

    init: async function () {
        let data = this.data;

        // Fetch all posts from URL
        let response = await fetch(this.data.url);
        let posts = await response.json();

        // Prepare variables and references
        let postView = document.querySelector(this.data.targetID);
        let container = this.el.parentElement;
        let yPos = container.getAttribute('geometry').height / 2.5;
        let postTitle;
        let titleText;

        // Create element for each post in category
        for (let i=0; i<posts.length; i++){
            postTitle = document.createElement('a-entity');

            // Trim title if too long
            titleText = posts[i].title.rendered;
            if (titleText.length > this.data.wrapCount * 2 - 5) {
                titleText = titleText.slice(0, this.data.wrapCount * 2 - 5) + '...';
            }

            postTitle.setAttribute('class', 'clickable');

            // Set attributes of Title Card and Text
            postTitle.setAttribute('geometry', {
                primitive: 'plane',
                height: this.data.cardHeight,
                width: this.data.cardWidth
            });

            postTitle.setAttribute('material', {
                color: this.data.bgColor,
                transparent: true
            })

            postTitle.setAttribute('text', {
                value: titleText,
                color: this.data.textColor,
                wrapCount: this.data.wrapCount,
                font: this.data.font,
                xOffset: 0.01,
                zOffset: 0.005,
            })

            // Position title cards downwards
            postTitle.object3D.position.y = yPos;
            yPos -= (this.data.cardHeight + 0.05);

            // Change post content when clicked on title card
            postTitle.addEventListener('click', function() {
                postView.setAttribute('text', {
                    value: filterText(posts[i].title.rendered) + '\n' + filterText(posts[i].content.rendered)
                })
                postView.object3D.position.y = postView.parentElement.getAttribute('geometry').height / 2.25
            })

            // Change colors on hover
            postTitle.addEventListener('mouseenter', function() {
                this.setAttribute('material', {
                    color: data.textColor
                })
                this.setAttribute('text', {
                    color: data.bgColor
                })
            })

            postTitle.addEventListener('mouseleave', function() {
                this.setAttribute('material', {
                    color: data.bgColor
                })
                this.setAttribute('text', {
                    color: data.textColor
                })
            })

            this.el.appendChild(postTitle);
        }
    }
});
