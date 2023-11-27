// Function to calculate the average and respond to the popup
function calculateAverage(sendResponse) {
  var regexPattern = /\b\d+\.\d{3}\b/g;
  var grades = document.body.innerText.match(regexPattern);
  var average = null;

  if (grades) {
    var sum = grades.reduce(
      (acc, grade) => acc + parseFloat(grade.replace(".", "")),
      0
    );
    average = sum / grades.length / 1000; // Correct for the removed dot and calculate average
    console.log("Calculated Durchschnitt:", average);
    sendResponse({ average: average });
  } else {
    console.log("No grades found to calculate a Durchschnitt.");
    sendResponse({ average: null });
  }
}

// Listen for a message from the popup to start the calculation
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.type === "calculateAverage") {
    calculateAverage(sendResponse);
    // Return true to indicate that you wish to send a response asynchronously
    return true;
  }
});
