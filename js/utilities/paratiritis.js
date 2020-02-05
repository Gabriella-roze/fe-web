/**
 * THE INTERSECTION OBSERVER - START OF EXAMPLE
 *
 * const observer = new IntersectionObserver(callback, options);
 */

/**
 * OPTIONS
 * A configuration object passed as the 2nd argument of the observer.
 * Here we can set the below configurations:
 *
 * - root: The element to use for intersection checking. It defaults to the document,
 * but you may want to change the default for something like an iframe for example.
 *
 * - rootMargin: A string with values in the same format as for a CSS margin or padding * value.
 * For example: '3rem * 2rem'. This creates a margin of the specified size around * the root element,
 * to effectively create an inset or an * outset for the intersection * point. It defaults to '0px'.
 *
 * - threshold: An array of number values between 0 and 1. The values correspond to
 * the * ratio of visibility of the element, with 0 being completely out of view
 * and 1 being * fully in the view. If you provide multiple values, the intersection
 * callback will * * be called when each specified threshold value is reached.
 * For example a value of [0, 0.3, 1] will make the intersection callback to be called
 * three times, when element first appears, when it's 30% in and when it's 100% in.
 * It defaults to [0].
 */
// const options = {
//   root: document.querySelector("null")
//   // rootMargin: '0% 0% 75% 0%',
//   // threshold: 1.0
// };

/**
 * CALLBACK
 * A function passed as the 1st argument of the observer.
 *
 * - entries: The entries (of the ones being observed) being intersected at the moment.
 * It is an array because the same observer can be used for observing multiple elements.
 *
 * - observer: The observer object that handles everything. Can be used to do things like:
 * observer.unobserve(HTMLElement): To stop observing the current element.
 *
 */
// const callback = function(entries, observer) {
//   // console.log('entries: ', entries);
//   entries.forEach(entry => {
//     /**
//      * entry.intersectionRatio: This value is > 0 when the element appears and < 0 when it leaves.
//      * entry.target is the actual element being observed. Can be used to add a class to the element.
//      */
//     if (entry.intersectionRatio > 0) {
//       console.log(entry.target.innerHTML + " arrives");
//       // observer.unobserve(entry.target); // Stop observing it ever again
//     } else {
//       console.log(entry.target.innerHTML + " leaves");
//     }
//   });
// };

// Initialize the observer with its options and callback function
// const observer = new IntersectionObserver(callback, options);

// Gather all the elements we want to observe
// const elementsToBeObserved = document.querySelectorAll(".box");

// Activate the observer for each of the elements above
// elementsToBeObserved.forEach(target => observer.observe(target));

/* END OF EXAMPLE */

function handleObserve(elements, onEntry, onExit, options = {}) {
  // TODO: Validate that argument is an array of HTML elements

  const observerOptions = {
    root: options.root || null,
    rootMargin: options.rootMargin || "0% 0% -100px 0%",
    threshold: options.threshold || 0.3
  };

  const callback = function(entries, observer) {
    // console.log('entries: ', entries);
    entries.forEach(entry => {
      /**
       * entry.intersectionRatio: This value is > 0 when the element appears and < 0 when it leaves.
       * entry.target is the actual element being observed. Can be used to add a class to the element.
       */
      // console.log("isIntersecting: ", entry.isIntersecting);
      // console.log("intersectionRatio: ", entry.intersectionRatio); // Bug: is 0 if the intesection happens super slowly.

      // TODO
      if (entry.isIntersecting) {
        onEntry(entry.target);
        options.unobserveOnEntry && observer.unobserve(entry.target);
      } else {
        onExit(entry.target);
      }
    });
  };

  const observer = new IntersectionObserver(callback, observerOptions);

  elements.forEach(element => observer.observe(element));
}

export default {
  observe: handleObserve
};
