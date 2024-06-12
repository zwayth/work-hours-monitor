// Initialize allowed URLs and work hours from storage
let allowedUrls = [];
let workHours = [];
let activityLogs = [];
chrome.storage.sync.get(['allowedUrls', 'workHours', 'activityLogs'], function(data) {
  allowedUrls = data.allowedUrls || [];
  workHours = data.workHours || [];
  activityLogs = data.activityLogs || [];
});

// Listen for URL changes
chrome.webNavigation.onCommitted.addListener(function(details) {
  let url = details.url;
  let currentTime = new Date().getHours() + ':' + new Date().getMinutes();

  // Check if the URL is allowed for work and if it's during work hours
  if (allowedUrls.some(allowedUrl => url.startsWith(allowedUrl)) && isWithinWorkHours(currentTime)) {
    logWorkActivity(url, currentTime);
  }
}, {urls: ["<all_urls>"]});

// Function to log work activity
function logWorkActivity(url, currentTime) {
  let activityLog = {
    url: url,
    timestamp: currentTime
  };
  activityLogs.push(activityLog);

  // Store activity logs in Chrome storage
  chrome.storage.sync.set({ activityLogs: activityLogs }, function() {
    console.log('Work activity logged successfully');
  });
}

// Function to check if the current time is within work hours
function isWithinWorkHours(currentTime) {
  return workHours.some(workHour => currentTime >= workHour.start && currentTime <= workHour.end);
}