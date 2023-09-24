const http = require('http');
require('dotenv').config();

const app = require('./app');
const connectDB = require('./db/connect.mongo');

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        server.listen(port, console.log(`Server is listening on port ${port} ...`));
    } catch (error) {
        console.log(error);
    }
}

start();