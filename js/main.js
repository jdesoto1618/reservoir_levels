// initialize ftDown here, since it's used by both functions
var ftDown;
// jquery functions
$(document).ready(function() {
	// when the get level button is clicked
    $("button").click(function() {
    	// run the resLevel function when the button is clicked. grab the text of the selected option from the dropdown and use this as the first parameter of the resLevel function. the second parameter is the inputted smartcover level from the user. grab that value using .val()
    	resLevel($('#res_dropdown option:selected').text(), $('#sc_level').val());
    }); // ends click function
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
		} // ends switch
} // ends resLevel
