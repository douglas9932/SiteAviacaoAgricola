import React, { FunctionComponent, useEffect, useMemo, useRef, useState } from 'react';
import styles from './Css/FrmCadTestes.module.css';
import { TBTESTES } from '../../Classes/Tabelas/TBTESTES';
import { FrmTestesController } from '../Controllers/FrmTestesController';
import { Mensagens } from '../../Classes/Mensagens';
import Swal from 'sweetalert2';

interface ModalProps {
    show: boolean;
    SomenteVizualizar?: boolean;
    onClose: () => void;
    parDados: TBTESTES | null;
    refreshPage? : ()=>void;
  }

const FrmCadTestes:FunctionComponent<ModalProps> = ({ show, onClose, parDados, refreshPage, SomenteVizualizar}) => {

  const controller = useMemo(() => new FrmTestesController(), []);
  const [objTBTESTES, setObject] = useState<TBTESTES>(new TBTESTES);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  
  useEffect(() => {

    if (parDados) {
      setObject(parDados ?? new TBTESTES);
    }

  }, [parDados]);


  if (!show) return null;

  const handleChange = (field: keyof TBTESTES) => (event: React.ChangeEvent<HTMLInputElement>) => {
  var { value } = event.target;

    if(field === null){
        return;
    }

    setObject((prev: TBTESTES) => ( {...prev, [field]: value} as TBTESTES));
  };

  const ValidarSalvar= async () =>{

      try{

          if(objTBTESTES.NOMETESTE === ''){
            Swal.fire({
              text: Mensagens.CampoObrigatorio("Título da Teste"),
              icon: "warning",
              customClass: {
                popup: 'swal2-custom-zindex'
              }

            });
            return false;
          }

          if(objTBTESTES.DOCUMENTOTESTE === ''){
              Swal.fire({
                  text: Mensagens.CampoObrigatorio("Descrição da Noticia"),
                  icon: "warning",
                  customClass: {
                      popup: 'swal2-custom-zindex'
                  }

              });
              return false;
          }

          return true;

      }catch{

      }
  }

  const BtnSalvarClick= async () => {

    if(await ValidarSalvar()){

      await controller.Salvar(objTBTESTES).then((success: any) => {
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
    
  const BtnCarregarDocumento = () => {
    if(fileInputRef && fileInputRef.current){      
      fileInputRef.current.click();
    }
  };
  
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const fileName = file.name;
      const fileExtension = fileName.split('.').pop()?.toLowerCase() || '';
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setObject((prev: TBTESTES) => ({ ...prev, DOCUMENTOTESTE: base64String } as TBTESTES));
        setObject((prev: TBTESTES) => ({ ...prev, EXTENSAODOCUMENTO: '.' + fileExtension } as TBTESTES));
      };
      reader.readAsDataURL(file);
    }
  };

  const RemoverImagens = () => {
    setObject((prev: TBTESTES) => ({ ...prev, DOCUMENTOTESTE: '' } as TBTESTES));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
      
  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.Header}>
        </div>
        <div className={styles.Body}>
             <div className={styles.DivLinha}>
                <div className={styles.TextBox} style={{maxWidth: '100%'}}>
                  <label className={styles.TextLabel}>
                    Titulo do Teste*
                  </label>
                  <div className={styles.CampoTextbox}>
                    <input
                      disabled={SomenteVizualizar}
                      value={objTBTESTES?.NOMETESTE}
                      className={styles.CssInputs}
                      onChange={handleChange('NOMETESTE')}
                      
                    />
                  </div>
                </div>
            </div>

            <div className={styles.DivLinha} style={{gap: 20, justifyContent: 'start'}}>
              <div className={styles.DivPDF}>
                  <label className={styles.TextLabel}>Selecione o Documento*</label>
                  <div className={styles.DivBotoesPDF}>
                    <button className={styles.BtnCarregarPDF}
                    disabled={SomenteVizualizar}
                    onClick={BtnCarregarDocumento}
                    >Carregar Documento</button>
                    <input
                      type="file"
                      accept=".pdf, .doc, .docx"
                      ref={fileInputRef}
                      style={{ display: 'none' }}
                      onChange={handleFileChange}
                    /> 
                    {objTBTESTES.DOCUMENTOTESTE && (
                    <button className={styles.BtnRemoverPDF}
                    disabled={SomenteVizualizar}
                    onClick={RemoverImagens}
                    >Remover Documento</button>
                    )}
                  </div>
                  {objTBTESTES.DOCUMENTOTESTE && <p style={{ color: 'Green', fontSize: '20px' }}>Documento Carregado!</p>}
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

export default FrmCadTestes;
