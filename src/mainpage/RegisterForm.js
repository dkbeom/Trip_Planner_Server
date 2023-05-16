import React, { useState } from 'react';
import './font.css';
import axios from 'axios';

export var isFormOK = false;

export function RegisterForm() {
    const [formData, setFormData] = useState(
        {
            "id": "",
            "pwd": "",
            "name": "",
            "nickname": "",
            "gender": "1",
            "age": 1,
        }
    )
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const [errorMessage, setErrorMessage] = useState('');
    isFormOK = false;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.nickname.length < 2) {
            setErrorMessage('닉네임은 최소 2글자 이상으로 설정해주세요!');
            return;
        }
        const emailRegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegExp.test(formData.id)) {
            setErrorMessage('이메일의 형식에 어긋납니다!');
            return;
        }
        if (formData.pwd.length < 5) {
            setErrorMessage('비밀번호는 5자 이상이어야 합니다!');
            return;
        }
        if (formData.pwd !== formData.name) {
            setErrorMessage('비밀번호가 다릅니다!');
            return;
        }
        setErrorMessage('');

        console.log(formData);

        axios.post('http://192.168.1.38:8080/member/join', formData)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });


        isFormOK = true;
        const jsonFormData = JSON.stringify(formData);
        const blob = new Blob([jsonFormData], { type: 'application/json' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'formData.json';
        document.body.appendChild(link); // link 엘리먼트를 DOM에 추가

        //link.click();

        document.body.removeChild(link); // link 엘리먼트를 DOM에서 제거

    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };


    return (
        <form onSubmit={handleSubmit} className='registerform'>
            <div>
                <label style={{ paddingLeft: 10, paddingRight: 54 }}>
                    닉네임:
                </label>
                <input type="text" name="nickname" value={formData.nickname} onChange={handleChange} style={{ width: '300px' }} placeholder="고객님을 이렇게 불러드릴게요." />
            </div>
            <div>
                <label style={{ paddingLeft: 10, paddingRight: 54 }}>
                    이메일:
                </label>
                <input type="email" name="id" value={formData.ID} onChange={handleChange} style={{ width: '300px' }} placeholder="이메일의 형식을 지켜주세요." />
            </div>
            <div>
                <label style={{ paddingLeft: 10, paddingRight: 40.2 }}>
                    비밀번호:
                </label>
                <input type="password" name="pwd" value={formData.PWD} onChange={handleChange} style={{ width: '300px' }} placeholder="최소 5자 입력해주세요." />
            </div>
            <div>
                <label style={{ paddingLeft: 10, paddingRight: 8.5 }}>
                    비밀번호 확인:
                </label>
                <input type="password" name="name" value={formData.name} onChange={handleChange} placeholder="비밀번호를 한 번 더 입력해주세요." style={{ width: '300px' }} />
            </div>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <button type="submit" style={{ opacity: 0, pointerEvents: 'none', height: '0' }}>JSON 파일 다운로드</button>
        </form>
    );
}
