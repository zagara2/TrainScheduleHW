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

      // console.log("button clicked");

      //get user inputs
      var trainName = $("#trainName").val().trim();
      var destination = $("#destination").val().trim();
      var firstTrain = $("#firstTrain").val().trim();
      var frequency = $("#frequency").val().trim();

      var firstTimeConverted = moment(firstTrain, "hh:mm").subtract(1, "years");
      // console.log(firstTimeConverted);

      var currentTime = moment();
      // console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm a"));

      // Difference between the times
      var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
      // console.log("DIFFERENCE IN TIME: " + diffTime);

      // Time apart (remainder)
      var tRemainder = diffTime % frequency;
      // console.log(tRemainder);

      // Minute Until Train
      var tMinutesTillTrain = frequency - tRemainder;
      // console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

      // Next Train
      var nextTrain = moment().add(tMinutesTillTrain, "minutes");
      var nextTrainFormatted = moment(nextTrain).format("hh:mm a");
      // console.log("ARRIVAL TIME: " + nextTrainFormatted);


      var nextArrival = nextTrainFormatted.toString();
      var minutesAway = JSON.stringify(tMinutesTillTrain);
      // console.log(nextArrival);
      // console.log(minutesAway);

      var firstTimeConvertedFormat = firstTimeConverted.format("hh:mm a");
      var firstTrainString = firstTimeConvertedFormat.toString();

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
          minutesAway: minutesAway,
          firstTrain: firstTrain

      });

  });

  database.ref().on("child_added", function(childSnapshot) {

      var firstTimeConverted = moment(childSnapshot.val().firstTrain, "hh:mm").subtract(1, "years");
      // console.log(firstTimeConverted);

      var currentTime = moment();
      // console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm a"));

      // Difference between the times
      var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
      // console.log("DIFFERENCE IN TIME: " + diffTime);

      // Time apart (remainder)
      var tRemainder = diffTime % childSnapshot.val().frequency;
      // console.log(tRemainder);

      // Minute Until Train
      var tMinutesTillTrain = childSnapshot.val().frequency - tRemainder;
      // console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

      // Next Train
      var nextTrain = moment().add(tMinutesTillTrain, "minutes");
      var nextTrainFormatted = moment(nextTrain).format("hh:mm a");
      // console.log("ARRIVAL TIME: " + nextTrainFormatted);

      var nextArrival = nextTrainFormatted.toString();
      var minutesAway = JSON.stringify(tMinutesTillTrain);



      $("#mainTable").append('<tr><td>' + childSnapshot.val().trainName + '</td><td>' + childSnapshot.val().destination + '</td><td>' + childSnapshot.val().frequency + '</td><td>' + nextArrival + '</td><td>' + minutesAway + '</td><td id = "train1">' + childSnapshot.val().firstTrain + '</td></tr>');

      // $("#firstTrainTimes").append("<p>"+childSnapshot.val().firstTrain+"</p>");
      // function update () {
      //   console.log("update function");

      //   $("#mainTable").append('<tr><td>' + childSnapshot.val().trainName + '</td><td>' + childSnapshot.val().destination + '</td><td>' + childSnapshot.val().frequency + '</td><td>' + nextArrival + '</td><td>' + minutesAway + '</td><td>'+ childSnapshot.val().firstTrain+'</td></tr>');

      // }

      // intervalId = setInterval(update, 10000);



  });

  function update() {

      var table = document.getElementById('mainTable');

      for (var i = 1; i < table.children[0].children.length; i++) {
          // console.log("loop start");
          var frequency = table.children[0].children[i].children[2].innerHTML;
          var firstTrain = table.children[0].children[i].children[5].innerHTML;

          var firstTimeConverted = moment(firstTrain, "hh:mm").subtract(1, "years");
          // console.log(firstTimeConverted);

          var currentTime = moment();
          // console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm a"));

          // Difference between the times
          var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
          // console.log("DIFFERENCE IN TIME: " + diffTime);

          // Time apart (remainder)
          var tRemainder = diffTime % frequency;
          // console.log(tRemainder);

          // Minute Until Train
          var tMinutesTillTrain = frequency - tRemainder;
          // console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

          // Next Train
          var nextTrain = moment().add(tMinutesTillTrain, "minutes");
          var nextTrainFormatted = moment(nextTrain).format("hh:mm a");
          // console.log("ARRIVAL TIME: " + nextTrainFormatted);


          var nextArrival = nextTrainFormatted.toString();
          var minutesAway = JSON.stringify(tMinutesTillTrain);

          table.children[0].children[i].children[3].innerHTML = nextArrival;
          table.children[0].children[i].children[4].innerHTML = minutesAway;

      }
  }

  function updateInterval() {
      // console.log("update");

      intervalId = setInterval(update, 10000);
  }

  updateInterval();
