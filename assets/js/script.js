let activities = [];
const trackerGrid = document.getElementById("tracker-grid");
const btnWrapper = document.getElementById("btn-wrapper");

// Access data and populate UI
async function populateTracker() {
  const response = await fetch("../data/data.json");
  activities = await response.json();

  updateTracker("weekly");
}

// Populate UI: toggle button and loop through json data, creating and appending a widget for each activity
function updateTracker(timeframe) {
  // Toggle selected button
  toggleSelected(btnWrapper.querySelector(`[data-timeframe="${timeframe}"]`));

  // Create widgets
  activities.forEach((activity) => {
    // Access and clone template
    const template = document.getElementById("widget-template");
    const clone = template.content.cloneNode(true);

    // Add activity class to underlay
    clone
      .querySelector(".underlay")
      .classList.add(activity.title.replaceAll(" ", "").toLowerCase());

    // Fill in widget title
    clone.querySelector("h3.widget-title").textContent = activity.title;

    // Fill in current time
    const curTime = clone.querySelector("p.current");

    curTime.textContent = `${activity.timeframes[timeframe].current}hr`;

    if (activity.timeframes[timeframe].current !== 1) {
      pluralizeHr(curTime);
    }

    // Fill in previous time
    const prevTime = clone.querySelector("p.previous");

    switch (timeframe) {
      case "daily":
        prevTime.textContent = `Yesterday - ${activity.timeframes[timeframe].previous}hr`;
        break;

      case "weekly":
        prevTime.textContent = `Last Week - ${activity.timeframes[timeframe].previous}hr`;
        break;

      case "monthly":
        prevTime.textContent = `Last Month - ${activity.timeframes[timeframe].previous}hr`;
        break;
    }

    if (activity.timeframes[timeframe].previous !== 1) {
      pluralizeHr(prevTime);
    }

    // Append completed widget to tracker
    trackerGrid.appendChild(clone);
  });
}

// Helper function - hr to hrs
function pluralizeHr(el) {
  el.textContent += "s";
}

// Helper function - clear tracker UI
function clearTracker() {
  const elsToClear = trackerGrid.querySelectorAll(".clearable");

  elsToClear.forEach((el) => {
    el.remove();
  });
}

// Helper function - toggle selected class on timeframe btns
function toggleSelected(btn) {
  btnWrapper.querySelector(".selected")?.classList.remove("selected");

  btn.classList.add("selected");
}

// Initialize Tracker
populateTracker();

// Event Listener - timeframe btn clicks
btnWrapper.addEventListener("click", (e) => {
  if (e.target.classList.contains("timeframe-btn")) {
    clearTracker();
    updateTracker(e.target.dataset.timeframe);
  }
});
