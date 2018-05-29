// Based on https://github.com/discourse/discourse-math/blob/master/assets/javascripts/lib/discourse-markdown/discourse-math.js.es6

function isBlockMarker(state, start, max, md) {

  if (state.src.charCodeAt(start) !== 36 /* $ */) {
    return false;
  }

  start++;

  if (state.src.charCodeAt(start) !== 36 /* $ */) {
    return false;
  }

  start++;

  // ensure we only have newlines after our $$
  for(let i=start; i < max; i++) {
    if (!md.utils.isSpace(state.src.charCodeAt(i))) {
      return false;
    }
  }

  return true;
}

function blockMermaid(state, startLine, endLine, silent){
  let
    start = state.bMarks[startLine] + state.tShift[startLine],
    max = state.eMarks[startLine];

  if (!isBlockMarker(state, start, max, state.md)) {
    return false;
  }

  if (silent) { return true; }

  let nextLine = startLine;
  let closed = false;
  for (;;) {
    nextLine++;

    if (isBlockMarker(state, state.bMarks[nextLine] + state.tShift[nextLine], state.eMarks[nextLine], state.md)) {
      closed = true;
      break;
    }
  }

  let token = state.push('html_raw', '', 0);

  let endContent = closed ? state.eMarks[nextLine-1] : state.eMarks[nextLine];
  let content = state.src.slice(state.bMarks[startLine+1] + state.tShift[startLine+1], endContent);

  const escaped = state.md.utils.escapeHtml(content);
  token.content = `<div class='mermaid'>\n${escaped}\n</div>\n`;

  state.line = closed ? nextLine+1 : nextLine;

  return true;
}

export function setup(helper) {

  if (!helper.markdownIt) { return; }

  helper.registerOptions((opts, siteSettings) => {
    opts.features.mermaid = siteSettings.discourse_mermaid_enabled;
  });

  helper.whiteList(['div.mermaid']);

  helper.registerPlugin(md => {
    md.block.ruler.after('code', 'mermaid', blockMermaid, {
      alt: ['paragraph', 'reference', 'blockquote', 'list']
    });
  });
}
