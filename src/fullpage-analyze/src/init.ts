import { win, doc } from "./constants";
import { getPassiveOptionsIfPossible } from "./supportsPassive";
import { state, setState, getState } from "./state";
import { getOptions } from "./options";
import { scrollPage } from "./scrollPage";
import { updateStructuralState, updateState } from "./stateUpdates";
import { prepareDom } from "./prepareDom";
import { setAutoScrolling } from "./autoScrolling";
import * as utils from "./utils";

let prevTime = new Date().getTime();
let scrollings = [];

function moveSectionDown() {
  // console.log("moveSectionDown");
  // console.log("activeSection", getState().activeSection);

  var next = getState().activeSection?.next();
  // console.log("next", next);

  if (next != null) {
    scrollPage(next, null, false);
  }
}

function moveSectionUp() {
  // console.log("moveSectionUp");

  var prev = getState().activeSection.prev();

  //looping to the bottom if there's no more sections above
  if (!prev && (getOptions().loopTop || getOptions().continuousVertical)) {
    prev = utils.getLast(getState().sections);
  }

  if (prev != null) {
    scrollPage(prev, null, true);
  }
}

//type: up down
function scrolling(type) {
  var scrollSection = type === "down" ? moveSectionDown : moveSectionUp;
  scrollSection();
}

function addMouseWheelHandler() {
  var prefix = "";
  var _addEventListener;

  if (win.addEventListener) {
    _addEventListener = "addEventListener";
  } else {
    _addEventListener = "attachEvent";
    prefix = "on";
  }

  // detect available wheel event
  var support =
    "onwheel" in doc.createElement("div")
      ? "wheel" // Modern browsers support "wheel"
      : // @ts-ignore
      doc.onmousewheel !== undefined
      ? "mousewheel" // Webkit and IE support at least "mousewheel"
      : "DOMMouseScroll"; // let's assume that remaining browsers are older Firefox

  var passiveEvent = getPassiveOptionsIfPossible();

  // console.log("_addEventListener", _addEventListener);
  // console.log("prefix", prefix);
  // console.log("support", support); //'wheel'
  // console.log("passiveEvent", passiveEvent);
  // console.log("passiveEvent", passiveEvent);

  doc[_addEventListener](prefix + support, MouseWheelHandler, passiveEvent);
}

function setMouseWheelScrolling() {
  addMouseWheelHandler();
}

function MouseWheelHandler(e) {
  // console.log("hh");
  var curTime = new Date().getTime();

  // console.log("isUsingWheel", state.isUsingWheel);

  if (!state.isUsingWheel) {
    setState({
      isGrabbing: false,
      isUsingWheel: true,
      touchDirection: "none",
    });
  }

  if (getOptions().autoScrolling) {
    // console.log("in");
    e = e || win.event;
    var value = e.wheelDelta || -e.deltaY || -e.detail;

    //wheelDelta 返回double值，该值表示滚轮的纵向滚动量
    //deltaY 返回double值，该值表示滚轮的纵向滚动量
    // console.log("wheelDelta", e.wheelDelta);
    // console.log("deltaY", e.deltaY);
    // console.log("value", value);
    var delta = Math.max(-1, Math.min(1, value));
    // console.log("delta", delta);

    var direction = delta < 0 ? "down" : delta > 0 ? "up" : "none";
    // console.log("direction", direction);

    //Limiting the array to 150 (lets not waste memory!)
    if (scrollings.length > 149) {
      scrollings.shift();
    }

    scrollings.push(Math.abs(value));

    //time difference between the last scroll and the current one
    var timeDiff = curTime - prevTime;
    prevTime = curTime;

    //haven't they scrolled in a while?
    //(enough to be consider a different scrolling action to scroll another section)
    if (timeDiff > 200) {
      //emptying the array, we dont care about old scrollings for our averages
      scrollings = [];
    }

    setState({ wheelDirection: direction });

    console.log("state.canScroll", state.canScroll);
    console.log("scrollings", scrollings);

    if (state.canScroll) {
      var averageEnd = utils.getAverage(scrollings, 10);
      var averageMiddle = utils.getAverage(scrollings, 70);
      var isAccelerating = averageEnd >= averageMiddle;

      console.log("averageEnd", averageEnd);
      console.log("averageMiddle", averageMiddle);
      console.log("isAccelerating", isAccelerating);

      if (isAccelerating) {
        setState({ scrollTrigger: "wheel" });

        //scrolling down?
        if (delta < 0) {
          scrolling("down");
        }

        //scrolling up?
        else {
          scrolling("up");
        }
      }
    }
  }
}

function init() {
  updateStructuralState();
  updateState();

  prepareDom();

  setMouseWheelScrolling();
  setAutoScrolling(getOptions().autoScrolling, "internal");
}

export default init;
