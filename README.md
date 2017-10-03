# Real-Time Train Schedule


## What is it?

This site hosts a train schedule application that incorporates Firebase to store arrival and departure data. The app retrieves and manipulates this information with Moment.js. Up-to-date information about various trains, namely their arrival times and how many minutes remain until they arrive at their station, is displayed on the site. The "minutes to arrival" and "next train time" for each train are updated in real time (i.e., they change automatically without the user having to refresh the page, or anything of that sort). In the box below the schedule, users can input as many new trains as they please. These new trains will then be displayed to all future users of the site along with the trains that were previously there. 

The site is currently deployed at https://zagara2.github.io/TrainScheduleHW/ .

## Technologies Used

* HTML5
* CSS3
* Javascript 
* JQuery
* Firebase
* Moment.js
* Bootstrap

## Browser and Screen Compatibility

### Browser Tests

The site has been tested in Chrome, Firefox, and Internet Explorer. It works exactly as it should on Chrome and Internet Explorer. 

On Firefox, trains which are already in the database update as they should according to the passing of time, and the display automatically updates when a new train is added by another user in a different window - however, a `ReferenceError: event is not defined` is thrown when the user inputs the data for a new train.

Plans to test on Safari are upcoming.

### Screen Compatibility Tests

The site is best viewed on a small to moderately large desktop or notebook (between 1280x800 and 1680x1050), but looks good on essentially any modern device's screen resolution. This includes both a 10" and 12" Netbook, a 13" and 15" notebook, 19"-24" desktops, Kindle Fire, Asus Nexus 7, iPad and iPad Pro, Samsung Galaxy tab, Microsoft Surface Pro, iPhone 3 and up (including iPhone 6-7 plus), Galaxy S2 and up, LG G 3-5, and 480p, 720p and 1080p televisions. 

The site's background is formatted slightly differently for mobile, but is basically the same.

When the page is loaded properly, it should look like this on a desktop/notebook/tablet:

![Desktop/Notebook/Tablet Screen](/assets/images/trainschedule.JPG)

And it should look like this on mobile:

![Mobile Screen](/assets/images/mobile2.JPG)

**(top part of page; rest of page is visible if one keeps scrolling)**

## Future Plans for Improvement

* Try adding update and remove buttons for each train. Let the user edit the row's elements-- allow them to change a train's Name, Destination and Arrival Time (and then, by relation, minutes to arrival).

* Do a little cleaning, i.e., go back into my Firebase database and remove the lazily-named trains put there for testing purposes.