function doPost(e) {
  try {
    // Uses the spreadsheet the script is attached to
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = e.parameter;
    
    var rowData = [
      new Date(),                 // A: Timestamp
      
      data.fullName || '',        // B: Full Name
      data.contactNo || '',       // C: Contact No
      data.emailId || '',         // D: Email ID
      data.companyName || '',     // E: Company Name
      data.designation || '',     // F: Designation
      data.noOfEmployees || '',   // G: No of Employees
      data.sector || '',          // H: Sector
      
      data.q1 || '',              // I: Question 1
      data.q2 || '',              // J: Question 2
      data.q3 || '',              // K: Question 3
      data.q4 || '',              // L: Question 4
      data.q5 || '',              // M: Question 5
      data.q6 || '',              // N: Question 6
      data.q7 || '',              // O: Question 7
      data.q8 || '',              // P: Question 8
      data.q9 || '',              // Q: Question 9
      data.q10 || '',             // R: Question 10
      data.q11 || '',             // S: Question 11
      data.q12 || '',             // T: Question 12
      data.q13 || '',             // U: Question 13
      data.q14 || '',             // V: Question 14
      data.q15 || '',             // W: Question 15 (Open Ended Reflection)
      
      data.quizScore || ''        // X: Total Score
    ];
    
    sheet.appendRow(rowData);
    
    return ContentService.createTextOutput(JSON.stringify({"result":"success"}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch(error) {
    return ContentService.createTextOutput(JSON.stringify({"result":"error", "error": error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
