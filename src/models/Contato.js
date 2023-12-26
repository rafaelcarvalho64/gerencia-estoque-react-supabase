import supabase from "../config/supabaseClient"

class Contato {
  static async getAll() {
    const { data, error } = await supabase.from('Contatos').select('*')
    if (error) {
      console.log(error)
      throw new Error('Error.')
    }
    return data
  }

  static async create(contatoData) {
    const { data, error } = await supabase.from('Contatos').insert(contatoData)
    if (error) {
      console.log(error)
      throw new Error('Error.')
    }
    return data
  }

  static async delete(id) {
    const { data, error } = await supabase.from('Contatos').delete().eq('id', id)
    if (error) {
      console.log(error)
      throw new Error('Error.')
    }
    return data
  }
}

export default Contato
