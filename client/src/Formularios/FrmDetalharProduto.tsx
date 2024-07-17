import { useEffect, useMemo, useState } from 'react';
import stylesApp from '../App.module.css';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import LoginController from '../Controllers/Servicos/LoginController';
import { Mensagens } from '../Classes/Mensagens';
import { Navbar } from '../Componentes/Navbar';
import Focar from '../Componentes/Focar';
import FootherDesktop from '../Componentes/FootherDesktop';
import { FrmDetalharProdutoController } from './Controllers/FrmDetalharProdutoController';
import { TBPRODUTOS } from '../Classes/Tabelas/TBPRODUTOS';


let controller:FrmDetalharProdutoController;
function FrmDetalharProduto() {

  controller = useMemo(() => new FrmDetalharProdutoController(), []);  

  const navigate = useNavigate();
  const [ObjProduto, setObjProduto ] = useState<TBPRODUTOS>();
  
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
        }
        BuscarDadosProduto();
  }, []);
  
  return (
    
      <div className={stylesApp.App}>
        <Navbar />
        <div className={stylesApp.Body}>

        <div  style={{ height: '100vh', background: '#f0f0f0' }}>
            {ObjProduto?.NOMEPRODUTO}
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
