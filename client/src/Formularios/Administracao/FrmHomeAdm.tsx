
import styles from './Css/FrmHomeAdm.module.css';
import Ambiente from '../../Classes/Ambiente';
import ValidarAcessoPaginas from '../Controllers/ValidarAcessoPaginas';

const FrmHomeAdm = () => {
  
  return (
      <div className={styles.home}>
          <h1>HOME {"\n\n - " + Ambiente.getInstance().TokenUsuario}</h1>
      </div>
  );
};

export default ValidarAcessoPaginas(FrmHomeAdm);