import Focar from "../Componentes/Focar";
import Carousel from "../Componentes/Carousel";
import styles from './Home.module.css'
import { useEffect, useMemo, useState } from "react";
import { FrmHomeController } from "./Controllers/FrmHomeController";
import { TBIMAGENSCAROUSEL } from "../Classes/Tabelas/TBIMAGENSCAROUSEL";

export const Home = () => {

  const controller = useMemo(() => new FrmHomeController(), []);
  const [ImagensDoBanco, setImagensBanco ] = useState<TBIMAGENSCAROUSEL[] | []>();

  useEffect(() => {    
    const BuscarDadosEmpresa = async () => {

      await controller.GetImagensCarousel(setImagensBanco);    
      setImagensBanco(controller.ObjTBIMAGENSCAROUSEL);
    }
    BuscarDadosEmpresa();

  }, [controller]);


  return (
    <div className={styles.SessaoHome}>
        <Focar id="SessaoHome"/>
          <div className={styles.SessaoHomeCarousel}>
            <Carousel parUsaImagensLocal={false} parImages={ImagensDoBanco || []}></Carousel>
          </div>
    </div>
  );
  
};