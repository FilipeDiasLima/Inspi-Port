import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiMenu } from 'react-icons/fi';
import { IoMdSettings } from 'react-icons/io';

import api from '../../services/api';
import './styles.css'

function Preferences() {
  
  const userId = localStorage.getItem('id');
  const userName = localStorage.getItem('name');
  
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [techs, setTechs] = useState('');
  //const [repositories, setRepositories] = useState([]);
  
  const history = useHistory(); 

  // Update de um repositorio

  async function handleUpdate(id){
    
    const data = { title, url, techs };
    console.log('deu bom');
    try {
      await api.put(`repositories/${id}`, data, {
        headers: {
          Authorization: userId,
        }
      });

      console.log('deu bom');
      history.push('/repositories');
      
    } catch (err) {
      alert('Error');
    }
  }

  return(
    <div className="main">
      <div className="topBar">
        <ul>
          <li className="menuIcon"><FiMenu size={30} color="#192149"/></li>
          <li className="logoName"><Link to="/repositories">Inspi-Porti</Link></li>
          <li className="settingsIcon"><IoMdSettings size={30} color="#192149"/><h5>Preferences</h5></li>
          <li className="welcome">Welcome {userName}</li>
        </ul>
      </div>

      <div className="body">
        <div className="boxForm">
          
          <form onSubmit={handleUpdate}>
            <h2>Edit repository</h2>
            <input 
              className="title" 
              type="text" 
              placeholder="Title repository" 
              
              value={title}
              onChange={e => setTitle(e.target.value)}
            />

            <input 
              className="url"
              type="text" 
              placeholder="Url repository" 
              
              value={url}
              onChange={e => setUrl(e.target.value)}
            />

            <input 
              className="techs" 
              type="text" 
              placeholder="Techs repository" 
              
              value={techs}
              onChange={e => setTechs(e.target.value)}
            />

            <button type="submit">Save</button>
          </form>

          <h1>Inspi-Porti</h1>
        </div>
      </div>
    </div>
  )
}

export default Preferences;