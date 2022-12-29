import supabase from "../config/supabaseClient"
import { useState } from 'react'

const Contatohdl = ({ contato }) => {
  const [formError, setFormError] = useState(null)
  const handleDelete = async () => {
    const { data, error } = await supabase
      .from('Contatos')
      .delete()
      .eq('id', contato.id)
    
    if (error) {
      console.log(error)
      setFormError('Error.')
    }
    if (data) {
      console.log(data)
      window.location.reload(true)
    }
  }
  return (
    <div className="contato-card">
      <li><u>#{contato.id} - {contato.nome} </u>| {contato.fone} | {contato.email} <i className="material-icons" onClick={handleDelete}>delete</i></li>
      {formError && <p className="error">{formError}</p>}
    </div>
  )
}

export default Contatohdl