export function setup(helper) {
   if(!helper.markdownIt) { return; }

   helper.whiteList(['div.mermaid']);

   helper.registerPlugin(md=>{
      md.block.bbcode.ruler.push('mermaid',{
        tag: 'mermaid',
        replace: function(state, tagInfo, content) {
          let token = state.push('html_raw', '', 0);
	  const escaped = state.md.utils.escapeHtml(content);
          token.content = `&lt;div class='mermaid'&gt;\n${escaped}\n&lt;/div&gt;\n`;
          return true;
        }
      });
   });
}
