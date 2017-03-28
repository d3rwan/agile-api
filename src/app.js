import express from 'express';
import { v4 as uuid } from 'node-uuid';
import moment from 'moment';

const app = express();
const port = 3000;

let enabled = true;
let delay = 500;

app.use((req, res, next) => setTimeout(next, delay));
app.get('/api/uuid', (req, res) => {
	if (enabled) {
		res.json({
			timestamp: moment(),
			uuid: uuid()
		});
	} else {
		res.status(404).send(`API not found.`);
	}
});
app.post('/api/enable', (req, res) => {
	enabled = true;
	console.log(`Enable API`);
	res.json({
		enabled,
		delay
	});
});
app.post('/api/disable', (req, res) => {
	enabled = false;
	console.log(`Disable API`);
	res.json({
		enabled,
		delay
	});
});
app.post('/api/delay/:time', (req, res) => {
	delay = req.params.time;
	console.log(`Set delay : ${delay}`);
	res.json({
		enabled,
		delay
	});
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
