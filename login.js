// const meineDB = (function() {
	
// }());

const key = 'db.data';

let storedData = localStorage.getItem(key);

if (null != storedData) {
	let pass = prompt("Enter your password to decrypt your credentials");

	if (null == pass || "" == pass) {
		throw Error("Empty password!");
	}

	const bytes = CryptoJS.AES.decrypt(
		storedData.toString(), 
		pass
	);

	pass = undefined;

	if (null == bytes || null == bytes.toString() || "" == bytes.toString()) {
		throw Error("Empty password.");
	}

	var plainData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
} else {
	var plainData = getAccountInfo();
	console.log(plainData, 'else');
  	const cipherData = CryptoJS.AES.encrypt(
  		JSON.stringify(plainData), 
  		prompt("Please enter your encryption password")
  	);

  	localStorage.setItem(key, cipherData);
}


window.document.getElementById('branch').value = plainData.branch;
window.document.getElementById('account').value = plainData.account;
window.document.getElementById('pin').value = plainData.pin;
window.document.getElementsByClassName('confirm')[0].click();

function getAccountInfo() {
  let branch = prompt("Please enter your bank branch");
  let account = prompt("Please enter your bank account number");
  let pin = prompt("Please enter your pin");

  return {branch: branch, account: account, pin: pin};
}