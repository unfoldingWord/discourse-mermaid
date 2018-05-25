export function setup(helper) {
   if(!helper.markdownIt) { return; }

   helper.whiteList(['div.mermaid']);

   helper.registerPlugin(md=>{
      md.block.bbcode.ruler.push('mermaid',{
        tag: 'mermaid',
        before: function(state, tagInfo) {
          state.push('div_open', 'div', 1);
          token.attrs = [['class', 'mermaid']];
        },
        after: function(state) {
          state.push('div_close', 'div', -1);
        }
      });
   });
}
