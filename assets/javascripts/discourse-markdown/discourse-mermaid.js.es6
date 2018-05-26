export function setup(helper) {
   if(!helper.markdownIt) { return; }

   helper.whiteList(['div.mermaid']);

   helper.registerPlugin(md=>{
      md.inline.bbcode.ruler.push('mermaid',{
        tag: 'mermaid',
        replace: function(state, tagInfo, content) {
          let token;
          token = state.push('code_inline', 'code', 0);
          state.push('div_open', 'div', 1);
          token.attrs = [['class', 'mermaid']];
          token.content = content;
          state.push('div_close', 'div', -1);
          return true;
        }
      });
   });
}
