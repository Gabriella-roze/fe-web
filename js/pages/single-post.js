"use strict";
// IMPORTS
import { getSheetData } from "../utilities/googleSheetsHelpers.js";

// VARIABLES
const params = new URLSearchParams(window.location.search);
const postID = params.get("id");
const postData = localStorage.getItem(`post${postID}`);
const SHEET_ID = "1gr_CGAlMheelIg6mv0js1Gc5pXSTGsMrj629wUP67y4";
const article = document.querySelector("article");

// INITIALIZING
window.addEventListener(onload, init());

// FUNCTIONS
function init() {
  // postData = JSON.parse(postData);
  if (postData === null) {
    // console.log("post data was null");

    const sheetData = getSheetData(SHEET_ID, (err, data) => {
      // console.log("err: ", err);
      // console.log("data: ", data);
      data.forEach((post) => {
        if (post.id === postID) {
          displayPostData(post);
        }
      });
    });
  } else {
    // console.log("post data was found in local Storage");
    const newPostData = JSON.parse(postData);
    displayPostData(newPostData);
  }
}

function displayPostData(post) {
  // console.log(post);
  article.querySelector("h1").innerHTML = post.title;
  article.querySelector(".date #date").innerHTML = post.date;
  article.querySelector("img").src = post.img;
  article.querySelector("img").alt = post.alt;
  article.querySelector("#p1").innerHTML = post.paragraph1;
  article.querySelector("#p2").innerHTML = post.paragraph2;
  article.querySelector("#p3").innerHTML = post.paragraph3;
}
