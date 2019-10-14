import {google} from 'googleapis';
import {existsSync, readFileSync} from 'fs';

const path_credentials = 'credentials.json';

const scopes = [
    'https://www.googleapis.com/auth/fitness.activity.read',
    'https://www.googleapis.com/auth/fitness.activity.write'
];


const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_ID_CLIENT,
    process.env.GOOGLE_SECRET_CLIENT,
    `${process.env.SERVER_URL}:${process.env.PORT_URL}/${process.env.GOOGLE_CALLBACK_URL}`
);

if(!existsSync(path_credentials))
    console.log(oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: scopes
    }));
else
    oauth2Client.setCredentials(JSON.parse(readFileSync(path_credentials, 'utf8')));

export default oauth2Client;