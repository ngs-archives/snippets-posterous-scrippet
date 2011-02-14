
function $(id) { return document.getElementById(id); }

function isValidEmail(address) { return /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i.test(address); }

function isOneByteChar(str) { return /^[ -~]+$/.test(str); }

function showError( msg ) {
  $("wrapper").innerHTML = "<p class=\"error\">"+ msg +"<\/p>";
  Scrippet.setDefaultButtonEnabled(false);
}