# ttp-appointment-checker
A Google Apps Script that checks for open Global Entry appointments

## Instructions
1. Go to https://script.google.com/u/1/home/start. Click "start scripting" and follow prompts if it's your first time using Google Apps Script
2. Create a new project and copy the code from Code.gs into the Code.gs file for your new project
3. Replace the test email address in the code with your desired email address for notifications
4. Find the location ID of the location you want to visit for your appointment. (To get this ID, visit https://ttp.cbp.dhs.gov/schedulerui/schedule-interview/location?lang=en&vo=true&returnUrl=ttp-external&service=UP, inspect the page, go to the Network tab of dev tools, and observe the LocationId included in the API request when clicking on the desired location.
5. Replace the `locationId` value in the script with your desired location ID
6. Run the `createTrigger` function by clicking the Run button at the top of the page (make sure `createTrigger` is selected in the dropdown menu to the right). This will create a trigger that will run the `checkForAppointments` function every minute
7. You will get an email every minute when an appointment becomes available. There are tons of people running programs like this, so you generally have to be fast to get the appointment before them.
8. To stop getting email notifications, delete the trigger (You can access the triggers page from the left-hand nav menu in Google Apps Script)
