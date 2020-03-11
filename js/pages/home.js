"use strict";
// IMPORTS
import paratiritis from "../utilities/paratiritis";

// VARIABLES
const boxEls = document.querySelectorAll(".animate");
const storyContainer = document.getElementById("storyContainer");
const imgContainer = document.getElementById("imgContainer");
const btnLeaveReview = document.getElementById("leaveReview");
const btnApplyJob = document.getElementById("applyJob");
const linkReview =
  "https://www.google.com/search?sxsrf=ACYBGNRrEEJrFyGipu1A5S2cs-RP1JJB-A:1581941962005&ei=w4RKXpuRFcu0kwWQrKmQDg&q=FANDRIDIS%20electric%20%7C%20%CE%97%CE%9B%CE%95%CE%9A%CE%A4%CE%A1%CE%9F%CE%9B%CE%9F%CE%93%CE%9F%CE%A3%2C%20Profitou%20Ilia%2C%20Nea%20Smyrni&oq=fandridis+electric&gs_l=psy-ab.1.3.35i39l3j38l2.0.0..5698...0.0..0.121.241.0j2......0......gws-wiz.RUITha5gsqw&npsic=0&rflfq=1&rlha=0&rllag=37947960,23723015,2&tbm=lcl&rldimm=12401318067662988402&lqi=CkhGQU5EUklESVMgZWxlY3RyaWMgfCDOl86bzpXOms6kzqHOn86bzp_Ok86fzqMsIFByb2ZpdG91IElsaWEsIE5lYSBTbXlybmlaSAoAIkRmYW5kcmlkaXMgZWxlY3RyaWMgzrfOu861zrrPhM-Bzr_Ou86_zrPOv8-DIHByb2ZpdG91IGlsaWEgbmVhIHNteXJuaQ&ved=2ahUKEwju7syFydjnAhUwuaQKHS1GCo0QvS4wAHoECAsQJg&rldoc=1&tbs=lrf:!1m4!1u3!2m2!3m1!1e1!1m4!1u2!2m2!2m1!1e1!1m4!1u16!2m2!16m1!1e1!1m4!1u16!2m2!16m1!1e2!2m1!1e2!2m1!1e16!2m1!1e3!3sIAE,lf:1,lf_ui:14&rlst=f#lrd=0x14a1bdae92ef7c83:0xac1a5513d9afa472,3,,,&rlfi=hd:;si:12401318067662988402,l,CkhGQU5EUklESVMgZWxlY3RyaWMgfCDOl86bzpXOms6kzqHOn86bzp_Ok86fzqMsIFByb2ZpdG91IElsaWEsIE5lYSBTbXlybmlaSAoAIkRmYW5kcmlkaXMgZWxlY3RyaWMgzrfOu861zrrPhM-Bzr_Ou86_zrPOv8-DIHByb2ZpdG91IGlsaWEgbmVhIHNteXJuaQ;mv:[[37.9479664,23.7230463],[37.9479554,23.722984099999998]];tbs:lrf:!1m4!1u3!2m2!3m1!1e1!1m4!1u2!2m2!2m1!1e1!1m4!1u16!2m2!16m1!1e1!1m4!1u16!2m2!16m1!1e2!2m1!1e2!2m1!1e16!2m1!1e3!3sIAE,lf:1,lf_ui:14";
const linkApplyJob = "https://www.xe.gr/jobs/";

// INITIALIZE
window.addEventListener(onload, init());

// FUNCTIONS
function init() {
  setImgHeight();
  paratiritis.observe(boxEls, onEntry);
  addEventListeners();
  //   fetchReviewsData();
}

function addEventListeners() {
  document.querySelectorAll(".clickToCall").forEach(el => {
    el.addEventListener("click", call);
  });
  document.querySelectorAll(".clickToRequest").forEach(el => {
    el.addEventListener("click", gotToContactSection);
  });
  btnLeaveReview.addEventListener("click", () => {
    window.open(linkReview);
  });
  btnApplyJob.addEventListener("click", () => {
    window.open(linkApplyJob);
  });
}

// function fetchReviewsData() {
//   const locationId = "ChIJg3zvkq69oRQRcqSv2RNVGqw";
//   const accountId = "ACCOUNT_ID_INSERT_HERE_WHEN_READY";
//   fetch(
//     `https://mybusiness.googleapis.com/v4/accounts/${accountId}/locations/${locationId}/reviews`
//   )
//     .then(res => res.json())
//     .then(data => console.log(data));
// }

function setImgHeight() {
  imgContainer.style.height = `${storyContainer.clientHeight}px`;
}

function call() {
  window.location.href = "tel:2109847316";
}

function gotToContactSection() {
  window.location.href = "#contacts";
}

function onEntry(element) {
  if (!element.classList.contains("appear")) {
    element.classList.add("appear");
  }
}
