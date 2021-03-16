const form = document.getElementById("vote-form"); //accessing form id =vote form from index.html

form.addEventListener('submit', e => {
  const choice = document.querySelector("input[name=os]:checked").value; //checking that any input in vote-form having input name as os then pass its value in choice
  const data = { os: choice }; //passed as an object

  fetch("http://localhost:3000/poll", {
    method: "post",
    body: JSON.stringify(data),
    headers: new Headers({
      "Constant-Type": "application/json"
    }),
  }) //fecth returns promise which is written down
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => console.log(err));

  e.preventDefault();
});

let dataPoints = [
  { label: "Windows", y: 0 },
  { label: "MacOS", y: 0 },
  { label: "Linux", y: 0 },
  { label: "Other", y: 0 },
];

const chartContainer = document.querySelector("#chartContainer");

if (chartContainer) {
  const chart = new CanvasJS.Chart("chartContainer", {
    animationEnabled: true,
    theme: "theme1",
    title: {
      text: "OS Results",
    },
    data: [
      {
        type: "column",
        dataPoints: dataPoints
      }
    ]
  });
  chart.render();

  // Enable pusher logging - don't include this in production
  Pusher.logToConsole = true;

  var pusher = new Pusher("76569064e8611e4d0e92", {
    cluster: "mt1",
  });

  var channel = pusher.subscribe("os-poll");
  channel.bind("os-vote", function (data) {
    dataPoints = dataPoints.map((x) => {
      if (x.label == data.os) {
        x.y += data.points;
        return x;
      } else {
        return x;
      }
    });
    chart.render();
    // alert(JSON.stringify(data));
  });
}
