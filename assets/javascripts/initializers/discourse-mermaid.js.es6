import loadScript from "discourse/lib/load-script";
import { withPluginApi } from "discourse/lib/plugin-api";

export default {
  name: "discourse-mermaid",

  initialize(container) {
    withPluginApi("0.8.22", api => {
      api.decorateCooked($elem => {
        const $mermaid = $elem.find(".mermaid");

        if ($mermaid.length) {
          loadScript("/plugins/discourse-mermaid/javascripts/mermaid.min.js").then(() => {
            mermaid.init(undefined, $mermaid);
          });
        }
      });
    });
  }
};
