import axios from 'axios';
import { Button } from 'react-bootstrap';

function file2(a, b, c, d){
  let result;
  const sendPredictionRequest = async () => {
    const url = 'https://apis.openapi.sk.com/tmap/routes/prediction?version=1';
    const appKey = 'iMIjpehulFaBDBzBhOiqY10fiMy5JbbN8UlEySE5'; // Replace with your actual app key
  
    const requestData = {
      routesInfo: {
        departure: {
          name: 'test1',
          lon: a,
          lat: b,
        },
        destination: {
          name: 'test2',
          lon: c,
          lat: d,
        },
        predictionType: 'arrival',
        predictionTime: '2023-06-07T09:00:22+0900',
      },
    };
  
    try {
      const response = await axios.post(url, requestData, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          appKey: appKey,
        },
      });
      result = response.data;
      console.log(response.data); // Handle the response data as needed
      
return(
  JSON.stringify(result)
);
    } catch (error) {
      console.log(error); // Handle any errors
    }
  };
  sendPredictionRequest();
}

export default file2;