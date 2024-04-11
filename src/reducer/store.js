import {configureStore} from '@reduxjs/toolkit'
import userSlice from './userSlice'
export default configureStore( {
    reducer: {
        userInfo: userSlice,
    },
})

// 빈 리덕스 저장소를 생성