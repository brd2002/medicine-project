import express from "express";
import dotenv from "dotenv";
import {router} from './routes/user-routes'
const app = express();
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.send('Hello World!')});
app.get('/medicine', (req, res) => {
    res.send('Hello Medicine!')
});
app.get('/user', (req, res) => {
    res.send('Hello User!')
});
app.use('/api', router);
app.listen(process.env["PORT"] || 3000 , () =>{
    console.log('Example app listening on port 3000!')
});