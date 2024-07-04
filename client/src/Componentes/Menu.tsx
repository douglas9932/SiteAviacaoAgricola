import { FunctionComponent, useCallback, useState } from "react";
import "./Menu.css";
import Logo from '../Imagens/LogoStoll.png'
import { Link, useNavigate } from "react-router-dom";
import LoginController from "../Controllers/Servicos/LoginController";

export type MenuType = {
  className?: string;
};

const Menu: FunctionComponent<MenuType> = ({ className = "" }) => {
    
    const navigate = useNavigate();
    const [selectedButton, setSelectedButton] = useState<number | null>(null);

    const onButtonClick = (index: number) => {
      setSelectedButton(index);
    };

    const onLanarPontosTextClick = useCallback(() => {
    // Please sync "TELA LANÇAR PONTOS - MENU EXPANDIDO" to the project
    }, []);

    const onResgatarPontosTextClick = useCallback(() => {
        // Please sync "ADM_TELA_RESGATAR_PONTOS_MENU_EXPANDIDO" to the project
    }, []);

    const onCadastrarUsuriosTextClick = useCallback(() => {
        // Please sync "ADM_TELA_CADASTRO_DE_USUARIOS_MENU_EXPANDIDO" to the project
    }, []);

    const onSairClick = useCallback(() => {
        LoginController.FazerLogout(navigate);
    }, []);


    const ListaBotoes = [
        { text: 'Consultar Produtos', onClick: onLanarPontosTextClick, path: ''},
        { text: 'Produtos Em Destaque', onClick: onResgatarPontosTextClick, path: '/Administracao/Home'},
        // { text: 'Consultar pontos', onClick: null },
        // { text: 'Cadastrar usuários', onClick: onCadastrarUsuriosTextClick },
        // { text: 'Gerenciador de Blog', onClick: onCadastrarUsuriosTextClick },
        // { text: 'Prêmios', onClick: onCadastrarUsuriosTextClick },
        // { text: 'Relatórios', onClick: onCadastrarUsuriosTextClick },
      ];

  return (
    <div className="MenuDiv">
        <p className="ImagemLogo">
            <img src={Logo}/>
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
