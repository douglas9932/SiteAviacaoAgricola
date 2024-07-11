import Focar from "../Componentes/Focar";
import Carousel from "../Componentes/Carousel";
import styles from './Home.module.css'

export const Home = () => {
  
  return (
    <div className={styles.SessaoHome}>
        <Focar id="SessaoHome"/>
          <div className={styles.SessaoHomeCarousel}>
            <Carousel parUsaImagensLocal={true} parImages={[]}></Carousel>
          </div>
    </div>
  );
  
};