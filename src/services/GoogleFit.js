import {google} from 'googleapis';
import userAuth from './OAuth';

const fitness = google.fitness({
    version: 'v1',
    auth: userAuth
});
