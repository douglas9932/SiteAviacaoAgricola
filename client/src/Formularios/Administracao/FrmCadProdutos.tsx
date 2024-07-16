import React, { FunctionComponent, useEffect, useMemo, useState } from 'react';
import styles from './Css/FrmCadProdutos.module.css';
import { TBPRODUTOS } from '../../Classes/Tabelas/TBPRODUTOS';
import { FrmProdutosController } from '../Controllers/FrmProdutosController';
import { Mensagens } from '../../Classes/Mensagens';
import Swal from 'sweetalert2';
import { Comum } from '../../Classes/Comum';
import { DataGrid } from '@mui/x-data-grid';
import ImagemVizualizar  from '../../Imagens/Icones/ImgVizualizar.svg';
import ImagemEditar  from '../../Imagens/Icones/ImgEditar.svg';
import ImagemDeletar  from '../../Imagens/Icones/ImgLixeira.svg';
import { TBPARTESPRODUTOS } from '../../Classes/Tabelas/TBPARTESPRODUTOS';
import { Description } from '@mui/icons-material';
import { EAcoesDaTela } from '../../Classes/Enums/EAcoesDaTela';
import IntegerInput from '../../Componentes/IntegerInput';
import { maxWidth } from '@mui/system';

interface ModalProps {
    show: boolean;
    SomenteVizualizar?: boolean;
    onClose: () => void;
    parDados: TBPRODUTOS | null;
    refreshPage? : ()=>void;
  }

