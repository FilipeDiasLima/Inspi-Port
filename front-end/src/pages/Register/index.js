import React, { useState }from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FaUser,FaUserPlus } from 'react-icons/fa';

import api from '../../services/api';
import './styles.css';
import imgRight from '../../assets/imgRight.png';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();

  async function handleRegister(e){
    e.preventDefault();

    const data = { name, email, password };

    try {
      const response = await api.post('users', data);

      alert(`Welcome ${response.data.name}`);

      history.push('/');
    } catch (err) {
      alert('Register failed');
    }
  }

  return (
    <div className="login-container">
      <section className="form">

        <form onSubmit={handleRegister}>
          <h1>Inspi-Porti</h1>
          <h3>Create an account</h3>
          
          <label for="uname"><b>Name</b></label>
          <input 
            type="text" 
            placeholder="exemple" 
            className="name"
            value={name}
            onChange={e => setName(e.target.value)}
          />

          <label for="uname"><b>Email</b></label>
          <input 
            type="email" 
            placeholder="example@email.com" 
            className="uname"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />

          <label for="psw"><b>Password</b></label>
          <input 
            type="password" 
            placeholder="*******" 
            className="psw"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          
          <button type="submit">Register</button>

        </form>
      
      <Link to="/">
        <button type="button" className="login">
          <FaUser size={28} color="#192149"/>
          &ensp;Sign in
        </button>
      </Link>

      <Link to="/register">
        <button type="button" className="register">
          <FaUserPlus size={28} color="#192149"/>
          &ensp;Sign up
        </button>
      </Link>

      </section>
      
      <div className="imgRight">
        <img src={imgRight} height="969" width="1000" alt=""/>
      </div>
    </div>
  );
}

export default Register;