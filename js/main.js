// initialize ftDown here, since it's used by both functions
var ftDown;
// south reservoirs object
// access 1264 key by running: south[1264]. this returns the information for 1264, as pulled from the smartcover site. the format of the returned info is {1264: 13.3}, where 1264 is a string and 13.3 is a number. to get jsut 13.3, run south[1264]['1264']
var south = {
  1264: 13.3,
  13151: 21.5,
  13154: 20.0,
  200814: 20.5,
  20813: 1.9,
  20814: 23.5,
  22033: 19.8,
  24140: 24.0,
  27916: 16.8,
  28150: 2.2,
  32939: 30.0,
  33930: 16.5,
} // closes south object
var north = {
  43210: 13.3,
  43610: 21.5,
  53116: 20.0,
  52698: 20.5,
  51771: 1.9,
  62310: 23.5,
  63210: 19.8,
} // closes north object
// initialize empty array for storing reservoir keys from north or south object
var output = [];
// jquery functions
$(document).ready(function() {
  // hide the error message for empty input
  $('#alert_message').hide();
  // target the nav when screen size falls below the breakpoint
  $('.menu-container').on('click', function(){
    // give the menu another class of open if it doesn't have it already. Remove it if it does
    $('.list-inline').toggleClass('open');
    // add class of change to menu-container div when it's clicked. This will trigger the css change selector
    $('.menu-container').toggleClass('change');
  }) // ends click function for hamburger menu
  // when the user clicks south button in the nav
  $('li#south_button').click(function() {
    $('li#south_button').addClass('active').css('font-weight','bold');
    $('li#north_button').removeClass('active').css('font-weight','normal');
    // change text color to white of the unselected button
    $('li#north_button a').css('color','#fff');
    // make output empty to remove anything in it. this is needed so the array from which the select is built is emptied of its previous values each time the north or south button is clicked
    output = [];
    // send the south reservoir object keys to the select tag in the markup
    $.each(south, function(key, value)
    {
      output.push('<option id="'+ key +'">'+ key +'</option>');
    }); // ends south function for  each key, value
    // join returns a string from an array, in this case the output array. so, at this point, the output array now holds all the keys from the south object. join('') places all the strings next to each other without whitespace. this allows each one to be used as an option on the res_dropdown select. use html since the markup is being modified. another advantage of using this method that i've read, is the DOM gets modified only once. changing and modifying the dom should be done as little as possible. other answers on SO showed an append to the DOM each time a new option was to be inserted. that is far more "expensive" than collecting all items to be used as options and updating the DOM once.
    $('#res_dropdown').html(output.join(''));
  }) // ends south button click function
  // when the user clicks north button in the nav
  $('li#north_button').click(function() {
    $('li#south_button').removeClass('active').css('font-weight','normal');
    $('li#north_button').addClass('active').css('font-weight','bold');
    // make output empty to remove anything in it. this is needed so the array from which the select is built is emptied of its previous values each time the north or south button is clicked
    output = [];
    // send the north reservoir object keys to the select tag in the markup
    $.each(north, function(key, value)
    {
      output.push('<option id="'+ key +'">'+ key +'</option>');
    }); // ends south function for  each key, value
    // join returns a string from an array, in this case the output array. so, at this point, the output array now holds all the keys from the north object. join('') places all the strings next to each other without whitespace. this allows each one to be used as an option on the res_dropdown select. use html since the markup is being modified
    $('#res_dropdown').html(output.join(''));
  }) // ends north button click function
   // when the feet down button is clicked
  $("button").click(function() {
    // sanity check for empty input field for a reservoir. this shows the bootstrap alert and also closes it after 2 seconds, 2000 milliseconds. this works once, but doesn't keep working if the form is still left blank and the feet down button is repeatedly clicked.
    // the issue was with using alert('close'), as this didn't just close the alert, it nuked it off the markup altogether. i switched to using $('#alert_message').hide(); and it... almost works. now the alert shows each time, regardless
    // to fix that, i tested the length of the value. if it was less than 1, as in less than 1 character entered for this form, show the alert for 2 seconds. works great! it constantly tests the input field, and no longer shows the alert when a value is present
    if($('#sc_level').val().length < 1) {
      $('#alert_message').show();
      setTimeout(function() {
        $('#alert_message').hide();
      }, 3000);
    }
  	// run the resLevel function when the button is clicked. grab the text of the selected option from the dropdown and use this as the first parameter of the resLevel function. the second parameter is the inputted smartcover level from the user. grab that value using .val()
  	resLevel($('#res_dropdown option:selected').text(), $('#sc_level').val());
  }); // ends button click function
}); // ends jquery ready function

