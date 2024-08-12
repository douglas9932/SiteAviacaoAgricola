import styles from './Css/FrmInformacoesEmpresa.module.css';
import ValidarAcessoPaginas from '../Controllers/ValidarAcessoPaginas';
import { useEffect, useMemo,  useState } from 'react';
import { EAcoesDaTela } from '../../Classes/Enums/EAcoesDaTela';
import { FrmInformacoesEmpresaController } from '../Controllers/FrmInformacoesEmpresaController';
import { Comum } from '../../Classes/Comum';
import { TBEMPRESA } from '../../Classes/Tabelas/TBEMPRESA';
import Swal from 'sweetalert2';
import { Mensagens } from '../../Classes/Mensagens';
import ImgBtnSobreNos from '../../Imagens/Icones/ImgBtnSobreNos.svg'
import FrmCadSobreNos from './FrmCadSobreNos'

const FrmInformacoesEmpresa = () => {

  const controller = useMemo(() => new FrmInformacoesEmpresaController(), []);
  const [showModalFrmSobreNos, setShowModalFrmSobreNos] = useState(false);

  const [objTBEMPRESA, setObject] = useState<TBEMPRESA>(new TBEMPRESA());
       
  const [AcaoAtualTela, setAcaoAtualTela] = useState<EAcoesDaTela>(EAcoesDaTela.Nenhuma);
  
  const [errorIcon, setErrorIcon] = useState<string | null>(null);
  const [errorLogo, setErrorLogo] = useState<string | null>(null);
  
  const [ExtImgLogo, setExtLogo] = useState<string | null>(null);
  const [ImgLogo, setLogo] = useState<string | null>(null);
  const [ExtImgIcone, setExtIcone] = useState<string | null>(null);
  const [ImgIcone, setIcone] = useState<string | null>(null);
  
  useEffect(() => {
    
    const BuscarDadosEmpresa = async () => {

      await controller.GetInformacoesDaEmpresa(setObject);    
      setObject(controller.ObjTBEMPRESA);
    }
    BuscarDadosEmpresa();

  }, [controller]);
  
  useEffect(() => {
    
    if (objTBEMPRESA.IDEMPRESA > 0) {
      if(ImgLogo === null || ImgLogo === ''){
        setLogo(objTBEMPRESA.LOGO_236X67 || null);
      }

      if(ImgIcone === null || ImgIcone === ''){
        setIcone(objTBEMPRESA.ICONE || null);
      }
    }
  }, [objTBEMPRESA]);

  
  
 const ValidarSalvar = ()=>{

  var blxRetorno = true;


  if(objTBEMPRESA.NOMEFANTASIA === ''){    
    Swal.fire({
      text: Mensagens.CampoObrigatorio("Nome Fantasia"),
      icon: "warning"
    }); 
    return false;   
  }
  if(objTBEMPRESA.RAZAOSOCIAL === ''){
     
    Swal.fire({
      text: Mensagens.CampoObrigatorio("Razao Social"),
      icon: "warning"
    });
    return false; 
  }
  if(objTBEMPRESA.CNPJ === ''){
     
    Swal.fire({
      text: Mensagens.CampoObrigatorio("CNPJ"),
      icon: "warning"
    });
    return false; 
  }
  else{
    if(objTBEMPRESA.CNPJ.length < 18 ){
       
      Swal.fire({
        text: Mensagens.CampoInvalido("CNPJ"),
        icon: "warning"
      });
      return false; 
    }
    else{
      if(!Comum.ValidarCNPJ(objTBEMPRESA.CNPJ)){
         
        Swal.fire({
          text: Mensagens.CampoInvalido("CNPJ"),
          icon: "warning"
        });
        return false; 
      }
    }
  }
  if(objTBEMPRESA.INSCRICAOESTADUAL === ''){
     
    Swal.fire({
      text: Mensagens.CampoObrigatorio("Inscrição Estadual"),
      icon: "warning"
    });
    return false; 
  }
  else{
    if(objTBEMPRESA.INSCRICAOESTADUAL.length < 15){
      
      Swal.fire({
        text: Mensagens.CampoInvalido("Inscrição Estadual"),
        icon: "warning"
      });
      return false; 
    }else{
      if(!Comum.ValidarIe(objTBEMPRESA.INSCRICAOESTADUAL)){
         
        Swal.fire({
          text: Mensagens.CampoInvalido("Inscrição Estadual"),
          icon: "warning"
        });
        return false; 
      }
    }
  }
  if(objTBEMPRESA.ENDERECO === ''){
     
    Swal.fire({
      text: Mensagens.CampoObrigatorio("Endereço"),
      icon: "warning"
    });
    return false; 
  }
  if(objTBEMPRESA.TELEFONE === ''){
     
    Swal.fire({
      text: Mensagens.CampoObrigatorio("Telefone"),
      icon: "warning"
    });
    return false; 
  }
  else{
    if(!Comum.ValidarTelefone(objTBEMPRESA.TELEFONE)){
       
      Swal.fire({
        text: Mensagens.CampoInvalido("Telefone"),
        icon: "warning"
      });
      return false; 
    }
  }
  if(objTBEMPRESA.CELULAR === ''){
     
    Swal.fire({
      text: Mensagens.CampoObrigatorio("Celular"),
      icon: "warning"
    });
    return false; 
  }
  else{
    if(!Comum.ValidarCelular(objTBEMPRESA.CELULAR)){
       
      Swal.fire({
        text: Mensagens.CampoInvalido("Celular"),
        icon: "warning"
      });
      return false; 
    }
  }
  if(objTBEMPRESA.SEGMENTO === ''){
     
    Swal.fire({
      text: Mensagens.CampoObrigatorio("Segmento/Atividade"),
      icon: "warning"
    });
    return false; 
  }
  if(objTBEMPRESA.DATAABERTURA === ''){
     
    Swal.fire({
      text: Mensagens.CampoObrigatorio("Data de Abertura"),
      icon: "warning"
    });
    return false; 
  }
  else{
    if(!Comum.ValidarData(objTBEMPRESA.DATAABERTURA)){
       
      Swal.fire({
        text: Mensagens.CampoInvalido("Data de Abertura"),
        icon: "warning"
      });
      return false; 
    }
  }
  if(objTBEMPRESA.RESPONSAVEL === ''){
     
    Swal.fire({
      text: Mensagens.CampoObrigatorio("Responsável"),
      icon: "warning"
    });
    return false; 
  }
  if(objTBEMPRESA.CPFRESPONSAVEL === ''){
     
    Swal.fire({
      text: Mensagens.CampoObrigatorio("CPF do Responsavel"),
      icon: "warning"
    });
    return false; 
  }else{
    if(objTBEMPRESA.CPFRESPONSAVEL.length < 14){
       
      Swal.fire({
        text: Mensagens.CampoInvalido("CPF do Responsavel"),
        icon: "warning"
      });
      return false; 
    }else{
      if(!Comum.ValidarCPF(objTBEMPRESA.CPFRESPONSAVEL)){
         
        Swal.fire({
          text: Mensagens.CampoInvalido("CPF do Responsavel"),
          icon: "warning"
        });
        return false; 
      }
    }
  }
  if(ImgLogo === null || ImgLogo === ''){
     
    Swal.fire({
      text: Mensagens.ImagemObrigatoria("Logo"),
      icon: "warning"
    });
    return false; 
  }
  if(ImgIcone === null || ImgIcone === ''){
     
    Swal.fire({
      text: Mensagens.ImagemObrigatoria("Icone"),
      icon: "warning"
    });
    return false; 
  }
    
  return blxRetorno;
 }



  const BtnEditarClick= () => {

    setAcaoAtualTela(EAcoesDaTela.Editando);

  }

  const BtnSalvarClick= () => {

    if(ValidarSalvar()){
       controller.SetObjectSave(
        objTBEMPRESA,
        ExtImgLogo,
        ImgLogo,
        ExtImgIcone,
        ImgIcone,
        null
      )
  
      controller.Salvar().then((success) => {
        if (success) {
          Swal.fire({
            text: "Registro Salvo com Sucesso!",
            icon: "success",
            timer: 5000,
            timerProgressBar: true,
          });
        }else{
          Swal.fire({
            text: "Ocorreu algum problema ao Salvar os dados!",
            icon: "error",
          });
        }
        
        setAcaoAtualTela(EAcoesDaTela.Nenhuma);
        
      }).catch((error) => {
        console.error("Erro ao salvar:", error);
      });   
    }
  }

  const BtnCancelarClick= () => {

    setAcaoAtualTela(EAcoesDaTela.Nenhuma);    
  }

  const handleChange = (field: keyof TBEMPRESA) => (event: React.ChangeEvent<HTMLInputElement>) => {
    var { value } = event.target;

    if(field === null){
      return;
    }

    if(field === 'CNPJ'){
      value = (Comum.formatCnpj(value));
    }else if(field === 'INSCRICAOESTADUAL'){
      value = (Comum.formatIe(value));
    }else if(field === 'CELULAR'){
      value = (Comum.formatCelular(value));
    }else if(field === 'TELEFONE'){
      value = (Comum.formatTelefone(value));
    }else if(field === 'CPFRESPONSAVEL'){
      value = (Comum.formatCpf(value));
    }

    setObject((prev: TBEMPRESA) => ( {...prev, [field]: value} as TBEMPRESA));

  };
  
  const BtnSobreNos_Click = ()=>{

    setShowModalFrmSobreNos(true);

  }


  return (    
    <div className={styles.Formulario}>
      <div className={styles.Cabecalho}>
          <label className={styles.Titulo}>
            Informações da Empresa
          </label>
      </div>
      <div className={styles.CorpoPagina}>
            <div className={styles.DivLinha}>
                <div className={styles.TextBox}>
                  <label className={styles.TextLabel}>
                    Nome Fantasia*
                  </label>
                  <div className={styles.CampoTextbox}>
                    <input
                      value={objTBEMPRESA.NOMEFANTASIA}
                      className={styles.CssInputs}
                      onChange={handleChange('NOMEFANTASIA')}
                      readOnly = {AcaoAtualTela === EAcoesDaTela.Nenhuma}
                    />
                  </div>
                </div>
            </div>

            <div className={styles.DivLinha}>
              <div className={styles.TextBox}>
                <label className={styles.TextLabel}>Razão Social*</label>
                <div className={styles.CampoTextbox}>
                  <input
                    value={objTBEMPRESA.RAZAOSOCIAL}
                    className={styles.CssInputs}
                    onChange={handleChange('RAZAOSOCIAL')}
                    readOnly = {AcaoAtualTela === EAcoesDaTela.Nenhuma}
                  />
                </div>
              </div>
            </div>
         
            <div className={styles.DivLinha}>

              <div className={styles.TextBox} style={{maxWidth: '200px'}}>
                <label className={styles.TextLabel}>CNPJ*</label>
                <div className={styles.CampoTextbox}>
                  <input value={objTBEMPRESA.CNPJ}
                    maxLength={18}
                    onChange={handleChange('CNPJ')}
                    placeholder='00.000.000/0000-00'
                    className={styles.CssInputs}
                    readOnly = {AcaoAtualTela === EAcoesDaTela.Nenhuma}
                  />
                </div>
              </div>

              <div className={styles.TextBox} style={{maxWidth: '200px'}}>
                <label className={styles.TextLabel}>Inscricao Estadual*</label>
                <div className={styles.CampoTextbox}>
                  <input
                    value={objTBEMPRESA.INSCRICAOESTADUAL}
                    maxLength={15}
                    onChange={handleChange('INSCRICAOESTADUAL')}
                    placeholder='000.000.000.000'
                    className={styles.CssInputs}
                    readOnly = {AcaoAtualTela === EAcoesDaTela.Nenhuma}
                  />
                </div>
              </div>

              <div className={styles.TextBox} style={{maxWidth: '170px'}}>
                  <label className={styles.TextLabel}>Telefone</label>
                  <div className={styles.CampoTextbox}>
                    <input
                    value={objTBEMPRESA.TELEFONE}
                    maxLength={14}
                    onChange={handleChange('TELEFONE')}
                    placeholder='(00) 0000-0000'
                    className={styles.CssInputs}
                    readOnly = {AcaoAtualTela === EAcoesDaTela.Nenhuma}
                    />
                  </div>
                </div>

                <div className={styles.TextBox} style={{maxWidth: '170px'}}>
                  <label className={styles.TextLabel}>Celular</label>
                  <div className={styles.CampoTextbox}>
                    <input
                      value={objTBEMPRESA.CELULAR}
                      maxLength={15}
                      onChange={handleChange('CELULAR')}
                      placeholder='(00)0 0000-0000'
                      className={styles.CssInputs}
                      readOnly = {AcaoAtualTela === EAcoesDaTela.Nenhuma}
                    />
                  </div>
                </div>

                <div className={styles.TextBox} style={{maxWidth: '200px'}}>
                  <label className={styles.TextLabel}>Data de Abertura*</label>
                  <div className={styles.CampoTextbox}>
                    <input type='date'
                      value={objTBEMPRESA.DATAABERTURA}
                      onChange={handleChange('DATAABERTURA')}
                      className={styles.CssInputs}
                      readOnly = {AcaoAtualTela === EAcoesDaTela.Nenhuma}
                    />
                  </div>
                </div>
            </div>
         
            <div className={styles.DivLinha}>
                <div className={styles.TextBox}>
                  <label className={styles.TextLabel}>
                    Endereço*
                  </label>
                  <div className={styles.CampoTextbox}>
                    <input
                      value={objTBEMPRESA.ENDERECO}
                      className={styles.CssInputs}
                      onChange={handleChange('ENDERECO')}
                      readOnly = {AcaoAtualTela === EAcoesDaTela.Nenhuma}
                    />
                  </div>
                </div>                
            </div>

            <div className={styles.DivLinha}>
                <div className={styles.TextBox}>
                  <label className={styles.TextLabel}>
                    Seguimento/Atividade
                  </label>
                  <div className={styles.CampoTextbox}>
                    <input
                    value={objTBEMPRESA.SEGMENTO}
                      className={styles.CssInputs}
                      onChange={handleChange('SEGMENTO')}
                      readOnly = {AcaoAtualTela === EAcoesDaTela.Nenhuma}
                    />
                  </div>
                </div>
                <div className={styles.TextBox}>
                  <label className={styles.TextLabel}>Responsavel*</label>
                  <div className={styles.CampoTextbox}>
                    <input
                      value={objTBEMPRESA.RESPONSAVEL}
                      onChange={handleChange('RESPONSAVEL')}
                      className={styles.CssInputs}
                      readOnly = {AcaoAtualTela === EAcoesDaTela.Nenhuma}
                    />
                  </div>
                </div>
                <div className={styles.TextBox} style={{maxWidth: '200px'}}>
                  <label className={styles.TextLabel}>CPF do Responsavel*</label>
                  <div className={styles.CampoTextbox}>
                    <input
                      value={objTBEMPRESA.CPFRESPONSAVEL}
                      maxLength={14}
                      onChange={handleChange('CPFRESPONSAVEL')}
                      placeholder='000.000.000-00'
                      className={styles.CssInputs}
                      readOnly = {AcaoAtualTela === EAcoesDaTela.Nenhuma}
                    />
                  </div>
                </div>                
            </div>

            <div className={styles.DivLinha} style={{gap: 20, justifyContent: 'start'}}>
              <div className={styles.DivImagens}>
                  <label className={styles.TextLabel}>Logo*</label>
                  <div className={styles.DivBotoesImagem}>
                    <button className={styles.BtnCarregarImagem} 
                    onClick={() => (controller.CarregarImagens(true, setExtLogo, setLogo, setErrorLogo))} 
                    disabled = {AcaoAtualTela === EAcoesDaTela.Nenhuma}
                    >Carregar Logo</button>
                    {ImgLogo && (
                    <button className={styles.BtnRemoverImagem}
                    onClick={()=>(controller.RemoverImagens(setLogo, setExtLogo))} 
                    disabled = {AcaoAtualTela === EAcoesDaTela.Nenhuma}
                    >Remover Imagem</button>
                    )}                  
                  </div>
                  {errorLogo && <p style={{ color: 'red', fontSize: '12px' }}>{errorLogo}</p>}
                  {ImgLogo && (
                    <div style={{ display:'flex', justifyContent: 'center' }}>
                      <img src={ImgLogo} alt="Preview" style={{ width: '200px', height: 'auto', marginTop: '10px' }} />
                    </div>
                  )}
              </div>

              <div className={styles.DivImagens}>
                  <label className={styles.TextLabel}>Icone*</label>
                  <div className={styles.DivBotoesImagem}>
                    <button className={styles.BtnCarregarImagem} 
                    onClick={() => (controller.CarregarImagens(false, setExtIcone, setIcone, setErrorIcon))} 
                    disabled = {AcaoAtualTela === EAcoesDaTela.Nenhuma}
                    >Carregar Icone</button>
                    {ImgIcone && (
                    <button  className={styles.BtnRemoverImagem} 
                    onClick={()=>(controller.RemoverImagens(setIcone, setExtIcone))}
                    disabled = {AcaoAtualTela === EAcoesDaTela.Nenhuma}
                    >Remover Imagem</button>
                    )}                  
                  </div>
                  {errorIcon && <p style={{ color: 'red', fontSize: '12px', fontWeight: 'bold' }}>{errorIcon}</p>}
                  {ImgIcone && (
                    <div style={{ display:'flex', justifyContent: 'center' }}>
                      <img src={ImgIcone} alt="Preview" style={{ width: '64px', height: '64px', marginTop: '10px',justifyContent: 'center' }} />
                    </div>
                  )}
              </div>

            </div>

            <div className={styles.DivLinha}>                
                <div className={styles.TextBox} style={{maxWidth: '200px'}}>
                  <button className={styles.BotaoSobreNos} onClick={BtnSobreNos_Click}>
                    <img className={styles.ImagemBotaoSobreNos} alt='' src={ImgBtnSobreNos}></img>
                    <label className={styles.TextLabel}>Sessão Sobre Nós</label>
                  </button>
                </div>                
            </div>

      </div>

      <div className={styles.Foother}>
            {AcaoAtualTela === EAcoesDaTela.Editando &&(
              <div style={{display: 'flex', flexDirection:'row', gap:'20px',}}>
                <button className={styles.BotaoConteudo} onClick={BtnSalvarClick}>
                  <div className={styles.TextoBotao}>Salvar</div>
                </button>
                <button className={styles.BotaoConteudo} onClick={BtnCancelarClick}>
                  <div className={styles.TextoBotao}>Cancelar</div>
                </button>
              </div>
            )}
            {AcaoAtualTela === EAcoesDaTela.Nenhuma && (
              <button className={styles.BotaoConteudo} onClick={BtnEditarClick}>
                <div className={styles.TextoBotao}>Editar</div>
              </button>
            )}
      </div>

      <FrmCadSobreNos show={showModalFrmSobreNos} onClose={() => setShowModalFrmSobreNos(false)} parDados={objTBEMPRESA}/>
    </div>
  );
};

export default ValidarAcessoPaginas(FrmInformacoesEmpresa);
