function openDBWebsite(callback) {
  chrome.tabs.create(getDefaultTabProperties(), callback);
}

function getDefaultTabProperties() {
  return {
    url: "https://meine.deutsche-bank.de/trxm/db/"
  };
}


chrome.browserAction.onClicked.addListener(function() {
  openDBWebsite();
});