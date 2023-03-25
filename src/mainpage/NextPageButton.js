import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './font.css'

function NextPageButton() {
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowButton(true);
        }, 4000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <Container style={{ paddingTop: "150px", textAlign: "center" }}>
            <Router basename="/">
                <div className={`item ${showButton ? "show" : ""}`}>
                    <Link to="/hello">
                        <button
                            type="button"
                            className="btn btn-secondary btn-lg"
                            style={{
                                backgroundColor: "#F0CC90",
                                color: "#121212",
                                boxShadow: "0px 0px 10px 1px rgba(0,0,0,0.2)"
                            }}
                        >
                            <div className='sd' style={{ fontSize: "30px" }}>
                                스케줄 만들러 가기
                            </div>
                        </button>
                    </Link>
                </div>
            </Router>
        </Container>
    );
}

export default NextPageButton;
