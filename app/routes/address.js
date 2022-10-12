const router = require('express').Router();
const axios = require('axios');
const RajaOngkir = require('rajaongkir-nodejs').Starter('7af336baa69d13c96ce2061a751f9432');

router.get('/provinces', async (request, response, next) => {
  try {
    const data = await axios.get('https://emsifa.github.io/api-wilayah-indonesia/api/provinces.json');
    response.status(200).json(data.data);
  } catch (error) {
    console.log(error);
    next(error)
  }
});

router.get('/cities/:provinceId', async (request, response, next) => {
  try {
    const data = await axios.get(`https://emsifa.github.io/api-wilayah-indonesia/api/regencies/${request.params.provinceId}.json`);
    response.status(200).json(data.data);
  } catch (error) {
    console.log(error);
    next(error)
  }
});

router.post('/courier-cost', async (request, response, next) => {
  try {
    const { origin, destination, weight, courier } = request.body;

    const data = await axios.post('https://api.rajaongkir.com/starter/cost', { origin, destination, weight, courier }, { headers: { 'key': '7af336baa69d13c96ce2061a751f9432', 'Content-Type': 'application/x-www-form-urlencoded' } });
    console.log(data);
    // console.log(origin, destination, weight, courier, data);
    response.status(201).json(data.data);
  } catch (error) {
    next(error)
  }
});



module.exports = router;