// swap buttons
const controlbtn1 = document.getElementById("btn1");
const controlbtn2 = document.getElementById("btn2");
const controlbtn3 = document.getElementById("btn3");

controlbtn1.onclick = () => {
  controlbtn3.classList.remove("active");
  controlbtn2.classList.remove("active");
  controlbtn1.classList.add("active");
  document.getElementById("clock").style.display = "flex";
  document.getElementById("stopwatch").style.display = "none";
  document.getElementById("timer").style.display = "none";
};

controlbtn2.onclick = () => {
  controlbtn3.classList.remove("active");
  controlbtn1.classList.remove("active");
  controlbtn2.classList.add("active");
  document.getElementById("clock").style.display = "none";
  document.getElementById("stopwatch").style.display = "block";
  document.getElementById("timer").style.display = "none";
};

controlbtn3.onclick = () => {
  controlbtn1.classList.remove("active");
  controlbtn2.classList.remove("active");
  controlbtn3.classList.add("active");
  document.getElementById("clock").style.display = "none";
  document.getElementById("stopwatch").style.display = "none";
  document.getElementById("timer").style.display = "block";
};

// Local clock
var sec = 0;
var min = 0;
var hour = 0;
var date = new Date();

setInterval(function () {
  date = new Date();
  sec = date.getSeconds() * 6;
  min = date.getMinutes() * 6;
  hour = date.getHours() * 30 + Math.round(min / 12);
  document.getElementById("secondline").style.transform =
    "rotate(" + sec + "deg)";
  document.getElementById("minuteline").style.transform =
    "rotate(" + min + "deg)";
  document.getElementById("hourline").style.transform =
    "rotate(" + hour + "deg)";
}, 1000);

// live hour
function LiveHour() {
  let hour = new Date().getHours().toString().padStart(2, 0);
  let minute = new Date().getMinutes().toString().padStart(2, 0);
  let second = new Date().getSeconds().toString().padStart(2, 0);

  document.getElementById(
    "livehour"
  ).innerHTML = `${hour} : ${minute} : ${second}`;
}
setInterval(() => {
  LiveHour();
}, 1000);

document.getElementById("livedate").innerHTML = date.toLocaleDateString(
  "fr-FR",
  {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }
);

// global clock
const TimeAPI = "XIRAJV95WQPQ";

const WorldClockDisplay = document.getElementById("WorldClockDisplay");
const WorldClockSelect = document.getElementById("WorldClockSelect");
let Timezones = [];

// Default Times
// function updateWorldClock() {
//   const locations = document.querySelectorAll(".location");
//   const now = new Date();

//   locations.forEach((loc) => {
//     const zone = loc.getAttribute("data-zone");
//     const timeElem = loc.querySelector(".time");
//     const dateElem = loc.querySelector(".date");

//     const timeOptions = {
//       timeZone: zone,
//       hour: "2-digit",
//       minute: "2-digit",
//       second: "2-digit",
//       hour12: true,
//     };
//     const dateOptions = {
//       timeZone: zone,
//       weekday: "short",
//       month: "short",
//       day: "numeric",
//     };

//     timeElem.textContent = now.toLocaleTimeString("en-US", timeOptions);
//     dateElem.textContent = now.toLocaleDateString("en-US", dateOptions);
//   });
// }
// // Run immediately and every second
// updateWorldClock();
// setInterval(updateWorldClock, 1000);

// Function to get HH:MM:SS
function getTimeString(timestamp) {
  const date = new Date(timestamp * 1000);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
}
// Function to get MM/DD/YY
function getDateString(timestamp) {
  const date = new Date(timestamp * 1000);
  const month = date.toLocaleString("en-US", { month: "long" });
  const day = date.getDate().toString().padStart(2, "0");
  const year = date.getFullYear().toString().slice(-2);
  return `${month} ${day}, ${year}`;
}

// fill Select
fetch(
  `https://api.timezonedb.com/v2.1/list-time-zone?key=${TimeAPI}&format=json`
)
  .then((response) => response.json())
  .then((data) => {
    Timezones = data.zones;
    for (let timezone of Timezones) {
      let opt = document.createElement("option");
      opt.value = timezone.zoneName;
      opt.textContent = timezone.countryName;
      WorldClockSelect.appendChild(opt);
    }
  });

//   Search Select
WorldClockSelect.addEventListener("change", () => {
  if (WorldClockSelect.value !== "Select Your Zone") {
    WorldClockDisplay.innerHTML = "";
    fetch(
      `https://api.timezonedb.com/v2.1/list-time-zone?key=${TimeAPI}&format=json&by=zone&zone=${WorldClockSelect.value}`
    )
      .then((response) => response.json())
      .then((data) => {
        let SelectedPlace = data.zones[0];
        WorldClockDisplay.innerHTML = `
            <div class="location">
                <div>
                    <h3>${SelectedPlace.countryName}</h3>
                    <p>${SelectedPlace.zoneName}</p>
                </div>
                <div>
                    <h3 style="text-align: end;">${getTimeString(
                      SelectedPlace.timestamp
                    )}</h3>
                    <p>${getDateString(SelectedPlace.timestamp)}</p>
                </div>
            </div>`;
      });
  }else{
    WorldClockDisplay.innerHTML = `<h2 style="margin: 0 auto;">Please Selsect Your Zone</h2>`;
  }
});

