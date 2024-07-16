import { FunctionComponent, useCallback, useEffect, useState } from "react";
import styles from "./Menu.module.css";
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
      localStorage.setItem("IndexMenuAtual", index.toString());
    };

    const onSairClick = useCallback(() => {
        LoginController.FazerLogout(navigate);
    }, []);

    const ListaBotoes = [
        { text: 'Informações da Empresa', onClick: ()=>{}, path: '/Administracao/InfoEmpresa'},
         { text: 'Imagens Carousel', onClick: ()=>{}, path: '/Administracao/ImagensCarousel'},
         { text: 'Contatos', onClick: ()=>{}, path: '/Administracao/Contatos'},
         { text: 'Produtos', onClick: ()=>{}, path: '/Administracao/Produtos'},
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
    <div className={styles.MenuDiv}>
        <p className={styles.ImagemLogo}>
            <Link to='/Administracao/Home' style={{ textDecoration: 'none' }}>
                <img src={Logo}/>
            </Link>
        </p>
        <div className={styles.MenuBotoes}>
            <div className={styles.ListaBotoes}>
            {ListaBotoes.map((button, index) => (
                <button
                        key={index}
                        className={selectedButton === index ? styles.BotaoSelecionado : styles.Botao}
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
        <div className={styles.DivBtnSair}>
            <button className={styles.BtnSair} onClick={onSairClick}>
                Sair
            </button>
        </div>
    </div>
  );
};

export default Menu;
