import { TBIMAGENSCAROUSEL } from '../Classes/Tabelas/TBIMAGENSCAROUSEL';

type RequireContext = {
    keys: () => string[];
    (id: string): string;
};

function importAll(r: RequireContext) {
    return r.keys().map(r);
}

const imagePaths = importAll(require.context('../Imagens/Carousel', false, /\.(png|jpe?g|svg)$/));

// Criar uma função para mapear caminhos para instâncias de TBIMAGENSCAROUSEL
const createImageObjects = (paths: string[]): TBIMAGENSCAROUSEL[] => {
    return paths.map((path, index) => {
        let obj = new TBIMAGENSCAROUSEL();
        obj.IDIMAGEM = index;
        obj.DTCADASTRO=   '' ;  
        obj.SCRIMAGEM=   path;
        obj.NOMEIMAGEM = `Image ${index + 1}`; 
        obj.IDSTATUSIMAGEM = 1;
        return obj;     
    });
};

const images = createImageObjects(imagePaths);
export default images;