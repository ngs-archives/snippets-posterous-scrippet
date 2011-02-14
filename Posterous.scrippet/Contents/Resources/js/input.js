var
  validateTimerId = 0,
  inputEmail = null,
  inputPassword = null,
  checkRemember = null;

function init(scrippet) {
  inputEmail = $("email");
  inputPassword = $("password");
  checkRemember = $("remember");
  inputEmail.value = Scrippet.loadPersistentItem("POSTEROUS_LOGIN_EMAIL") || "";
  inputPassword.value = Scrippet.loadPersistentItem("POSTEROUS_LOGIN_PASSWORD") || "";
  if( inputPassword.value ) {
    checkRemember.checked = true;
  }
  validate();
}

function final(scrippet) {  
  clearTimeout(validateTimerId);
  validateTimerId = 0;
  var
    email = inputEmail.value,
    password = inputPassword.value,
    remember = checkRemember.checked;
  var snippets = Scrippet.getSnippets();
  for(var i=0;i<snippets.length;i++) {
    var snippet = snippets[i];
    snippet.setProperty("POSTEROUS_LOGIN_EMAIL", email);
    snippet.setProperty("POSTEROUS_LOGIN_PASSWORD", password );
    snippet.setProperty("POSTEROUS_SITE_IDS","");
    snippet.setProperty("POSTEROUS_SITE_NAMES","");
    snippet.setProperty("POSTEROUS_ERROR","");
    snippet.setProperty("SNIPPET_INDEX",i);
  }
  if( remember ) {
    Scrippet.storePersistentItem("POSTEROUS_LOGIN_EMAIL", email);
    Scrippet.storePersistentItem("POSTEROUS_LOGIN_PASSWORD", password);
  }
}

function validate() {
  var
    email = inputEmail.value,
    password = inputPassword.value,
    remember = checkRemember.checked;
    
  var valid = 
    isValidEmail( email ) &&
    ( isOneByteChar(password) && password.length >=6 );
  Scrippet.setDefaultButtonEnabled(valid);
  validateTimerId = setTimeout(validate,200);
}

function onFocusPassword() {
  if( inputPassword.value == PASSWORD_PLACEHOLDER )
    inputPassword.value = PASSWORD_PLACEHOLDER;
}

function update() {

}

Scrippet.onFinalize = final;
Scrippet.onInitialize = init;
