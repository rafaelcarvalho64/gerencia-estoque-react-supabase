import supabase from '../config/supabaseClient'
import { useEffect, useState } from 'react'
import Contatohdl from '../components/Contatohdl'

const Home = () => {
  const [fetchError, setFetchError] = useState(null)
  const [contatos, setContatos] = useState(null)
  const [filteredList, setFilteredList] = new useState(contatos);
  const [nome, setNome] = useState('')
  const [fone, setFone] = useState('')
  const [email, setEmail] = useState('')
  const [formError, setFormError] = useState(null)
  const [ id, setId ] = useState('')
  const handleSubmitAdd = async (e) => {
    e.preventDefault()
    if (!nome || !fone || !email) {
      setFormError('Preencha os campos corretamente')
      return
    }
    const { data, error } = await supabase
      .from('Contatos')
      .insert([{ nome, fone, email }])
    if (error) {
      console.log(error)
      setFormError('Error.')
    }
    else if (data) {
      setFormError(null)
      window.location.reload(true)
    }
  }
  const handleSubmitEdit = async (e) => {
    e.preventDefault()
    if (!id || !nome || !fone || !email) {
      setFormError('Preencha os campos corretamente')
      return
    }
    const { data, error } = await supabase
      .from('Contatos')
      .update({ nome, fone, email })
      .eq('id', id)
      if (error) {
      console.log(error)
      setFormError('Error.')
    }
    else if (data) {
      setFormError(null)
      window.location.reload(true)
    }
  }

  useEffect(() => {
    const fetchContatos = async () => {
      const { data, error } = await supabase
        .from('Contatos')
        .select()
      
      if (error) {
        setFetchError('Falha ao recuperar contatos')
        setContatos(null)
      }
      else if (data) {
        setContatos(data)
        setFetchError(null)
        
      }
    }
    fetchContatos()
  }, [])

  const filterBySearch = (event) => {
    const query = event.target.value;
    var updatedList = [...contatos];
    updatedList = updatedList.filter((item) => {
      return item.toString().toLowerCase().indexOf(query.toLowerCase()) !== -1
    });
    setFilteredList(updatedList);
  };

  return (
    <div className="page home">
      <div>
      <h1>Contatos</h1>
      <hr></hr>

      <div className="App">
      <div className="search-header">
        <div className="search-text">Search:</div>
        <input id="search-box" onChange={filterBySearch} />
      </div>
      <div className="list">
      {fetchError && (<p>{fetchError}</p>)}
      {filteredList && (
          <div className="ctts-grid">
            {filteredList.map(contato => (
              <Contatohdl key={contato.id} contato={contato} />
            ))}
          </div>
      )}
        </div>
    </div>
      
    </div>
    <br></br>
    <br></br>
    <div className="container">
	        <input style={{marginRight: '8px'}} type="button" id="adicionar" value="Adicionar" />
	        <input type="button" id="editar" value="Editar" />
    </div>
    <div id="add">
    <h4>Adicionar Contato</h4>
      <form onSubmit={handleSubmitAdd}>
        <div>
        <label htmlFor="title">Nome:</label>
        <input 
          type="text" 
          id="nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="method">Fone:</label>
        <input 
        type="text"
          id="fone"
          value={fone}
          onChange={(e) => setFone(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="rating">Email:</label>
        <input 
        type="text"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
        <button>Salvar</button>
        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
    <div id="edit">
    <h4>Editar Contato</h4>
      <form onSubmit={handleSubmitEdit}>
      <div>
          <label htmlFor="title">Id:</label>
          <input 
            type="text" 
            id="id"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="title">Nome:</label>
          <input 
            type="text" 
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </div>
      <div>
        <label htmlFor="method">Fone:</label>
        <input 
        type="text"
          id="fone"
          value={fone}
          onChange={(e) => setFone(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="rating">Email:</label>
        <input 
        type="text"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
        <button>Salvar</button>
        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
    </div>
  )
}

export default Home