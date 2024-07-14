export class Mensagens{

    public static CampoObrigatorio = (value: string) => {        
        const retorno = `Atenção! Campo ${value} é Obrigatório e não foi informado!`;
        return retorno;
    };

    public static CampoInvalido = (value: string) => {        
        const retorno = `Atenção! Campo ${value} é Inválido! Verifique.`;
        return retorno;
    };

    public static ImagemObrigatoria = (value: string) => {        
        const retorno = `A Imagem ${value} é Obrigatória e não foi selecionada! Verifique.`;
        return retorno;
    };

    public static ConexaoOffline = () => {        
        const retorno = `Não foi possivel Conectar ao banco de dados!`;
        return retorno;
    };

    public static JaCadastrado = (value: string) => {        
        const retorno = `${value} já cadastrado(a)!`;
        return retorno;
    };
}