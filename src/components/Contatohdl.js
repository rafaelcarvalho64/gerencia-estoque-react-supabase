import supabase from "../config/supabaseClient";
import { useState } from 'react';

const Contatohdl = ({ contato, count }) => {
  const [formError, setFormError] = useState(null);

  const handleDelete = async () => {
    const { data, error } = await supabase
      .from('Contatos')
      .delete()
      .eq('id', contato.id);

    if (error) {
      console.log(error);
      setFormError('Error.');
    }

    if (data) {
      console.log(data);
      window.location.reload(true);
    }
  };

  console.log(count);
  return (
    <div className="contato-card">
      <table className="item-table">
            <thead style={{display:`${!count ? 'none' : ''}`}}>
                <tr>
                <th className="fivepc">ID</th>
                <th className="fifteenpc">Nome</th>
                <th className="fifteenpc">Código</th>
                <th className="fifteenpc">Tipo</th>
                <th className="fifteenpc">Recebimento</th>
                <th className="fifteenpc">Validade</th>
                <th className="fifteenpc">Quantidade</th>
                <th className="fivepc"></th>
                </tr>
            </thead>
        <tbody>
          <tr>
            <td className="fivepc"><u>#{contato.id}</u></td>
            <td className="fifteenpc">{contato.nome || '-'}</td>
            <td className="fifteenpc">{contato.fone || '-'}</td>
            <td className="fifteenpc">{contato.email || '-'}</td>
            <td className="fifteenpc">{contato.dateRec || '-'}</td>
            <td className="fifteenpc">{contato.dateVal || '-'}</td>
            <td className="fifteenpc">{contato.qtd || '-'}</td>
            <td className="fivepc items-center">
              <i className="material-icons" onClick={handleDelete}>delete</i>
            </td>
          </tr>
        </tbody>
      </table>
      {formError && <p className="error">{formError}</p>}
    </div>
  );
};

export default Contatohdl;
