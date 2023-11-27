let currentAverage = null;

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  console.log("Message received from content script:", message);

  if (message.type === "newAverage" && typeof message.average === "number") {
    currentAverage = message.average;
    console.log("New average stored:", currentAverage);
  }

  sendResponse({ status: "Average updated" });
  return true;
});

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.type === "getAverage") {
    console.log("Popup requested the average:", currentAverage);
    sendResponse({ average: currentAverage });
  }
  return true;
});
