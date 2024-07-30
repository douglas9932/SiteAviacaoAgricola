import { FunctionComponent, useEffect, useMemo, useState } from 'react';
import stylesApp from '../App.module.css';
import styles from './FrmDetalharNoticia.module.css';
import Swal from 'sweetalert2';
import LoginController from '../Controllers/Servicos/LoginController';
import { Mensagens } from '../Classes/Mensagens';
import { Navbar } from '../Componentes/Navbar';
import Focar from '../Componentes/Focar';
import FootherDesktop from '../Componentes/FootherDesktop';
import { TBNOTICIAS } from '../Classes/Tabelas/TBNOTICIAS';
import { useNavigate } from 'react-router-dom';



const FrmDetalharNoticia= () => {

    const navigate = useNavigate();

  const [ObjNoticia, setObjNoticia ] = useState<TBNOTICIAS>();
  
  window.scrollTo({
    top: (0),
    behavior: 'smooth',
  });

  useEffect(() => {
        
    const minhaFuncao = async () => {

      if(sessionStorage.getItem('parObjNOTICIAS')){

        const storedItem = sessionStorage.getItem('parObjNOTICIAS');

        const objTBNOTICIAS: TBNOTICIAS = JSON.parse(storedItem ?? "[]");

        if (objTBNOTICIAS && typeof objTBNOTICIAS === 'object') {
        setObjNoticia(objTBNOTICIAS);
        }
        
      }else{

      }

      if(! await LoginController.VerificarConexao()){
        Swal.fire({
          text: Mensagens.ConexaoOffline(),
          icon: "error",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          } else if (result.isDenied) {
            
          }
        });
      }
    }
      minhaFuncao();

    // Função para limpar o localStorage
    const handleBeforeUnload = () => {
      localStorage.clear();
    };

    // Adicionar o listener para o evento beforeunload
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Limpar o listener quando o componente for desmontado
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);
 
  return (    
      <div className={stylesApp.App}>
        <Navbar />
        <div className={stylesApp.Body}>
            <div  style={{minHeight: '100%'}}>
                <div className={styles.DivCorpoParent}>
                    <div className={styles.DivDescricaoeImagens}>
                        <div className={styles.DivImagemCapa}>
                            <div className={styles.Titulo}>
                                <label>{ObjNoticia?.TITULONOTICIA}</label>
                            </div>
                            <div className={styles.Descricao}>
                                <div
                                    style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}
                                    dangerouslySetInnerHTML={{ __html: ObjNoticia?.DESCRICAONOTICIA.replace(/\n/g, '<br/>') ?? '' }}
                                />
                            </div>
                        </div>
                        <div className={styles.ImagensDetalhado}>
                            <img alt="" src={ObjNoticia?.IMAGEMCAPA} />
                        </div>
                    </div>
                </div>
            </div>      
        </div>
        
        <div className={stylesApp.FootherDesktop} style={{ height: '30vh', background: '#f0f0f0' }}>
            <Focar id="Foother"/>
            <FootherDesktop></FootherDesktop>        
        </div>
      </div>
  );
}

export default FrmDetalharNoticia;
