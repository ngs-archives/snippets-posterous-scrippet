var clipboardContents = [];

function copyAll() {
  if(clipboardContents.length) {
    Scrippet.setClipboard(clipboardContents.join("\n"));
    showNote( clipboardContents.length > 1 ?
        "All snippet URLs have been copied to the Clipboard." : 
        "Snippet URL has been copied to the Clipboard" );
  }
}

function copyURL( URL, name ) {
  Scrippet.setClipboard(URL);
  showNote( "Snippet ‘" + name + "’ was copied into the Clipboard." );
}

function showNote( text ) {
  $("copy-note").innerHTML = text;
}

function init(scrippet) {
  var
    snippets = Scrippet.getSnippets(),
    listContents = [];
    
  for (var i = 0; i < snippets.length; i++) {
    var snippet = snippets[i];
    var URL = snippet.getProperty("POSTEROUS_SNIPPET_URL");
    clipboardContents.push(URL);
    listContents.push( getListContent( URL, snippet.getName() ) );
  }
  $("snippets-list").innerHTML = listContents.join("");
}

function getListContent( URL, name ) {
  return "<li><img src=\"copy.png\" style=\"cursor:pointer;\" " +
            "title=\"Copy into Clipboard\" onclick=\"copyURL('" +
           URL + "', '" + name + "');\"/>&nbsp;&nbsp;<a href='" +
                 ( URL.replace(/^https/,"http") ) + "'>" + name +
                                                     "</a></li>";
}


Scrippet.onInitialize = init;