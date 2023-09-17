require('dotenv').config({ path: './.env' });
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db')

const app = express();

connectDB();

app.set("port", process.env.PORT || 3000);
app.set("json spaces", 4);
app.use(express.json());
app.use(cors({ origin: '*', credentials: true }));

app.use(require('./routes/streamers'));
app.use(require('./routes/games'));
app.use(require('./routes/total'));

app.listen(app.get('port'), () => {
  console.log(`* APP EJECUTÁNDOSE EN EL PUERTO: ${app.get('port')}`);
});