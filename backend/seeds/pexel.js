// require('dotenv').config()

const axios = require('axios');
//const API_KEY = 't5mGVeZwbOEEBY7AoKbx0eXYEAWg2UvGImBFPZFPAPX2VMMhHNICJGIR';
const API_KEY = process.env.PEXEL_API_KEY;
const BASE_URL = 'https://api.pexels.com/v1/';

const func_pexels = async function searchPhotos(nFotos, query) {
    try {
        const response = await axios.get(`${BASE_URL}search`, {
            headers: {
                Authorization: API_KEY
            },
            params: {
                query: `${query}`,
                per_page: nFotos // Number of photos per page
            }
        });
        return guardar(response.data.photos);
    } catch (error) {
        console.error('Error fetching photos:', error);
    }
}

const guardar = (datos) => {
    let arr = [];
    for (let ele of datos) {
        arr.push(ele.src.large2x);
        //arr.push(ele.src.original);
    }
    return arr;
}


module.exports = func_pexels;


