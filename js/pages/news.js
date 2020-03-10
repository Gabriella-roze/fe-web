"use strict";
import { getSheetData } from "../utilities/googleSheetsHelpers.js";
const SHEET_ID = "1gr_CGAlMheelIg6mv0js1Gc5pXSTGsMrj629wUP67y4";

const sheetData = getSheetData(SHEET_ID, (err, data) => {
  console.log("err: ", err);
  console.log("data: ", data);

  populateNews(data);
  addAnimations();
});

function populateNews(allPosts) {
  const myTpl = document.querySelector("#tplPostCard").content;
  const parent = document.querySelector("#newsSection");

  allPosts.forEach(post => {
    const myTplClone = myTpl.cloneNode(true);
    let postId = post.id;

    myTplClone.querySelector(".card img").src = post.img;
    myTplClone.querySelector(".card #card__title").innerHTML = post.title;
    myTplClone.querySelector(".card #date").innerHTML = post.date;
    myTplClone.querySelector(".card #description").innerHTML = post.description;

    myTplClone.querySelector(".card #link__read-more").href =
      "/single-post.html?id=" + postId;

    localStorage.setItem(`post${postId}`, JSON.stringify(post));

    // Append it to an element
    parent.appendChild(myTplClone);
  });
}

// ANIMATIONS
import paratiritis from "../utilities/paratiritis";
function addAnimations() {
  const boxEls = document.querySelectorAll(".animate");

  // Implement the onEntry function
  function onEntry(element) {
    console.log("onEntry: ", element);
    element.classList.add("appear");
  }

  // Initialize paratiritis
  paratiritis.observe(boxEls, onEntry);
}
