const axios = require('axios');
const dbApiUrl = require('./db-api-url');

const exercises = [
  { name: 'Crunches', duration: 3, calories: 8 },
  { name: 'Touch Toes', duration: 5, calories: 15 },
  { name: 'Side Lunges', duration: 4, calories: 18 },
  { name: 'Burpees', duration: 10, calories: 8 }
];

exercises.forEach(exercise => {
  axios.post(dbApiUrl, exercise)
    .then(() => {
      console.log(`Exercise '${exercise.name}' saved successfully.`);
    })
    .catch(error => {
      console.log(`Error while saving '${exercise.name}'.`);
      console.log('  Error:', error);
    });
});

