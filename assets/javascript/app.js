// 1. Initialize Firebase
var config = {
    apiKey: "AIzaSyAMhXY8pr5YtPOeap1TKbcScu4NelzcBog",
    authDomain: "train-scheduler-a2fe9.firebaseapp.com",
    databaseURL: "https://train-scheduler-a2fe9.firebaseio.com",
    projectId: "train-scheduler-a2fe9",
    storageBucket: "train-scheduler-a2fe9.appspot.com",
    messagingSenderId: "405054488888"
};

firebase.initializeApp(config);
var database = firebase.database();

var myTimer = setInterval(myTimer, 1000);

function myTimer() {
    var d = new Date();
    $("#current-time").text(d.toLocaleTimeString());
}

// 2. Button for adding Employees
$("#add-train-btn").on("click", function(event) {
    event.preventDefault();

    // Grabs user input
    var trainName = $("#train-name").val().trim();
    var destination = $("#destination").val().trim();
    var firstTrain = moment($("#first-train").val().trim(), "HH:mm").format("HH:mm");
    var frequency = parseInt($("#frequency").val().trim());
    
    // Moment js functions 
    var firstTrainConverted = moment(firstTrain, "hh:mm");
    var diffTime = moment().diff(moment(firstTrainConverted), "minutes");
    var tRemainder = diffTime % frequency;
    var minutesTilTrain = frequency - tRemainder;
    var minutesAway = minutesTilTrain;
    var nextTrain = moment().add(minutesAway, "minutes");
    var nextTrain2 = moment().add(2, "minutes")
    var nextArrival = moment(nextTrain).format("HH:mm");

//var countDownDate = new Date("Sep 5, 2018 15:37:25").getTime();


// // Update the count down every 1 second
// var minutesAway = setInterval(function() {

//   // Get todays date and time
//   var now = new Date().getTime();

//   // Find the distance between now an the count down date
//   var distance = minutesTilTrain - now;

//   // Time calculations for days, hours, minutes and seconds
//   var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

//   return minutes;
  
//   }, 1000);
  
console.log(minutesAway);
    // Creates local "temporary" object for holding entry data
    
    var newTrain = {
        name: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency,
        nextArrival: nextArrival,
        minutesAway: minutesAway
    };

    // Uploads data to the database
    database.ref().push(newTrain);

  // Logs everything to console
  // console.log(newTrain.name);
  // console.log(newTrain.destination);
  // console.log(newTrain.firstTrain);
  // console.log(newTrain.frequency);

    // Alert
    alert("Train successfully added");
    
    // Clears all of the text-boxes
    $("#train-name").val("");
    $("#destination").val("");
    $("#first-train").val("");
    $("#frequency").val("");
});

// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  // console.log(childSnapshot.val());

  // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var destination = childSnapshot.val().destination;
    var firstTrain = childSnapshot.val().firstTrain;
    var frequency = childSnapshot.val().frequency;
    var nextArrival = childSnapshot.val().nextArrival;
    var minutesAway = childSnapshot.val().minutesAway;
  

  // Add each train's data into the table
    $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
    frequency + "</td><td>" + nextArrival + "</td><td>" + minutesAway + "</td></tr>");
});