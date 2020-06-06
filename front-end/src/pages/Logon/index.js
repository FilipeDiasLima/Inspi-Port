import React, {useState} from 'react';
import { Link, useHistory} from 'react-router-dom';
import { FaUser,FaUserPlus } from 'react-icons/fa';

import api from '../../services/api';
import './styles.css';
import imgRight from '../../assets/imgRight.png';

function Logon() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();

  async function handleLogin(e) {
    e.preventDefault();

    const data = { email, password };

    try{
      const response = await api.post('sessions', data);

      localStorage.setItem('id', response.data.id);
      localStorage.setItem('name', response.data.name);
      localStorage.setItem('email', response.data.email);
      
      history.push('/repositories');
    } catch(err) {
      alert('Login error');
    }
  }

  return (
    <div className="login-container">
      <section className="form">
        <form onSubmit={handleLogin}>
          <h1>Inspi-Porti</h1>
          <h2>Login</h2>
          
          <label htmlFor="uname"><b>Email</b></label>
          <input 
            type="email" 
            placeholder="example@email.com" 
            className="uname" 
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
          />

          <label htmlFor="psw"><b>Password</b></label>
          <input 
            type="password" 
            placeholder="*******" 
            className="psw" 
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          
          <button type="submit">Sign in</button>

          <Link className="forgot" to="/" >
            Forgot password?
          </Link>
        </form>
      
      <Link to="/">
        <button type="button" className="Signin">
          <FaUser size={28} color="#192149"/>
          &ensp;Sign in
        </button>
      </Link>

      <Link to="/register">
        <button type="button" className="Signup">
          <FaUserPlus size={28} color="#192149"/>
          &ensp;Sign up
        </button>
      </Link>

      </section>
      
      <div className="imgRight">
        <img src={imgRight} alt=""/>
      </div>
    </div>
  );
}

export default Logon;