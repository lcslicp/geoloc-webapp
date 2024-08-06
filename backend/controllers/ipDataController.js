import axios from 'axios';
import dotenv from 'dotenv';
import SearchHistory from '../models/SearchHistory.js';

dotenv.config();
const apiToken = process.env.API_TOKEN
const BASE_URL = `https://ipinfo.io`

//GET user ip address
export const getUserIPAddress = async (req, res) => {
    try {
        const response = await axios.get(`${BASE_URL}?token=${apiToken}`)
        res.json({
            ipAddress: response.data.ip,
            city: response.data.city,
            region: response.data.region,
            country: response.data.country,
            postal: response.data.postal,
            timezone: response.data.timezone
        })
    } catch (err) {
        console.error(err)
        res.status(500).send('Server Error')
    }
}

//POST history
export const postSearchHistory = async (req, res) => {
    const {ip, geoLocation } = req.body
    try {
        const searchedItem = await SearchHistory.create({
            user_id: userInfo, 
            search_ip: ip,
            search_results: geoLocation,
        });

        searchedItem.save()
        res.status(201).json(searchedItem);
    } catch (error) {
        res.status(400).send('Something went wrong.')
    }
}

//GET ip address
export const getIPAddress = async (req, res) => {
    try {
        const queryIP = req.query.ip
        const response = await axios.get(`${BASE_URL}/${queryIP}?token=${apiToken}`)
        if (response.data) {
            let geoLocation = {
                ipAddress: response.data.ip,
                city: response.data.city,
                region: response.data.region,
                country: response.data.country,
                postal: response.data.postal,
                timezone: response.data.timezone
            }
            await postSearchHistory({ body: { ip: queryIP, geoLocation } }, res);

            res.json(geoLocation);
        } else {
            res.status(404).json({ message: 'No data found' });
        }
    } catch (err) {
        console.error(err)
        res.status(500).send('Server Error')
    }
}
// const searchIP


//GET search history

//---optional: DELETE history