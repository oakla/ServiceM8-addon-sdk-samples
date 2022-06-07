<html>
    <body>
        <button onClick="client.resizeWindow((Math.random() * 500) + 250, (Math.random() * 500) + 250);">Random Resize Window</button>
			
        <button onClick="getJobData('` + event.eventArgs.jobUUID + `');">Load Job Data</button>
        
        <div id="EventData">
            <pre>` + JSON.stringify(event, null, 2) + `</pre>
        </div>
            
        <div id="JobData"></div>
    </body>
</html>