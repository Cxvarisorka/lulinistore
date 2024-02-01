import express from 'express';
import bodyParser from 'body-parser';
import dotenv from "dotenv";
import cors from 'cors';

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(cors())


app.listen(process.env.PORT, () => {
    console.log('Server is listening at port ' + process.env.PORT);
});