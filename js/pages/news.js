"use strict";
// IMPORTS
import { getSheetData } from "../utilities/googleSheetsHelpers.js";
import paratiritis from "../utilities/paratiritis";

// VARIABLES
const SHEET_ID = "1gr_CGAlMheelIg6mv0js1Gc5pXSTGsMrj629wUP67y4";
const loader = document.getElementById("loaderWrapper");

// INITIALIZING
const sheetData = getSheetData(SHEET_ID, (err, data) => {
  // console.log("err: ", err);
  // console.log("data: ", data);

  populateNews(data);
  closeLoader();
  addAnimations();
});

// FUNCTIONS
function populateNews(allPosts) {
  const myTpl = document.querySelector("#tplPostCard").content;
  const parent = document.querySelector("#newsSection");

  allPosts.forEach((post) => {
    const myTplClone = myTpl.cloneNode(true);
    let postId = post.id;

    myTplClone.querySelector(".card img").src = post.img;
    myTplClone.querySelector(".card img").alt = post.alt;
    myTplClone.querySelector(".card #card__title").innerHTML = post.title;
    myTplClone.querySelector(".card #date").innerHTML = post.date;
    myTplClone.querySelector(".card #description").innerHTML = post.description;
    myTplClone.querySelector(".card #link__read-more").href =
      "/single-post.html?id=" + postId;
    localStorage.setItem(`post${postId}`, JSON.stringify(post));
    parent.appendChild(myTplClone);
  });
}

function addAnimations() {
  const boxEls = document.querySelectorAll(".animate");

  function onEntry(element) {
    if (!element.classList.contains("appear")) {
      element.classList.add("appear");
    }
  }
  paratiritis.observe(boxEls, onEntry);
}

function closeLoader() {
  loader.style.opacity = 0;
  loader.style.zIndex = -1;
}
