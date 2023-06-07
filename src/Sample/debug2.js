import axios from 'axios';
import { Button } from 'react-bootstrap';

function file2(){
  const sendPredictionRequest = async () => {
    const url = 'https://apis.openapi.sk.com/tmap/routes/prediction?version=1';
    const appKey = 'iMIjpehulFaBDBzBhOiqY10fiMy5JbbN8UlEySE5'; // Replace with your actual app key
  
    const requestData = {
      routesInfo: {
        departure: {
          name: 'test1',
          lon: '126.8463399',
          lat: '35.2142065',
        },
        destination: {
          name: 'test2',
          lon: '126.844188',
          lat: '35.221412',
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
  
      console.log(response.data); // Handle the response data as needed
    } catch (error) {
      console.log(error); // Handle any errors
    }
  };
return(

  <Button onClick={sendPredictionRequest}>으아</Button>
)
}

export default file2;