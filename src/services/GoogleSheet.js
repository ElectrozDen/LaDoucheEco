import {google} from 'googleapis';
import userAuth from './OAuth';

const sheets = google.sheets({
    version: 'v4',
    auth: userAuth
});

function newShower() {
    const resource = {
        properties: {
          title: 'lel',
        },
      };
    sheets.spreadsheets.create((err, spreadsheet) => {
        console.log(spreadsheet.spreadsheetId);
    });
}

export {newShower};

