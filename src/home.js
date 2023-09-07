AFRAME.registerComponent('news', {
    init: function () {
        let transparent1 = document.createElement("a-plane");
        let transparent2 = document.createElement("a-plane");
        let transparent3 = document.createElement("a-plane");
        let postarea = document.createElement("a-plane");
        let news = document.createElement("a-entity");
        let newsscroll = document.createElement("a-entity");
        let listarea = document.createElement("a-plane");
        let list = document.createElement("a-entity");
        let listscroll = document.createElement("a-entity");

        transparent1.setAttribute("material", "transparent: true; opacity: 0.01");
        transparent1.setAttribute("position", "0.05 -1.6 1.95");
        transparent1.setAttribute("rotation", "0 90 0");
        transparent1.setAttribute("height", "0.9");
        transparent1.setAttribute("width", "1");

        transparent2.setAttribute("material", "transparent: true; opacity: 0.01");
        transparent2.setAttribute("position", "0.05 -1.38 0");
        transparent2.setAttribute("rotation", "0 90 0");
        transparent2.setAttribute("height", "1.4");
        transparent2.setAttribute("width", "2.8");

        transparent3.setAttribute("material", "transparent: true; opacity: 0.01");
        transparent3.setAttribute("position", "0.05 2.25 0.6");
        transparent3.setAttribute("rotation", "0 90 0");
        transparent3.setAttribute("height", "3");
        transparent3.setAttribute("width", "4");

        postarea.setAttribute("color", "#282c38");
        postarea.setAttribute("rotation", "0 90 0");
        postarea.setAttribute("height", "1.15");
        postarea.setAttribute("width", "2.35");

        news.setAttribute("id", "news");
        news.setAttribute("postview", "width: 2.3; wrapCount: 100");

        newsscroll.setAttribute("scrollcontrols", "targetID: #news; scrollDistance: 0.1");
        newsscroll.setAttribute("position", "0.2 -0.75 0");
        newsscroll.setAttribute("rotation", "-75 90 0");

        listarea.setAttribute("color", "#282c38");
        listarea.setAttribute("rotation", "0 90 0");
        listarea.setAttribute("position", "0 -0.3 1.94");
        listarea.setAttribute("height", "1.75");
        listarea.setAttribute("width", "0.8");

        list.setAttribute("id", "newsList");
        list.setAttribute("position", "0 0 0.005");
        list.setAttribute("listposts", "targetID: #news; cardHeight: 0.4; cardWidth: 0.75; bgColor: #282c38; url: https://iop.upou.edu.ph/index.php/wp-json/wp/v2/posts?categories=3");

        listscroll.setAttribute("scrollcontrols", "targetID: #newsList; scrollDistance: 0.1");
        listscroll.setAttribute("position", "0.17 -1.3 2");
        listscroll.setAttribute("rotation", "-75 90 0");
        listscroll.setAttribute("scale", "0.8 0.8 0.8");

        this.el.appendChild(transparent1);
        this.el.appendChild(transparent2);
        this.el.appendChild(transparent3);
        this.el.appendChild(postarea);
        postarea.appendChild(news);
        this.el.appendChild(newsscroll);
        this.el.appendChild(listarea);
        listarea.appendChild(list);
        this.el.appendChild(listscroll);
    },
});
