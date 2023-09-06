const projects = [
    {
        name: "UPOU Tour (A-Frame)",
        description: "A gaze-based tour of the University of the Philippines Open University developed using A-Frame.",
        developers: "Joshze Rica Esguerra",
        imageid: "#upouaframe",
        link: "https://iop.upou.edu.ph/vrtours/upou"
    },
    {
        name: "Perma GARDEN VR Tour",
        description: "A virtual tour of the gardening initiative of the Faculty of Management and Development Studies, created using 3DVista. Perma G.A.R.D.E.N. means Growing Appreciation toward Resilience, Development, Entrepreneurship and Nutrition. Tomatoes, eggplant, okra, squash, pechay, radish, green beans, water spinach, mint, variegated oregano, lagundi, rosemary, dill, and thyme are just some of the vegetables and herbs planted in the garden.",
        developers: "Hiroshi Taniguchi and Roberto B. Figueroa Jr.",
        imageid: "#permagarden",
        link: "https://iop.upou.edu.ph/vrtours/permagarden"
    },
    {
        name: "PH Tour",
        description: "A point-and-click based A-Frame tour of multiple locations in the Philippines used to teach Filipino to Japanese students.\n\nIn partnership with the Tokyo University of Foreign Studies",
        developers: "Joshze Rica Esguerra",
        imageid: "#phtour",
        link: "https://iop.upou.edu.ph/vrtours/ph"
    },
    {
        name: "Forestry Ecosystem Services",
        description: "A virtual exploration of the Makiling Forest where the narrator discusses the various ecosystem services. This was developed with A-Frame.\n\nIn partnership with the UPLB College of Forestry and Natural Resources",
        developers: "Joshze Rica Esguerra",
        imageid: "#forestry",
        link: "https://iop.upou.edu.ph/vrtours/forestry"
    },
    {
        name: "NCODeL Virtual Exhibit",
        description: "In November 2022, the university held the National Conference for Open and Distance eLearning (NCODeL). The virtual exhibit was built on FrameVR, a web-based platform for hosting immersive collaboration spaces.",
        developers: "Roberto B. Figueroa Jr. and the NCODel Exhibit Committee",
        imageid: "#ncodel",
        link: "https://framevr.io/ncodel-old"
    }
]

AFRAME.registerComponent('project', {
    schema: {
        index: {type: 'int'}
    },

    init: function () {
        let proj = projects[this.data.index];
        let info = document.createElement("a-text");
        let devs = document.createElement("a-text");
        let image = document.createElement("a-image");
        let buttonTxt = document.createElement("a-text");
        let button = document.createElement("a-plane");
        let infoBg = document.createElement("a-plane");
        let devsBg = document.createElement("a-plane");
        let buttonTxtBg = document.createElement("a-plane");

        info.setAttribute("value", proj.name+"\n\n"+proj.description);
        info.setAttribute("font", "kelsonsans");
        info.setAttribute("color", "white")
        info.setAttribute("width", "1.7");
        info.setAttribute("baseline", "top");
        info.setAttribute("align", "left");
        info.setAttribute("position", "-1.8 1.1 0");

        devs.setAttribute("value", "Developed by:\n"+proj.developers);
        devs.setAttribute("font", "kelsonsans");
        devs.setAttribute("width", "1.7");
        devs.setAttribute("baseline", "top");
        devs.setAttribute("align", "left");
        devs.setAttribute("position", "-1.8 -1.1 0");

        image.setAttribute("src", proj.imageid);
        image.setAttribute("position", "1 0.3 0");
        image.setAttribute("width", "1.8");
        image.setAttribute("height", "2");

        buttonTxt.setAttribute("value", "Visit >>");
        buttonTxt.setAttribute("font", "kelsonsans");
        buttonTxt.setAttribute("width", "4");
        buttonTxt.setAttribute("align", "center");
        buttonTxt.setAttribute("position", "0.75 -1.35 0");

        button.setAttribute("class", "clickable");
        button.setAttribute("material", "transparent: true; opacity: 0.01");
        button.setAttribute("position", "1.71 -1.35 0.02");
        button.setAttribute("width", "0.5");
        button.setAttribute("height", "0.5");
        button.setAttribute("url-on-click", "url: "+proj.link);

        infoBg.setAttribute("material", "color: #282c38");
        infoBg.setAttribute("width", "1.8");
        infoBg.setAttribute("height", "2");
        infoBg.setAttribute("position", "-1 0.3 0");

        devsBg.setAttribute("material", "color: #282c38");
        devsBg.setAttribute("width", "1.8");
        devsBg.setAttribute("height", "0.8");
        devsBg.setAttribute("position", "-1 -1.35 0");

        buttonTxtBg.setAttribute("material", "color: #282c38");
        buttonTxtBg.setAttribute("width", "1");
        buttonTxtBg.setAttribute("height", "0.6");
        buttonTxtBg.setAttribute("position", "0.75 -1.35 0");

        this.el.appendChild(info);
        this.el.appendChild(devs);
        this.el.appendChild(image);
        this.el.appendChild(buttonTxt);
        this.el.appendChild(button);
        this.el.appendChild(infoBg);
        this.el.appendChild(devsBg);
        this.el.appendChild(buttonTxtBg);
    },
});
