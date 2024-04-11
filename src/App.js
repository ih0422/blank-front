import './App.css';
import { useSelector } from 'react-redux';
import Login from './component/login';
import MyPage from './component/myPage';

function App() {
  const isLogin = useSelector((state) => state.userInfo.login)
  
  return (
    <div className="App">
     {isLogin === true ? <MyPage/> : <Login/> }
    </div>
  );
}

export default App;
