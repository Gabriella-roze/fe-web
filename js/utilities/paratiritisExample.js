// Import the library
import paratiritis from "../utilities/paratiritis";

// Gather the elements you wish to observe
const boxEls = document.querySelectorAll(".example-class-here");

// Add custom configuration (optional)
const options = {
  root: null,
  rootMargin: "0% 0% -100px 0%",
  threshold: 0.3,
  unobserveOnEntry: true
};

// Implement the onEntry function
function onEntry(element) {
  console.log("onEntry: ", element);
  element.classList.add("appear");
}

// Implement the onExit function
function onExit(element) {
  console.log("onExit: ", element);
  element.classList.remove("appear");
}

// Initialize paratiritis
paratiritis.observe(boxEls, onEntry, onExit, options);
