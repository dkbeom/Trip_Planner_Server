import { Navbar, Container, Col } from 'react-bootstrap';
import { useState, useContext, useEffect } from 'react';
import { Title } from './Title';
import Register from './Register';
import Login from './Login';
import './font.css';
import { Link } from 'react-router-dom';
import { MyContext } from '../provider';

function ParentComponent() {
    const { isLogin, accountEmail } = useContext(MyContext);

    return (
        <Greeting isLogin={isLogin} accountEmail={accountEmail} />
    );
}

function Greeting({ isLogin, accountEmail }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = () => setIsLoggedIn(true);
    const handleLogout = () => {
        setIsLoggedIn(false);
        //localStorage.clear();
    }

    useEffect(() => {
        if (isLogin) {
            handleLogin();
        } else {
            handleLogout();
        }
    }, [isLogin]);

    const [showModal, setShowModal] = useState(false);
    const handleModalClose = () => setShowModal(false);

    if (localStorage.getItem("token")) {
        return (
            <Container>
                <Col>
                    <div className='dd' style={{ fontSize: "20px", marginRight: "200px" }}>
                        <button type="button" className="btn btn-outline-success" style={{ marginRight: "10px" }}>My Page</button>
                        <button type="button" className="btn btn-outline-danger" onClick={handleLogout}>Logout</button>
                    </div>
                </Col>
                <Col style={{ paddingTop: "20px" }}>
                    <div className='sd'>
                        {localStorage.getItem("ID")}님 안녕하세요!
                    </div>
                </Col>
            </Container>
        );
    } else {
        return (
            <Container>
                <Col style={{ paddingTop: "20px" }}>
                    <div className='dd' style={{ fontSize: "20px", marginRight: "200px" }}>
                        <Login show={showModal} handleClose={handleModalClose} />
                        {" "} {/* 공백 추가 */}
                        <Register show={showModal} handleClose={handleModalClose} />

                    </div>
                </Col>
                <Col style={{ paddingTop: "20px" }}>
                    <div className='sd'>
                        로그인하세요.
                    </div>
                </Col>
            </Container>
        );
    }
}

function NavBar() {
    return (
        <Navbar
            expand="lg"
            className="navbar-expand-lg justify-content-between"
            style={{ backgroundColor: "rgba(255, 255, 255, 0.5)", height: "180px" }}
        >
            <div>
                <Container>
                    <Col>
                        <Navbar.Brand href="/">
                            <Title>
                                <img src="icon_STP.png" alt="Main_Logo" width="120" height="60" />
                                <span className="highlight">
                                    The <span className="green"> S</span>implest Trip{" "}
                                    <span className="orange"> P</span>lanner
                                </span>
                            </Title>
                        </Navbar.Brand>
                    </Col>
                    <Col style={{ paddingLeft: "150px" }}>
                        <div className='dd'>
                            당신 곁의 가장 완벽한 플래너
                        </div>
                    </Col>
                </Container>
            </div>
            <div>
            <ParentComponent />
            </div>
        </Navbar>
    );
}

export default NavBar;
