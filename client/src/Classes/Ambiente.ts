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
      return JSON.parse(localStorage.getItem('UsuarioLogado') || 'false');
    }  
    public set UsuarioLogado(value: boolean) {
      this._UsuarioLogado = value;
      localStorage.setItem('UsuarioLogado', JSON.stringify(value));
    }

    
    private _TokenUsuario: string = "";
    public get TokenUsuario(): string {
      return JSON.parse(localStorage.getItem('TokenUsuario') || '');
    }  
    public set TokenUsuario(value: string) {
      this._TokenUsuario = value;
      localStorage.setItem('TokenUsuario', JSON.stringify(value));
    }

    public NomeUsuarioLogado: string = "";
  
    
   
























  }
  
  export default Ambiente;