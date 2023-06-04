import React, { useEffect, useState, useContext } from 'react';
import { MyContext } from '../provider';
import { Container, Col, Button, Modal } from 'react-bootstrap';
import Calendar from 'react-calendar';
import '../../mainpage/font.css'
import 'react-calendar/dist/Calendar.css';


function Forms() {
    const [message1, setMessage1] = useState("");
    const [message2, setMessage2] = useState("");
    const [message3, setMessage3] = useState("");
    const [message4, setMessage4] = useState("");
    const [comment1, setComment1] = useState("위에서 교통수단을 선택해 주세요.");
    const { departureDate1, setDepartureDate1, departureDate2, setDepartureDate2, transport, setTransport } = useContext(MyContext);
    const [value1, onChange1] = useState(new Date());
    const [value2, onChange2] = useState(new Date());
    const [showModal1, setShowModal1] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    var antiInfiniteError = 0;
    useEffect(() => {
        const name = localStorage.getItem('name');
        const finalDeparture = localStorage.getItem('finalDeparture');
        if (name) {
            setMessage1(`${name}님, 안녕하세요!`);
        }
        if (finalDeparture) {
            setMessage2(`"${finalDeparture}"에서 여행을 출발하시는군요!`)
        }
        if(departureDate1 === ""){
            setMessage3("날짜를 선택하세요.");
        }
        else{
            localStorage.setItem("departureDate1", departureDate1);
            setMessage3(departureDate1);
        }
        if(departureDate2 === ""){
            setMessage4("날짜를 선택하세요.");
        }
        else{
            localStorage.setItem("departureDate2", departureDate2);
            setMessage4(departureDate2);
        }
        setMessage4(departureDate2);
    }, [departureDate1, departureDate2]);

    const handleSelectChange = (event) => {
        const value = event.target.value;
        if (value === "0") {
            setTransport("");
            setComment1("위에서 교통수단을 선택해 주세요.");
        }
        if (value === "1") {
            setTransport("대중교통");
            setComment1("대중교통: 대중교통을 이용하여 여행하며, 불가피할 시에는 택시를 이용합니다.");
        }
        if (value === "2") {
            setTransport("자동차");
            setComment1("자동차: 여행의 시작부터 끝까지 모두 자차를 이용하여 여행합니다.");
        }
        if (value === "3") {
            setTransport("렌트카");
            setComment1("렌트카: 여행지까지는 대중교통을 이용하며, 여행지 내에서는 렌트카를 이용하여 여행합니다.");
        }
    };

    const handleCalendar1 = () => {
        setShowModal1(true);
    }

    const handleClose1 = () => {
        setShowModal1(false);
    }
    
    const handleCalendar2 = () => {
        setShowModal2(true);
    }

    const handleClose2 = () => {
        setShowModal2(false);
    }

    const handleCloseWithSelection1 = () => {
        if(departureDate2){
            if(value1 > value2){
                setDepartureDate1("Error: 도착일보다 늦게 출발할 수 없는 걸요!");
                setShowModal1(false);
                return;
            }
        }
        var a = value1.getFullYear(); // 2022
        var b = value1.getMonth() + 1; // 2
        var c = value1.getDate(); // 9
        var d = value1.getDay();
        if(d===0) d="일";
        if(d===1) d="월";
        if(d===2) d="화";
        if(d===3) d="수";
        if(d===4) d="목";
        if(d===5) d="금";
        if(d===6) d="토";
        var str = `${a}년 ${b}월 ${c}일 (${d}요일)`
        setDepartureDate1(str);
        setShowModal1(false);
        if(departureDate2 === "Error: 출발일보다 빨리 돌아올 수 없는 걸요!" && !antiInfiniteError){
            antiInfiniteError++;
            handleCloseWithSelection2();
        }
        antiInfiniteError = 0;
    }

    const handleCloseWithSelection2 = () => {
        if(departureDate1){
            if(value1 > value2){
                setDepartureDate2("Error: 출발일보다 빨리 돌아올 수 없는 걸요!");
                setShowModal2(false);
                return;
            }
        }
        var a = value2.getFullYear(); // 2022
        var b = value2.getMonth() + 1; // 2
        var c = value2.getDate(); // 9
        var d = value2.getDay();
        if(d===0) d="일";
        if(d===1) d="월";
        if(d===2) d="화";
        if(d===3) d="수";
        if(d===4) d="목";
        if(d===5) d="금";
        if(d===6) d="토";
        var str = `${a}년 ${b}월 ${c}일 (${d}요일)`
        setDepartureDate2(str);
        setShowModal2(false);
        if(departureDate1 === "Error: 도착일보다 늦게 출발할 수 없는 걸요!" && !antiInfiniteError){
            antiInfiniteError++;
            handleCloseWithSelection1();
        }
        antiInfiniteError = 0;
    }

    return (
        <Col>
            <div className="alert alert-info" role="alert" style={{ fontSize: "18px", width: "70vh", marginLeft: "10vh" }}>
                <div className='fd'>{message1 ? message1 : null}</div>
                <div className='fd'>{message2 ? message2 : null}</div>
                <div className='fd'>여행 정보를 알려주시겠어요?</div>
            </div>
            <Container style={{ height: "2vh" }} />
            <div className="alert alert-info" role="alert" style={{ fontSize: "18px", width: "70vh", marginLeft: "10vh" }}>
                <div className='fd'>1. 어떻게 여행하시겠어요?</div>
                <Container style={{ height: "1vh" }} />
                <select className="form-select" onChange={handleSelectChange} aria-label="Default select example">
                    <option value="0">(선택)</option>
                    <option value="1">대중교통</option>
                    <option value="2">자동차</option>
                    <option value="3">렌트카</option>
                </select>
                <div className='sd' style={{ fontSize: "15px" }}>
                    {comment1}
                </div>
            </div>
            <div className="alert alert-info" role="alert" style={{ fontSize: "18px", width: "70vh", marginLeft: "10vh" }}>
                <div className='fd'>2. 언제 출발하세요?</div>
                <Container style={{ height: "1vh" }} />
                <select className="form-select" aria-label="Default select example" onClick={handleCalendar1}>
                    <option value="0">{message3}</option>
                </select>
            </div>
            <div className="alert alert-info" role="alert" style={{ fontSize: "18px", width: "70vh", marginLeft: "10vh" }}>
                <div className='fd'>2. 언제 돌아오세요?</div>
                <Container style={{ height: "1vh" }} />
                <select className="form-select" aria-label="Default select example" onClick={handleCalendar2}>
                    <option value="0">{message4}</option>
                </select>
            </div>

            <Modal show={showModal1} onHide={handleClose1} style={{justifyContent:"center"}}>
                <Modal.Header style={{justifyContent:"center", background:"#AACCFF"}}>
                    <div className='dd' style={{fontSize:"23px"}}>
                        출발 날짜 선택
                    </div>
                </Modal.Header>
                <Modal.Body style={{justifyContent:"center", marginLeft:"11%"}}>
                    <Container style={{height:"1vh"}}/>
                <Calendar 
                    locale="en-US"
                    onChange={onChange1}
                    value={value1}
                    showNeighboringMonth={false} //  이전, 이후 달의 날짜는 보이지 않도록 설정
                />
                </Modal.Body>
                <Modal.Body style={{justifyContent:"center"}}>
                    <Col style={{left:"57%"}}>
                        <Button className="btn btn-primary" onClick={handleCloseWithSelection1}>
                            <div className='dd' style={{fontSize:"18px"}}>
                                선택
                            </div>
                        </Button>
                        <Button className="btn btn-secondary" onClick={handleClose1} style={{marginLeft:"1vh"}}>
                            <div className='dd' style={{fontSize:"18px"}}>
                                닫기
                            </div>
                        </Button>
                    </Col>
                </Modal.Body>
                <Container style={{height:"3vh"}}/>
            </Modal>

            <Modal show={showModal2} onHide={handleClose2} style={{justifyContent:"center"}}>
                <Modal.Header style={{justifyContent:"center", background:"#AACCFF"}}>
                    <div className='dd' style={{fontSize:"23px"}}>
                        복귀 날짜 선택
                    </div>
                </Modal.Header>
                <Modal.Body style={{justifyContent:"center", marginLeft:"11%"}}>
                    <Container style={{height:"1vh"}}/>
                <Calendar 
                    locale="en-US"
                    onChange={onChange2}
                    value={value2}
                    showNeighboringMonth={false} //  이전, 이후 달의 날짜는 보이지 않도록 설정
                />
                </Modal.Body>
                <Modal.Body style={{justifyContent:"center"}}>
                    <Col style={{left:"57%"}}>
                        <Button className="btn btn-primary" onClick={handleCloseWithSelection2}>
                            <div className='dd' style={{fontSize:"18px"}}>
                                선택
                            </div>
                        </Button>
                        <Button className="btn btn-secondary" onClick={handleClose2} style={{marginLeft:"1vh"}}>
                            <div className='dd' style={{fontSize:"18px"}}>
                                닫기
                            </div>
                        </Button>
                    </Col>
                </Modal.Body>
                <Container style={{height:"3vh"}}/>
            </Modal>
        </Col>
    );
}


export default Forms;
