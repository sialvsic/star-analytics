import { getOptions } from "./options";
import { NO_TRANSITION } from "./selectors";
import * as utils from "./utils";

/**
 * Adds transition animations for the given element
 */
export function addAnimation(element) {
  var transition =
    "transform " +
    getOptions().scrollingSpeed +
    "ms " +
    getOptions().easingcss3;

  utils.removeClass(element, NO_TRANSITION);

  return utils.css(element, {
    "-webkit-transition": transition,
    transition: transition,
  });
}

/**
 * Returns the cross-browser transform string.
 */
export function getTransforms(translate3d) {
  return {
    "-webkit-transform": translate3d,
    "-moz-transform": translate3d,
    "-ms-transform": translate3d,
    transform: translate3d,
  };
}
