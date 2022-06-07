eventData = {
    "eventVersion": "1.0",
    "eventName": "Webhook_Subscription",
    "eventArgs": {
        "object": "Attachment",
        "entry": [
            {
                "uuid": " ",
                "changed_fields": [
                    "uuid",
                    "edit_date",
                    "active",
                    "attachment_name",
                    "file_type",
                    "attachment_source",
                    "timestamp",
                    "related_object",
                    "related_object_uuid"
                ],
                "time": "2022-06-05 09:36:33"
            }
        ],
        "resource_url": "https://api.servicem8.com/api_1.0/Attachment/af30314d-20dd-41db-b07b-1e91c9a9524b.json"
    },
    "auth": {
        "accountUUID": "cc6a7b3b-b97e-4f73-85b9-1e8fdcc6110b",
        "staffUUID": "98711371-4a07-446b-a3d9-1e8fd79851bb",
        "accessToken": "68148-apse2-b9a26dbd7159ac12bfcb47ba3d8c14f82d71a1c9",
        "accessTokenExpiry": 900,
        "accessScope": false
    }
}


'use strict';
var request = require('request');
request.debug = true;
const RAW_HOOK = false;
const zapier_hook_url = RAW_HOOK ? 'https://hooks.zapier.com/hooks/catch/12483802/ba3043e/' : "https://hooks.zapier.com/hooks/catch/12483802/ba6mi5i/";



exports.handler = (event, context, callback) => {
	console.log('Received event:', JSON.stringify(event, null, 2));

	if(event.eventName == 'Webhook_Subscription'){
		handle_webhook(event, callback);
	}

	function handle_webhook(event, callback){
		console.log(`access_token is: ${event.auth.accessToken}`);

		//  GET object that changed and triggered the webhook
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

			// send to Zapi
			var options2 = {
				'method': 'POST',
				'url': zapier_hook_url,
				'headers': {
				'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					"message": `ServiceM8 webhook from invoice resource at ${Date()}`,
					"event": event,
					"job": body		
				})
			};
		
			request(options2, function (error, response) {
				if (error) throw new Error(error);
				console.log(response.body);
			});	


			console.log(`\nThis the job uuid ${body.related_object_uuid}`);
		});




	}    
};