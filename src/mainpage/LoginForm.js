import React, { useState, useContext } from 'react';
import './font.css'
import axios from 'axios';
import { MyContext } from '../provider';

export var isFormOK = false;

export function LoginForm() {
    const [formData, setFormData] = useState({
        id: '',
        pwd: '',
    });
    const [errorMessage, setErrorMessage] = useState('');
    const {setIsLogin, setaccountEmail} = useContext(MyContext);
    isFormOK = false;

    const handleSubmit = (e) => {
        e.preventDefault();
        // 이메일 형식 체크를 위한 정규 표현식
        const emailRegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegExp.test(formData.id) || formData.id.length > 30) {
            setErrorMessage('이메일의 형식에 어긋납니다!');
            return;
        }
        if (formData.pwd.length < 5) {
            setErrorMessage('비밀번호는 5자 이상이어야 합니다!');
            return;
        }
        setErrorMessage('');
        // 여기서 폼 데이터를 서버로 전송할 수 있습니다.
        console.log(formData);

        // axios를 사용하여 데이터 전송
        // axios.post('http://43.201.19.87:8080/member/login', formData) -> EC2 Version
        axios.post('http://10.210.60.44:8080/member/login', formData)
        
            .then(response => {
                console.log(response);
                if(response.data.token==null){
                    setIsLogin(false);
                    setaccountEmail("");
                }
                else{
                    setIsLogin(true);
                    setaccountEmail(formData.id);
                    localStorage.clear();
                    localStorage.setItem("ID", formData.id);
                    localStorage.setItem("token", response.data.token);
                }
            })
            .catch(error => {
                console.log(error);
            });
        isFormOK = true;
        // 폼 데이터를 JSON으로 변환합니다.
        const jsonFormData = JSON.stringify(formData);
        // Blob 객체를 생성합니다.
        const blob = new Blob([jsonFormData], { type: 'application/json' });
        // a 태그를 생성하여 JSON 파일을 다운로드합니다.
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'formData.json';
        //link.click();
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
                    이메일:
                </label>
                <input type="email" name="id" value={formData.ID} onChange={handleChange} style={{ width: '300px' }} />
            </div>
            <div>
                <label style={{ paddingLeft: 10, paddingRight: 40.2 }}>
                    비밀번호:
                </label>
                <input type="password" name="pwd" value={formData.PWD} onChange={handleChange} style={{ width: '300px' }} />
            </div>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <button type="submit" style={{ opacity: 0, pointerEvents: 'none', height: '0' }}>JSON 파일 다운로드</button>
        </form>
    );
}