const FrmCadProdutos:FunctionComponent<ModalProps> = ({ show, onClose, parDados, refreshPage, SomenteVizualizar}) => {

    const [AcaoAtualTela, setAcaoAtualTela] = useState<EAcoesDaTela>(EAcoesDaTela.Nenhuma);
    const controller = useMemo(() => new FrmProdutosController(), []);
    const [objTBPRODUTOS, setObject] = useState<TBPRODUTOS>(new TBPRODUTOS);
    const [ObjLstItens, setObjLstItens ] = useState<TBPARTESPRODUTOS[] | []>();

    const [ImagemCapa, SetImagemCapa] = useState<string | null>(null);
    const [errorImagemCapa, setErrorImagemCapa] = useState<string | null>(null);

    const [ImagemExp, SetImagemExp] = useState<string | null>(null);
    const [errorImagemExp, setErrorImagemExp] = useState<string | null>(null);

    const [ObjEdit, SetObjEdit] = useState<TBPARTESPRODUTOS| null>();
    const [NUMEROPARTE, SetNUMEROPARTE] = useState<number>();
    const [DESCRICAOPARTE, SetDESCRICAOPARTE] = useState<string>('');

    useEffect(() => {

      if (parDados) {
        setObjLstItens([]);
        setObject(parDados ?? new TBPRODUTOS);
        SetImagemCapa(parDados.IMAGEMCAPA);
        SetImagemExp(parDados.IMAGEMPRODUTOEXPANDIDO);
      }

      const BuscarDadosItens = async () => {
        GetPartes();
      }
      BuscarDadosItens();
    }, [parDados]);

    const SetIDPRODUTOInserido = (parID: number) =>{
      if(parDados && parDados.IDPRODUTO ===0){
        parDados.IDPRODUTO = parID;
      }
    }

    const GetPartes= async ()=>{
      if (parDados) {
        await controller.GetPartes(parDados.IDPRODUTO);
        setObjLstItens(controller.ObjLstItens);
      }
    }

    const LimparCamposItens = ()=>{
      SetObjEdit(null);
      SetNUMEROPARTE(0);
      SetDESCRICAOPARTE('');
    }
    if (!show) return null;

    const handleTextareaChange = (field: string) => (
      event: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
      var { value } = event.target;
      setObject((prev: TBPRODUTOS) => ( {...prev, [field]: value} as TBPRODUTOS));
    };

    const handleChange = (field: keyof TBPRODUTOS) => (event: React.ChangeEvent<HTMLInputElement>) => {
    var { value } = event.target;

      if(field === null){
          return;
      }

      setObject((prev: TBPRODUTOS) => ( {...prev, [field]: value} as TBPRODUTOS));
    };

    const ValidarSalvar= async () =>{

        try{
            if(objTBPRODUTOS.NOMEPRODUTO === ''){
              Swal.fire({
                text: Mensagens.CampoObrigatorio("Nome do Produto"),
                icon: "warning",
                customClass: {
                  popup: 'swal2-custom-zindex'
                }

              });
              return false;
            }

            if(objTBPRODUTOS.DESCRICAOPRODUTO === ''){
                Swal.fire({
                    text: Mensagens.CampoObrigatorio("Descrição do Produto"),
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

            if(ImagemExp === null || ImagemExp === ''){
              Swal.fire({
                text: Mensagens.ImagemObrigatoria("Imagem Expandida"),
                icon: "warning",
                customClass: {
                  popup: 'swal2-custom-zindex'
                }
              }); 
              return false;
            }


            objTBPRODUTOS.IMAGEMCAPA = ImagemCapa;
            objTBPRODUTOS.IMAGEMPRODUTOEXPANDIDO = ImagemExp;

            return true;

        }catch{

        }
    }

    const BtnSalvarClick= async () => {

      if(await ValidarSalvar()){

         await controller.Salvar(objTBPRODUTOS, SetIDPRODUTOInserido).then((success: any) => {
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

              

              // onClose();
              // if(refreshPage){
              //   refreshPage();
              // }

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

    let rows = ObjLstItens?.map((Itens) => ({
      id: Itens.IDPARTE,
      description: Itens.NUMEROPARTE,
      name: Itens.DESCRICAOPARTE,
    }));

    const columns = [
      { field: 'description', headerName: 'Número',width: 100 },
      { field: 'name', headerName: 'Descrição', flex:1, width: 150 },
      {
        field: 'actions',
        headerName: 'Ações',
        width: 230,
        renderCell: (params: { row: { id: any; }; }) => (
        <div style={{display: "flex", width: "100%", height: "100%", justifyContent: 'center', alignItems: "center" }}>                                  
            <button
            className="buttonEditar"
            color="secondary"
            onClick={() => BtnGridEditItem(params.row.id)}
            >
                <img src={ImagemEditar}></img>
                <label>Edit</label>
            </button>

            <button
            className="buttonExcluir"
            color="secondary"
            onClick={() => BtnGridDeleteItem(params.row.id)}
            >
            <img src={ImagemDeletar}></img>
            <label>Deletar</label>
            </button>
        </div>
      ), },
    ];


    const BtnNovoClick =()=>{
      try{
        if((parDados?.IDPRODUTO ?? 0) <= 0){
          Swal.fire({
            text: `Para Adicionar partes do Produto, primeiro tem que Salva-lo!`,
            icon: "warning",
            customClass: {
              popup: 'swal2-custom-zindex'
            }
          }); 
        }else{
          setAcaoAtualTela(EAcoesDaTela.Novo);
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
    }

    const BtnGridEditItem = (id: any) => {
      try{
        if(ObjLstItens?.find(Item => Item.IDPARTE === id) == null){
          return;
        }else{
          const obj = ObjLstItens?.find(Item => Item.IDPARTE === id);
          SetObjEdit(obj);
          SetNUMEROPARTE(obj?.NUMEROPARTE ?? 0);
          SetDESCRICAOPARTE(obj?.DESCRICAOPARTE ?? '');
          setAcaoAtualTela(EAcoesDaTela.Novo);
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
    
    const BtnGridDeleteItem = (id: any) => {
      
      try{
        
        Swal.fire({
          text: "Deseja realmente Deletar?",
          icon: "question",
          showCancelButton: true,
          cancelButtonText: 'Cancelar',
          confirmButtonText: 'Confirmar',
          reverseButtons: true,
          customClass: {
            popup: 'swal2-custom-zindex'
          }
        }).then(async (result) => {
          if (result.isConfirmed) {

            await controller.DeletarParteProduto(id);

            Swal.fire({
              text: "Registro Deletado com Sucesso!",
              icon: "success",
              timer: 5000,
              timerProgressBar: true,
              customClass: {
                popup: 'swal2-custom-zindex'
              }
            }).then(async () => {
              await GetPartes();
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

    const BtnSalvarItemClick =async ()=>{
      try{
        let objNew = ObjEdit;

          if(!objNew){
            objNew = new TBPARTESPRODUTOS();
            objNew.IDPARTE = 0;
            objNew.IDPRODUTO = parDados?.IDPRODUTO ?? 0;
            objNew.NUMEROPARTE = NUMEROPARTE ?? 0;
            objNew.DESCRICAOPARTE = DESCRICAOPARTE;            
          }else{
            objNew.NUMEROPARTE = NUMEROPARTE ?? 0;
            objNew.DESCRICAOPARTE = DESCRICAOPARTE; 
          }
            await controller.SalvarParteProduto(objNew).then((success: any) => {
            if (success) {
              Swal.fire({
                text: "Registro Salvo com Sucesso!",
                icon: "success",
                timer: 5000,
                timerProgressBar: true,
                customClass: {
                  popup: 'swal2-custom-zindex'
                }
              }).then(async () => {  
                await GetPartes();
                SetObjEdit(null);
                LimparCamposItens();
                setAcaoAtualTela(EAcoesDaTela.Nenhuma);
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
      }catch{
  
      }
    }
  
    const BtnCancelarItemClick =async ()=>{
      try{
        await GetPartes();
        LimparCamposItens();
        setAcaoAtualTela(EAcoesDaTela.Nenhuma);
      }catch{
  
      }
    }

  



  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Verifica se o valor é uma string vazia
    if (value.trim() === '') {
      SetNUMEROPARTE(0); // Define como 0 quando o campo estiver vazio
    } else {
      // Tenta converter para número
      const intValue = parseInt(value, 10);

      // Define como 0 se a conversão falhar
      SetNUMEROPARTE(isNaN(intValue) ? 0 : intValue);
    }
  };

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.Header}>
        </div>
        <div className={styles.Body}>
             <div className={styles.DivLinha}>
                <div className={styles.TextBox} style={{maxWidth: '50%'}}>
                  <label className={styles.TextLabel}>
                    Nome do Produto*
                  </label>
                  <div className={styles.CampoTextbox}>
                    <input
                      value={objTBPRODUTOS?.NOMEPRODUTO}
                      className={styles.CssInputs}
                      onChange={handleChange('NOMEPRODUTO')}
                    />
                  </div>
                </div>
            </div>

            <div className={styles.DivLinha}>
                <div className={styles.TextBox} style={{maxWidth: '70%'}}>
                  <label className={styles.TextLabel}>
                    Descrição*
                  </label>
                  <div className={styles.CampoTextbox}>
                    <textarea
                      value={objTBPRODUTOS?.DESCRICAOPRODUTO}
                      className={styles.CssInputs}
                      onChange={handleTextareaChange('DESCRICAOPRODUTO')}
                      style={{minHeight: '100px', minWidth: '70%'}}
                    />
                  </div>
                </div>
            </div>

            <div className={styles.DivLinha} style={{gap: 20, justifyContent: 'start'}}>
              <div className={styles.DivImagens}>
                  <label className={styles.TextLabel}>Imagem Capa*</label>
                  <div className={styles.DivBotoesImagem}>
                    <button className={styles.BtnCarregarImagem}
                    onClick={() => (controller.CarregarImagens(true, SetImagemCapa, setErrorImagemCapa))}
                    >Carregar Imagem</button>
                    {ImagemCapa && (
                    <button className={styles.BtnRemoverImagem}
                    onClick={()=>(controller.RemoverImagens(SetImagemCapa))}
                    >Remover Imagem</button>
                    )}
                  </div>
                  {errorImagemCapa && <p style={{ color: 'red', fontSize: '12px' }}>{errorImagemCapa}</p>}
                  {ImagemCapa && (
                    <div className={styles.DivDaImagem}>
                      <img src={ImagemCapa} alt="Preview" className={styles.Imagem}/>
                    </div>
                  )}
              </div>
              
              <div className={styles.DivImagens}>
                  <label className={styles.TextLabel}>Imagem Produto Expandido*</label>
                  <div className={styles.DivBotoesImagem}>
                    <button className={styles.BtnCarregarImagem}
                    onClick={() => (controller.CarregarImagens(true, SetImagemExp, setErrorImagemExp))}
                    >Carregar Imagem</button>
                    {ImagemExp && (
                    <button className={styles.BtnRemoverImagem}
                    onClick={()=>(controller.RemoverImagens(SetImagemExp))}
                    >Remover Imagem</button>
                    )}
                  </div>
                  {errorImagemExp && <p style={{ color: 'red', fontSize: '12px' }}>{errorImagemExp}</p>}
                  {ImagemExp && (
                    <div className={styles.DivDaImagem}>
                      <img src={ImagemExp} alt="Preview" className={styles.Imagem}/>
                    </div>
                  )}
              </div>
            </div>

            <div className={styles.DivLinha} style={{justifyContent: 'end'}}>    
            {AcaoAtualTela === EAcoesDaTela.Nenhuma && (
              <button className={styles.BotaoNovo} 
                onClick={BtnNovoClick}>
                <div className={styles.TextoBotao}>Adicionar Parte</div>
              </button>)}
            </div>


            {AcaoAtualTela === EAcoesDaTela.Novo && (
              <div className={styles.DivLinha}>
                  <div className={styles.TextBox} style={{maxWidth: '10%'}}>
                    <label className={styles.TextLabel}>
                      Número*
                    </label>
                    <div className={styles.CampoTextbox}>
                      <IntegerInput
                        value={(NUMEROPARTE?.toString())}
                        className={styles.CssInputs}
                        onChange={handleNumberChange}
                      />
                    </div>
                  </div>

                  <div className={styles.TextBox} style={{maxWidth: '90%'}}>
                    <label className={styles.TextLabel}>
                      Descrição Item*
                    </label>
                    <div className={styles.CampoTextbox}>
                      <textarea
                        value={DESCRICAOPARTE}
                        className={styles.CssInputs}
                        onChange={(e) => SetDESCRICAOPARTE(e.target.value)}
                        style={{minHeight: '100px', minWidth: '90%'}}
                      />
                    </div>
                  </div>
              </div>
            )}

            {AcaoAtualTela === EAcoesDaTela.Novo && (
              <div className={styles.DivLinha} style={{justifyContent: 'end'}}>    
                <div style={{display: 'flex', flexDirection:'row', gap:'20px',}}>
                  <button className={styles.BotaoSalvar} onClick={BtnSalvarItemClick}>
                    <div className={styles.TextoBotao}>Salvar</div>
                  </button>
                  <button className={styles.BotaoCancelar} onClick={BtnCancelarItemClick}>
                    <div className={styles.TextoBotao}>Cancelar</div>
                  </button>
                </div>                
              </div>
            )}



            <div className={styles.DivLinha}>    
              <DataGrid rows={rows} columns={columns} hideFooter/>
            </div>
        </div>

        <div className={styles.Foother}>
          {AcaoAtualTela === EAcoesDaTela.Nenhuma && (
              <div style={{display: 'flex', flexDirection:'row', gap:'20px',}}>
                <button className={styles.BotaoSalvar} onClick={BtnSalvarClick}>
                  <div className={styles.TextoBotao}>Salvar</div>
                </button>
                <button className={styles.BotaoCancelar} onClick={BtnCancelarClick}>
                  <div className={styles.TextoBotao}>Fechar</div>
                </button>
              </div>
          )}
      </div>
      </div>
    </div>
  );
};

export default FrmCadProdutos;
