let currentAverage = null; // Variable to store the current average

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  console.log("Message received from content script:", message);

  if (message.type === "newAverage" && typeof message.average === "number") {
    currentAverage = message.average;
    console.log("New average stored:", currentAverage);
  }

  // Confirm that message has been received and handled
  sendResponse({ status: "Average updated" });
  return true;
});

// Respond to the popup's request for the average
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.type === "getAverage") {
    console.log("Popup requested the average:", currentAverage);
    sendResponse({ average: currentAverage });
  }
  return true;
});
