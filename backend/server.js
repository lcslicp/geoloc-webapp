import express from 'express';
import dotenv from 'dotenv';
import sequelize from './config/db.js';
import dataRoutes from './routes/dataRoutes.js';
import userRoutes from './routes/userRoutes.js';
import authUser from './middleware/authUser.js';

dotenv.config();
const app = express();

app.use(express.json());

sequelize.authenticate()
    .then(() => {
        console.log('Database connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

sequelize.sync()
    .then(() => {
        console.log('Database synced successfully.');
    })
    .catch(err => {
        console.error('Error syncing database:', err);
    });

app.get('/', (req, res) => {
    res.send('Hello from express!')
})

app.use('/', userRoutes)
app.use('/', authUser);
app.use('/', dataRoutes)

app.listen(process.env.PORT, () => {
    console.log(`Server is running on Port ${process.env.PORT}`)
})

