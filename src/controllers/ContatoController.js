import Contato from '../models/Contato'
import ContatoCard from '../views/ContatoCard'

class ContatoController {
  static async index() {
    try {
      const contatos = await Contato.getAll()
      const contatoCards = contatos.map((contato) => <ContatoCard contato={contato} key={contato.id} />)
      return contatoCards
    } catch (error) {
      console.log(error)
      return <p className="error">Error.</p>
    }
  }

  static async create(contatoData) {
    try {
      await Contato.create(contatoData)
      window.location.reload(true)
    } catch (error) {
      console.log(error)
      return <p className="error">Error.</p>
    }
  }
}

export default ContatoController
