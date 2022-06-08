import { setCache } from "./cache";
import EventEmitter from "./eventEmitter";
import init from "./init";
import { setContainer } from "./options";
import * as utils from "./utils";

function FullPage(containerSelector, options) {
  console.log("containerSelector", containerSelector);
  console.log("options", options);

  setCache();

  setContainer(
    typeof containerSelector === "string"
      ? utils.$(containerSelector)[0]
      : containerSelector
  );

  EventEmitter.emit("onInitialise");

  EventEmitter.emit("beforeInit");
  init();
  EventEmitter.emit("bindEvents");
}

export default FullPage;
