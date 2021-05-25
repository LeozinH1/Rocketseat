import React, {useState, useEffect} from "react";
import "./styles.css";
import api from './services/api'

function App() {
  const [repositories, setRepository] = useState([])

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepository(response.data)
    });
  }, [])

  async function handleAddRepository() {

    const addRepo = await api.post('repositories', { 
      title : `Repository ${Date.now()}`, 
      url : 'https://github.com/LeozinH1/repository-name', 
      techs : ['Node', 'React'] 
    })

    setRepository([...repositories, addRepo.data])

  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`)

    setRepository(repositories.filter(
      repository => repository.id !== id
    ))
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repo => (
          <li key={repo.id}>
            {repo.title}
            <button onClick={() => handleRemoveRepository(repo.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
      <button onClick={handleAddRepository}>Add</button>
    </div>
  );
}

export default App;
