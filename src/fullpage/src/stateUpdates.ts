import * as utils from "./utils";
import { getOptions, getContainer } from "./options";
import { getState, state } from "./state";
import { Item } from "./Item";
import { ACTIVE, OVERFLOW } from "./selectors";

export function updateStructuralState() {
  var allSectionItems = utils.$(getOptions().sectionSelector, getContainer());
  // console.log("allSectionItems", allSectionItems);

  var sectionsItems = utils.getVisible(allSectionItems);
  // console.log("sectionsItems", sectionsItems);

  var allSections = Array.from(allSectionItems).map(
    (item) => new SectionPanel(item)
  );
  var sections = allSections.filter((item) => item.isVisible);
  state.sections = sections;
}

export function updateState() {
  state.activeSection = null;
  state.sections.map(function (section) {
    let isActive = utils.hasClass(section.item, ACTIVE);
    section.isActive = isActive;
    section.hasScroll = utils.hasClass(section.item, OVERFLOW);
    if (isActive) {
      state.activeSection = section;
    }
    // console.log("isActive", isActive);
  });
}

/**
 * Section object
 */
export let SectionPanel = function (el) {
  [].push.call(arguments, getOptions().sectionSelector);
  Item.apply(this, arguments);

  this.allSlidesItems = utils.$(getOptions().slideSelector, el);
  this.slidesIncludingHidden = Array.from(this.allSlidesItems).map(
    (item) => new SlidePanel(item, this)
  );
  this.slides = this.slidesIncludingHidden.filter(
    (slidePanel) => slidePanel.isVisible
  );
  this.activeSlide = this.slides.length
    ? this.slides.filter((slide) => slide.isActive)[0] || this.slides[0]
    : null;
};
SectionPanel.prototype = Item.prototype;
SectionPanel.prototype.constructor = SectionPanel;

/**
 * Slide object
 */
let SlidePanel = function (el, section) {
  this.parent = section;
  Item.call(this, el, getOptions().slideSelector);
};

SlidePanel.prototype = Item.prototype;
SlidePanel.prototype.constructor = SectionPanel;
