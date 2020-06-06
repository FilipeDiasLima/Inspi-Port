import React, {useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu } from 'react-icons/fi';
import { IoMdSettings } from 'react-icons/io';
import {MdDelete, MdModeEdit} from 'react-icons/md';
import {AiFillLike} from 'react-icons/ai';

import api from '../../services/api';
import './styles.css';

function Repositories(){

  // Listagem de repositorios

  const [repositories, setRepositories] = useState([]);

  const userId = localStorage.getItem('id');
  const userName = localStorage.getItem('name');

  useEffect(() => {
    api.get('repositories', {
      headers: {
        Authorization: userId,
      }
    }).then(response => {
      setRepositories(response.data)
    })
  }, [userId]);

  // Deletando um repositorio

  async function handleDeleteRepo(id){
    try {
      await api.delete(`repositories/${id}`, {
        headers: {
          Authorization: userId,
        }
      });

      setRepositories(repositories.filter(repository => repository.id !== id))
    } catch (err) {
      alert('Error delete repository');
    }
  }

  // Adicionar repositorios

  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [techs, setTechs] = useState('');

  async function handleNewRepo(e){
    e.preventDefault();

    const data = {title, url, techs};

    try {

      await api.post('repositories', data, {
        headers: {
          Authorization: userId,
        }
      });

      setRepositories([...repositories,data]);
    } catch(err) {
      alert('Error')
    }
  }

  //likes

  const [total, setTotal] = useState(0);

  async function handleLikes(id){
    try {
      await api.post(`/repositories/${id}/like`, {
        headers: {
          Authorization: userId,
        }
      });

      setTotal([...total]);
    } catch (err) {
      alert('Error');
    }
  }

  return (
    <div className="main">
      
      <div className="topBar">
        <ul>
          <li className="menuIcon"><FiMenu size={30} color="#192149"/></li>
          <li className="logoName"><Link to="/repositories">Inspi-Porti</Link></li>
          <li className="settingsIcon"><IoMdSettings size={30} color="#192149"/><h5>Preferences</h5></li>
          <li className="welcome">Welcome {userName}</li>
        </ul>
      </div>

      <div className="leftBar">
        
        <form onSubmit={handleNewRepo}>
          <h3 className="addrepository">Add a new repository</h3>

            <input 
              className="title" 
              type="text" 
              placeholder="Title repository" 
              required
              value={title}
              onChange={e => setTitle(e.target.value)}
            />

            <input 
              className="url"
              type="text" 
              placeholder="Url repository" 
              required
              value={url}
              onChange={e => setUrl(e.target.value)}
            />

            <input 
              className="techs" 
              type="text" 
              placeholder="Techs repository" 
              required
              value={techs}
              onChange={e => setTechs(e.target.value)}
            />

            <button className="addbuttom">Add</button>
        </form>

      </div>

      <div className="boxPost">
        <h1>Your repositories</h1>

        {repositories.map(repository => (
          <div className="details" key ={repository.id}>
          <div className="titleBox"><p>{repository.title}</p></div>
          <div className="urlBox"><p>{repository.url}</p></div>
          <div className="techsBox"><p>{repository.techs}</p></div>
          <Link onClick={() => handleDeleteRepo(repository.id)} className="delete"><MdDelete size={28} color="#C33B3B"/></Link>
          <Link to="/preferences" className="edit"><MdModeEdit size={28} color="#192149"/></Link>
          <Link className="like"><AiFillLike size={28} color="#192149"/></Link><p className="p">0</p>
        </div>
        ))}

      </div>
      

    </div>
  );
}

export default Repositories;