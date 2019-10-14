require('dotenv').config();
require('./services/WebServer');
import {Temperature, Flow} from './Sensors';

class Data {

	constructor() {
		this.tab_temperature = [];
		this.tab_flow = [];
		this.first_time = -1;
		this.shower_ended = true;
		this.actual_temp = 0;
		this.actual_flow = 0;
	}

	add_temperature(value) {
		if (this.first_time == -1) {
			if (value == 0) return;
			this.shower_ended = false;
			this.first_time = new Date();
		}
		this.tab_temperature.push([value, new Date() - this.first_time])
		this.actual_temp = value;
	}

	add_flow(value) {
		if (this.first_time == -1) {
			if (value == 0) return;
			this.shower_ended = false;
			this.first_time = new Date();
		}
		this.tab_flow.push([value, new Date() - this.first_time])
		this.actual_flow = value;

		if (value == 0) {
			this.end_shower();
		}
	}

	end_shower() {
		this.shower_ended = true;
		console.log(`total time: ${this.total_time() / 1000} seconds`);
		console.log(`temp average: ${this.average_temperature()}`);
		console.log(`flow average: ${this.average_flow()}`)
	}

	total_time() {
		return this.tab_flow[this.tab_flow.length-1][1];
	}

	average_temperature() {
		this.tab_temperature.push([this.actual_temp, this.total_time()]);
		let total = 0;
		let last_time = 0;
		for (let i = 0; i < this.tab_temperature.length; i++) {
			total += this.tab_temperature[i][0] * (this.tab_temperature[i][1] - last_time);
			last_time = this.tab_temperature[i][1];
		}
		return total / this.total_time();
	}

	average_flow() {
		let total = 0;
		let last_time = 0;
		for (let i = 0; i < this.tab_flow.length; i++) {
			total += this.tab_flow[i][0] * (this.tab_flow[i][1] - last_time);
			last_time = this.tab_flow[i][1];
		}
		return total / this.total_time();
	}

	see_conso() {
		if (this.actual_flow == 0) return "green";
		if (this.actual_temp > 35) return "red";
		if (this.actual_flow > 20) return "red";
		return "blue";
	}
}


let data_shower = new Data();

Temperature.createObservable().subscribe((value) => {
	console.log('--------------------');
	console.log(`temperature: ${value}`);
	data_shower.add_temperature(value);
	console.log(`color: ${data_shower.see_conso()}`)
});

Flow.createObservable().subscribe((value) => {
	console.log('--------------------');
	console.log(`flow: ${value}`);
	data_shower.add_flow(value);
	console.log(`color: ${data_shower.see_conso()}`)
});