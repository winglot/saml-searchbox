function parseAccounts() {
  var accounts = document.querySelectorAll("fieldset > .saml-account");

  var accountRoles = [];

  for(var i = 0; i < accounts.length; i++) {
    var account = accounts.item(i);
    var accountName = account.querySelector(".saml-account-name").textContent;
    accountName = accountName.substring(9, accountName.length);

    var accountReg = /(\d{12})/;
    var accountNum = accountName.match(accountReg)[1];

    var partitionReg = /(arn:)([^:]+)/;
    var accountArn = account.querySelector(".saml-radio").value;
    var accountPartition = accountArn.match(partitionReg)[2];
    
    // Find the roles
    var roles = account.querySelectorAll(".saml-role");
    for(var j = 0; j < roles.length; j++) {
      var roleName = roles.item(j).textContent.trim();
      accountRoles.push({
        "id": `arn:${accountPartition}:iam::${accountNum}:role/${roleName}`,
        "text": `${accountName} - ${roleName}`,
        "accountNum": accountNum,
        "roleName": roleName,
      });
    }

  }

  return accountRoles;
}

function createSearchBox() {
  var accounts = parseAccounts()
  
  document.querySelector("#saml_form").insertAdjacentHTML("afterbegin", `
    <br>
    <div class="saml-account">
      <label for="account-search" style="font-size: 16px;">Search for an account or role:</label>
      <input
        style="float: left; width: 100%; border: 2px solid lightgrey; padding: 10px; border-radius: 8px; outline: none;"
        autocomplete="off"
        type="text"
        id="account-search"
        list="account-search-list"
        placeholder="Type role name, account alias or id..."
      />
    <datalist id="account-search-list"></datalist>
    </div>
    <br><br><br>
  `);

  accounts.forEach(function(element){
    document.querySelector("#account-search-list")
      .insertAdjacentHTML(
        "beforeend",
        `<option data-role-arn="${element.id}">${element.text}</option>`
      )
  })

  document.querySelector('#account-search').addEventListener("input", function(e) {
    var userText = e.target.value;
    document.querySelectorAll("#account-search-list > option").forEach(function(item) {
      if (item.text == userText) {
        arn = item.getAttribute("data-role-arn");
        document.querySelector(`input[value="${arn}"]`).checked = true
        document.querySelector("#saml_form").submit();
      }
    })
  });

  document.querySelector('#account-search').focus();
}

createSearchBox();
