import { useEffect, useMemo, useState } from "react";
import {FrmImagensCarouselController}  from '../Controllers/FrmImagensCarouselController';
import ValidarAcessoPaginas from "../Controllers/ValidarAcessoPaginas";
import Carousel from "../../Componentes/Carousel";
import styles from './Css/FrmImagensCarousel.module.css'
import { TBIMAGENSCAROUSEL } from "../../Classes/Tabelas/TBIMAGENSCAROUSEL";
import { DataGrid } from '@mui/x-data-grid';
import ImagemVizualizar  from '../../Imagens/Icones/ImgVizualizar.svg';
import ImagemEditar  from '../../Imagens/Icones/ImgEditar.svg';
import ImagemDeletar  from '../../Imagens/Icones/ImgLixeira.svg';
import ModalImagem from "../../Componentes/ModalImagem";
import FrmCadImagemCarousel from "./FrmCadImagemCarousel";
import { EAcoesDaTela } from "../../Classes/Enums/EAcoesDaTela";
import Swal from "sweetalert2";


const FrmImagensCarousel = () => {

    const controller = useMemo(() => new FrmImagensCarouselController(), []);
    const [ImagensDoBanco, setImagensBanco ] = useState<TBIMAGENSCAROUSEL[] | []>();
    const [showModal, setShowModal] = useState(false);
    const [showModalEdit, setShowModalEdit] = useState(false);
    const [DadosEdit, setDadosEdit] = useState<TBIMAGENSCAROUSEL | null>(null);
    const [selectedImage, setSelectedImage] = useState<string>('');

    useEffect(() => {
    
      const BuscarDadosEmpresa = async () => {
  
        await controller.GetImagensCarousel(setImagensBanco);    
        setImagensBanco(controller.ObjTBIMAGENSCAROUSEL);
      }
      BuscarDadosEmpresa();
  
    }, [controller]);

    let rows = ImagensDoBanco?.map((image) => ({
        id: image.IDIMAGEM,
        name: image.NOMEIMAGEM,
        date: image.DTCADASTRO,
        description : "TESTE",
      }));
        

    const refreshPage = () => {
      window.location.reload();
    };

    const BtnGridShow = (id: any) => {    
      try{
        const item = ImagensDoBanco?.find(image => image.IDIMAGEM === id);
        setSelectedImage(item?.SCRIMAGEM ?? ''); // Assumindo que a URL da imagem está em item.URLIMAGEM
        setShowModal(true);
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
        if(ImagensDoBanco?.find(image => image.IDIMAGEM === id) == null){
          return;
        }else{
          setDadosEdit(ImagensDoBanco?.find(image => image.IDIMAGEM === id) ?? null);
          setShowModalEdit(true);
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

            controller.DeletarImagemCarousel(id);

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
        setShowModalEdit(true);
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

    const columns = [
      { field: 'name', headerName: 'Nome da Imagem', flex:1, width: 150 },
      { field: 'date', headerName: 'Data de Cadastro', width: 180 },
      {
        field: 'actions',
        headerName: 'Ações',
        width: 330,
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

    return (    
        <div className={styles.Formulario}>
          <div className={styles.Cabecalho}>
              <label className={styles.Titulo}>
                Imagens Carousel
              </label>
          </div>
          <div className={styles.CorpoPagina}>
                <div className={styles.DivLinha} style={{height: '41vh', justifyContent: 'center'}}>  
                    <div className={styles.SessaoCarousel}>
                        <Carousel parUsaImagensLocal={false} parImages={ImagensDoBanco || []}></Carousel>
                    </div>                  
                </div>
    
                <div className={styles.DivLinha} style={{justifyContent: 'end'}}>    
                  <button className={styles.BotaoNovo} onClick={BtnNovoClick}>
                    <div className={styles.TextoBotao}>Adicionar Imagem</div>
                  </button>
                </div>

                <div className={styles.DivLinha}>    
                  <DataGrid rows={rows} columns={columns} hideFooter />
                </div>
             
             
                <div className={styles.DivLinha}>                                
                </div>
    
                <div className={styles.DivLinha}>                                    
                </div>

          </div>
          <div className={styles.Foother}>
                {/* {AcaoAtualTela === EAcoesDaTela.Editando &&(
                  <div style={{display: 'flex', flexDirection:'row', gap:'20px',}}>
                    <button className={styles.BotaoConteudo' onClick={BtnSalvarClick}>
                      <div className={styles.TextoBotao}>Salvar</div>
                    </button>
                    <button className={styles.BotaoConteudo' onClick={BtnCancelarClick}>
                      <div className={styles.TextoBotao}>Cancelar</div>
                    </button>
                  </div>
                )}
                {AcaoAtualTela === EAcoesDaTela.Nenhuma && (
                  <button className={styles.BotaoConteudo' onClick={BtnEditarClick}>
                    <div className={styles.TextoBotao}>Editar</div>
                  </button>
                )} */}
          </div>
          <ModalImagem show={showModal} onClose={() => setShowModal(false)} srcImage={selectedImage} />
          <FrmCadImagemCarousel show={showModalEdit} onClose={() => setShowModalEdit(false)} parDados={DadosEdit} refreshPage = {refreshPage}/>
        </div>
      );
    };
    
    export default ValidarAcessoPaginas(FrmImagensCarousel);
    