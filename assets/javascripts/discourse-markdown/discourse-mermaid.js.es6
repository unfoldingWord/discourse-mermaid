export function setup(helper) {

  if (!helper.markdownIt) { return; }

  helper.registerOptions((opts, siteSettings) => {
    opts.features.mermaid = siteSettings.discourse_mermaid_enabled;
  });

  helper.whiteList(['div.mermaid']);

  helper.registerPlugin(md=>{
    md.inline.bbcode.ruler.push('mermaid',{
      tag: 'mermaid',
      before: function(state, tagInfo) {
        state.push('div_open', 'div', 1);
        token.attrs = [['class', 'mermaid']];
      },
      after: function(state, tagInfo, content) {
        let token = state.push('html_raw', '', 0);
        token.content = state.md.utils.escapeHtml(content);
        state.push('div_close', 'div', -1);
      }
    });
  });
}
