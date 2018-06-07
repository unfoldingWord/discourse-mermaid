export function setup(helper) {
  if (!helper.markdownIt) { return; }

  helper.registerOptions((opts, siteSettings) => {
    opts.features.mermaid = siteSettings.discourse_mermaid_enabled;
  });

  helper.whiteList(["div.mermaid"]);

  helper.registerPlugin(md => {
    md.inline.bbcode.ruler.push("mermaid",{
      tag: "mermaid",

      replace: function(state, tagInfo, content) {
        const token = state.push("html_raw", '', 0);
        const escaped = state.md.utils.escapeHtml(content);
        token.content = `<div class="mermaid">\n${escaped}\n</div>\n`;
        return true;
      }
    });
  });
}
