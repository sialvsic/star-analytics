import * as utils from "./utils";
import { getOptions, getContainer } from "./options";
import { SECTION, SLIDE } from "./selectors";

/**
 * Adds internal classes to be able to provide customizable selectors
 * keeping the link with the style sheet.
 */
export function addInternalSelectors() {
  // console.log("getOptions().sectionSelector", getOptions().sectionSelector);
  utils.addClass(
    utils.$(getOptions().sectionSelector, getContainer()),
    SECTION
  );
  utils.addClass(utils.$(getOptions().slideSelector, getContainer()), SLIDE);
}
