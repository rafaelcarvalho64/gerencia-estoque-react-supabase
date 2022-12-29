import supabase from '../config/supabaseClient'
import { useEffect, useState } from 'react'

// components
import Contatohdl from '../components/Contatohdl'

const Home = () => {
  const [fetchError, setFetchError] = useState(null)
  const [contatos, setContatos] = useState(null)

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
  )
}

export default Home