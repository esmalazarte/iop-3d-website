// This file contains dynamic content located in the About Us room.

// List of each person and their details. Append to list to add more people.
const people = [
    {
        name: "Roberto Figueroa Jr. PhD.",
        role: "Program Director",
        description: "Education:\n- Bachelor of Science in Computer Science, University of the Philippines Los Banos\n- Master of Science in Computer Science, University of the Philippines Los Banos\n- Doctor of Philosophy in Educational Technology, International Christian University, Tokyo\n\nSpecialization:\nICT for Open Education, Educational Technologies, Immersive Learning\n\nProfile:\nhttps://robertofigueroa.space/",
        imageid: "#figueroa",
        profile: "https://robertofigueroa.space/"
    },
    {
        name: "Blancaflor Arada",
        role: "Program Development\nAssociate",
        description: "Education:\n- Bachelor of Science in Computer Science, University of the Philippines\n- Master of Information Systems, University of the Philippines Open University, 2016\n\nProfile:\nhttps://www.linkedin.com/in/blancaflor-arada/",
        imageid: "#arada",
        profile: "https://www.linkedin.com/in/blancaflor-arada/"
    },
    {
        name: "Myra Oruga",
        role: "Program Development\nAssociate",
        description: "Education:\n- Bachelor of Science in Biology (Microbiology), University of the Philippines Los Banos\n- Master in Public Health, University of the Philippines Open University\n- Doctor of Philosophy in Human Nutrition, University of the Philippines Los Banos\n\nSpecialization:\nClinical Nutrition, Health Promotion and Education, Developmental Communication, Communicable Disease Expertise: HIV and Dengue, Non Communicable Expertise: Obesity, Diabetes and other Metabolic Disorders\n\nProfile:\nhttps://www.linkedin.com/in/dr-myra-oruga-0352a95/",
        imageid: "#oruga",
        profile: "https://www.linkedin.com/in/dr-myra-oruga-0352a95/"
    },
    {
        name: "Sophia Deterala",
        role: "Program Development\nAssociate",
        description: "Education:\n- Bachelor of Arts in English Studies (Language), University of the Philippines Diliman\n- Master's in Research (Education and Society), Liverpool John Moores University (Distinction)\n- PhD in Education, Liverpool Hope University\n\nSpecialization:\nSocial Justice in Language Education, Philosophy of Education, Internationalization of Education\n\nProfile:\nhttps://www.researchgate.net/profile/Sophia-Deterala",
        imageid: "#deterala",
        profile: "https://www.researchgate.net/profile/Sophia-Deterala"
    },
    {
        name: "Eric Hawkinson",
        role: "Collaborating Researcher",
        description: "Education:\n- Bachelor of Interdisciplinary Studies (International Business, Japanese, Computer Information), Arizona State University\n- Master of Arts in Educational Technology and Learning Design, San Diego State University\n\nSpecialization:\nDigital Literacy, New Media Marketing in Tourism, New Media Lab, Metaverse, Immersive Technology, Virtual Reality for Education, Game based tourism\n\nProfile:\nhttps://erichawkinson.com/",
        imageid: "#hawkinson",
        profile: "https://erichawkinson.com/"
    },
    {
        name: "Hiroshi Taniguchi",
        role: "Collaborating Researcher",
        description: "Education:\n- Bachelor of Engineering, Ibaraki University (2003-2205) & University of Tsukuba (2005-2008)\n- Master of Sports Science, Waseda University\n\nSpecialization:\nJapanese laguange education, health sciences, physical education, and computer assisted language learning (CALL)\n\nProfile:\nhttps://www.linkedin.com/in/hiroshi-taniguchi-1a8b4a24a/",
        imageid: "#taniguchi",
        profile: "https://www.linkedin.com/in/hiroshi-taniguchi-1a8b4a24a/"
    },
    {
        name: "Jayson Petras",
        role: "Collaborating Researcher",
        description: "Education:\n- Bachelor of Arts in Araling Pilipino (May Disiplina sa Panitikan at Sikolohiya)\n- Master of Arts in Araling Pilipino (May Disiplina sa Panitikan at Sikolohiya)\n- PhD Filipino: Pagpaplanong Pangwika sa University of the Philippines Diliman\n\nProfile:\nhttps://www.linkedin.com/in/jayson-petras-b1222347/",
        imageid: "#petras",
        profile: "https://www.linkedin.com/in/jayson-petras-b1222347/"
    },
    {
        name: "Joshze Rica Esguerra",
        role: "Junior Project Officer",
        description: "Education:\n- Bachelor of Science in Computer Science, University of the Philippines Los Banos\n\nProfile:\nhttps://www.linkedin.com/in/joshze-rica-esguerra-8679a7112/",
        imageid: "#esguerra",
        profile: "https://www.linkedin.com/in/joshze-rica-esguerra-8679a7112/"
    },
    {
        name: "Lexter Mangubat",
        role: "Collaborating Researcher",
        description: "Specialization:\nInformation Systems Research\n\nProfile:\nhttps://www.linkedin.com/in/lexter-mangubat-429b3a16b/",
        imageid: "#mangubat",
        profile: "https://www.linkedin.com/in/lexter-mangubat-429b3a16b/"
    },
]

