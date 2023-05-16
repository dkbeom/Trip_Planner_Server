import ListGroup from 'react-bootstrap/ListGroup';
import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';

function LinkedExample() {
    const [activeItem1, setActiveItem1] = useState(''); // 초기값 0으로 설정
    const [activeItem2, setActiveItem2] = useState('');
    const [subListItems, setSubListItems] = useState([
        { text: '' }
    ]);

    const handleClick1 = (index) => {
        setActiveItem1(index);
        if (index === 0) {
            setSubListItems([
                { text: '강원도 강릉시' },
                { text: '강원도 고성군' },
                { text: '강원도 동해시' },
                { text: '강원도 삼척시' },
                { text: '강원도 속초시' },
                { text: '강원도 양구군' },
                { text: '강원도 양양군' },
                { text: '강원도 영월군' },
                { text: '강원도 원주시' },
                { text: '강원도 인제군' },
                { text: '강원도 정선군' },
                { text: '강원도 철원군' },
                { text: '강원도 춘천시' },
                { text: '강원도 태백시' },
                { text: '강원도 평창군' },
                { text: '강원도 홍천군' },
                { text: '강원도 화천군' },
                { text: '강원도 횡성군' },

            ]);
        } else if (index === 1) {
            setSubListItems([
                { text: '경기도 가평군' },
                { text: '경기도 고양시 덕양구' },
                { text: '경기도 고양시 일산동구' },
                { text: '경기도 고양시 일산서구' },
                { text: '경기도 과천시' },
                { text: '경기도 광명시' },
                { text: '경기도 광주시' },
                { text: '경기도 구리시' },
                { text: '경기도 군포시' },
                { text: '경기도 김포시' },
                { text: '경기도 남양주시' },
                { text: '경기도 동두천시' },
                { text: '경기도 부천시' },
                { text: '경기도 성남시 분당구' },
                { text: '경기도 성남시 수정구' },
                { text: '경기도 성남시 중원구' },
                { text: '경기도 수원시 권선구' },
                { text: '경기도 수원시 영통구' },
                { text: '경기도 수원시 장안구' },
                { text: '경기도 수원시 팔달구' },
                { text: '경기도 시흥시' },
                { text: '경기도 안산시 단원구' },
                { text: '경기도 안산시 상록구' },
                { text: '경기도 안성시' },
                { text: '경기도 안양시 동안구' },
                { text: '경기도 안양시 만안구' },
                { text: '경기도 양주시' },
                { text: '경기도 양평군' },
                { text: '경기도 여주시' },
                { text: '경기도 연천군' },
                { text: '경기도 오산시' },
                { text: '경기도 용인시 기흥구' },
                { text: '경기도 용인시 수지구' },
                { text: '경기도 용인시 처인구' },
                { text: '경기도 의왕시' },
                { text: '경기도 의정부시' },
                { text: '경기도 이천시' },
                { text: '경기도 파주시' },
                { text: '경기도 평택시' },
                { text: '경기도 포천시' },
                { text: '경기도 하남시' },
                { text: '경기도 화성시' }

            ]);
        } else if (index === 2) {
            setSubListItems([
                { text: '경상남도 거제시' },
                { text: '경상남도 거창군' },
                { text: '경상남도 고성군' },
                { text: '경상남도 김해시' },
                { text: '경상남도 남해군' },
                { text: '경상남도 밀양시' },
                { text: '경상남도 사천시' },
                { text: '경상남도 산청군' },
                { text: '경상남도 양산시' },
                { text: '경상남도 의령군' },
                { text: '경상남도 진주시' },
                { text: '경상남도 창녕군' },
                { text: '경상남도 창원시 마산합포구' },
                { text: '경상남도 창원시 마산회원구' },
                { text: '경상남도 창원시 성산구' },
                { text: '경상남도 창원시 의창구' },
                { text: '경상남도 창원시 진해구' },
                { text: '경상남도 통영시' },
                { text: '경상남도 하동군' },
                { text: '경상남도 함안군' },
                { text: '경상남도 함양군' },
                { text: '경상남도 합천군' }
            ]);
        } else if (index === 3) {
            setSubListItems([
                { text: '경상북도 경산시' },
                { text: '경상북도 경주시' },
                { text: '경상북도 고령군' },
                { text: '경상북도 구미시' },
                { text: '경상북도 군위군' },
                { text: '경상북도 김천시' },
                { text: '경상북도 문경시' },
                { text: '경상북도 봉화군' },
                { text: '경상북도 상주시' },
                { text: '경상북도 성주군' },
                { text: '경상북도 안동시' },
                { text: '경상북도 영덕군' },
                { text: '경상북도 영양군' },
                { text: '경상북도 영주시' },
                { text: '경상북도 영천시' },
                { text: '경상북도 예천군' },
                { text: '경상북도 울릉군' },
                { text: '경상북도 울진군' },
                { text: '경상북도 의성군' },
                { text: '경상북도 청도군' },
                { text: '경상북도 청송군' },
                { text: '경상북도 칠곡군' },
                { text: '경상북도 포항시 남구' },
                { text: '경상북도 포항시 북구' }

            ]);
        } else if (index === 4) {
            setSubListItems([
                { text: '광주광역시 광산구' },
                { text: '광주광역시 남구' },
                { text: '광주광역시 동구' },
                { text: '광주광역시 북구' },
                { text: '광주광역시 서구' }
            ]);
        } else if (index === 5) {
            setSubListItems([
                { text: '대구광역시 남구' },
                { text: '대구광역시 달서구' },
                { text: '대구광역시 달성군' },
                { text: '대구광역시 동구' },
                { text: '대구광역시 북구' },
                { text: '대구광역시 서구' },
                { text: '대구광역시 수성구' },
                { text: '대구광역시 중구' },
            ]);
        } else if (index === 6) {
            setSubListItems([
                { text: '대전광역시 대덕구' },
                { text: '대전광역시 동구' },
                { text: '대전광역시 서구' },
                { text: '대전광역시 유성구' },
                { text: '대전광역시 중구' }
            ]);
        } else if (index === 7) {
            setSubListItems([
                { text: '부산광역시 강서구' },
                { text: '부산광역시 금정구' },
                { text: '부산광역시 기장군' },
                { text: '부산광역시 남구' },
                { text: '부산광역시 동구' },
                { text: '부산광역시 동래구' },
                { text: '부산광역시 부산진구' },
                { text: '부산광역시 북구' },
                { text: '부산광역시 사상구' },
                { text: '부산광역시 사하구' },
                { text: '부산광역시 서구' },
                { text: '부산광역시 수영구' },
                { text: '부산광역시 연제구' },
                { text: '부산광역시 영도구' },
                { text: '부산광역시 중구' },
                { text: '부산광역시 해운대구' }
            ]);
        } else if (index === 8) {
            setSubListItems([
                { text: '서울특별시 강남구' },
                { text: '서울특별시 강동구' },
                { text: '서울특별시 강북구' },
                { text: '서울특별시 강서구' },
                { text: '서울특별시 관악구' },
                { text: '서울특별시 광진구' },
                { text: '서울특별시 구로구' },
                { text: '서울특별시 금천구' },
                { text: '서울특별시 노원구' },
                { text: '서울특별시 도봉구' },
                { text: '서울특별시 동대문구' },
                { text: '서울특별시 동작구' },
                { text: '서울특별시 마포구' },
                { text: '서울특별시 서대문구' },
                { text: '서울특별시 서초구' },
                { text: '서울특별시 성동구' },
                { text: '서울특별시 성북구' },
                { text: '서울특별시 송파구' },
                { text: '서울특별시 양천구' },
                { text: '서울특별시 영등포구' },
                { text: '서울특별시 용산구' },
                { text: '서울특별시 은평구' },
                { text: '서울특별시 종로구' },
                { text: '서울특별시 중구' },
                { text: '서울특별시 중랑구' }
            ])
        } else if (index === 9) {
            setSubListItems([
                { text: '세종특별자치시' }
            ])
        } else if (index === 10) {
            setSubListItems([
                { text: '울산광역시 남구' },
                { text: '울산광역시 동구' },
                { text: '울산광역시 북구' },
                { text: '울산광역시 울주군' },
                { text: '울산광역시 중구' }
            ])
        } else if (index === 11) {
            setSubListItems([
                { text: '인천광역시 강화군' },
                { text: '인천광역시 계양구' },
                { text: '인천광역시 남구' },
                { text: '인천광역시 남동구' },
                { text: '인천광역시 동구' },
                { text: '인천광역시 부평구' },
                { text: '인천광역시 서구' },
                { text: '인천광역시 연수구' },
                { text: '인천광역시 옹진군' },
                { text: '인천광역시 중구' }
            ])
        } else if (index === 12) {
            setSubListItems([
                { text: '전라남도 강진군' },
                { text: '전라남도 고흥군' },
                { text: '전라남도 곡성군' },
                { text: '전라남도 광양시' },
                { text: '전라남도 구례군' },
                { text: '전라남도 나주시' },
                { text: '전라남도 담양군' },
                { text: '전라남도 목포시' },
                { text: '전라남도 무안군' },
                { text: '전라남도 보성군' },
                { text: '전라남도 순천시' },
                { text: '전라남도 신안군' },
                { text: '전라남도 여수시' },
                { text: '전라남도 영광군' },
                { text: '전라남도 영암군' },
                { text: '전라남도 완도군' },
                { text: '전라남도 장성군' },
                { text: '전라남도 장흥군' },
                { text: '전라남도 진도군' },
                { text: '전라남도 함평군' },
                { text: '전라남도 해남군' },
                { text: '전라남도 화순군' }
            ])
        } else if (index === 13) {
            setSubListItems([

                { text: '전라북도 고창군' },
                { text: '전라북도 군산시' },
                { text: '전라북도 김제시' },
                { text: '전라북도 남원시' },
                { text: '전라북도 무주군' },
                { text: '전라북도 부안군' },
                { text: '전라북도 순창군' },
                { text: '전라북도 완주군' },
                { text: '전라북도 익산시' },
                { text: '전라북도 임실군' },
                { text: '전라북도 장수군' },
                { text: '전라북도 전주시 덕진구' },
                { text: '전라북도 전주시 완산구' },
                { text: '전라북도 정읍시' },
                { text: '전라북도 진안군' }
            ])
        } else if (index === 14) {
            setSubListItems([
                { text: '제주도 서귀포시' },
                { text: '제주도 제주시' }
            ])
        } else if (index === 15) {
            setSubListItems([
                { text: '충청남도 계룡시' },
                { text: '충청남도 공주시' },
                { text: '충청남도 금산군' },
                { text: '충청남도 논산시' },
                { text: '충청남도 당진시' },
                { text: '충청남도 보령시' },
                { text: '충청남도 부여군' },
                { text: '충청남도 서산시' },
                { text: '충청남도 서천군' },
                { text: '충청남도 아산시' },
                { text: '충청남도 예산군' },
                { text: '충청남도 천안시 동남구' },
                { text: '충청남도 천안시 서북구' },
                { text: '충청남도 청양군' },
                { text: '충청남도 태안군' },
                { text: '충청남도 홍성군' }
            ])
        } else if (index === 16) {
            setSubListItems([
                { text: '충청북도 괴산군' },
                { text: '충청북도 단양군' },
                { text: '충청북도 보은군' },
                { text: '충청북도 영동군' },
                { text: '충청북도 옥천군' },
                { text: '충청북도 음성군' },
                { text: '충청북도 제천시' },
                { text: '충청북도 증평군' },
                { text: '충청북도 진천군' },
                { text: '충청북도 청주시 상당구' },
                { text: '충청북도 청주시 서원구' },
                { text: '충청북도 청주시 청원구' },
                { text: '충청북도 청주시 흥덕구' },
                { text: '충청북도 충주시' }
            ])
        }
    };

    const handleClick2 = (index) => {
    setActiveItem2(index);
    const itemName = subListItems[index].text;
    alert(`${itemName} 버튼을 추가합니다!`);
};

    const [listItems1] = useState([
        { text: '강원도' },
        { text: '경기도' },
        { text: '경상남도' },
        { text: '경상북도' },
        { text: '광주광역시' },
        { text: '대구광역시' },
        { text: '대전광역시' },
        { text: '부산광역시' },
        { text: '서울특별시' },
        { text: '세종특별자치시' },
        { text: '울산광역시' },
        { text: '인천광역시' },
        { text: '전라남도' },
        { text: '전라북도' },
        { text: '제주도' },
        { text: '충청남도' },
        { text: '충청북도' },
    ]);
    return (
        <Row>
            <Col>
                <ListGroup>
                    <ListGroup.Item variant="info" style={{ textAlign: 'center' }}>
                        도 / 시
                    </ListGroup.Item>
                    <ListGroup defaultActiveKey="#link1" style={{ height: '60vh', overflowY: 'scroll' }}>
                        {listItems1.map((item, index) => (
                            <ListGroup.Item
                                key={index}
                                action
                                onClick={() => handleClick1(index)}
                                style={{
                                    width: '25vh',
                                    textAlign: 'center',
                                    background: activeItem1 === index ? 'lightgray' : '',
                                }}
                            >
                                {item.text}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </ListGroup>
            </Col>

            <Col>
                <ListGroup>
                    <ListGroup.Item variant="info" style={{ textAlign: 'center' }}>
                        시 / 군 / 구
                    </ListGroup.Item>
                    <ListGroup defaultActiveKey="#link1" style={{ height: '60vh', overflowY: 'scroll' }}>
                        {subListItems.map((item, index) => (
                            <ListGroup.Item
                                key={index}
                                action
                                onClick={() => handleClick2(index)}
                                style={{
                                    width: '30vh',
                                    textAlign: 'center',
                                    background: activeItem2 === index ? 'lightgray' : '',
                                }}
                            >
                                {item.text}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </ListGroup>
            </Col>
        </Row>
    );
}

export default LinkedExample;
