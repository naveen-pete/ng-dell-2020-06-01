const axios = require('axios');
const dbApiUrl = require('./db-api-url');

axios.get(dbApiUrl)
  .then(response => {
    console.log('Get exercises successful.');
    console.log('Response data')
    console.log(response.data);
  })
  .catch(error => {
    console.log('Get exercises failed.');
    console.log('  Error:', error);
  });