import supabase from '../config/supabaseClient'
import { useEffect, useState } from 'react'
import Contatohdl from '../components/Contatohdl'

const Home = () => {
  const [fetchError, setFetchError] = useState(null)
  const [contatos, setContatos] = useState(null)
  const [nome, setNome] = useState('')
  const [fone, setFone] = useState('')
  const [email, setEmail] = useState('')
  const [formError, setFormError] = useState(null)
  const [ id, setId ] = useState('')
  const [query, setQuery] = useState("")
  const [addShow, setAddShow] = useState(false)
  const [editShow, setEditShow] = useState(false)
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

  const addHdl = () => {
    setAddShow(true)
    setEditShow(false)
  }
  
  const editHdl = () => {
    setEditShow(true)
    setAddShow(false)
  }
  return (
    <div className="page home">
      <div>
      <h1>Contatos</h1>
      <hr></hr>
      <div className="list">
        <h4 style={{marginBottom: '0px'}}>Buscar contato</h4>
        <input type="text" className="search" placeholder="Por nome" onChange={e=>setQuery(e.target.value.toLowerCase())}/>
      {fetchError && (<p>{fetchError}</p>)}
      {contatos && (
          <div className="ctts-grid">
            {contatos.filter((user) =>
            user.nome.toLowerCase().includes(query))
            .map((user => (
              <Contatohdl key={user.id} contato={user} />
            )))}
          </div>
      )}
        </div>
    </div>
    <br></br>
    <br></br>
    <div className="container">
	        <input style={{marginRight: '8px'}} type="button" id="adicionar" value="Adicionar" onClick={addHdl}/>
	        <input type="button" id="editar" value="Editar" onClick={editHdl}/>
    </div>
    <div id="add" style={{display: addShow ? 'block' : 'none'}}>
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
    <div id="edit" style={{display: editShow ? 'block' : 'none'}}>
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