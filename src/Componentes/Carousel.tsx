import { useState, useEffect, useRef, Key } from 'react';
import styles from './Carousel.module.css';
import images from '../Controllers/GetImages'
import { TBIMAGENSCAROUSEL } from '../Classes/Tabelas/TBIMAGENSCAROUSEL';


interface CarouselProps {
  parUsaImagensLocal: boolean;
  parImages: TBIMAGENSCAROUSEL[];
}

const Carousel = ({parUsaImagensLocal, parImages }: CarouselProps ) => {

  let Imagens: TBIMAGENSCAROUSEL[] = [];

  if(!parUsaImagensLocal)
  {
    Imagens = parImages;
  }else{
    Imagens = images;
  }

  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startAutoSlide = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % Imagens.length);

      if(currentIndex.toString() === "NaN"){

        if(Imagens.length > 1){
          setCurrentIndex(1);
        }
      }
    }, 5000);
  };

  useEffect(() => {
    
    startAutoSlide();
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      startAutoSlide();
    }
  }, [currentIndex]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? Imagens.length - 1 : prevIndex - 1));
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      startAutoSlide();
    }
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === Imagens.length - 1 ? 0 : prevIndex + 1));
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      startAutoSlide();
    }
  };

  const CarregarImagens = () => {
    if(parUsaImagensLocal){
      return Imagens.map((image) => (
        <div
          key={image.IDIMAGEM}
          className={`${styles.carouselimage} ${image.IDIMAGEM === currentIndex ? 'active' : ''}`}
          style={{ backgroundImage: `url(${image.SCRIMAGEM})` }}
        ></div>))
    }
    else{
      return Imagens.map((image) => (
        <img
          src={image.SCRIMAGEM} // Ajuste conforme os detalhes do tipo TBIMAGENSCAROUSEL
          alt={`Slide ${image.IDIMAGEM}`}
          // style={{ width: '100%', height: 'auto' }}
          className={`${styles.carouselimage} ${image.IDIMAGEM === currentIndex ? 'active' : ''}`}
        />
        ))
    }   
  }

  return ( 
      <div className={styles.carousel}>
        <button className={styles.leftarrow} onClick={goToPrevious}>
          &#10094;
        </button>
        <div
          className={styles.carouselimages}
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {CarregarImagens()}
        </div>
        <button className={styles.rightarrow} onClick={goToNext}>
          &#10095;
        </button>
    </div>  
  );
};

export default Carousel;
