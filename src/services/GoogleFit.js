import {google} from 'googleapis';
import userAuth from './OAuth';

const scopes = [
    'https://www.googleapis.com/auth/fitness.activity.read',
    'https://www.googleapis.com/auth/fitness.activity.write'
];

const fitness = google.fitness({
    version: 'v1',
    auth: userAuth
});
