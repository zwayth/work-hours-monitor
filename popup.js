// Get allowed URLs, work hours, and activity logs from storage
chrome.storage.sync.get(['allowedUrls', 'workHours', 'activityLogs'], function(data) {
    let allowedUrls = data.allowedUrls || [];
    let workHours = data.workHours || [];
    let activityLogs = data.activityLogs || [];
  
    // Update status
    let statusElement = document.getElementById('status');
    let currentTime = new Date().getHours() + ':' + new Date().getMinutes();
    if (isWithinWorkHours(currentTime, workHours)) {
      statusElement.textContent = 'Currently within work hours';
    } else {
      statusElement.textContent = 'Currently outside work hours';
    }
  
    // Render allowed URLs
    let allowedUrlsElement = document.getElementById('allowed-urls');
    allowedUrls.forEach(function(url) {
      let li = document.createElement('li');
      li.textContent = url;
      allowedUrlsElement.appendChild(li);
    });
  
    // Render work hours
    let workHoursElement = document.getElementById('work-hours');
    workHours.forEach(function(workHour) {
      let li = document.createElement('li');
      li.textContent = `${workHour.start} - ${workHour.end}`;
      workHoursElement.appendChild(li);
    });
  
    // Render activity logs
    let activityLogsElement = document.getElementById('activity-logs');
    activityLogs.forEach(function(log) {
      let li = document.createElement('li');
      li.textContent = `${log.timestamp} - ${log.url}`;
      activityLogsElement.appendChild(li);
    });
  });
  
  // Function to check if the current time is within work hours
  function isWithinWorkHours(currentTime, workHours) {
    return workHours.some(workHour => currentTime >= workHour.start && currentTime <= workHour.end);
  }