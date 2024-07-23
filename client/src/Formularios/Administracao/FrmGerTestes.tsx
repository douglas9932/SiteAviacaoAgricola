import { useEffect, useMemo, useState } from "react";
import {FrmTestesController}  from '../Controllers/FrmTestesController';
import ValidarAcessoPaginas from "../Controllers/ValidarAcessoPaginas";
import styles from './Css/FrmGerTestes.module.css'
import { TBTESTES } from "../../Classes/Tabelas/TBTESTES";
import { DataGrid } from '@mui/x-data-grid';
import ImagemVizualizar  from '../../Imagens/Icones/ImgVizualizar.svg';
import ImagemEditar  from '../../Imagens/Icones/ImgEditar.svg';
import ImagemDeletar  from '../../Imagens/Icones/ImgLixeira.svg';
import Swal from "sweetalert2";
import FrmCadTestes from "./FrmCadTestes";


const FrmGerTestes = () => {

    const controller = useMemo(() => new FrmTestesController(), []);
    const [ObjLstTestes, setObjLstTestes ] = useState<TBTESTES[] | []>();
    const [showModalSaveAndEdit, setShowModalSaveAndEdit] = useState(false);
    const [somenteVizualizar, setSomenteVizualizar] = useState(false);
    const [DadosEdit, setDadosEdit] = useState<TBTESTES | null>(null);

    useEffect(() => {
    
      const BuscarDadosTestes = async () => {
  
        await controller.GetTestes();    
        setObjLstTestes(controller.ObjLstTestes);
      }
      BuscarDadosTestes();
  
    }, [controller]);

    let rows = ObjLstTestes?.map((Teste) => ({
        id: Teste.IDTESTE,
        name: Teste.NOMETESTE,
      }));
    
    const columns = [
    { field: 'name', headerName: 'Nome Teste', flex:1, width: 150 },
    // { field: 'description', headerName: 'Descrição',flex:1, width: 180 },
    // { field: 'date', headerName: 'Data de Cadastro', width: 180 },
    {
        field: 'actions',
        headerName: 'Ações',
        width: 300,
        renderCell: (params: { row: { id: any; }; }) => (
        <div style={{display: "flex", width: "100%", height: "100%", justifyContent: 'center', alignItems: "center" }}>                        
            <button
              className='buttonVizualizar'
              onClick={() => BtnGridShow(params.row.id)}>
                <img src={ImagemVizualizar}></img>
                <label>Show</label>
            </button>

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
    
    const BtnGridShow = (id: any) => {
        try{
          setDadosEdit(ObjLstTestes?.find(Teste => Teste.IDTESTE === id) ?? null);
          setSomenteVizualizar(true);
          setShowModalSaveAndEdit(true);
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

    const BtnGridEdit = (id: any) => {
      try{
        if(ObjLstTestes?.find(Teste => Teste.IDTESTE === id) == null){
          return;
        }else{
          setDadosEdit(ObjLstTestes?.find(Teste => Teste.IDTESTE === id) ?? null);
          setSomenteVizualizar(false);
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

            controller.DeletarTeste(id);

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
        setDadosEdit(new TBTESTES);
        setSomenteVizualizar(false);
        setShowModalSaveAndEdit(true);
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
                Testes
              </label>
          </div>
          <div className={styles.CorpoPagina}>
                <div className={styles.DivLinha} style={{justifyContent: 'end'}}>    
                  <button className={styles.BotaoNovo} 
                  onClick={BtnNovoClick}>
                    <div className={styles.TextoBotao}>Adicionar Teste</div>
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
          <FrmCadTestes SomenteVizualizar={somenteVizualizar} show={showModalSaveAndEdit} onClose={() => setShowModalSaveAndEdit(false)} parDados={DadosEdit} refreshPage = {refreshPage}/>
        </div>
      );
    };
    
    export default ValidarAcessoPaginas(FrmGerTestes);
    