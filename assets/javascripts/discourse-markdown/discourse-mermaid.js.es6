export function setup(helper) {
   if(!helper.markdownIt) { return; }

   helper.registerOptions((opts,siteSettings)=>{
      opts.features.['mermaid'] = !!siteSettings.my_extension_enabled;
   });

   helper.whiteList(['div.mermaid']);

   helper.registerPlugin(md=>{
      md.block.bbcode.ruler.push('mermaid',{
        tag: 'mermaid',
        wrap: 'div.mermaid'
      });
   });
}
