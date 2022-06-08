import { $htmlBody } from "./cache";
import * as utils from "./utils";

export function setAutoScrolling(value, type) {
  //removing the transformation
  utils.css($htmlBody, {
    overflow: "hidden",
    height: "100%",
  });
}