// Displays the image, description, name, and title of the person indicated by the index
// Usage: Attach to an a-entity and manually position and indicate person's index e.g. <a-entity position="0 0 0" profile="index: 0"> 
AFRAME.registerComponent('profile', {
    schema: {
        index: {type: 'int'}
    },

    init: function () {
        let info = people[this.data.index];
        let top = document.createElement("a-entity");
        let name = document.createElement("a-text");
        let link = document.createElement("a-plane");
        let image = document.createElement("a-image");
        let desc = document.createElement("a-text");
        let descBg = document.createElement("a-plane");

        top.setAttribute("rotateonclick", "");

        image.setAttribute("width", "1");
        image.setAttribute("height", "1.5");
        image.setAttribute("src", info.imageid);

        descBg.setAttribute("rotation", "0 180 0");
        descBg.setAttribute("width", "1");
        descBg.setAttribute("height", "1.5");
        descBg.setAttribute("color", "#2b2d34");
        descBg.setAttribute("position", "0 0 -0.01");

        desc.setAttribute("width", "1");
        desc.setAttribute("wrap-count", "30");
        desc.setAttribute("baseline", "top");
        desc.setAttribute("align", "left");
        desc.setAttribute("position", "-0.5 0.7 0");
        desc.setAttribute("value", info.description);

        name.setAttribute("width", "1.45");
        name.setAttribute("align", "center");
        name.setAttribute("position", "0 -1.05 -0.01");
        name.setAttribute("value", info.name+"\n"+info.role);

        link.setAttribute("material", "transparent: true; opacity: 0.01");
        link.setAttribute("position", "0 -1.05 0");
        link.setAttribute("width", "0.8");
        link.setAttribute("height", "0.25");
        link.setAttribute("url-on-click-window", "url: "+info.profile);

        top.appendChild(image);
        top.appendChild(descBg);
        descBg.appendChild(desc);
        this.el.appendChild(top);
        this.el.appendChild(name);
        this.el.appendChild(link);
    },

});

// Rotate the element when clicked
// Used to switch between photo view and description view
AFRAME.registerComponent('rotateonclick', {
    init: function () {
        let el = this.el;

        el.setAttribute('animation', {
            property: 'rotation',
            startEvents: 'click',
            dur: 500,
            easing: 'easeInOutQuart',
            to: '0 '+ (el.getAttribute('rotation').y + 180) +' 0'
        })

        el.addEventListener('click', function(){
            el.setAttribute('animation', {
                to: '0 '+ (el.getAttribute('rotation').y + 180) +' 0'
            });
        })
    },
});