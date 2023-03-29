import { useState } from 'react'
import ContatoController from '../controllers/ContatoController'

const ContatoCard = ({ contato }) => {
  const [formError, setFormError] = useState(null)
  
  const handleDelete = async () => {
    try {
      await ContatoController.delete(contato.id)
      window.location.reload(true)
    } catch (error) {
      console.log(error)
      setFormError('Error.')
    }
  }

  return (
    <div className="contato-card">
      <li><u>#{contato.id} - {contato.nome} </u>| {contato.fone} | {contato.email} <i style={{cursor: "pointer", verticalAlign: "sub"}} className="material-icons" onClick={handleDelete}>delete</i></li>
      {formError && <p className="error">{formError}</p>}
    </div>
  )
}

export default ContatoCard
