import React, { useState } from 'react';
import './font.css';
import axios from 'axios';
import { MyContext } from '../provider';
import { useContext } from 'react';

export var isFormOK = false;


export function RegisterForm() {
    isFormOK = false;
    const [formData, setFormData] = useState(
        {
            "id": "",
            "pwd": "",
            "name": "", //name은 중복 허용
            "nickname": "",
            "gender": "1",
            "age": 3
        }
    )
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const { joinsuccess, setJoinsuccess } = useContext(MyContext);
    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.nickname.length < 2) {
            setErrorMessage('닉네임은 최소 2글자 이상으로 설정해주세요!');
            return;
        }
        if (formData.nickname.length > 10) {
            setErrorMessage('닉네임은 10글자 미만으로 설정해주세요!');
            return;
        }
        const emailRegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegExp.test(formData.id) || formData.id.length > 30) {
            setErrorMessage('이메일의 형식에 어긋납니다!');
            return;
        }
        if (formData.pwd.length < 5 || formData.pwd.length > 20) {
            setErrorMessage('비밀번호는 5자 이상, 20자 미만이어야 합니다!');
            return;
        }
        if (formData.pwd !== confirmPassword) {
            setErrorMessage('비밀번호가 다릅니다!');
            return;
        }
        setErrorMessage('');

        axios.post('http://43.201.19.87:8080/member/join', formData) //-> EC2 Version
            .then((response) => {
                const response1 = response.data.result;
                if (response1 === "JOIN_SUCCESS") {
                    console.log("Register Result: %s", response1);
                    setJoinsuccess(true);
                } else if (response1 === "JOIN_FAILURE_NICKNAME_DUPLICATE"){
                    console.log("닉네임 중복!");
                    setJoinsuccess(false);
                } else if (response1 === "JOIN_FAILURE_ID_DUPLICATE"){
                    console.log("이메일 중복!");
                    setJoinsuccess(false);
                } else{
                    console.log("Register Result: %s", response1);
                    setJoinsuccess(false);
                }
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
        document.body.removeChild(link); // link 엘리먼트를 DOM에서 제거
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handlePwd = (e) => {
        setConfirmPassword(e.target.value);
      }

    return (
        <form onSubmit={handleSubmit} className='registerform'>
            <div>
                <label style={{ paddingLeft: 10, paddingRight: 67.8 }}>
                    성함:
                </label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} style={{ width: '300px' }} placeholder="고객님의 성함을 입력해주세요." />
            </div>
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
                <input type="password" name="cfpwd" value={confirmPassword} onChange={handlePwd} placeholder="비밀번호를 한 번 더 입력해주세요." style={{ width: '300px' }} />
            </div>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <button type="submit" style={{ opacity: 0, pointerEvents: 'none', height: '0' }}>JSON 파일 다운로드</button>
        </form>
    );
}
