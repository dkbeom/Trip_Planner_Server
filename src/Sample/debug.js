import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import { Row, Col } from 'react-bootstrap';
import NavBar from '../mainpage/NavBar';
import { MyContext } from '../provider';
import Alert from 'react-bootstrap/Alert'
import Image from 'react-bootstrap/Image';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const Background = styled.div`
  background-image: url('/loginpage_background.png');
  background-size: cover;
  width: 100%;
  height: 100vh;
  background-position: center center;
`;

const MainWrapper = styled.div`
  margin-top: 1%;
  display: flex;
  justify-content: space-between;
  position: relative;
`;

const MapWrapper = styled.div`
  background-color: #DDFFFF77;
  width: 100vh;
  height: 70vh;
  margin-left: 30%;
`;

const ScheduleWrapper = styled.div`
  width: 40vh;
`;


let res;
const sample = {"data":[[{"id":"2951054","title":"대덕구 반려동물놀이터","addr":"대전광역시 대덕구 덕암로 51 신탄진화물휴개소","mapX":"127.4186824144","mapY":"36.4256492815","image":"http://tong.visitkorea.or.kr/cms/resource/53/2951053_image2_1.jpeg","contentTypeId":"12","cat1":"A02","cat2":"A0202","cat3":"A02020700","areaCode":"3","sigunguCode":"1","tel":"","sumScore":0,"numScore":0,"tag":null,"nearByRestaurants":[{"id":"R4123","rank":87,"title":"부추해물칼국수","addr":"대전 대덕구 신탄진로804번길 31-0","mapX":"127.4316531","mapY":"36.449569","category":"한식","detailCategory":"칼국수","searchCount":6310,"sumScore":0,"numScore":0,"distance":2.89},{"id":"R4146","rank":110,"title":"한우곰탕","addr":"대전 유성구 전민로22번길 30-0","mapX":"127.4027814","mapY":"36.3977438","category":"한식","detailCategory":"곰탕","searchCount":5565,"sumScore":0,"numScore":0,"distance":3.4},{"id":"R4250","rank":214,"title":"황토기와집","addr":"대전 유성구 대덕대로 1101-0","mapX":"127.3841552","mapY":"36.4255313","category":"한식","detailCategory":"국수","searchCount":3809,"sumScore":0,"numScore":0,"distance":3.04}]},{"id":"1720749","title":"계족산 황톳길","addr":"대전광역시 대덕구 장동 산85","mapX":"127.4492219591","mapY":"36.4032551669","image":"http://tong.visitkorea.or.kr/cms/resource/09/2661809_image2_1.jpg","contentTypeId":"28","cat1":"A03","cat2":"A0302","cat3":"A03022700","areaCode":"3","sigunguCode":"1","tel":"","sumScore":0,"numScore":0,"tag":null,"nearByRestaurants":[{"id":"R4115","rank":79,"title":"서원골유황오리","addr":"대전 유성구 엑스포로269번길 8-0","mapX":"127.4062433","mapY":"36.3805138","category":"전문음식","detailCategory":"오리","searchCount":6595,"sumScore":0,"numScore":0,"distance":4.55},{"id":"R4137","rank":101,"title":"쌍촌본가","addr":"대전 유성구 엑스포로 244-5","mapX":"127.4062622","mapY":"36.378528","category":"한식","detailCategory":"갈비","searchCount":5837,"sumScore":0,"numScore":0,"distance":4.67},{"id":"R4146","rank":110,"title":"한우곰탕","addr":"대전 유성구 전민로22번길 30-0","mapX":"127.4027814","mapY":"36.3977438","category":"한식","detailCategory":"곰탕","searchCount":5565,"sumScore":0,"numScore":0,"distance":4.13}]},{"id":"130201","title":"대덕문화원","addr":"대전광역시 대덕구 대전로 1348","mapX":"127.4206308660","mapY":"36.3741052155","image":"http://tong.visitkorea.or.kr/cms/resource/03/1944903_image2_1.jpg","contentTypeId":"14","cat1":"A02","cat2":"A0206","cat3":"A02060700","areaCode":"3","sigunguCode":"1","tel":"","sumScore":0,"numScore":0,"tag":null,"nearByRestaurants":[{"id":"R4040","rank":4,"title":"오문창순대국밥","addr":"대전 대덕구 한밭대로 1153-0","mapX":"127.4265942","mapY":"36.359264","category":"한식","detailCategory":"순대","searchCount":31470,"sumScore":0,"numScore":0,"distance":1.73},{"id":"R4046","rank":10,"title":"오씨칼국수","addr":"대전 동구 옛신탄진로 13-0","mapX":"127.4250711","mapY":"36.3420144","category":"한식","detailCategory":"칼국수","searchCount":23532,"sumScore":0,"numScore":0,"distance":3.58},{"id":"R4065","rank":29,"title":"대선칼국수","addr":"대전 서구 둔산중로40번길 28-0","mapX":"127.3882744","mapY":"36.3499681","category":"한식","detailCategory":"칼국수","searchCount":11795,"sumScore":0,"numScore":0,"distance":3.91}]}],[{"id":"2554209","title":"대전차량융합기술단(신탄진역)","addr":"대전광역시 대덕구 벚꽃길 150","mapX":"127.4302063780","mapY":"36.4258494642","image":"","contentTypeId":"12","cat1":"A02","cat2":"A0204","cat3":"A02041000","areaCode":"3","sigunguCode":"1","tel":"","sumScore":0,"numScore":0,"tag":null,"nearByRestaurants":[{"id":"R4123","rank":87,"title":"부추해물칼국수","addr":"대전 대덕구 신탄진로804번길 31-0","mapX":"127.4316531","mapY":"36.449569","category":"한식","detailCategory":"칼국수","searchCount":6310,"sumScore":0,"numScore":0,"distance":2.64},{"id":"R4146","rank":110,"title":"한우곰탕","addr":"대전 유성구 전민로22번길 30-0","mapX":"127.4027814","mapY":"36.3977438","category":"한식","detailCategory":"곰탕","searchCount":5565,"sumScore":0,"numScore":0,"distance":3.94},{"id":"R4250","rank":214,"title":"황토기와집","addr":"대전 유성구 대덕대로 1101-0","mapX":"127.3841552","mapY":"36.4255313","category":"한식","detailCategory":"국수","searchCount":3809,"sumScore":0,"numScore":0,"distance":4.05}]},{"id":"250292","title":"대전 계족산성","addr":"대전광역시 대덕구 장동","mapX":"127.4539606640","mapY":"36.3944590357","image":"http://tong.visitkorea.or.kr/cms/resource/30/1585930_image2_1.jpg","contentTypeId":"12","cat1":"A02","cat2":"A0201","cat3":"A02010200","areaCode":"3","sigunguCode":"1","tel":"","sumScore":0,"numScore":0,"tag":null,"nearByRestaurants":[{"id":"R4040","rank":4,"title":"오문창순대국밥","addr":"대전 대덕구 한밭대로 1153-0","mapX":"127.4265942","mapY":"36.359264","category":"한식","detailCategory":"순대","searchCount":31470,"sumScore":0,"numScore":0,"distance":4.59},{"id":"R4115","rank":79,"title":"서원골유황오리","addr":"대전 유성구 엑스포로269번길 8-0","mapX":"127.4062433","mapY":"36.3805138","category":"전문음식","detailCategory":"오리","searchCount":6595,"sumScore":0,"numScore":0,"distance":4.48},{"id":"R4137","rank":101,"title":"쌍촌본가","addr":"대전 유성구 엑스포로 244-5","mapX":"127.4062622","mapY":"36.378528","category":"한식","detailCategory":"갈비","searchCount":5837,"sumScore":0,"numScore":0,"distance":4.55}]},{"id":"2733533","title":"대전무형문화재전수회관","addr":"대전광역시 대덕구 동춘당로94번길 50","mapX":"127.4417014113","mapY":"36.3664675758","image":"http://tong.visitkorea.or.kr/cms/resource/34/2733534_image2_1.jpg","contentTypeId":"14","cat1":"A02","cat2":"A0206","cat3":"A02061100","areaCode":"3","sigunguCode":"1","tel":"","sumScore":0,"numScore":0,"tag":null,"nearByRestaurants":[{"id":"R4040","rank":4,"title":"오문창순대국밥","addr":"대전 대덕구 한밭대로 1153-0","mapX":"127.4265942","mapY":"36.359264","category":"한식","detailCategory":"순대","searchCount":31470,"sumScore":0,"numScore":0,"distance":1.55},{"id":"R4046","rank":10,"title":"오씨칼국수","addr":"대전 동구 옛신탄진로 13-0","mapX":"127.4250711","mapY":"36.3420144","category":"한식","detailCategory":"칼국수","searchCount":23532,"sumScore":0,"numScore":0,"distance":3.08},{"id":"R4051","rank":15,"title":"월산본가","addr":"대전 중구 대종로 455-0","mapX":"127.4275127","mapY":"36.3253014","category":"한식","detailCategory":"갈비","searchCount":17609,"sumScore":0,"numScore":0,"distance":4.74}]},{"id":"231937","title":"대전 회덕 동춘당","addr":"대전광역시 대덕구 동춘당로 80","mapX":"127.4413181434","mapY":"36.3653510299","image":"http://tong.visitkorea.or.kr/cms/resource/05/2364205_image2_1.jpg","contentTypeId":"12","cat1":"A02","cat2":"A0201","cat3":"A02010700","areaCode":"3","sigunguCode":"1","tel":"","sumScore":0,"numScore":0,"tag":null,"nearByRestaurants":[{"id":"R4040","rank":4,"title":"오문창순대국밥","addr":"대전 대덕구 한밭대로 1153-0","mapX":"127.4265942","mapY":"36.359264","category":"한식","detailCategory":"순대","searchCount":31470,"sumScore":0,"numScore":0,"distance":1.46},{"id":"R4046","rank":10,"title":"오씨칼국수","addr":"대전 동구 옛신탄진로 13-0","mapX":"127.4250711","mapY":"36.3420144","category":"한식","detailCategory":"칼국수","searchCount":23532,"sumScore":0,"numScore":0,"distance":2.96},{"id":"R4051","rank":15,"title":"월산본가","addr":"대전 중구 대종로 455-0","mapX":"127.4275127","mapY":"36.3253014","category":"한식","detailCategory":"갈비","searchCount":17609,"sumScore":0,"numScore":0,"distance":4.61}]}],[{"id":"2044096","title":"대청호 로하스 캠핑장","addr":"대전광역시 대덕구 대청로424번길 200","mapX":"127.4741710478","mapY":"36.4565606210","image":"http://tong.visitkorea.or.kr/cms/resource/25/2044125_image2_1.jpg","contentTypeId":"28","cat1":"A03","cat2":"A0302","cat3":"A03021700","areaCode":"3","sigunguCode":"1","tel":"","sumScore":0,"numScore":0,"tag":null,"nearByRestaurants":[{"id":"R4123","rank":87,"title":"부추해물칼국수","addr":"대전 대덕구 신탄진로804번길 31-0","mapX":"127.4316531","mapY":"36.449569","category":"한식","detailCategory":"칼국수","searchCount":6310,"sumScore":0,"numScore":0,"distance":3.82},{"id":"R4069","rank":33,"title":"두두당","addr":"대전 대덕구 대청로 234-0","mapX":"127.4507292","mapY":"36.4482702","category":"카페/찻집","detailCategory":"디저트카페","searchCount":11439,"sumScore":0,"numScore":0,"distance":2.26},{"id":"R4091","rank":55,"title":"스타벅스대전신탄진DT점","addr":"대전 대덕구 대덕대로 1544-0","mapX":"127.4199093","mapY":"36.4486431","category":"카페/찻집","detailCategory":"","searchCount":8348,"sumScore":0,"numScore":0,"distance":4.86}]},{"id":"2689761","title":"삼정생태공원","addr":"대전광역시 대덕구 대청로424번길 510","mapX":"127.4661608403","mapY":"36.4497501466","image":"","contentTypeId":"12","cat1":"A01","cat2":"A0101","cat3":"A01010500","areaCode":"3","sigunguCode":"1","tel":"","sumScore":0,"numScore":0,"tag":null,"nearByRestaurants":[{"id":"R4123","rank":87,"title":"부추해물칼국수","addr":"대전 대덕구 신탄진로804번길 31-0","mapX":"127.4316531","mapY":"36.449569","category":"한식","detailCategory":"칼국수","searchCount":6310,"sumScore":0,"numScore":0,"distance":3.04},{"id":"R4478","rank":442,"title":"찌글이짜글이본점","addr":"대전 대덕구 대덕대로1454번길 13-0","mapX":"127.4104731","mapY":"36.447542","category":"한식","detailCategory":"찌개,전골","searchCount":2178,"sumScore":0,"numScore":0,"distance":4.91},{"id":"R4058","rank":22,"title":"맥도날드대전신탄진DT점","addr":"대전 대덕구 신탄진로 605-0","mapX":"127.4232509","mapY":"36.4328637","category":"간이음식","detailCategory":"패스트푸드","searchCount":13749,"sumScore":0,"numScore":0,"distance":4.22}]},{"id":"2727459","title":"산디마을생태공원캠핑장","addr":"대전광역시 대덕구 산디로 190","mapX":"127.4385869692","mapY":"36.3970223572","image":"http://tong.visitkorea.or.kr/cms/resource/81/2727681_image2_1.jpg","contentTypeId":"28","cat1":"A03","cat2":"A0302","cat3":"A03021700","areaCode":"3","sigunguCode":"1","tel":"","sumScore":0,"numScore":0,"tag":null,"nearByRestaurants":[{"id":"R4040","rank":4,"title":"오문창순대국밥","addr":"대전 대덕구 한밭대로 1153-0","mapX":"127.4265942","mapY":"36.359264","category":"한식","detailCategory":"순대","searchCount":31470,"sumScore":0,"numScore":0,"distance":4.32},{"id":"R4115","rank":79,"title":"서원골유황오리","addr":"대전 유성구 엑스포로269번길 8-0","mapX":"127.4062433","mapY":"36.3805138","category":"전문음식","detailCategory":"오리","searchCount":6595,"sumScore":0,"numScore":0,"distance":3.39},{"id":"R4137","rank":101,"title":"쌍촌본가","addr":"대전 유성구 엑스포로 244-5","mapX":"127.4062622","mapY":"36.378528","category":"한식","detailCategory":"갈비","searchCount":5837,"sumScore":0,"numScore":0,"distance":3.51}]},{"id":"2752796","title":"봉무공원야영장","addr":"대구광역시 동구 팔공로50길 66","mapX":"128.6502036208","mapY":"35.9220012197","image":"http://tong.visitkorea.or.kr/cms/resource/50/2753750_image2_1.jpg","contentTypeId":"28","cat1":"A03","cat2":"A0302","cat3":"A03021700","areaCode":"4","sigunguCode":"4","tel":"","sumScore":0,"numScore":0,"tag":null,"nearByRestaurants":[{"id":"R3634","rank":98,"title":"마루막창동촌점","addr":"대구 동구 효동로2길 33-7","mapX":"128.6522497","mapY":"35.8813217","category":"전문음식","detailCategory":"곱창,막창","searchCount":7401,"sumScore":0,"numScore":0,"distance":4.52},{"id":"R3642","rank":106,"title":"여원찜갈비","addr":"대구 북구 복현로 182-27","mapX":"128.6202659","mapY":"35.9064505","category":"한식","detailCategory":"갈비","searchCount":7161,"sumScore":0,"numScore":0,"distance":3.15},{"id":"R3645","rank":109,"title":"K2정문식당","addr":"대구 동구 아양로 341-0","mapX":"128.6445216","mapY":"35.894479","category":"한식","detailCategory":"찌개,전골","searchCount":7150,"sumScore":0,"numScore":0,"distance":3.1}]}]],"status":200,"statusText":"","headers":{"content-type":"application/json"},"config":{"transitional":{"silentJSONParsing":true,"forcedJSONParsing":true,"clarifyTimeoutError":false},"adapter":["xhr","http"],"transformRequest":[null],"transformResponse":[null],"timeout":600000,"xsrfCookieName":"XSRF-TOKEN","xsrfHeaderName":"X-XSRF-TOKEN","maxContentLength":-1,"maxBodyLength":-1,"env":{},"headers":{"Accept":"application/json, text/plain, */*","Content-Type":"application/json"},"method":"post","url":"http://43.201.19.87:8080/tourApi/areaBased","data":"{\"currentX\":\"127.1311319763\",\"currentY\":\"37.4090839580511\",\"areas\":[{\"areaName\":\"대전\",\"sigunguName\":\"대덕구\"},{\"areaName\":\"대구\",\"sigunguName\":\"동구\"}],\"categories\":[\"A01\",\"A02\",\"A03\",\"C01\"],\"foodPreferences\":[\"국물요리\",\"고기\",\"면/분식\"],\"travelDuration\":3}"},"request":{}}
function Departure() {
  const [hello, setHello] = useState('현재 상황: 스케줄을 만들고 있습니다. 기다려주세요!');
  const tripListString = localStorage.getItem("advancedTripList");
  const tripList = JSON.parse(tripListString);

  const area = tripList.map((item) => {
    const { address, lat, lng } = item;
    const addressParts = address.split(" ");
    var areaName = addressParts[0].replace("광역시", "").replace("특별시", "");
    var sigunguName = "";

    if (addressParts.length > 1) {
      sigunguName = addressParts[1].split(" ")[0];
    } else {
      sigunguName = addressParts[1];
    }
    return {
      areaName,
      sigunguName
    };
  });
  var travelDuration = parseInt(localStorage.getItem("Bakil")) + 1;
  const [formData, setFormData] = useState({
    "currentX": localStorage.getItem("x"),

    "currentY": localStorage.getItem("y"),

    "areas": area,

    "categories": ["A01", "A02", "A03", "C01"],

    "foodPreferences": ["국물요리", "고기", "면/분식"],

    "travelDuration": travelDuration
  });
  useEffect(() => {
    const apiRequest = axios.create({
      timeout: 600000, // 10 minutes timeout
    });
    console.log(formData);
    apiRequest
      .post('http://43.201.19.87:8080/tourApi/areaBased', formData)
      .then((response) => {
        const responseDataString = JSON.stringify(response.data[0][0]);
        setHello("현재 상황: 추천 장소를 받아왔습니다!");
        console.log(response);
        res = JSON.stringify(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  return (
    <Background>
      <NavBar />
      <Alert variant="primary">
      <Alert.Heading>
      {hello}</Alert.Heading>
    </Alert>
      <div>
        {JSON.stringify(sample.data[0][0].title)}
      </div>
      <div>
        {JSON.stringify(sample.data[0][0].addr)}
      </div>
      <Image src={sample.data[0][0].image} style={{width:"40vh"}} rounded />
      <div>
      {JSON.stringify(sample.data[0][0].nearByRestaurants[0].title)}
      </div>
      <div>
        {JSON.stringify(sample.data[0][0].nearByRestaurants[0].addr)}
      </div>
      <div>
        {JSON.stringify(sample.data[0][0].nearByRestaurants[1].title)}
      </div>
      <div>
        {JSON.stringify(sample.data[0][0].nearByRestaurants[1].addr)}
      </div>
      <div>
        {JSON.stringify(sample.data[0][0].nearByRestaurants[2].title)}
      </div>
      <div>
        {JSON.stringify(sample.data[0][0].nearByRestaurants[2].addr)}
      </div>
      <MainWrapper>
        <Row>
          <Col xs={6}>
            <ScheduleWrapper>
            </ScheduleWrapper>
          </Col>
          <Col xs={6}>
            <MapWrapper>
            </MapWrapper>
          </Col>
        </Row>
      </MainWrapper>
    </Background>
  );
}

export default Departure;
