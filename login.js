const cripto = new SecureLS({encodingType: 'aes', encryptionSecret: '', isCompression: false});
const key = 'deutsche.bank';

if (!cripto.get(key)) {
  let data = getAccountInfo();
  let encriptedData = cripto.AES.encrypt(JSON.stringify(data), '').toString();
  cripto.set(key, encriptedData);
}

let data = JSON.parse(cripto.AES.decrypt(cripto.get('deutsche.bank'), '').toString(cripto.enc._Utf8));

window.document.getElementById('branch').value = data.branch;
window.document.getElementById('account').value = data.account;
window.document.getElementById('pin').value = data.pin;
window.document.getElementsByClassName('confirm')[0].click();

function getAccountInfo() {
  let branch = prompt("Please enter your bank branch");
  let account = prompt("Please enter your bank account number");
  let pin = prompt("Please enter your pin");

  return {branch: branch, account: account, pin: pin};
}
