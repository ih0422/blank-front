import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { loginUser } from '../reducer/userSlice';

function Login() {

    const dispatch = useDispatch()
    
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("")

    useEffect( () => {
        if (message) {
            setTimeout( () => {
                setMessage("")
                setLoading(false)
            }, 1500) // 음...? 로그인 관련 답이 올때까지 못 클릭하도록 하는게 낫지 않나? 비동기로 해야하는 이유가 있나?
            //727
        }
    }, [message])

    const onSubmitHandler = (event) => {
        event.preventDefault();
        if (!email) {
            return alert ("Email 을 입력하세요.")
        } 
        
        if (!password) {
            return alert ("Password 를 입력하세요.")
        }

        console.log("EMAIL" , email);
        console.log("PASSWORD", password);

        let body = {
            email: email,
            password: password
        }

        axios.post("Endpoint", body)
        .then( (res) => {
            console.log(res.data);
            if (res.data.code == 200) {
                console.log("로그인");
                dispatch(loginUser(res.data.userInfo));
                setMessage("");
            } else {
                setMessage("에러발생: " + res.data.code)
            }
        });

        setLoading(true);
    }

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value);
    }

    return (
        <div>
        <h2>(&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;) 모임</h2>
        <div class="container" id="container">
        <div class="form-container sign-in-container">
            <form onSubmit = {onSubmitHandler}>
            <h1>Sign in</h1>
            <div class="social-container">
                <a href="#" class="social" id="naver"><img src="naver_login.png" alt="Naver"/></a>
                <a href="#" class="social" id="kakao"><img src="kakao_login_large_narrow.png" alt="kakao"></img></a>
                {/* <a href="#" class="social">Google</a> */}
            </div>
            <span>or use your account</span>
            <input type="email" value={email} onChange={onEmailHandler} placeholder="Email"/>
            <input type="password" value={password} onChange={onPasswordHandler} placeholder="Password" />
            <a href="#">Forgot your password?</a>
            <button>Sign In</button>
            </form>
        </div>
        </div>
        </div>
    )
}

export default Login