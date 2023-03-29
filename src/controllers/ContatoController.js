import Contato from '../models/Contato'

class ContatoController {
  static async index() {
    try {
      const contatos = await Contato.getAll()
      return contatos
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

  static async update(contatoData, id) {
    try {
      await Contato.update(contatoData, id)
      window.location.reload(true)
    } catch (error) {
      console.log(error)
      return <p className="error">Error.</p>
    }
  }

  static async delete(id) {
    try {
      await Contato.delete(id)
      window.location.reload(true)
    } catch (error) {
      console.log(error)
      return <p className="error">Error.</p>
    }
  }
}

export default ContatoController
