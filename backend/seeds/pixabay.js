// require('dotenv').config()

const axios = require('axios');
// const API_KEY = '46334816-f597480601519356b6729524f';
const API_KEY = process.env.PIXABAY_API_KEY;
const BASE_URL = 'https://pixabay.com/api/';

const func_pixabay = async function searchPhotos(nFotos, query) {
    try {
        const response = await axios.get(BASE_URL, {
            params: {
                key: API_KEY,
                q: `${query}`,
                per_page: nFotos // Number of photos per page
            }
        });
        return guardar(response.data.hits);
    } catch (error) {
        console.error('Error fetching photos:', error);
    }
}

const guardar = (datos) => {
    let arr = [];
    for (const ele of datos) {
        arr.push(ele.fullHDURL);
    }
    return arr;
}

module.exports = func_pixabay;


