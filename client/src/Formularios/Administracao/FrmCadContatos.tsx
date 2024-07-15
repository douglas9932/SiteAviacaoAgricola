import React, { FunctionComponent, useEffect, useMemo, useState } from 'react';
import styles from './Css/FrmCadContatos.module.css';
import { TBCONTATOS } from '../../Classes/Tabelas/TBCONTATOS';
import { FrmContatosController } from '../Controllers/FrmContatosController';
import { EAcoesDaTela } from '../../Classes/Enums/EAcoesDaTela';
import { Mensagens } from '../../Classes/Mensagens';
import Swal from 'sweetalert2';
import { Comum } from '../../Classes/Comum';

interface ModalProps {
    show: boolean;
    onClose: () => void;
    parDados: TBCONTATOS | null;
    refreshPage? : ()=>void
  }

const FrmCadContatos:FunctionComponent<ModalProps> = ({ show, onClose, parDados, refreshPage}) => {
    
    const controller = useMemo(() => new FrmContatosController(), []);
    const [objTBCONTATOS, setObject] = useState<TBCONTATOS>(new TBCONTATOS);
  
    useEffect(() => {
    if (parDados) {
        setObject(parDados ?? new TBCONTATOS);
    }
    }, [parDados]);


    if (!show) return null;


    const handleChange = (field: keyof TBCONTATOS) => (event: React.ChangeEvent<HTMLInputElement>) => {
    var { value } = event.target;

    if(field == 'CELULAR'){
        value = (Comum.formatCelular(value));
      }else if(field == 'TELEFONE'){
        value = (Comum.formatTelefone(value));
      }
      
    if(field === null){
        return;
    }

    setObject((prev: TBCONTATOS) => ( {...prev, [field]: value} as TBCONTATOS));

    };


    const ValidarSalvar= async () =>{

        try{

            if(objTBCONTATOS.NMCIDADECONTATO === ''){
              Swal.fire({
                text: Mensagens.CampoObrigatorio("Nome da Cidade"),
                icon: "warning",
                customClass: {
                  popup: 'swal2-custom-zindex'
                }
                
              }); 
              return false;
            }

            if(objTBCONTATOS.ENDERECO === ''){
                Swal.fire({
                    text: Mensagens.CampoObrigatorio("Endereço"),
                    icon: "warning",
                    customClass: {
                        popup: 'swal2-custom-zindex'
                    }
                    
                }); 
                return false;
            }

            if(objTBCONTATOS.EMAILCONTATO === ''){
                Swal.fire({
                    text: Mensagens.CampoObrigatorio("Email"),
                    icon: "warning",
                    customClass: {
                        popup: 'swal2-custom-zindex'
                    }
                    
                }); 
                return false;
            }

            if(objTBCONTATOS.TELEFONE == ''){
     
                Swal.fire({
                  text: Mensagens.CampoObrigatorio("Telefone"),
                  icon: "warning",
                  customClass: {
                      popup: 'swal2-custom-zindex'
                  }
                });
                return false; 
              }
              else{
                if(!Comum.ValidarTelefone(objTBCONTATOS.TELEFONE)){
                   
                  Swal.fire({
                    text: Mensagens.CampoInvalido("Telefone"),
                    icon: "warning",
                    customClass: {
                        popup: 'swal2-custom-zindex'
                    }
                  });
                  return false; 
                }
              }
              if(objTBCONTATOS.CELULAR == ''){
                 
                Swal.fire({
                  text: Mensagens.CampoObrigatorio("Celular"),
                  icon: "warning",
                  customClass: {
                      popup: 'swal2-custom-zindex'
                  }
                });
                return false; 
              }
              else{
                if(!Comum.ValidarCelular(objTBCONTATOS.CELULAR)){
                   
                  Swal.fire({
                    text: Mensagens.CampoInvalido("Celular"),
                    icon: "warning",
                    customClass: {
                        popup: 'swal2-custom-zindex'
                    }   
                  });
                  return false; 
                }
              }              

            return true;

        }catch{

        }
    }

  const BtnSalvarClick= async () => {

    if(await ValidarSalvar()){

      controller.Salvar(objTBCONTATOS).then((success: any) => {
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
  }

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.Header}>
        </div>
        <div className={styles.Body}>
            <div className={styles.DivLinha}>
                <div className={styles.TextBox} style={{maxWidth: '50%'}}>
                  <label className={styles.TextLabel}>
                    Nome da Cidade*
                  </label>
                  <div className={styles.CampoTextbox}>
                    <input
                      value={objTBCONTATOS?.NMCIDADECONTATO}
                      className={styles.CssInputs}
                      onChange={handleChange('NMCIDADECONTATO')}
                    />
                  </div>
                </div>
            </div>

            <div className={styles.DivLinha}>
                <div className={styles.TextBox} style={{maxWidth: '70%'}}>
                  <label className={styles.TextLabel}>
                    Endereço*
                  </label>
                  <div className={styles.CampoTextbox}>
                    <input
                      value={objTBCONTATOS?.ENDERECO}
                      className={styles.CssInputs}
                      onChange={handleChange('ENDERECO')}
                    />
                  </div>
                </div>
            </div>

            <div className={styles.DivLinha}>
                <div className={styles.TextBox} style={{maxWidth: '70%'}}>
                  <label className={styles.TextLabel}>
                    Email*
                  </label>
                  <div className={styles.CampoTextbox}>
                    <input
                      value={objTBCONTATOS?.EMAILCONTATO}
                      className={styles.CssInputs}
                      onChange={handleChange('EMAILCONTATO')}
                    />
                  </div>
                </div>
            </div>

            <div className={styles.DivLinha}>
                <div className={styles.TextBox} style={{maxWidth: '170px'}}>
                  <label className={styles.TextLabel}>
                    Telefone*
                  </label>
                  <div className={styles.CampoTextbox}>
                    <input
                      value={objTBCONTATOS?.TELEFONE}
                      maxLength={14}
                      className={styles.CssInputs}
                      placeholder='(00) 0000-0000'
                      onChange={handleChange('TELEFONE')}
                    />
                  </div>
                </div>

                <div className={styles.TextBox} style={{maxWidth: '170px'}}>
                  <label className={styles.TextLabel}>
                    Celular*
                  </label>
                  <div className={styles.CampoTextbox}>
                    <input
                      value={objTBCONTATOS?.CELULAR}
                      maxLength={15}
                      placeholder='(00)0 0000-0000'
                      className={styles.CssInputs}
                      onChange={handleChange('CELULAR')}
                    />
                  </div>
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

export default FrmCadContatos;
