// Load allowed URLs and work hours from storage
chrome.storage.sync.get(['allowedUrls', 'workHours'], function(data) {
    let allowedUrls = data.allowedUrls || [];
    let workHours = data.workHours || [];
  
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
  
    // Add event listeners
    document.getElementById('add-url').addEventListener('click', function() {
      let newUrl = document.getElementById('new-url').value.trim();
      if (newUrl) {
        allowedUrls.push(newUrl);
        chrome.storage.sync.set({ allowedUrls: allowedUrls }, function() {
          let li = document.createElement('li');
          li.textContent = newUrl;
          allowedUrlsElement.appendChild(li);
          document.getElementById('new-url').value = '';
        });
      }
    });
  
    document.getElementById('add-work-hour').addEventListener('click', function() {
      let newStart = document.getElementById('new-start').value.trim();
      let newEnd = document.getElementById('new-end').value.trim();
      if (newStart && newEnd) {
        let workHour = { start: newStart, end: newEnd };
        workHours.push(workHour);
        chrome.storage.sync.set({ workHours: workHours }, function() {
          let li = document.createElement('li');
          li.textContent = `${newStart} - ${newEnd}`;
          workHoursElement.appendChild(li);
          document.getElementById('new-start').value = '';
          document.getElementById('new-end').value = '';
        });
      }
    });
  });