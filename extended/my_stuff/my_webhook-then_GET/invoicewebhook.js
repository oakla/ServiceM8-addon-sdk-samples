'use strict';
var request = require('request');

const RAW_HOOK = false;
const zapier_hook_url = RAW_HOOK ? 'https://hooks.zapier.com/hooks/catch/12483802/ba3043e/' : "https://hooks.zapier.com/hooks/catch/12483802/ba6mi5i/";


exports.handler = (event, context, callback) => {
	console.log('Received event:', JSON.stringify(event, null, 2));

	if(event.eventName == 'Webhook_Subscription'){
		handle_webhook(event, callback)
	}

	function handle_webhook(event, callback){

		console.log(`access_token is: ${event.auth.accessToken}`);

		// Retrieve the Attachment that changed - https://developer.servicem8.com/reference/get-attachment-single
		// TODO pass response body to Zapier Hook POST
		let options1 = {
			method: 'GET',
			url: event.eventArgs.resource_url,
			headers: {
				Accept: 'application/json',
				'Authorization': `Bearer ${event.auth.accessToken}`
			}
		};

		request(options1, function (error, response, body) {
			if (error) throw new Error(error);

			console.log(body);
		});

		// GET


		var options = {
			'method': 'POST',
			'url': zapier_hook_url,
			'headers': {
			  'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				"message": `ServiceM8 webhook from invoice resource at ${Date()}`,
				"event": event		
			})
		}
	
		request(options, function (error, response) {
			if (error) throw new Error(error);
			console.log(response.body);
		});	
	}    
};