import React from 'react';
import './font.css'

function ImageObject(props) {
    return (
        <div className="image-with-description" style={{ textAlign: "center" }}>
            <img
                className='rounded'
                src={props.imageSrc}
                alt={props.imageAlt}
                style={{ width: "300px", height: "300px" }}
            />
            <p className='sd' style={{ color: '#223344', fontSize: '35px' }}>{props.description}</p>
        </div>
    );
}

export default ImageObject;
