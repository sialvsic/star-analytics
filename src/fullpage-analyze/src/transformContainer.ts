import { getContainer } from "./options";
import { NO_TRANSITION } from "./selectors";
import { addAnimation, getTransforms } from "./utilsFP";
import * as utils from "./utils";

let silentScrollId = null;

export function transformContainer(translate3d, animated) {
  if (animated) {
    addAnimation(getContainer());
  }
  // } else {
  //   removeAnimation(getContainer());
  // }

  clearTimeout(silentScrollId);
  utils.css(getContainer(), getTransforms(translate3d));
  // FP.test.translate3d = transelate3d;

  //syncronously removing the class after the animation has been applied.
  silentScrollId = setTimeout(function () {
    utils.removeClass(getContainer(), NO_TRANSITION);
  }, 10);
}
