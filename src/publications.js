// This file contains code to dynamically generate books in the Publications room to display published research.

// List of publications and details. Append to add more publications. 
const publications = [
    {
        title: "Virtual Reality Photo-based Tours for Teaching Filipino Vocabulary in an Online Class in Japan: Transitioning into the New Normal",
        date: "December 4, 2022",
        description: "",
        authors: "Figueroa Jr, R. B., Gil, F. A. P, Taniguchi, H., & Esguerra, J. R.",
        link: "https://doi.org/10.5281/zenodo.7505128"
    },
    {
        title: "Piloting Virtual Reality Photo-Based Tours among Students of a Filipino Language Class: A Case of Emergency Remote Teaching in Japan",
        date: "January 5, 2023",
        description: "",
        authors: "Figueroa, R. B., Palma Gil, F. A., & Taniguchi, H.",
        link: "https://doi.org/10.48550/arXiv.2301.01904"
    },
    {
        title: "Virtualizing a University Campus Tour: A Pilot Study on its Usability and User Experience, and Perception",
        date: "November 20, 2020",
        description: "",
        authors: "Figueroa, R.B., Mendoza, G. A. G., Fajardo, J. C. C., Tan, S. E., Yassin, E., & Thian, T. H.",
        link: "https://ijitgeb.org/ijitgeb/article/view/60"
    },
]

// Display the index publication's details, and clickable link to view the publication.
// Usage: Attach to an a-entity and manually position and indicate person's index e.g. <a-entity position="0 0 0" publication="index: 0">
AFRAME.registerComponent('publication', {
    schema: {
        index: {type: 'int'},
        color: {default: colorScheme.upmaroon}
    },

    init: function () {
        let book = document.createElement('a-box');
        let pub = publications[this.data.index];

        book.setAttribute("class", "clickable");
        book.setAttribute("color", this.data.color);
        book.setAttribute("width", 0.5);
        book.setAttribute("height", 0.8);
        book.setAttribute("depth", 0.15);
        book.setAttribute("rotation", "0 90 0");
        book.setAttribute("event-set__slideout", "_event: mouseenter; animation.property: position; animation.to: '0 0 -0.5'; animation.dur: 350; animation.easing: easeOutQuart");
        book.setAttribute("event-set__slidein", "_event: mouseleave; animation.property: position; animation.to: '0 0 0'");

        book.setAttribute("text", {
            value: pub.title + "\n\n\n\n\n\n" + pub.authors + "\n\n\n\n" + pub.date,
            zOffset: 0.076,
            width: 0.45,
            wrapCount: 25,
            align: 'center'
        })

        book.setAttribute("url-on-click-window", "url: " + pub.link);

        this.el.appendChild(book);
    },
});