// set the measurement results to be outputted to the dom. note that ftDown is global and will be passed in once the resLevel function is called by the button click
function resultText(level) {
	// sanity check for the singular unit
    if(ftDown === 1) {
    	// send the result of the calculation to the dom using html, and use html() in order to render the added span tag
      	$('#result').html($('#res_dropdown option:selected').text() + ' is ' + "<span class='num_text'>" + ftDown + "</span>" + ' foot down');
    } else {
     	// use toFixed for rounding the displayed results
      	ftDown = ftDown.toFixed(2);
        // send the result of the calculation to the dom using html, and use html() in order to render the added span tag
      	$('#result').html($('#res_dropdown option:selected').text() + ' is ' + "<span class='num_text'>" + ftDown + "</span>" + ' feet down');
    } // ends else
} // ends resultText

// function for reservoir levels. res is a user selected reservoir, reading is the most up to date level on the graph for that reservoir from the SmartCover site
function resLevel(res, reading) {
  // convert string input from dropdown to integer
	if(typeof(res) === 'string') {
		res = parseInt(res);
	}
  // sanity check for an actual value present in reading input field
  if(reading === '') {
    return 'Value left blank!';
  }
	switch(res) {
		case 43210:
			ftDown = reading - 3.2;
      // get and display feet down results
			resultText(ftDown);
			break;
		case 43610:
			ftDown = 12.5 - reading;
      // get and display feet down results
			resultText(ftDown);
			break;
		case 51771:
			ftDown = 19.5 - reading;
      // get and display feet down results
			resultText(ftDown);
			break;
		case 52698:
			ftDown = 19.3 - reading;
      // get and display feet down results
			resultText(ftDown);
			break;
		case 53116:
			ftDown = ((reading/12) - (27/12));
      // get and display feet down results
			resultText(ftDown);
			break;
		case 62310:
			ftDown = 12.5 - reading;
      // get and display feet down results
			resultText(ftDown);
			break;
		case 63210:
			ftDown = 14.6 - reading;
      // get and display feet down results
			resultText(ftDown);
			break;
    case 1264:
      ftDown = south[1264] - reading;
      // get and display feet down results
			resultText(ftDown);
			break;
    case 13151:
      ftDown = south[13151] - reading;
      // get and display feet down results
			resultText(ftDown);
			break;
    case 13154:
      ftDown = south[13154] - reading;
      // get and display feet down results
			resultText(ftDown);
			break;
    case 200814:
      ftDown = south[200814] - reading;
      // get and display feet down results
			resultText(ftDown);
			break;
    case 20813:
      ftDown = reading - south[20813];
      // get and display feet down results
			resultText(ftDown);
			break;
    case 20814:
      ftDown = south[20814] - reading;
      // get and display feet down results
			resultText(ftDown);
			break;
    case 22033:
      ftDown = south[22033] - reading;
      // get and display feet down results
			resultText(ftDown);
			break;
    case 24140:
      ftDown = south[24140] - reading;
      // get and display feet down results
			resultText(ftDown);
			break;
    case 27916:
      ftDown = south[27916] - reading;
      // get and display feet down results
			resultText(ftDown);
			break;
    case 28150:
      ftDown = reading - south[28150];
      // get and display feet down results
			resultText(ftDown);
			break;
    case 32939:
      ftDown = south[32939] - reading;
      // get and display feet down results
			resultText(ftDown);
			break;
    case 33930:
      ftDown = south[33930] - reading;
      // get and display feet down results
			resultText(ftDown);
			break;
		} // ends switch
} // ends resLevel
