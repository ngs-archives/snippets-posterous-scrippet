
function copyURL( URL, name ) {
  Scrippet.setClipboard(URL);
  $("copy-note").innerHTML = "Snippet ‘" +
                                    name +
       "’ was copied into the Clipboard.";
}

function init(scrippet) {
  var
    snippets = Scrippet.getSnippets(),
    clipboardContents = [],
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