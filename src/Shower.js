require('dotenv').config();
require('./services/WebServer');
import {Temperature, Flow} from './Sensors';

Temperature.createObservable().subscribe((value) => {
    console.log(`temperature: ${value}`);
});

Flow.createObservable().subscribe((value) => {
    console.log(`flow: ${value}`);
});