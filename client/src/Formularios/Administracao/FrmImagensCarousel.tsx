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


const FrmImagensCarousel = () => {

    const controller = useMemo(() => new FrmImagensCarouselController(), []);
    const [ImagensDoBanco, setImagensBanco ] = useState<TBIMAGENSCAROUSEL[] | []>();

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
        
    const handleEdit = (id: any) => {
      
      const item = ImagensDoBanco?.find(image => image.IDIMAGEM === id);
    if (item) {
      // setSelectedImage(item); // Armazene o item no estado ou passe para um componente/modal
      console.log(`Edit row with id: ${id}`, item);
    } else {
      console.error(`Item with id ${id} not found`);
    }
    };
    
    const handleDelete = (id: any) => {
      console.log(`Delete row with id: ${id}`);
    };
    
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
              onClick={() => handleEdit(params.row.id)}>
                <img src={ImagemVizualizar}></img>
                <label>Show</label>
            </button>
            <button
            className="buttonEditar"
              color="secondary"
              onClick={() => handleDelete(params.row.id)}
            >
              <img src={ImagemEditar}></img>
              <label>Edit</label>
            </button>

            <button
              className="buttonExcluir"
              color="secondary"
              onClick={() => handleDelete(params.row.id)}
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
    
                <div className={styles.DivLinha}>    
                  <DataGrid rows={rows} columns={columns} hideFooter />
                </div>
             
                <div className={styles.DivLinha}>    
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
        </div>
      );
    };
    
    export default ValidarAcessoPaginas(FrmImagensCarousel);
    