import React, { FunctionComponent, useEffect, useMemo, useState } from 'react';
import styles from './Css/FrmCadNoticias.module.css';
import { TBNOTICIAS } from '../../Classes/Tabelas/TBNOTICIAS';
import { FrmNoticiasController } from '../Controllers/FrmNoticiasController';
import { Mensagens } from '../../Classes/Mensagens';
import Swal from 'sweetalert2';

interface ModalProps {
    show: boolean;
    SomenteVizualizar?: boolean;
    onClose: () => void;
    parDados: TBNOTICIAS | null;
    refreshPage? : ()=>void;
  }

const FrmCadNoticias:FunctionComponent<ModalProps> = ({ show, onClose, parDados, refreshPage, SomenteVizualizar}) => {

    const controller = useMemo(() => new FrmNoticiasController(), []);
    const [objTBNOTICIAS, setObject] = useState<TBNOTICIAS>(new TBNOTICIAS);

    const [ImagemCapa, SetImagemCapa] = useState<string | null>(null);
    const [errorImagemCapa, setErrorImagemCapa] = useState<string | null>(null);

    useEffect(() => {

      if (parDados) {
        setObject(parDados ?? new TBNOTICIAS);
        SetImagemCapa(parDados.IMAGEMCAPA);
      }
    }, [parDados]);


    if (!show) return null;

    const handleTextareaChange = (field: string) => (
      event: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
      var { value } = event.target;
      setObject((prev: TBNOTICIAS) => ( {...prev, [field]: value} as TBNOTICIAS));
    };

    const handleChange = (field: keyof TBNOTICIAS) => (event: React.ChangeEvent<HTMLInputElement>) => {
    var { value } = event.target;

      if(field === null){
          return;
      }

      setObject((prev: TBNOTICIAS) => ( {...prev, [field]: value} as TBNOTICIAS));
    };

    const ValidarSalvar= async () =>{

        try{

            if(objTBNOTICIAS.TITULONOTICIA === ''){
              Swal.fire({
                text: Mensagens.CampoObrigatorio("Título da Notícia"),
                icon: "warning",
                customClass: {
                  popup: 'swal2-custom-zindex'
                }

              });
              return false;
            }

            if(objTBNOTICIAS.DESCRICAONOTICIA === ''){
                Swal.fire({
                    text: Mensagens.CampoObrigatorio("Descrição da Noticia"),
                    icon: "warning",
                    customClass: {
                        popup: 'swal2-custom-zindex'
                    }

                });
                return false;
            }

            if(ImagemCapa === null || ImagemCapa === ''){
              Swal.fire({
                text: Mensagens.ImagemObrigatoria("Imagem de Capa"),
                icon: "warning",
                customClass: {
                  popup: 'swal2-custom-zindex'
                }
              }); 
              return false;
            }
            
            objTBNOTICIAS.IMAGEMCAPA = ImagemCapa;

             return true;

        }catch{

        }
    }

    const BtnSalvarClick= async () => {

      if(await ValidarSalvar()){

        await controller.Salvar(objTBNOTICIAS).then((success: any) => {
        if (success) {
          Swal.fire({
            text: "Registro Salvo com Sucesso!",
            icon: "success",
            timer: 5000,
            timerProgressBar: true,
            customClass: {
              popup: 'swal2-custom-zindex'
            }
          }).then(() => {
            if(refreshPage){
                refreshPage();
            }
          });
        }else{
          Swal.fire({
            text: "Ocorreu algum problema ao Salvar os dados!",
            icon: "error",
            customClass: {
              popup: 'swal2-custom-zindex'
            }
          });
        }
        }).catch((error: any) => {
          console.error("Erro ao salvar:", error);
        });
      }
    }

    const BtnFecharClick= () => {
      onClose();
      if(!SomenteVizualizar){
        if(refreshPage){
          refreshPage();
        }
      }
    }


  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.Header}>
        </div>
        <div className={styles.Body}>
             <div className={styles.DivLinha}>
                <div className={styles.TextBox} style={{maxWidth: '100%'}}>
                  <label className={styles.TextLabel}>
                    Título da Notícia*
                  </label>
                  <div className={styles.CampoTextbox}>
                    <input
                      disabled={SomenteVizualizar}
                      value={objTBNOTICIAS?.TITULONOTICIA}
                      className={styles.CssInputs}
                      onChange={handleChange('TITULONOTICIA')}
                      
                    />
                  </div>
                </div>
            </div>

            <div className={styles.DivLinha}>
                <div className={styles.TextBox} style={{maxWidth: '100%'}}>
                  <label className={styles.TextLabel}>
                    Descrição*
                  </label>
                  <div className={styles.CampoTextbox}>
                    <textarea
                      disabled={SomenteVizualizar}
                      value={objTBNOTICIAS?.DESCRICAONOTICIA}
                      className={styles.CssInputs}
                      onChange={handleTextareaChange('DESCRICAONOTICIA')}
                      style={{minHeight: '300px', minWidth: '100%'}}
                    />
                  </div>
                </div>
            </div>

            <div className={styles.DivLinha} style={{gap: 20, justifyContent: 'start'}}>
              <div className={styles.DivImagens}>
                  <label className={styles.TextLabel}>Imagem de Capa*</label>
                  <div className={styles.DivBotoesImagem}>
                    <button className={styles.BtnCarregarImagem}
                    disabled={SomenteVizualizar}
                    onClick={() => (controller.CarregarImagens(true, SetImagemCapa, setErrorImagemCapa))}
                    >Carregar Imagem</button>
                    {ImagemCapa && (
                    <button className={styles.BtnRemoverImagem}
                    disabled={SomenteVizualizar}
                    onClick={()=>(controller.RemoverImagens(SetImagemCapa))}
                    >Remover Imagem</button>
                    )}
                  </div>
                  {errorImagemCapa && <p style={{ color: 'red', fontSize: '12px' }}>{errorImagemCapa}</p>}
                  {ImagemCapa && (
                    <div className={styles.DivDaImagem}>
                      <img className={styles.Imagem} src={ImagemCapa} alt="Preview" />
                    </div>
                  )}
              </div>             
            </div>
        </div>

        <div className={styles.Foother}>
            <div style={{display: 'flex', flexDirection:'row', gap:'20px',}}>
            {!SomenteVizualizar && (
                <button className={styles.BotaoSalvar} onClick={BtnSalvarClick}>
                <div className={styles.TextoBotao}>Salvar</div>
                </button>
            )}

            <button className={styles.BotaoCancelar} onClick={BtnFecharClick}>
                {SomenteVizualizar && (
                    <div className={styles.TextoBotao}>Fechar</div>
                )}
                {!SomenteVizualizar && (
                    <div className={styles.TextoBotao}>Cancelar</div>
                )}
            </button>
            </div>
      </div>
      </div>
    </div>
  );
};

export default FrmCadNoticias;
