// This file contains dynamic code to generate the projects view in the Projects room

// List of projects and their details. Append to add more projects
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
        developers: "NCODeL Exhibit Committee, headed by IOP Director Dr. Roberto Figueroa Jr.",
        imageid: "#ncodel",
        link: "https://framevr.io/ncodel-old"
    },
    {
        name: "Tri-Conference 2023 Virtual Exhibit",
        description: "The UP Open University Tri-Conference is a three-conference-in-one with the theme \"Sustainability in Education: Intersections, Ideation, Innovations\".",
        developers: "Tri-con Exhibit Committee, headed by IOP Director Dr. Roberto Figueroa Jr.",
        imageid: "#triconexhibit",
        link: "https://framevr.io/upou-exhibit",
    },
    {
        name: "Tri-Conference 2023 Augmented Reality Tour",
        description: "As part of the exhibit committee, the IOP Program developed a short tour where guests in the physical exhibit can experience augmented reality. Users can use their own smartphones to scan the markers around the exhibit to learn more information about each display.\n\nTechnologies used include A-Frame, AR.js, Asset Forge, Mixamo, and Blender.",
        developers: "Joshze Rica Esguerra",
        imageid: "#triconar",
        link: "https://iop.upou.edu.ph/ar/exhibit",
    },
    {
        name: "HANDI System",
        description: "HANDI System: Hand Adept Non-Controller Dynamic Interaction System is a virtual reality interaction system that serves as a step toward intuitive immersion. The goal of this project is to eliminate the need for controllers and instead use hand gestures to pave the way for a seamless and natural connection between users and the virtual world.\n\nThe project used A-Frame, ThreeJS, and Web XR hands which were used in tracking the joints in the hand.",
        developers: "Rovie de Ramos, UPLB BS Applied Physics Intern for Midyear 2023",
        imageid: "#handi",
        link: "https://iop.upou.edu.ph/vr/handi",
    },
    {
        name: "WIKA 1 Virtual Tour",
        description: "As part of Wika 1 Module 10: Pagsasabuhay, Pagpapatatag, at Pag-uswag ng Wikang Filipino.\n\nIn partnership with the UP Diliman Sentro ng Wikang Filipino",
        developers: "Hiroshi Taniguchi and Roberto B. Figueroa Jr.",
        imageid: "#wika1",
        link: "https://iop.upou.edu.ph/vrtours/wika1/swfvr",
    },
    {
        name: "IOP 3D Website",
        description: "The 3D website attempts to reinvent how websites are viewed. Traditional websites are two-dimensional in nature wherein you can view the content in a 2D page. The IOP 3D website is a prototype on how the content on this site can be placed inside a three-dimensional space. You are currently viewing this project.\n\nTechnologies used include A-Frame, Blender, and Asset Forge.",
        developers: "Elijah Gabriel Malazarte & Joseph Gabriel Sta. Rita, UPLB BS Computer Science Interns for Midyear 2023",
        imageid: "#3dsite",
        link: ""
    }
]

// Display the index project's name, details, preview image, and clickable link to visit the project.
// Usage: Attach to an a-entity and manually position and indicate person's index e.g. <a-entity position="0 0 0" project="index: 0">
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
