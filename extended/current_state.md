<!-- title: Xtracted summary update-->
**Summary**: 

- login details for client's Zapier account are no longer valid
- a serviceM8 developer account, in which an add-on is being developed [here](https://go.servicem8.com/dbo_display_v2?&s_strObjectName=storeItem&s_auth=9d339e1f203c5d8f4a905e9245d1b0e9), has been opened. login details are in lastpass
- Example API calls and responses are in Postman [here](https://go.postman.co/workspace/Test-Play-Space-(The-Joinary)~1aa995e0-15fc-47ff-8f26-e6681d7a93d5/collection/15058637-46ec64f7-df18-423a-a6df-934270adb3e9?action=share&creator=15058637).
- current code can be found on googleDrive here:

  `Shared drives\The Joinary\1. Client Files\Clients (X)\Xtracted\ServiceM8_Addon`

```shell
Shared drives\The Joinary\1. Client Files\Clients (X)\Xtracted\ServiceM8_Addon
```

## Trigger Logic Required:

1. addon receives Webhook from client account when `attachment` is updated/created
   - note that invoices are only one kind of attachment.
2. GET attachment using `uuid` of object that triggered the webhook. This is found in the `event` argument supplied by the webhook

```javascript
let attachment_uuid = event.eventArgs.entry[0].uuid
`https://api.servicem8.com/api_1.0/Attachment/${attachment_uuid}.json`
```

3. Using the response from GET attachment, check if it the attachment is an invoice

```javascript
if(body.attachment_source != 'INVOICE'){
    return null; // stop
}
```

4. To find the line items on the invoice, GET all job materials using `body.related_object_uuid` from response to GET attachment

```javascript
job_uuid = body.related_object_uuid
https://api.servicem8.com/api_1.0/jobmaterial/${job_uuid}.json
```

5. ? GET other details

6. Send to Zapier