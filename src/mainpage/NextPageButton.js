import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './font.css'

function NextPageButton() {
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowButton(true);
        }, 123);

        return () => clearTimeout(timer);
    }, []);

    return (
        <Container style={{ paddingTop: "50px", textAlign: "center" }}>
            <div className={`item ${showButton ? "show" : ""}`}>
                <Link to="/schedule">
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
                            스케줄 만들기
                        </div>
                    </button>
                </Link>
            </div>
        </Container>
    );
}

export default NextPageButton;
