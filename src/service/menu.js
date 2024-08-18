//const axios = require('axios'); // Assuming axios is installed using npm or yarn
import axios from 'axios';

// Function to fetch data from the server
const getDataFromServer = async () => {
  try {
    const response = await axios.get('http://localhost:3002/items');
    return response.data; // Assuming the response contains an array of IDataList objects
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // Re-throw the error for handling in the calling code
  }
};

// Function to push new purchase data to the server
const pushDataFromUser = async (newpurchase) => {
  try {
    const response = await axios.post('http://localhost:3002/items', newpurchase, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data; // Assuming the response contains the newly created IDataList object
  } catch (error) {  
    console.error('Error pushing data:', error);
    throw error; // Re-throw the error for handling in the calling code
  }
};

export {
  getDataFromServer,
  pushDataFromUser
};