// stopwatch
const startwatchbtn = document.getElementById("startwatch");
const resetwatchbtn = document.getElementById("resetwatch");
const pausewatchbtn = document.getElementById("pausewatch");
const lapbtn = document.getElementById("laps");
const lapsDisplay = document.getElementById("lapsDisplay");
const watchDisplay = document.getElementById("watchDisplay");

let [hrs, mins, secs, ms] = [0, 0, 0, 0];
let timeInterval;
let count = 0;
let isRunning = false;
const zeroPad = (num) => {
  return String(num).padStart(2, "0");
};
// Start
startwatchbtn.addEventListener("click", function () {
  startwatchbtn.style.display = "none";
  pausewatchbtn.style.display = "inline";
  isRunning = true;
  timeInterval = setInterval(() => {
    ms++;
    if (ms == 100) {
      secs++;
      ms = 0;
    }
    if (secs == 60) {
      mins++;
      secs = 0;
    }
    if (mins == 60) {
      hrs++;
      mins = 0;
    }

    watchDisplay.innerHTML = `${zeroPad(hrs)}:${zeroPad(mins)}:${zeroPad(
      secs
    )}.${zeroPad(ms)}`;
  }, 10);
});

// Pause
pausewatchbtn.addEventListener("click", function () {
  startwatchbtn.style.display = "inline";
  pausewatchbtn.style.display = "none";
  clearInterval(timeInterval);
  isRunning = false;
});

// Reset
resetwatchbtn.addEventListener("click", function () {
  [hrs, mins, secs, ms] = [0, 0, 0, 0];
  count = 0;
  watchDisplay.innerHTML = "00:00:00.00";
  startwatchbtn.style.display = "inline";
  pausewatchbtn.style.display = "none";
  lapsDisplay.innerHTML = "<h4>No laps recorded yet</h4>";
  clearInterval(timeInterval);
  isRunning = false;
});

// lap
lapbtn.addEventListener("click", function () {
  if (!isRunning) return;
  if (count == 0) {
    lapsDisplay.innerHTML = "";
  }
  count++;
  let li = document.createElement("li");
  li.innerHTML = `
        <div class="laps" style="margin-top: 5px;">
            <div class="lapnum"> Lap ${count}</div>
            <div class="laptime">${zeroPad(hrs)}:${zeroPad(mins)}:${zeroPad(
    secs
  )}.${zeroPad(ms)}</div>
        </div>
        <hr style="margin-bottom: 10px;">
    `;
  lapsDisplay.appendChild(li);
});

// Timer
const timerDisplay = document.getElementById("timerDisplay");
const hrsinp = document.getElementById("hrsinp");
const mininp = document.getElementById("mininp");
const secinp = document.getElementById("secinp");
const startTimerbtn = document.getElementById("startTimer");
const pauseTimerbtn = document.getElementById("pauseTimer");
const resetTimerbtn = document.getElementById("resetTimer");

let timeleft;
let interval;

// start
startTimerbtn.addEventListener("click", function () {
  timerDisplay.innerHTML = `${zeroPad(hrsinp.value)}:${zeroPad(
    mininp.value
  )}:${zeroPad(secinp.value)}`;

  startTimerbtn.style.display = "none";
  pauseTimerbtn.style.display = "inline";

  hrsinp.readOnly = true;
  mininp.readOnly = true;
  secinp.readOnly = true;

  timeleft =
    parseInt(hrsinp.value) * 3600 +
    parseInt(mininp.value) * 60 +
    parseInt(secinp.value);

  interval = setInterval(() => {
    timeleft--;
    const hours = Math.floor(timeleft / 3600);
    const minutes = Math.floor(timeleft / 60);
    const seconds = timeleft % 60;

    if (timeleft == 0) {
      clearInterval(interval);
      timerDisplay.innerHTML = `${zeroPad(hrsinp.value)}:${zeroPad(
        mininp.value
      )}:${zeroPad(secinp.value)}`;
      alert("Time's up !!!");
    }

    timerDisplay.innerHTML = `${zeroPad(hours)}:${zeroPad(minutes)}:${zeroPad(
      seconds
    )}`;
  }, 1000);
});

// pause
pauseTimerbtn.addEventListener("click", function () {
  clearInterval(interval);
  startTimerbtn.style.display = "inline";
  pauseTimerbtn.style.display = "none";
  hrsinp.readOnly = false;
  mininp.readOnly = false;
  secinp.readOnly = false;
});

// reset
resetTimerbtn.addEventListener("click", function () {
  clearInterval(interval);
  hrsinp.value = "0";
  mininp.value = "25";
  secinp.value = "0";
  timerDisplay.innerHTML = "00:25:00";
  startTimerbtn.style.display = "inline";
  pauseTimerbtn.style.display = "none";
  hrsinp.readOnly = false;
  mininp.readOnly = false;
  secinp.readOnly = false;
});
