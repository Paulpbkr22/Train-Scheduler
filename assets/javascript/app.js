


  // Your web app's Firebase configuration
  var config = {
    apiKey: "AIzaSyBKgZOfsvLSpHOMXgSAb_clpYGpcUo61cw",
    authDomain: "t-project-1e281.firebaseapp.com",
    databaseURL: "https://t-project-1e281.firebaseio.com",
    projectId: "t-project-1e281",
    storageBucket: "t-project-1e281.appspot.com",
    messagingSenderId: "456854710271",
    appId: "1:456854710271:web:bcde29230d1fbdae4369ca"
  };

firebase.initializeApp(config);

var database = firebase.database();

var name;
var destination;
var frequency;


$("#submit-button").on("click", function(event){
    event.preventDefault();


    name = $("#name-input").val().trim();
    destination = $("#destination-input").val().trim();
    time = moment($("#time-input").val().trim(), "HH:mm").format("HH:mm");
    frequency = $("#frequency-input").val().trim();




    database.ref().push({
        name: name,
        destination: destination,
        time: time,
        frequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP

        

    });

    $("#name-input").val("");
    $("#destination-input").val("");
    $("#time-input").val("");
    $("#frequency-input").val("");

    console.log();
});

//the above code works

database.ref().on("child_added", function(snapshot){
    var sv = snapshot.val();

    console.log(sv.name);
    console.log(sv.destination);
    console.log(sv.time);
    console.log(sv.frequency);

    var firstTimeConverted = moment(sv.time, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    var tRemainder = diffTime % sv.frequency;
    console.log(tRemainder);

    var tMinutesTillTrain = sv.frequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("hh:mm");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));



    $(".table").append("<tr><td>" + sv.name + "</td><td>" + sv.destination + "</td><td>" +
    sv.frequency + "</td><td>" + nextTrain + "</td><td>" + tMinutesTillTrain + "</td></tr>");


}, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
    });

