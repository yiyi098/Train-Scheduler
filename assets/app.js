
var dataRef = firebase.database();

var train = "";
var destination = "";
var time = "";
var frequency = "";

$("#add-train").on("click", function(event) {
  // event.preventDefault();

  train = $("#train-input").val().trim();
  destination = $("#destination-input").val().trim();
  time = $("#time-input").val().trim();
  frequency = $("#frequency-input").val().trim();

  dataRef.ref().push({

    train: train,
    destination: destination,
    time: time,
    frequency: frequency,
    dateAdded: firebase.database.ServerValue.TIMESTAMP
  });

  $("#train-input").val("");
  $("#destination-input").val("");
  $("#time-input").val("");
  $("#frequency-input").val("");

  // window.location.reload();

});

dataRef.ref().on("child_added", function(childSnapshot) {

  // Log everything that's coming out of snapshot
  console.log(childSnapshot.val().train);
  console.log(childSnapshot.val().destination);
  console.log(childSnapshot.val().time);
  console.log(childSnapshot.val().frequency);
  console.log(childSnapshot.val().dateAdded);

  var train = childSnapshot.val().train;
  var destination = childSnapshot.val().destination;
  var time = childSnapshot.val().time;
  var frequency = childSnapshot.val().frequency;

  var startTimeConverted = moment(time, "hh:mm").subtract(1, "years");
  var timeDiff = moment().diff(moment(startTimeConverted), "minutes");
  var timeRemain = timeDiff % childSnapshot.val().frequency;
  var minutesAway = childSnapshot.val().frequency - timeRemain;
  var nextArrival = moment().add(minutesAway, "minutes");
  var formattedNextArrival = moment(nextArrival).format("LT");

  $("#train-table > tbody").append("<tr><td>" + train + 
    "</td><td>" + destination + 
    "</td><td>" + frequency + 
    "</td><td>" + formattedNextArrival + 
    "</td><td>" + minutesAway + "</td><td>");

// Handle the errors
}, function(errorObject) {
  console.log("Errors handled: " + errorObject.code);
});

setInterval(function() {
  window.location.reload();
}, 60000);