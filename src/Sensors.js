import io from './FakeIO';
import {Observable} from 'rxjs';

const tempChannel = io.of('/temperature');
const flowChannel = io.of('/flow');

const temperature = {};
const flow = {};

temperature.createObservable = function () {
    return new Observable(subscriber => {
        tempChannel.on('connection', (socket) => {;
            socket.on('value', (value) => subscriber.next(value));
        });
    });
};

flow.createObservable = function () {
    return new Observable(subscriber => {
        flowChannel.on('connection', (socket) => {
            socket.on('value', (value) => subscriber.next(value));
        });
    });
}

export const Temperature = temperature;
export const Flow = flow;