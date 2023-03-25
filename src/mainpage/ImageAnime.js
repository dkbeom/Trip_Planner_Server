import { useState, useEffect } from "react";
import ImageObject from "./ImageObject";
import './font.css';

function ImageAnime() {
    const [showText1, setShowText1] = useState(false);
    const [showText2, setShowText2] = useState(false);
    const [showText3, setShowText3] = useState(false);

    useEffect(() => {
        const timeout1 = setTimeout(() => {
            setShowText1(true);
        }, 1000);

        const timeout2 = setTimeout(() => {
            setShowText2(true);
        }, 2000);

        const timeout3 = setTimeout(() => {
            setShowText3(true);
        }, 3000);

        return () => {
            clearTimeout(timeout1);
            clearTimeout(timeout2);
            clearTimeout(timeout3);
        }
    }, []);

    return (
        <div className="textarrange" style={{ paddingLeft: "350px", paddingRight: "350px", paddingTop: "10px" }}>
            <div className={`item ${showText1 ? "show" : ""}`}>
                <ImageObject
                    imageSrc="/food.png"
                    imageAlt="Example Image"
                    description="맞춤형 여행지" />
            </div>
            <div className={`item ${showText2 ? "show" : ""}`}>
                <ImageObject
                    imageSrc="/route.png"
                    imageAlt="Example Image"
                    description="최적의 동선" />
            </div>
            <div className={`item ${showText3 ? "show" : ""}`}>
                <ImageObject
                    imageSrc="/schedule.png"
                    imageAlt="Example Image"
                    description="시간별 스케줄" />
            </div>
        </div>
    );
}

export default ImageAnime;
