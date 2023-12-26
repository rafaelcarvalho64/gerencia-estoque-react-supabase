import supabase from '../config/supabaseClient'
import { useEffect, useState } from 'react'
import Contatohdl from '../components/Contatohdl'

const Home = () => {
  const [fetchError, setFetchError] = useState(null)
  const [contatos, setContatos] = useState(null)
  const [nome, setNome] = useState('')
  const [fone, setFone] = useState('')
  const [email, setEmail] = useState('')
  const [dateRec, setDateRec] = useState('')
  const [dateVal, setDateVal] = useState('')
  const [qtd, setQtd] = useState('')
  const [formError, setFormError] = useState(null)
  const [ id, setId ] = useState('')
  const [query, setQuery] = useState("")
  const [addShow, setAddShow] = useState(false)
  const [editShow, setEditShow] = useState(false)
  const handleSubmitAdd = async (e) => {
    e.preventDefault()
    if (!nome || !fone || !email || !dateRec || !dateVal || !qtd) {
      setFormError('Preencha os campos corretamente')
      return
    }
    const { data, error } = await supabase
      .from('Contatos')
      .insert([{ nome, fone, email, dateRec, dateVal, qtd }])
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
    if (!nome || !fone || !email || !dateRec || !dateVal || !qtd) {
      setFormError('Preencha os campos corretamente')
      return
    }
    const { data, error } = await supabase
      .from('Contatos')
      .update([{ nome, fone, email, dateRec, dateVal, qtd }])
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
        setFetchError('Falha ao recuperar Itens')
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

  const a = 0;
  return (
    <div className="page home">
      <div>
      <h1>Lista de Itens</h1>
      <hr></hr>
      <div className="list">
        <h4 style={{marginBottom: '0px'}}>Buscar Item</h4>
        <input type="text" className="search" placeholder="Por nome" onChange={e=>setQuery(e.target.value.toLowerCase())}/>
        <br></br>
        <br></br>
      {fetchError && (<p>{fetchError}</p>)}
      {contatos && (
          <div className="ctts-grid">
            {contatos.filter((user) =>
            user.nome.toLowerCase().includes(query))
            .map((user, index) => (
              <Contatohdl key={user.id} contato={user} count={index === 0}/>
            ))}
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
        <label>Nome:</label>
        <input 
          type="text" 
          id="nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
      </div>
      <div>
        <label>Código:</label>
        <input 
          type="number"
          id="fone"
          value={fone}
          onChange={(e) => setFone(e.target.value)}
        />
      </div>
      <div>
        <label>Tipo:</label>
        <input 
        type="text"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label>Data de Validade:</label>
        <input 
        type="text"
          id="dateVal"
          value={dateRec}
          onChange={(e) => setDateRec(e.target.value)}
        />
      </div>
      <div>
        <label>Data de Recebimento:</label>
        <input 
        type="text"
          id="dateVal"
          value={dateVal}
          onChange={(e) => setDateVal(e.target.value)}
        />
      </div>
      <div>
        <label>Quantidade:</label>
        <input 
        type="text"
          id="qtd"
          value={qtd}
          onChange={(e) => setQtd(e.target.value)}
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
          <label>Id:</label>
          <input 
            type="text" 
            id="id"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </div>
        <div>
          <label>Nome:</label>
          <input 
            type="text" 
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </div>
      <div>
        <label>Código:</label>
        <input 
        type="number"
          id="fone"
          value={fone}
          onChange={(e) => setFone(e.target.value)}
        />
      </div>
      <div>
        <label>Tipo:</label>
        <input 
        type="text"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>      
      <div>
        <label>Data de Validade:</label>
        <input 
        type="text"
          id="dateVal"
          value={dateVal}
          onChange={(e) => setDateRec(e.target.value)}
        />
      </div>
      <div>
        <label>Data de Recebimento:</label>
        <input 
        type="text"
          id="dateVal"
          value={dateVal}
          onChange={(e) => setDateVal(e.target.value)}
        />
      </div>
      <div>
        <label>Quantidade:</label>
        <input 
        type="text"
          id="qtd"
          value={qtd}
          onChange={(e) => setQtd(e.target.value)}
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