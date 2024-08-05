import express from 'express';

const app = express();
const PORT = 4000;

app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}`)
})

app.get('/', (req, res) => {
    res.send('Hello from express!')
})