import { FunctionComponent, useCallback, useEffect, useState } from "react";
import "./Menu.css";
import Logo from '../Imagens/LogoStoll.png'
import { Link, useNavigate } from "react-router-dom";
import LoginController from "../Controllers/Servicos/LoginController";
import Ambiente from "../Classes/Ambiente";

export type MenuType = {
  className?: string;
};

const Menu: FunctionComponent<MenuType> = ({ className = "" }) => {
    
    const navigate = useNavigate();
    const [selectedButton, setSelectedButton] = useState<number | null>(null);

    const onButtonClick = (index: number) => {
      setSelectedButton(index);
      localStorage.setItem("IndexMenuAtual", index.toString());
    };

    const onSairClick = useCallback(() => {
        LoginController.FazerLogout(navigate);
    }, []);

    const ListaBotoes = [
        { text: 'Informações da Empresa', onClick: ()=>{}, path: '/Administracao/InfoEmpresa'},
        // { text: 'Produtos Em Destaque', onClick: onResgatarPontosTextClick, path: '/Administracao/Home'},
        // { text: 'Consultar pontos', onClick: null },
        // { text: 'Cadastrar usuários', onClick: onCadastrarUsuriosTextClick },
        // { text: 'Gerenciador de Blog', onClick: onCadastrarUsuriosTextClick },
        // { text: 'Prêmios', onClick: onCadastrarUsuriosTextClick },
        // { text: 'Relatórios', onClick: onCadastrarUsuriosTextClick },
      ];

    
    useEffect(() => {
        const minhaFuncao = async () => {
            const indexSalvo = localStorage.getItem("IndexMenuAtual") ?? '0';
            setSelectedButton(parseInt(indexSalvo, 0));
          }
            minhaFuncao();
      }, [ListaBotoes]);

  return (
    <div className="MenuDiv">
        <p className="ImagemLogo">
            <Link to='/Administracao/Home' style={{ textDecoration: 'none' }}>
                <img src={Logo}/>
            </Link>
        </p>
        <div className="MenuBotoes">
            <div className="ListaBotoes">
            {ListaBotoes.map((button, index) => (
                <button
                        key={index}
                        className={selectedButton === index ? 'BotaoSelecionado' : 'Botao'}
                        onClick={() => {
                            onButtonClick(index);
                            if (button.onClick) {
                                button.onClick();
                            }
                        }}
                        >
                        <Link to={button.path} key={index} style={{ textDecoration: 'none' }}>
                            <div>{button.text}</div>
                        </Link>
                    </button>
            ))}
            </div>        
        </div>
        <div className="DivBtnSair">
            <button className="BtnSair" onClick={onSairClick}>
                Sair
            </button>
        </div>
    </div>
  );
};

export default Menu;
