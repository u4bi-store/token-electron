import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import jwt from 'jsonwebtoken';
import smalltalk from 'smalltalk/legacy';


const getToken = _ => window.localStorage.getItem('___TOKEN')
const isToken = _ => !!getToken()

const submitToken = token => window.localStorage.setItem('___TOKEN', token)
const rollbackToken = _ => (alert('인증 토큰을 등록하지 않아 프로그램을 사용하실 수 없습니다.'), window.close())

const isVerification = _ => jwt.verify(getToken(), 'secretKEY_nextm@@nshot!123', (err, e) => {

    const faild = () => (submitToken(''), window.close())

    if (err) return (alert('유효하지 않은 토큰입니다.'), faild())

    if (new Date() > new Date(e.exp * 1000)) return (alert('기한이 만료되었습니다.'), faild())

    console.log('인증 완료', e.username)

})



isToken() ? isVerification()
: smalltalk
        .prompt('사용자 인증', '인증 토큰을 입력해주세요.', '')
        .then(e => e === '' ? rollbackToken() : (submitToken(e), isVerification()))
        .catch(_ => rollbackToken())



ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
