import * as utils from "./utils";
import { getOptions, getContainer } from "./options";
import { ENABLED, WRAPPER } from "./selectors";
import { $html } from "./cache";
import { addInternalSelectors } from "./addInternalSelectors";

export function prepareDom() {
  const parents = utils.getParentsUntil(getContainer(), "body");
  // console.log("parents", parents);

  //给所有的父层级添加css样式
  utils.css(utils.getParentsUntil(getContainer(), "body"), {
    height: "100%",
    position: "relative",
  });

  //adding a class to recognize the container internally in the code
  utils.addClass(getContainer(), WRAPPER);
  utils.addClass($html, ENABLED);

  addInternalSelectors();
}
