const axios = require('axios');
const dbApiUrl = require('./db-api-url');

axios.delete(dbApiUrl)
  .then(() => {
    console.log('Delete exercises successful.');
  })
  .catch(error => {
    console.log('Delete exercises failed.');
    console.log('  Error:', error);
  });