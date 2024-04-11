import React, { useState, useEffect, useSyncExternalStore } from 'react';
import { useDispatch } from 'react-redux';

import { clearUser, loginUser } from '../reducer/userSlice';

function MyPage() {
    const user = useSelector( (state) => state.user)
    const dispatch = useDispatch()

    const logoutHandler = () => {
        console.log('로그아웃')
        dispatch(clearUser())
    }

    return(
        <>
            <h2>My Page</h2>
            <p>{user.name}님, 안녕하세요!</p>
            <buttion onClick = {() => logoutHandler()}>로그아웃</buttion>
        </>
    )
}

export default MyPage