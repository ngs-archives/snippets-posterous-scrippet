
var
  select = null,
  checkPrivate = null,
  checkAutopost = null,
  siteIds = [];

function init(scrippet) {
	var snippets = Scrippet.getSnippets();
  select = $("sites");
  checkPrivate = $("is-private");
  checkAutopost = $("autopost");
  var
    i = 1,
    opts = [],
    s = snippets[0],
    error = s.getProperty( "POSTEROUS_ERROR") || "",
    names = ( s.getProperty( "POSTEROUS_SITE_NAMES") || "" ).split("\n"),
    defaultSite =  Scrippet.loadPersistentItem("POSTEROUS_DEFAULT_SITE") || "";
    checkAutopost.disabled = checkPrivate.checked =  Scrippet.loadPersistentItem("POSTEROUS_IS_PRIVATE") == "1";
    checkAutopost.checked =  Scrippet.loadPersistentItem("POSTEROUS_AUTOPOST") == "1";

  if( error ) {
    showError( error );
    return;
  }

  siteIds = ( s.getProperty( "POSTEROUS_SITE_IDS") || "" ).split("\n");

  for(var i=0;i<siteIds.length;i++) {
    var id = siteIds[i], name = names[i];
    if(!(id&&name)) continue;
    var sel = id == defaultSite ? " selected=\"selected\"" : "";
    opts.push("<option value=\""+id+"\""+ sel +">"+name+"<\/option>");
  }
  select.innerHTML = opts.join("");
}

function final(scrippet) {
  var
    snippets  = Scrippet.getSnippets(),
    siteId    = siteIds[select.selectedIndex],
    isPrivate = checkPrivate.checked ? "1" : "",
    autopost  = !checkAutopost.disabled && checkAutopost.checked ? "1" : "";

  for(var i=0;i<snippets.length;i++) {
    var snippet = snippets[i];
    snippet.setProperty("POSTEROUS_SITE_ID", siteId );
    snippet.setProperty("POSTEROUS_IS_PRIVATE", isPrivate );
    snippet.setProperty("POSTEROUS_AUTOPOST", autopost );
    snippet.setProperty("POSTEROUS_SNIPPET_URL","");
  }

  Scrippet.storePersistentItem("POSTEROUS_DEFAULT_SITE", siteId);
  Scrippet.storePersistentItem("POSTEROUS_IS_PRIVATE", isPrivate );
  Scrippet.storePersistentItem("POSTEROUS_AUTOPOST", autopost );
}

Scrippet.onFinalize = final;
Scrippet.onInitialize = init;
