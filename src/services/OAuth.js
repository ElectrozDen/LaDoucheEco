import {google} from 'googleapis';

const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_ID_CLIENT,
    process.env.GOOGLE_SECRET_CLIENT,
    `${process.env.SERVER_URL}:${process.env.PORT_URL}/${process.env.GOOGLE_CALLBACK_URL}`
);

export default oauth2Client;