import Focar from "../Componentes/Focar";
import Carousel from "../Componentes/Carousel";

export const Home = () => {
  
  return (
    <div className='SessaoHome'>
      <Focar id="SessaoHome"/>
          <div className='SessaoHomeCarousel'>
            <Carousel></Carousel>
          </div>
    </div>
  );
  
};