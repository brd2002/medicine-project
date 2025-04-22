import express from "express";
const app = express();
app.get('/', (req, res) => {
    res.send('Hello World!')});
app.get('/medicine', (req, res) => {
    res.send('Hello Medicine!')
});
app.get('/user', (req, res) => {
    res.send('Hello User!')
});
app.listen(process.env["PORT"] || 3000 , () =>{
    console.log('Example app listening on port 3000!')
});