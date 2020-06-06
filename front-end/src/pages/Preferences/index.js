import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FiMenu } from 'react-icons/fi';
import { IoMdSettings } from 'react-icons/io';

import api from '../../services/api';
import './styles.css'

function Preferences() {
  
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [techs, setTechs] = useState('');
  const [repositories, setRepositories] = useState([]);

  const userId = localStorage.getItem('id');

  const history = useHistory();

  // Update de um repositorio

  async function handleUpdate(id){

    const data = { title, url, techs };

    try {
      await api.put(`repositories/${id}`, data, {
        headers: {
          Authorization: userId,
        }
      });


      history.push('/repositories');
      
      setRepositories([...repositories, data]);
      
    } catch (err) {
      alert('Error');
    }
  }

  return(
    <>
      <div className="topBar">
        <ul>
          <li className="menuIcon"><FiMenu size={30} color="#192149"/></li>
          <li className="logoName"><a href="/repositories">Inspi-Porti</a></li>
          <li className="settingsIcon"><a href=""><IoMdSettings size={30} color="#192149"/><h5>Preferences</h5></a></li>
          <li className="welcome">Welcome Fulano de Tal</li>
        </ul>
      </div>

      <div className="body">
        <div className="boxForm">
          <form onSubmit={handleUpdate}>
            <h2>Edit repository</h2>
            
            <label htmlFor="uname"><b>Title</b></label>
            <input 
              type="text" 
              className="name"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />

            <label htmlFor="uname"><b>Url</b></label>
            <input 
              type="email"
              className="uname" 
              value={url}
              onChange={e => setUrl(e.target.value)}
              />

            <label htmlFor="psw"><b>Techs</b></label>
            <input 
              type="text" 
              className="psw"
              value={techs}
              onChange={e => setTechs(e.target.value)}
            />
            
            
            <button type="button">Save</button>
          </form>

          <h1>Inspi-Porti</h1>
        </div>
      </div>
    </>
  )
}

export default Preferences;