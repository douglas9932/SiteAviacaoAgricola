type RequireContext = {
    keys: () => string[];
    (id: string): string;
};

function importAll(r: RequireContext) {
    return r.keys().map(r);
}
const images = importAll(require.context('../Imagens/Carousel', false, /\.(png|jpe?g|svg)$/));
export default images;