document.addEventListener("DOMContentLoaded", function () {
  var displayElement = document.getElementById("average-display");
  displayElement.textContent = "Calculating...";

  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(
      tabs[0].id,
      { type: "calculateAverage" },
      function (response) {
        if (chrome.runtime.lastError) {
          displayElement.textContent = "Error fetching the average.";
          console.error("Popup error:", chrome.runtime.lastError.message);
        } else if (response && typeof response.average === "number") {
          displayElement.textContent = `Durchschnitt: ${response.average.toFixed(
            3
          )}`;
          console.log("Popup displays the Average:", response.average);
        } else {
          displayElement.textContent = "No Average calculated yet.";
          console.log("Popup could not find a Average to display.");
        }
      }
    );
  });
});
