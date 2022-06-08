import EventEmitter from "./eventEmitter";
import { getOptions } from "./options";
import { ACTIVE } from "./selectors";
import { getState, setState, state } from "./state";
import { updateState } from "./stateUpdates";
import { transformContainer } from "./transformContainer";
import * as utils from "./utils";

/**
 * Returns the destination Y position based on the scrolling direction and
 * the height of the section.
 */
function getDestinationPosition(element) {
  var elementHeight = element.offsetHeight;
  var elementTop = element.offsetTop;

  //top of the desination will be at the top of the viewport
  var position = elementTop;
  var isScrollingDown = elementTop > state.previousDestTop;
  var sectionBottom = position - utils.getWindowHeight() + elementHeight;
  var bigSectionsDestination = getOptions().bigSectionsDestination;

  //is the destination element bigger than the viewport?
  if (elementHeight > utils.getWindowHeight()) {
    //scrolling up?
    if (
      (!isScrollingDown && !bigSectionsDestination) ||
      bigSectionsDestination === "bottom"
    ) {
      position = sectionBottom;
    }
  }

  //sections equal or smaller than the viewport height && scrolling down? ||  is resizing and its in the last section
  else if (
    isScrollingDown ||
    (state.isResizing && utils.next(element) == null)
  ) {
    //The bottom of the destination will be at the bottom of the viewport
    position = sectionBottom;
  }

  /*
    Keeping record of the last scrolled position to determine the scrolling direction.
    No conventional methods can be used as the scroll bar might not be present
    AND the section might not be active if it is auto-height and didnt reach the middle
    of the viewport.
    */
  setState({ previousDestTop: position });
  return position;
}

export function scrollPage(section, callback, isMovementUp) {
  console.log("scrollPage");
  console.log("element", element);

  var element = section.item;
  if (element == null) {
    return;
  } //there's no element to scroll, leaving the function

  var dtop = getDestinationPosition(element);

  //local variables
  var v = {
    element: element,
    callback: callback,
    isMovementUp: isMovementUp,
    dtop: dtop,
    // yMovement: getYmovement(getState().activeSection, element),
    anchorLink: section.anchor,
    sectionIndex: section.index(),
    activeSlide: section.activeSlide ? section.activeSlide.item : null,
    // leavingSection: getState().activeSection.index() + 1,

    //caching the value of isResizing at the momment the function is called
    //because it will be checked later inside a setTimeout and the value might change
    //localIsResizing: state.isResizing,

    items: {
      origin: getState().activeSection,
      destination: section,
    },
    direction: null,
  };

  utils.addClass(element, ACTIVE);
  utils.removeClass(utils.siblings(element), ACTIVE);

  updateState();

  setState({ canScroll: false });
  performMovement(v);
}

function performMovement(v) {
  console.log("performMovement");
  EventEmitter.emit("onPerformMovement");

  var translate3d = "translate3d(0px, -" + Math.round(v.dtop) + "px, 0px)";
  transformContainer(translate3d, true);

  setTimeout(() => {
    console.log("afterSectionLoads");
    afterSectionLoads(v);
  }, 1000);
}

function afterSectionLoads(v) {
  // updateState();
  setState({ canScroll: true });
}
