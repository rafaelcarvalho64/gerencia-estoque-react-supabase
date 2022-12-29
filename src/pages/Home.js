import supabase from '../config/supabaseClient'
import { useEffect, useState } from 'react'

// components
import Contatohdl from '../components/Contatohdl'

const Home = () => {
  const [fetchError, setFetchError] = useState(null)
  const [contatos, setContatos] = useState(null)
  const [nome, setNome] = useState('')
  const [fone, setFone] = useState('')
  const [email, setEmail] = useState('')
  const [formError, setFormError] = useState(null)
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!nome || !fone || !email) {
      setFormError('Please fill in all the fields correctly.')
      return
    }
    const { data, error } = await supabase
      .from('Contatos')
      .insert([{ nome, fone, email }])
    if (error) {
      console.log(error)
      setFormError('Preencha os campos corretamente.')
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
      if (data) {
        setContatos(data)
        setFetchError(null)
      }
    }
    fetchContatos()
  }, [])

  return (
    <div className="page home">
      <h1>Contatos</h1>
      <hr></hr>

      <div className="list">
      {fetchError && (<p>{fetchError}</p>)}
      {contatos && (
        <div className="ctts">
          {/* order-by buttons */}
          <div className="ctts-grid">
            {contatos.map(contato => (
              <Contatohdl key={contato.id} contato={contato} />
            ))}
          </div>
        </div>
      )}
    </div>
    <div className="page create">

      <form onSubmit={handleSubmit}>
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
        <button>Cadastrar contato</button>
        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
    </div>
    
  )
}

export default Home