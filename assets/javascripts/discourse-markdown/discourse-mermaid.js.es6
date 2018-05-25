export function setup(helper) {
   if(!helper.markdownIt) { return; }

   helper.whiteList(['div.mermaid']);

   helper.registerPlugin(md=>{
      md.block.bbcode.ruler.push('mermaid',{
        tag: 'mermaid',
        wrap: 'div.mermaid'
      });
   });
}
