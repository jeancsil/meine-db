const meineDB = (function(CryptoJS) {
	var retrievePassword = function() {
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

			return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
		} 

		var plainData = getAccountInfo();

	  	const cipherData = CryptoJS.AES.encrypt(
	  		JSON.stringify(plainData), 
	  		prompt("Please enter your encryption password")
	  	);

	  	localStorage.setItem(key, cipherData);

	  	return plainData;
	};

	var login = function(data){
		window.document.getElementById('branch').value = data.branch;
		window.document.getElementById('account').value = data.account;
		window.document.getElementById('pin').value = data.pin;
		window.document.getElementsByClassName('confirm')[0].click();
	};

	var getAccountInfo = function() {
	  let branch = prompt("Please enter your bank branch");
	  let account = prompt("Please enter your bank account number");
	  let pin = prompt("Please enter your pin");

	  return {branch: branch, account: account, pin: pin};
	};

	return {
		login: login,
		retrievePassword: retrievePassword
	};
}(CryptoJS));

const password = meineDB.retrievePassword();
meineDB.login(password);