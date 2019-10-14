import io from './FakeIO';
import {Observable} from 'rxjs';

const tempChannel = io.of('/temperature');
const flowChannel = io.of('/flow');

const Temperature = {};
const Flow = {};

Temperature.createObservable = function () {
    return new Observable(subscriber => {
        subscriber.next(0);
        tempChannel.on('connection', (socket) => {;
            socket.on('value', (value) => subscriber.next(value));
        });
    });
};

Flow.createObservable = function () {
    return new Observable(subscriber => {
        subscriber.next(0);
        flowChannel.on('connection', (socket) => {
            socket.on('value', (value) => subscriber.next(value));
        });
    });
}

export {Temperature, Flow};