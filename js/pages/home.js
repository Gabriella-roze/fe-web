"use strict";
// IMPORTS
import paratiritis from "../utilities/paratiritis";

// VARIABLES
const storyContainer = document.getElementById("storyContainer");
const imgContainer = document.getElementById("imgContainer");
const btnLeaveReview = document.getElementById("leaveReview");
const btnApplyJob = document.getElementById("applyJob");
const linkReview =
  "https://www.google.com/search?sxsrf=ACYBGNRrEEJrFyGipu1A5S2cs-RP1JJB-A:1581941962005&ei=w4RKXpuRFcu0kwWQrKmQDg&q=FANDRIDIS%20electric%20%7C%20%CE%97%CE%9B%CE%95%CE%9A%CE%A4%CE%A1%CE%9F%CE%9B%CE%9F%CE%93%CE%9F%CE%A3%2C%20Profitou%20Ilia%2C%20Nea%20Smyrni&oq=fandridis+electric&gs_l=psy-ab.1.3.35i39l3j38l2.0.0..5698...0.0..0.121.241.0j2......0......gws-wiz.RUITha5gsqw&npsic=0&rflfq=1&rlha=0&rllag=37947960,23723015,2&tbm=lcl&rldimm=12401318067662988402&lqi=CkhGQU5EUklESVMgZWxlY3RyaWMgfCDOl86bzpXOms6kzqHOn86bzp_Ok86fzqMsIFByb2ZpdG91IElsaWEsIE5lYSBTbXlybmlaSAoAIkRmYW5kcmlkaXMgZWxlY3RyaWMgzrfOu861zrrPhM-Bzr_Ou86_zrPOv8-DIHByb2ZpdG91IGlsaWEgbmVhIHNteXJuaQ&ved=2ahUKEwju7syFydjnAhUwuaQKHS1GCo0QvS4wAHoECAsQJg&rldoc=1&tbs=lrf:!1m4!1u3!2m2!3m1!1e1!1m4!1u2!2m2!2m1!1e1!1m4!1u16!2m2!16m1!1e1!1m4!1u16!2m2!16m1!1e2!2m1!1e2!2m1!1e16!2m1!1e3!3sIAE,lf:1,lf_ui:14&rlst=f#lrd=0x14a1bdae92ef7c83:0xac1a5513d9afa472,3,,,&rlfi=hd:;si:12401318067662988402,l,CkhGQU5EUklESVMgZWxlY3RyaWMgfCDOl86bzpXOms6kzqHOn86bzp_Ok86fzqMsIFByb2ZpdG91IElsaWEsIE5lYSBTbXlybmlaSAoAIkRmYW5kcmlkaXMgZWxlY3RyaWMgzrfOu861zrrPhM-Bzr_Ou86_zrPOv8-DIHByb2ZpdG91IGlsaWEgbmVhIHNteXJuaQ;mv:[[37.9479664,23.7230463],[37.9479554,23.722984099999998]];tbs:lrf:!1m4!1u3!2m2!3m1!1e1!1m4!1u2!2m2!2m1!1e1!1m4!1u16!2m2!16m1!1e1!1m4!1u16!2m2!16m1!1e2!2m1!1e2!2m1!1e16!2m1!1e3!3sIAE,lf:1,lf_ui:14";
const linkMobileReview =
  "https://www.google.gr/search?client=safari&hl=en-gr&q=Fandridis,+E.,+%26+Co.+O.E.+%22Q+Home%22+Nea+Smyrni&ludocid=12401318067662988402&ibp=gwp;0,7&lsig=AB86z5UHbyxSavXPVPkANQnTdG_Y&lqi=ChJmYW5kcmlkaXMgZWxlY3RyaWNaKAoSZmFuZHJpZGlzIGVsZWN0cmljIhJmYW5kcmlkaXMgZWxlY3RyaWM&phdesc=6ugc6JidzYg&sa=X&ved=2ahUKEwi--IGIvajpAhWQ6aQKHbKXATIQvS4wAHoECAEQMQ";
const linkApplyJob = "https://www.xe.gr/jobs/";

// INITIALIZE
window.addEventListener(onload, init());

// FUNCTIONS
function init() {
  setImgHeight();
  fetchReviewsData();
  addEventListeners();
}

function addAnimations() {
  const boxEls = document.querySelectorAll(".animate");
  paratiritis.observe(boxEls, onEntry);
}

function populateReviews(reviews) {
  // console.log("All reviews: ", reviews);

  const reviewsWrapper = document.querySelector("#reviewsWrapper");
  let textReviews = reviews.filter(checkReviews);
  // console.log("Filtered reviews: ", textReviews);

  textReviews.forEach((review) => {
    const reviewTpl = document.getElementById("reviewTpl").content;
    const reviewsTplClone = reviewTpl.cloneNode(true);

    reviewsTplClone.getElementById("userImg").src = review.profile_photo_url;
    reviewsTplClone.getElementById("userName").innerHTML = review.author_name;
    reviewsTplClone.getElementById("userReview").innerHTML = review.text;
    reviewsWrapper.appendChild(reviewsTplClone);
  });
}

function checkReviews(review) {
  if (review.text !== "" && review.rating > 3) {
    return review;
  }
}

function addEventListeners() {
  document.querySelectorAll(".clickToCall").forEach((el) => {
    el.addEventListener("click", call);
  });
  document.querySelectorAll(".clickToRequest").forEach((el) => {
    el.addEventListener("click", gotToContactSection);
  });
  btnLeaveReview.addEventListener("click", () => {
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      // console.log("is mobile");
      window.open(linkMobileReview);
    } else {
      // console.log("is desktop");
      window.open(linkReview);
    }
  });
  btnApplyJob.addEventListener("click", () => {
    window.open(linkApplyJob);
  });
}

function fetchReviewsData() {
  let map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -33.866, lng: 151.196 },
    zoom: 15,
  });

  var request = {
    placeId: "ChIJg3zvkq69oRQRcqSv2RNVGqw",
    fields: ["name", "reviews", "formatted_phone_number"],
  };

  let service = new google.maps.places.PlacesService(map);
  service.getDetails(request, callback);

  function callback(place, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      populateReviews(place.reviews);
      addAnimations();
    } else {
      // console.log("error in fetching reviews");
      addAnimations();
      return;
    }
  }
}

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
