import { useEffect, useMemo, useState } from "react";
import {FrmContatosController}  from '../Controllers/FrmContatosController';
import ValidarAcessoPaginas from "../Controllers/ValidarAcessoPaginas";
import styles from './Css/FrmGerContatos.module.css'
import { TBCONTATOS } from "../../Classes/Tabelas/TBCONTATOS";
import { DataGrid } from '@mui/x-data-grid';
import ImagemEditar  from '../../Imagens/Icones/ImgEditar.svg';
import ImagemDeletar  from '../../Imagens/Icones/ImgLixeira.svg';
import Swal from "sweetalert2";
import FrmCadContatos from "./FrmCadContatos";


const FrmGerContatos = () => {

    const controller = useMemo(() => new FrmContatosController(), []);
    const [ObjLstContatos, setObjLstContatos ] = useState<TBCONTATOS[] | []>();
    const [showModalSaveAndEdit, setShowModalSaveAndEdit] = useState(false);
    const [DadosEdit, setDadosEdit] = useState<TBCONTATOS | null>(null);

    useEffect(() => {
    
      const BuscarDadosContatos = async () => {
  
        await controller.GetContatos();    
        setObjLstContatos(controller.ObjLstContatos);
      }
      BuscarDadosContatos();
  
    }, [controller]);

    let rows = ObjLstContatos?.map((Contato) => ({
        id: Contato.IDCONTATO,
        name: Contato.NMCIDADECONTATO,
        email: Contato.EMAILCONTATO,
        telefone: Contato.TELEFONE,
        celular: Contato.CELULAR,
        description: Contato.ENDERECO,
      }));
    
    const columns = [
    { field: 'name', headerName: 'Cidade', flex:1, width: 150 },
    { field: 'email', headerName: 'Email', flex:1,width: 180 },
    { field: 'telefone', headerName: 'Telefone', width: 180 },
    { field: 'celular', headerName: 'Celular', width: 180 },
    { field: 'description', headerName: 'Endereço',flex:1, width: 180 },
    {
        field: 'actions',
        headerName: 'Ações',
        width: 230,
        renderCell: (params: { row: { id: any; }; }) => (
        <div style={{display: "flex", width: "100%", height: "100%", justifyContent: 'center', alignItems: "center" }}>            
            <button
            className="buttonEditar"
            color="secondary"
            onClick={() => BtnGridEdit(params.row.id)}
            >
            <img src={ImagemEditar}></img>
            <label>Edit</label>
            </button>

            <button
            className="buttonExcluir"
            color="secondary"
            onClick={() => BtnGridDelete(params.row.id)}
            >
            <img src={ImagemDeletar}></img>
            <label>Deletar</label>
            </button>
        </div>
        ),
    },
    ];

    const refreshPage = () => {
      window.location.reload();
    };
    
    const BtnGridEdit = (id: any) => {
      try{
        if(ObjLstContatos?.find(Contato => Contato.IDCONTATO === id) == null){
          return;
        }else{
          setDadosEdit(ObjLstContatos?.find(Contato => Contato.IDCONTATO === id) ?? null);
          setShowModalSaveAndEdit(true);
        }
      }catch (erro){
        Swal.fire({
          text: `${erro}`,
          icon: "error",
          customClass: {
            popup: 'swal2-custom-zindex'
          }
        }); 
      }
    };
    
    const BtnGridDelete = (id: any) => {
      
      try{
        
        Swal.fire({
          text: "Deseja realmente Deletar Esta Imagem?",
          icon: "question",
          showCancelButton: true,
          cancelButtonText: 'Cancelar',
          confirmButtonText: 'Confirmar',
          reverseButtons: true,
          customClass: {
            popup: 'swal2-custom-zindex'
          }
        }).then((result) => {
          if (result.isConfirmed) {

            controller.DeletarContato(id);

            Swal.fire({
              text: "Registro Deletado com Sucesso!",
              icon: "success",
              timer: 5000,
              timerProgressBar: true,
              customClass: {
                popup: 'swal2-custom-zindex'
              }
            }).then(() => {
                refreshPage();
            });
          } else if (
            result.dismiss === Swal.DismissReason.cancel
          ) {
          }
        });
        
      }catch (erro){
        Swal.fire({
          text: `${erro}`,
          icon: "error",
          customClass: {
            popup: 'swal2-custom-zindex'
          }
        }); 
      }    
    };
    
    const BtnNovoClick =()=>{
      try{
        if((ObjLstContatos?.length ?? 0) >= 2){
           Swal.fire({
              text: "Permitido Cadastrar no máximo 2(Dois) Contatos!",
              icon: "info",
              timer: 5000,
              timerProgressBar: true,
              customClass: {
                popup: 'swal2-custom-zindex'
              }
            }).then(() => {
                return;
            });
        }else{
            setShowModalSaveAndEdit(true);
        }
      }catch (erro){
        Swal.fire({
          text: `${erro}`,
          icon: "error",
          customClass: {
            popup: 'swal2-custom-zindex'
          }
        }); 
      }
    }

    return (    
        <div className={styles.Formulario}>
          <div className={styles.Cabecalho}>
              <label className={styles.Titulo}>
                Contatos
              </label>
          </div>
          <div className={styles.CorpoPagina}>
                <div className={styles.DivLinha} style={{justifyContent: 'end'}}>    
                  <button className={styles.BotaoNovo} 
                  onClick={BtnNovoClick}>
                    <div className={styles.TextoBotao}>Adicionar Contato</div>
                  </button>
                </div>
    

                <div className={styles.DivLinha}>    
                  <DataGrid rows={rows} columns={columns} hideFooter/>
                </div>
             
             
                <div className={styles.DivLinha}>                                
                </div>
    
                <div className={styles.DivLinha}>                                    
                </div>

          </div>
          <div className={styles.Foother}>
          </div>          
          <FrmCadContatos show={showModalSaveAndEdit} onClose={() => setShowModalSaveAndEdit(false)} parDados={DadosEdit} refreshPage = {refreshPage}/>
        </div>
      );
    };
    
    export default ValidarAcessoPaginas(FrmGerContatos);
    