  //Initialize Firebase
  var config = {
      apiKey: "AIzaSyBQYRiPGo2COqm-GWkO77nfCJDrAUDRxwQ",
      authDomain: "train-schedule-ac7d2.firebaseapp.com",
      databaseURL: "https://train-schedule-ac7d2.firebaseio.com",
      projectId: "train-schedule-ac7d2",
      storageBucket: "train-schedule-ac7d2.appspot.com",
      messagingSenderId: "830567343349"
  };

  firebase.initializeApp(config);
  var database = firebase.database();


  $("#submitButton").on("click", function() {

    console.log("button clicked");

      //get user inputs
      var trainName = $("#trainName").val().trim();
      var destination = $("#destination").val().trim();
      var firstTrain = $("#firstTrain").val().trim();
      var frequency = $("#frequency").val().trim();

      var nextArrival = "12:30"; //placeholder
      var minutesAway = "10"; //placeholder

      event.preventDefault();


      //clear input boxes
      $('#trainName').val('');
      $('#destination').val('');
      $('#firstTrain').val('');
      $('#frequency').val('');


      //push values to database
      database.ref().push({
          trainName: trainName,
          destination: destination,
          frequency: frequency,
          nextArrival: nextArrival,
          minutesAway: minutesAway

      });

  });

  database.ref().on("child_added", function(childSnapshot) {

      $("#mainTable").append('<tr><td>' + childSnapshot.val().trainName + '</td><td>' + childSnapshot.val().destination + '</td><td>' + childSnapshot.val().frequency + '</td><td>' + childSnapshot.val().nextArrival + '</td><td>' + childSnapshot.val().minutesAway + '</td></tr>');
  });
