import http from 'http';
import socketio from 'socket.io';

const app = http.createServer();
const io = socketio(app);

app.listen(3000);

export default io;