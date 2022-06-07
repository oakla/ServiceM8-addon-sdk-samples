'use strict';
var request = require('request');

exports.handler = (event, context, callback) => {
    
    console.log('Received event:', JSON.stringify(event, null, 2));

	var options = {
		'method': 'POST',
		'url': 'https://hooks.zapier.com/hooks/catch/12483802/ba3043e/',
		'headers': {
		  'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			"message": "hello zapier my old friend - from ServiceM8"
		})
	};

	request(options, function (error, response) {
		if (error) throw new Error(error);
		console.log(response.body);
	});

    var strJobUUID = event.eventArgs.jobUUID;

    var strHTMLResponse = `
<html>
	<head>
		<link rel="stylesheet" href="https://platform.servicem8.com/sdk/1.0/sdk.css">
    	<script src="https://platform.servicem8.com/sdk/1.0/sdk.js"></script>
		<script>
			var client = SMClient.init();
			
			//Resize Addon Window
			client.resizeWindow(500, 200);
			
		</script>
    </head>
    <body>
		<h1>Hello World Lambda Event</h1>
		
		<p>You have opened job <b>` + strJobUUID + `</b></p>
		
		<button onClick="client.closeWindow();">Close Window</button>
	</body>
</html>`;
    
	//Return Response
    callback(null, { 
		eventResponse: strHTMLResponse
	});
    
};