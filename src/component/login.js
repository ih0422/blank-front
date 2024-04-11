import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../reducer/userSlice';

function Login() {

    const dispatch = useDispatch()
    //const isLogin = useSelector((state) => state.userInfo.isLogin)
    
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")

    useEffect( () => {
        if (message) {
            setTimeout( () => {
                setMessage("")
            }, 1500) // 로그인 실패시 나오는 메시지를 1.5초 이후 안보이게 만든다. 
        }
    }, [message])

    const loginHandler = async (event) => {
        // email 과 pw 값이 입력되었는지 체크하고, 둘 중 하나라도 값이 없으면 alert을 return 하며 submit event를 종료한다.
        event.preventDefault();
        if (!email) {
            return alert ("Email 을 입력하세요.") // 이게 모바일로 환경을 바꿔도 제대로 alert이 뜰까?
        } 
        
        if (!password) {
            return alert ("Password 를 입력하세요.")
        }
        
        try {
            await new Promise ( (r) => setTimeout(r, 1000));
            
            const response = await fetch (
                "https://858fcbf6-e20c-4d1b-a455-73aab520c820.mock.pstmn.io/api/users",
                {
                    method: "POST",
                    headers: {
                        "Content-Type" : "application/json",
                    },
                    body: JSON.stringify( {
                        email: email,
                        password: password,
                    }),
                }
            )

            const result = await response.json();

            if (response.status === 200) {
                sessionStorage.setItem("name", result.name)
                sessionStorage.setItem("email", result.email)
                sessionStorage.setItem("role", result.role)
                sessionStorage.setItem("token", result.token)
                dispatch(loginUser(result))
                setMessage("로그인 성공")
            } else {
                setMessage("로그인 실패")
            }

        } catch(err) {
            setMessage("서버 실패")
        }

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
            <form onSubmit = {loginHandler}>
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
                <br />
                {message}
            </form>
        </div>
        </div>
        </div>
    )
}

export default Login