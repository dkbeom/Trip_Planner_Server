import axios from 'axios';
import { Button } from 'react-bootstrap';

function file2(a, b, c, d){
  let result;
  const sendPredictionRequest = async () => {
    const url = 'https://apis.openapi.sk.com/tmap/routes/prediction?version=1';
    const appKey = '52DEnq0WzjAg8MuIB9OU8RLLXT5MsW82ZtTl3WUh'; // Replace with your actual app key
  
    const requestData = {
      "routesInfo" : {
        "departure" : {
            "name" : "test1",
            "lon" : "127.10323758",
            "lat" : "37.36520202"
            },
        "destination" : {
            "name" : "test2",
            "lon" : "128.87264091",
            "lat" : "35.17240084"
            },
        "predictionType" : "arrival",
        "predictionTime" : "2022-09-10T09:00:22+0900"
            }
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
      
    } catch (error) {
      console.log(error); // Handle any errors
    }
  };
  sendPredictionRequest();
}

export default file2;