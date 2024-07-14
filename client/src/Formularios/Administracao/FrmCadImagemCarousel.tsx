import React, { FunctionComponent, useEffect, useMemo, useState } from 'react';
import styles from './Css/FrmCadImagemCarousel.module.css';
import { TBIMAGENSCAROUSEL } from '../../Classes/Tabelas/TBIMAGENSCAROUSEL';
import { FrmImagensCarouselController } from '../Controllers/FrmImagensCarouselController';
import { EAcoesDaTela } from '../../Classes/Enums/EAcoesDaTela';
import { Mensagens } from '../../Classes/Mensagens';
import Swal from 'sweetalert2';

interface ModalProps {
    show: boolean;
    onClose: () => void;
    parDados: TBIMAGENSCAROUSEL | null;
    refreshPage? : ()=>void
  }

const FrmCadImagemCarousel:FunctionComponent<ModalProps> = ({ show, onClose, parDados, refreshPage}) => {
  const controller = useMemo(() => new FrmImagensCarouselController(), []);

  const [Imagem, SetImagem] = useState<string | null>(null);
  const [errorLogo, setErrorLogo] = useState<string | null>(null);

  const [objTBIMAGENSCAROUSEL, setObject] = useState<TBIMAGENSCAROUSEL>(new TBIMAGENSCAROUSEL);
  
  useEffect(() => {
    if (parDados) {
      setObject(parDados ?? new TBIMAGENSCAROUSEL);
      SetImagem(parDados.SCRIMAGEM);
    }
  }, [parDados]);
  
  
  if (!show) return null;
  

  const handleChange = (field: keyof TBIMAGENSCAROUSEL) => (event: React.ChangeEvent<HTMLInputElement>) => {
    var { value } = event.target;

    if(field === null){
      return;
    }

    setObject((prev: TBIMAGENSCAROUSEL) => ( {...prev, [field]: value} as TBIMAGENSCAROUSEL));

  };


  const ValidarSalvar= async () =>{

    try{

      // if(objTBIMAGENSCAROUSEL?.IDIMAGEM > 0){
      //   //EDITANDO

        if(objTBIMAGENSCAROUSEL?.NOMEIMAGEM === null || objTBIMAGENSCAROUSEL?.NOMEIMAGEM === ''){
          Swal.fire({
            text: Mensagens.CampoObrigatorio("Nome da Imagem"),
            icon: "warning",
            customClass: {
              popup: 'swal2-custom-zindex'
            }
            
          }); 
          return false;
        }

        if(Imagem === null || Imagem === ''){
          Swal.fire({
            text: Mensagens.ImagemObrigatoria("Imagem"),
            icon: "warning",
            customClass: {
              popup: 'swal2-custom-zindex'
            }
          }); 
          return false;
        }


        if(await controller.ValidarSeNomeImagemCarouselExist(objTBIMAGENSCAROUSEL?.IDIMAGEM, objTBIMAGENSCAROUSEL?.NOMEIMAGEM)){

          Swal.fire({
            text: Mensagens.JaCadastrado("Nome de Imagem"),
            icon: "warning",
            customClass: {
              popup: 'swal2-custom-zindex'
            }
          }); 
          return false;          
        }

      // }
      // else{
      //   //NOVO

      //   if(){

      //     return false;
      //   }

      //   if(){

      //     return false;
      //   }
      // }


      objTBIMAGENSCAROUSEL.SCRIMAGEM = Imagem;
      return true;


    }catch{

    }
    

  }

  const BtnSalvarClick= async () => {

    if(await ValidarSalvar()){

      controller.Salvar(objTBIMAGENSCAROUSEL).then((success: any) => {
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
  
  const BtnCancelarClick= () => {
    onClose();
    if(refreshPage){
      refreshPage();
    }
  }


  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.Header}>
        </div>
        <div className={styles.Body}>
            <div className={styles.DivLinha}>
                <div className={styles.TextBox}>
                  <label className={styles.TextLabel}>
                    Nome da Imagem*
                  </label>
                  <div className={styles.CampoTextbox}>
                    <input
                      value={objTBIMAGENSCAROUSEL?.NOMEIMAGEM}
                      className={styles.CssInputs}
                      onChange={handleChange('NOMEIMAGEM')}
                    />
                  </div>
                </div>
            </div>
          
            <div className={styles.DivLinha} style={{gap: 20, justifyContent: 'start'}}>
              <div className={styles.DivImagens}>
                  <label className={styles.TextLabel}>Logo*</label>
                  <div className={styles.DivBotoesImagem}>
                    <button className={styles.BtnCarregarImagem} 
                    onClick={() => (controller.CarregarImagens(true, SetImagem, setErrorLogo))} 
                    >Carregar Logo</button>
                    {Imagem && (
                    <button className={styles.BtnRemoverImagem}
                    onClick={()=>(controller.RemoverImagens(SetImagem))} 
                    >Remover Imagem</button>
                    )}                  
                  </div>
                  {errorLogo && <p style={{ color: 'red', fontSize: '12px' }}>{errorLogo}</p>}
                  {Imagem && (
                    <div className={styles.DivDaImagem}>
                      <img src={Imagem} alt="Preview" className={styles.Imagem}/>
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
                <button className={styles.BotaoCancelar} onClick={BtnCancelarClick}>
                  <div className={styles.TextoBotao}>Cancelar</div>
                </button>
              </div>
      </div>
      </div>
    </div>
  );
};

export default FrmCadImagemCarousel;
