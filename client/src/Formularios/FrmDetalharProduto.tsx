import { useEffect, useMemo, useState } from 'react';
import stylesApp from '../App.module.css';
import styles from './FrmDetalharProduto.module.css';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import LoginController from '../Controllers/Servicos/LoginController';
import { Mensagens } from '../Classes/Mensagens';
import { Navbar } from '../Componentes/Navbar';
import Focar from '../Componentes/Focar';
import FootherDesktop from '../Componentes/FootherDesktop';
import { FrmDetalharProdutoController } from './Controllers/FrmDetalharProdutoController';
import { TBPRODUTOS } from '../Classes/Tabelas/TBPRODUTOS';
import ReactHtmlParser from 'react-html-parser';
import { TBPARTESPRODUTOS } from '../Classes/Tabelas/TBPARTESPRODUTOS';


let controller:FrmDetalharProdutoController;
function FrmDetalharProduto() {

  controller = useMemo(() => new FrmDetalharProdutoController(), []);  

  const navigate = useNavigate();
  const [ObjProduto, setObjProduto ] = useState<TBPRODUTOS>();
  const [ObjPartes, ObjLstPartes ] = useState<TBPARTESPRODUTOS [] | []>();
  
  window.scrollTo({
    top: (0),
    behavior: 'smooth',
  });

  useEffect(() => {
        
    const minhaFuncao = async () => {

      if(sessionStorage.getItem('DetalharProdutoID')){
        let id = sessionStorage.getItem('DetalharProdutoID')?.toString() ?? '';      
        controller.IDPRODUTO = (parseInt(id));
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
  
  useEffect(() => {
        //Busca As Info do produto
        const BuscarDadosProduto = async () => {
  
          await controller.GetProduto();    
          setObjProduto(controller.ObjProduto);
          ObjLstPartes(controller.ObjLstItens);
        }
        BuscarDadosProduto();
  }, []);
  

  const criarSessao = (itens: TBPARTESPRODUTOS[], tamanhoSessao: number) => {
    const sessoes = [];

    for (let i = 0; i < itens.length; i += tamanhoSessao) {
      sessoes.push(itens.slice(i, i + tamanhoSessao));
    }

    return sessoes;
  };

  // Dividindo a lista em sessões de 5 itens cada
  let quantidade = 0;
  if((ObjPartes?.length??0) > 9){
    quantidade = Math.ceil((ObjPartes?.length ?? 0) / 3);
  }else{
    quantidade = 3;
  }
  const sessoes = criarSessao(ObjPartes ?? [], quantidade);

  return (
    
      <div className={stylesApp.App}>
        <Navbar />
        <div className={stylesApp.Body}>

        <div  style={{minHeight: '100%'}}>
          <div className={styles.DivCorpoParent}>
              <div className={styles.DivDescricaoeImagens}>
                <div className={styles.DivImagemCapa}>
                  <div className={styles.Titulo}>
                    <label>{ObjProduto?.NOMEPRODUTO}</label>
                  </div>
                  <div className={styles.Descricao}>
                      <div
                        style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}
                        dangerouslySetInnerHTML={{ __html: ObjProduto?.DESCRICAOPRODUTO.replace(/\n/g, '<br/>') ?? '' }}
                      />
                  </div>
                  <div className={styles.DivImagemCapaProduto}>
                    <img className={styles.image4Icon} alt="" src={ObjProduto?.IMAGEMCAPA} />
                  </div>
                </div>
                <div className={styles.ImagensDetalhado}>
                    <img alt="" src={ObjProduto?.IMAGEMPRODUTOEXPANDIDO} />
                </div>
              </div>
              <div className={styles.DivPartes}>

              {sessoes.map((sessao, index) => (
                <div key={index} className={styles.Sessao}>
                  {sessao.map((item, idx) => (
                    <label key={idx}>{item.NUMEROPARTE} - {item.DESCRICAOPARTE}</label>
                  ))}
                </div>
              ))}

                {/* <div className={styles.Sessao}>
                  <label>1 - Parte 1</label>
                  <label>2 - Parte 2</label>
                  <label>3 - Parte 3</label>
                  <label>4 - Parte 4</label>
                  <label>5 - Parte 5</label>

                  <label>1 - Parte 1</label>
                  <label>2 - Parte 2</label>
                  <label>3 - Parte 3</label>
                  <label>4 - Parte 4</label>
                  <label>5 - Parte 5</label>

                  <label>1 - Parte 1</label>
                  <label>2 - Parte 2</label>
                  <label>3 - Parte 3</label>
                  <label>4 - Parte 4</label>
                  <label>5 - Parte 5</label>
                </div> */}
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

export default FrmDetalharProduto;
