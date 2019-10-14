import {google} from 'googleapis';
import userAuth from './OAuth';

const sheets = google.sheets({
    version: 'v4',
    auth: userAuth
});

async function saveShower(time, temp, flow) {
    const spreadsheet = await sheets.spreadsheets.create();
    let values = [['Time', 'Temp', 'Flow'],[time, temp, flow]];
    
    await sheets.spreadsheets.values.update({
        range: 'A1',
        spreadsheetId: spreadsheet.data.spreadsheetId,
        valueInputOption: 'USER_ENTERED',
        requestBody: {
            values: values
        }
        
    });
}

export {saveShower};

