const Contatohdl = ({ contato }) => {
  return (
    <div className="contato-card">
      <li><u>#{contato.id} - {contato.nome} </u>| {contato.fone} | {contato.email}</li>
    </div>
  )
}

export default Contatohdl