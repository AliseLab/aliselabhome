"use strict";

[{
    button: "orderCard",
    radio: "orderCardR"
}, {
    button: "orderCorp",
    radio: "orderCorpR"
}, {
    button: "orderShop",
    radio: "orderShopR"
}].forEach(function (pair) {

    document.getElementById(pair.button).addEventListener("click", function () {
        document.getElementById(pair.radio).checked = true;
    });
});
document.querySelectorAll("#portfolio a").forEach(function (a) {
    //  a.setAttribute("src",x.dataset.src);
    a.innerHTML = '<img src="' + a.getAttribute("href").replace("portfolio", "mini_portf") + '">';
    a.setAttribute("target", "_blank");
});

var navLinksDon = document.getElementById("navLinks");
var l = console.log;

document.getElementById("navIco").addEventListener("click", function () {
    navLinksDon.classList.add("navLinksShow");
});

document.body.addEventListener("click", function (e) {
    if (e.target.id !== "navIco") {
        navLinksDon.classList.remove("navLinksShow");
    }
});
var scrollToAnchorTarget = function scrollToAnchorTarget(target) {

    window.scrollTo({
        behavior: "smooth",
        left: 0,
        top: target.offsetTop
    });
};

var navLinks = document.querySelectorAll("nav > a");

navLinks.forEach(function (link) {
    return link.addEventListener("click", function (e) {
        e.preventDefault();
        scrollToAnchorTarget(document.querySelector(link.getAttribute("href")));
    });
});

var sectionsDon = ["about", "services", "portfolio", "reviews", "questions", "contacts"].map(function (id) {
    return document.getElementById(id);
});

var oldVpBottom = 0;

window.addEventListener("scroll", function () {

    var vpBottom = window.pageYOffset + (document.documentElement.clientHeight || window.innerHeight);
    /*sectionsDon.filter(function (sectionDon) {
    	if ( !sectionDon )
    		return false;
        return sectionDon.offsetTop < vpBottom && sectionDon.offsetTop > oldVpBottom;
    }).forEach(animateSection);*/

    oldVpBottom = vpBottom;
});

function animateSection(sectionDon) {
    sectionDon.classList.add("sectionAnimation");
    setTimeout(function () {
        return sectionDon.classList.remove("sectionAnimation");
    }, 1);
}