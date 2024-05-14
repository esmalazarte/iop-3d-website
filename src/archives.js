// List of publications to be added to the archive and its link. Append to add more.
const oldpublications = [
    {
        title: "Virtualizing a University Campus Tour: A Pilot Study on its Usability and User Experience, and Perception",
        link: "https://ijitgeb.org/ijitgeb/article/view/60"
    }
]

// List of projects to be added to the archive and its link. Append to add more.
const oldprojects = [
    {
        title: "Perma GARDEN VR Tour",
        link: "https://iop.upou.edu.ph/vrtours/permagarden"
    },
    {
        title: "PH Tour",
        link: "https://iop.upou.edu.ph/vrtours/ph"
    }
]

AFRAME.registerComponent('pub_archive', {
    init: function () {
      // Do something when component first attached.
      let listareanew = document.createElement("a-plane");
      let listnew = document.createElement("a-entity");
      let listnewscroll = document.createElement("a-entity");

      listareanew.setAttribute("color", "#282c38");
      listareanew.setAttribute("rotation", "0 180 0");
    //   listareanew.setAttribute("position", "-18.275 0.65 12.9");
      listareanew.setAttribute("height", "3");
      listareanew.setAttribute("width", "6");
      listareanew.setAttribute("id", "listareanew"); //DEBUG

      listnew.setAttribute("id", "publication_list"); //DEBUG
      listnew.setAttribute("position", "0 -0.269 0.005");
      listnew.setAttribute("pub_hyperlinklist", "cardHeight: 0.4; cardWidth: 5.9; bgColor: #282c38; wrapCount: 80");

      listnewscroll.setAttribute("scrollcontrols", "targetID: #publication_list; scrollDistance: 0.4");
      listnewscroll.setAttribute("position", "0 -1.575 -0.2");
      listnewscroll.setAttribute("rotation", "240 0 0");
      listnewscroll.setAttribute("scale", "0.8 0.8 0.8");

      this.el.appendChild(listareanew);
    //   listnew.appendChild(postTitle);
      listareanew.appendChild(listnew);
      this.el.appendChild(listnewscroll);

    }
});


AFRAME.registerComponent('pro_archive', {
    init: function () {
      // Do something when component first attached.
      let listareanew = document.createElement("a-plane");
      let listnew = document.createElement("a-entity");
      let listnewscroll = document.createElement("a-entity");

      listareanew.setAttribute("color", "#282c38");
      listareanew.setAttribute("rotation", "0 180 0");
    //   listareanew.setAttribute("position", "-18.275 0.65 12.9");
      listareanew.setAttribute("height", "3");
      listareanew.setAttribute("width", "6");
      listareanew.setAttribute("id", "listareanew"); //DEBUG

      listnew.setAttribute("id", "project_list"); //DEBUG
      listnew.setAttribute("position", "0 -0.269 0.005");
      listnew.setAttribute("pro_hyperlinklist", "cardHeight: 0.4; cardWidth: 5.9; bgColor: #282c38; wrapCount: 80");

      listnewscroll.setAttribute("scrollcontrols", "targetID: #project_list; scrollDistance: 0.4");
      listnewscroll.setAttribute("position", "0 -1 -0.17");
      listnewscroll.setAttribute("rotation", "240 0 0");
      listnewscroll.setAttribute("scale", "0.8 0.8 0.8");

      this.el.appendChild(listareanew);
    //   listnew.appendChild(postTitle);
      listareanew.appendChild(listnew);
      this.el.appendChild(listnewscroll);

    }
});


AFRAME.registerComponent('pub_hyperlinklist', {
    schema: {
        cardHeight: {type: 'float', default: 1},
        cardWidth: {type: 'float', default: 2},
        wrapCount: {type: 'int', default: 20},
        bgColor: {default: "black"},
        textColor: {default: "white"},
        font: {default: 'sourcecodepro'}
    },

    init: function () {
        let container = this.el.parentElement;
        let yPos = container.getAttribute('geometry').height / 2.5;
        let postTitle;
        let titleText;
        let data = this.data;

        // Create element for each post in category
        for (let i=0; i<oldpublications.length; i++){
            postTitle = document.createElement('a-entity');

            // Trim title if too long
            titleText = oldpublications[i].title;
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

            postTitle.setAttribute('url-on-click', "url: "+oldpublications[i].link);

            // Position title cards downwards
            postTitle.object3D.position.y = yPos;
            yPos -= (this.data.cardHeight + 0.05);

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


AFRAME.registerComponent('pro_hyperlinklist', {
    schema: {
        cardHeight: {type: 'float', default: 1},
        cardWidth: {type: 'float', default: 2},
        wrapCount: {type: 'int', default: 20},
        bgColor: {default: "black"},
        textColor: {default: "white"},
        font: {default: 'sourcecodepro'}
    },

    init: function () {
        let container = this.el.parentElement;
        let yPos = container.getAttribute('geometry').height / 2.5;
        let postTitle;
        let titleText;
        let data = this.data;

        // Create element for each post in category
        for (let i=0; i<oldprojects.length; i++){
            postTitle = document.createElement('a-entity');

            // Trim title if too long
            titleText = oldprojects[i].title;
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

            postTitle.setAttribute('url-on-click', "url: "+oldprojects[i].link);

            // Position title cards downwards
            postTitle.object3D.position.y = yPos;
            yPos -= (this.data.cardHeight + 0.05);

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