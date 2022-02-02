# saml-searchbox

Brings search box with autocomplete to AWS SAML login page.

The extension in using Manifest V2 which is compatible with both Chrome, Firefox and probably other browsers.

It is inspired by [https://github.com/speshak/aws-saml-search](https://github.com/speshak/aws-saml-search). 
I wanted something similar but without the `bootstrap` and `jquery` dependency. 
This allows the code to be short and easy to inspect and was mandatory since it is being used in a very sensitive place - AWS SAML login page.

### Installation and Development

There are no official releases. Please use methods provided below.

#### FireFox

  * Clone this repository
  * Navigate to [about:debugging](about:debugging)
  * Click `This Firefox` -> `Load Temporary Add-on`
  * Select `manifest.json` file from the cloned repository

#### Chrome

  * Clone this repository
  * Navigate to [chrome://extensions/](chrome://extensions/)
  * Enable Developer Mode
  * Click `Load Unpacked"
  * Select the cloned repository folder
