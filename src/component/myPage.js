import React, { useState, useEffect, useSyncExternalStore } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser } from '../reducer/userSlice';

function MyPage() {
    const dispatch = useDispatch()
    const userInfo = useSelector((state) => state.userInfo)
    
    const logoutHandler = () => {
        console.log('로그아웃')
        dispatch(clearUser())
    }

    return(
        <>
            <h2>My Page</h2>
            <p>{userInfo.name} 님, 안녕하세요!</p>
            <buttion onClick = {logoutHandler}>로그아웃</buttion>
        </>
    )
}

export default MyPage