import { useEffect, useMemo, useState } from "react";
import {FrmImagensCarouselController}  from '../Controllers/FrmImagensCarouselController';
import ValidarAcessoPaginas from "../Controllers/ValidarAcessoPaginas";
import Carousel from "../../Componentes/Carousel";
import styles from './Css/FrmImagensCarousel.module.css'
import { TBIMAGENSCAROUSEL } from "../../Classes/Tabelas/TBIMAGENSCAROUSEL";
import DataGrid from "../../Componentes/DataGrid";
import React from "react";


interface Data {
  name: string;
  age: number;
  city: string;
}
type ColumnType<T> = {
  Header: string;
  accessor: keyof T;
};


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

    

    const data: Data[] = React.useMemo(
      () => [
        { name: 'John', age: 28, city: 'New York' },
        { name: 'Jane', age: 34, city: 'Los Angeles' },
        { name: 'Mike', age: 45, city: 'Chicago' },
      ],
      []
    );
  
    const handleEdit = (row: Data) => {
      console.log('Edit:', row);
    };
  
    const handleDelete = (row: Data) => {
      console.log('Delete:', row);
    };
  
    const renderActions = (row: Data) => (
      <>
        <button className={styles.buttonEditar} onClick={() => handleEdit(row)}>Editar</button>
        <button className={styles.buttonExcluir} onClick={() => handleDelete(row)}>Excluir</button>
      </>
    );

    const columnWidths = ['200px', '100px', '150px', '100px']; // Exemplo de tamanhos de colunas
    const columns: Array<ColumnType<Data>> = React.useMemo(
      () => [
        { Header: 'Nome', accessor: 'name' },
        { Header: 'Idade', accessor: 'age' },
        { Header: 'Cidade', accessor: 'city' },
      ],
      []
    );


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
                  <DataGrid columns={columns} data={data} actions={renderActions} columnWidths={columnWidths}/>
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
    