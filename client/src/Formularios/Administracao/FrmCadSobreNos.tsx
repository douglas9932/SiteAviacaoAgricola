import React, { FunctionComponent, useEffect, useMemo, useState } from 'react';
import styles from './Css/FrmCadSobreNos.module.css';
import { TBEMPRESA } from '../../Classes/Tabelas/TBEMPRESA';
import { FrmInformacoesEmpresaController } from '../Controllers/FrmInformacoesEmpresaController';
import { Mensagens } from '../../Classes/Mensagens';
import Swal from 'sweetalert2';

interface ModalProps {
    show: boolean;
    onClose: () => void;
    parDados: TBEMPRESA | null;
  }

const FrmCadSobreNos:FunctionComponent<ModalProps> = ({ show, onClose, parDados}) => {

    const controller = useMemo(() => new FrmInformacoesEmpresaController(), []);
    const [objTBEMPRESA, setObject] = useState<TBEMPRESA>(new TBEMPRESA);

    const [ImagemSobreNos, SetImagemSobreNos] = useState<string | null>(null);
    const [ExtImage, setExtImage] = useState<string | null>(null);
    const [errorImagemSobreNos, setErrorImagemSobreNos] = useState<string | null>(null);

    useEffect(() => {

      if (parDados) {
        setObject(parDados ?? new TBEMPRESA);
        SetImagemSobreNos(parDados.IMAGEMSOBRENOS);
      }
    }, [parDados]);


    if (!show) return null;

    const handleTextareaChange = (field: string) => (
      event: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
      var { value } = event.target;
      setObject((prev: TBEMPRESA) => ( {...prev, [field]: value} as TBEMPRESA));
    };

    const handleChange = (field: keyof TBEMPRESA) => (event: React.ChangeEvent<HTMLInputElement>) => {
    var { value } = event.target;

      if(field === null){
          return;
      }

      setObject((prev: TBEMPRESA) => ( {...prev, [field]: value} as TBEMPRESA));
    };

    const ValidarSalvar= async () =>{

        try{

            if(objTBEMPRESA.DESCRICAOSOBRENOS === ''){
              Swal.fire({
                text: Mensagens.CampoObrigatorio("Descrição"),
                icon: "warning",
                customClass: {
                  popup: 'swal2-custom-zindex'
                }

              });
              return false;
            }

            if(objTBEMPRESA.HISTORICOSOBRENOS === ''){
              Swal.fire({
                text: Mensagens.CampoObrigatorio("Histórico"),
                icon: "warning",
                customClass: {
                  popup: 'swal2-custom-zindex'
                }

              });
              return false;
            }

            if(objTBEMPRESA.OBJETIVOSOBRENOS === ''){
              Swal.fire({
                text: Mensagens.CampoObrigatorio("Objetivo"),
                icon: "warning",
                customClass: {
                  popup: 'swal2-custom-zindex'
                }

              });
              return false;
            }

            if(ImagemSobreNos === null || ImagemSobreNos === ''){
              Swal.fire({
                text: Mensagens.ImagemObrigatoria("Imagem"),
                icon: "warning",
                customClass: {
                  popup: 'swal2-custom-zindex'
                }
              }); 
              return false;
            }
            
            objTBEMPRESA.IMAGEMSOBRENOS = ImagemSobreNos;

             return true;

        }catch{

        }
    }

    const BtnSalvarClick= async () => {

      if(await ValidarSalvar()){

        await controller.SetObjectSave(objTBEMPRESA, null, null, null, null, ImagemSobreNos);

        await controller.Salvar().then((success: any) => {
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
            onClose();
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
    }


  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.Header}>
          <label className={styles.Titulo}>
            Informações Sobre Nós
          </label>
        </div>
        <div className={styles.Body}>
            <div className={styles.DivLinha}>
                <div className={styles.TextBox} style={{maxWidth: '100%'}}>
                  <label className={styles.TextLabel}>
                    Descrição*
                  </label>
                  <div className={styles.CampoTextbox}>
                    <textarea
                      value={objTBEMPRESA?.DESCRICAOSOBRENOS}
                      className={styles.CssInputs}
                      onChange={handleTextareaChange('DESCRICAOSOBRENOS')}
                      style={{minHeight: '100px', minWidth: '100%'}}
                    />
                  </div>
                </div>
            </div>

            <div className={styles.DivLinha}>
                <div className={styles.TextBox} style={{maxWidth: '100%'}}>
                  <label className={styles.TextLabel}>
                    Histórico*
                  </label>
                  <div className={styles.CampoTextbox}>
                    <textarea
                      value={objTBEMPRESA?.HISTORICOSOBRENOS}
                      className={styles.CssInputs}
                      onChange={handleTextareaChange('HISTORICOSOBRENOS')}
                      style={{minHeight: '150px', minWidth: '100%'}}
                    />
                  </div>
                </div>
            </div>

            <div className={styles.DivLinha}>
                <div className={styles.TextBox} style={{maxWidth: '100%'}}>
                  <label className={styles.TextLabel}>
                    Objetivo*
                  </label>
                  <div className={styles.CampoTextbox}>
                    <textarea
                      value={objTBEMPRESA?.OBJETIVOSOBRENOS}
                      className={styles.CssInputs}
                      onChange={handleTextareaChange('OBJETIVOSOBRENOS')}
                      style={{minHeight: '150px', minWidth: '100%'}}
                    />
                  </div>
                </div>
            </div>

            <div className={styles.DivLinha} style={{gap: 20, justifyContent: 'start'}}>
              <div className={styles.DivImagens}>
                  <label className={styles.TextLabel}>Imagem*</label>
                  <div className={styles.DivBotoesImagem}>
                    <button className={styles.BtnCarregarImagem}
                    onClick={() => (controller.CarregarImagenSobreNos(SetImagemSobreNos, setErrorImagemSobreNos))}
                    >Carregar Imagem</button>
                    {ImagemSobreNos && (
                    <button className={styles.BtnRemoverImagem}
                    onClick={()=>(controller.RemoverImagens(SetImagemSobreNos, setExtImage))}
                    >Remover Imagem</button>
                    )}
                  </div>
                  {errorImagemSobreNos && <p style={{ color: 'red', fontSize: '12px' }}>{errorImagemSobreNos}</p>}
                  {ImagemSobreNos && (
                    <div className={styles.DivDaImagem}>
                      <img className={styles.Imagem} src={ImagemSobreNos} alt="Preview" />
                    </div>
                  )}
              </div>             
            </div>
        </div>

        <div className={styles.Foother}>
            <div style={{display: 'flex', flexDirection:'row', gap:'20px',}}>
                <button className={styles.BotaoSalvar} onClick={BtnSalvarClick}>
                  <div className={styles.TextoBotao}>Salvar</div>
                </button>

                <button className={styles.BotaoCancelar} onClick={BtnFecharClick}>
                  <div className={styles.TextoBotao}>Cancelar</div>
                </button>
            </div>
      </div>
      </div>
    </div>
  );
};

export default FrmCadSobreNos;
