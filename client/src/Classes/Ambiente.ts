class Ambiente {
    public static _instance: Ambiente;
    private constructor() {}
  
    public static get instance(): Ambiente {
        if (!Ambiente._instance) {
          Ambiente._instance = new Ambiente();
        }
        return Ambiente._instance;
    }
    
    public static getInstance(): Ambiente {
      return this.instance;
    } 


    //-------------A Partir daqui Ficam as Variaveis de Ambiente! Todas Ficam Gravadas no localStorage-----------------------------------------------------------------

    private _UsuarioLogado: boolean = false;    

    public get UsuarioLogado(): boolean {
      try{
      return JSON.parse(localStorage.getItem('UsuarioLogado') || 'false');
    }catch{
      return false;
    }
    }  
    public set UsuarioLogado(value: boolean) {
      this._UsuarioLogado = value;
      localStorage.setItem('UsuarioLogado', JSON.stringify(value));
    }

    
    private _TokenUsuario: string = "";
    public get TokenUsuario(): string {
      try{
        return JSON.parse(localStorage.getItem('TokenUsuario') || '');
      }catch{
        return "";
      }
    }  
    public set TokenUsuario(value: string) {
      this._TokenUsuario = value;
      localStorage.setItem('TokenUsuario', JSON.stringify(value));
    }

    public NomeUsuarioLogado: string = "";
  
    
   
























  }
  
  export default Ambiente;