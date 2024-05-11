const oldpublications = [
    {
        title: "VERRRRRRRY LONG TITLE",
        link: "link"
    },
    {
        title: "new title",
        link: "link2"
    }
]

AFRAME.registerComponent('archive', {
    init: function () {
      // Do something when component first attached.
      let listareanew = document.createElement("a-plane");
      let listnew = document.createElement("a-entity");

      listareanew.setAttribute("color", "#282c38");
      listareanew.setAttribute("rotation", "0 180 0");
    //   listareanew.setAttribute("position", "-18.275 0.65 12.9");
      listareanew.setAttribute("height", "3");
      listareanew.setAttribute("width", "6");
      listareanew.setAttribute("id", "listareanew"); //DEBUG

      listnew.setAttribute("id", "listnew"); //DEBUG
      listnew.setAttribute("position", "0 -0.269 0.005");
      listnew.setAttribute("hyperlinklist", "cardHeight: 0.4; cardWidth: 5.9; bgColor: #282c38; wrapCount: 50");

      this.el.appendChild(listareanew);
    //   listnew.appendChild(postTitle);
      listareanew.appendChild(listnew);

    }
});


AFRAME.registerComponent('hyperlinklist', {
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
        console.log(container); //DEBUG
        let yPos = container.getAttribute('geometry').height / 2.5;
        let postTitle;
        let titleText;
        let data = this.data;

        // Create element for each post in category
        for (let i=0; i<oldpublications.length; i++){
            console.log(oldpublications[i]); //DEBUG
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

            // Position title cards downwards
            postTitle.object3D.position.y = yPos;
            yPos -= (this.data.cardHeight + 0.05);

            // // Change post content when clicked on title card
            // postTitle.addEventListener('click', function() {
            //     postView.setAttribute('text', {
            //         value: filterText(posts[i].title.rendered) + '\n' + filterText(posts[i].content.rendered)
            //     })
            //     postView.object3D.position.y = postView.parentElement.getAttribute('geometry').height / 2.25
            // })

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