/* 
TTP appointment checker
Checks for the open Global Entry appointments at a specified location

Disclaimer: this script is free to use, but run it at your own risk and make sure you understand what it's doing. The appointment scheduling site is subject to change at any time and may break the script.

*/

const emailAddress = 'test@test.com';  // Replace with desired email address for notifications
const locationId = 11981; // Chicago - replace with desired location ID. Visit https://ttp.cbp.dhs.gov/schedulerui/schedule-interview/location?lang=en&vo=true&returnUrl=ttp-external&service=UP and inspect page when clicking on desired location to get ID
const locationId2 = 5340; // Honolulu - good for testing b/c tends to have available appointments
const url = `https://ttp.cbp.dhs.gov/schedulerapi/slots?locationId=${locationId}`;

// run this function to create a trigger that will run the checkForAppointments function once every minute
function createTrigger() {
  ScriptApp.newTrigger("checkForAppointments")
           .timeBased().everyMinutes(1).create();
  Logger.log('Trigger created.');
}

function checkForAppointments() {
  const response = UrlFetchApp.fetch(url, {'muteHttpExceptions': true});
  const json = response.getContentText();
  const appointments = JSON.parse(json);

  if (appointments.length > 0) {
    emailContent = generateEmail(appointments);
    MailApp.sendEmail(emailAddress, 'New Global Entry appointment available!', emailContent);
    Logger.log("Appointment(s) found; email sent")
  } else {
    Logger.log('No appointments')
  }
}

function generateEmail(appointments) {
  emailContent = 'Available Appointment(s):\n\n';
  appointments.forEach(appt => {
    const apptDate = new Date(Date.parse(appt.startTimestamp));
    emailContent = emailContent.concat(`Date: ${apptDate}\nActive: ${appt.active}\n\n`);
  });
  emailContent = emailContent.concat(`\nLog in here to schedule interview: \nhttps://ttp.dhs.gov/`);
  return emailContent;
}
