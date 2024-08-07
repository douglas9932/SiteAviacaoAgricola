export class Comum{

    public static ValidarData = (data: string) => {

      const regex = /^\d{4}\-\d{2}\-\d{2}$/;
      
      if (!regex.test(data)) {
        return false; 
      }
    
      const [ano, mes, dia] = data.split('-').map(Number);
    
      if (ano < 1000 || ano > 9999) {
        return false;
      }

      if (mes < 1 || mes > 12) {
        return false;
      }

      const dataObj = new Date(ano, mes - 1, dia);

      return dataObj.getFullYear() === ano && 
          dataObj.getMonth() === mes - 1 && 
          dataObj.getDate() === dia;
    };

    public static formatCpf = (value: string) => {
        // Remove tudo que não é número
        const onlyNums = value.replace(/\D/g, '');
    
        // Formata o CNPJ
        if (onlyNums.length <= 14) {
          return onlyNums.replace(
            /^(\d{3})(\d{3})(\d{3})(\d{2})$/,
            '$1.$2.$3-$4'
          );
        }
    
        return value;
      };

    public static ValidarCNPJ = (cnpj: string) => {
        // Remove caracteres não numéricos
        cnpj = cnpj.replace(/[^\d]+/g, '');

  // Verifica se o CNPJ tem 14 dígitos
  if (cnpj.length !== 14) return false;

  // Verifica se todos os dígitos são iguais (o que é inválido)
  if (/^(\d)\1{13}$/.test(cnpj)) return false;

  return true;
  // Valida o primeiro dígito verificador
  // let soma = 0;
  // for (let i = 0; i < 12; i++) {
  //   soma += parseInt(cnpj[i]) * (13 - (i % 8));
  // }
  // let resto = (soma % 11);
  // let digito1 = (resto < 2) ? 0 : 11 - resto;

  // if (parseInt(cnpj[12]) !== digito1) return false;

  // // Valida o segundo dígito verificador
  // soma = 0;
  // for (let i = 0; i < 13; i++) {
  //   soma += parseInt(cnpj[i]) * (14 - (i % 8));
  // }
  // resto = (soma % 11);
  // let digito2 = (resto < 2) ? 0 : 11 - resto;

  // return parseInt(cnpj[13]) === digito2;
      };

    public static formatCnpj = (value: string) => {
        // Remove tudo que não é número
        const onlyNums = value.replace(/\D/g, '');
    
        // Formata o CNPJ
        if (onlyNums.length <= 14) {
          return onlyNums.replace(
            /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
            '$1.$2.$3/$4-$5'
          );
        }
    
        return value;
      };
    
     public static ValidarCPF = (cpf: string) => {
        // Remove caracteres não numéricos
        cpf = cpf.replace(/[^\d]+/g, '');
      
        // CPF deve ter 11 dígitos
        if (cpf.length !== 11) return false;
      
        // Verifica se todos os dígitos são iguais
        if (/^(\d)\1{10}$/.test(cpf)) return false;
      
        // Valida o primeiro dígito verificador
        let soma = 0;
        for (let i = 0; i < 9; i++) {
          soma += parseInt(cpf[i]) * (10 - i);
        }
        let resto = (soma * 10) % 11;
        let digito1 = (resto === 10 || resto === 11) ? 0 : resto;
      
        if (parseInt(cpf[9]) !== digito1) return false;
      
        // Valida o segundo dígito verificador
        soma = 0;
        for (let i = 0; i < 10; i++) {
          soma += parseInt(cpf[i]) * (11 - i);
        }
        resto = (soma * 10) % 11;
        let digito2 = (resto === 10 || resto === 11) ? 0 : resto;
      
        return parseInt(cpf[10]) === digito2;
      };

      public static formatIe(value: string): string {
        const onlyNums = value.replace(/\D/g, '');
        // Implementa uma lógica de formatação genérica
        if (onlyNums.length <= 12) {
          return onlyNums.replace(
            /^(\d{3})(\d{3})(\d{3})(\d{3})$/,
            '$1.$2.$3.$4'
          );
        }
        return value;
      }

     public static ValidarIe = (ie: string) => {
        // Remove caracteres não numéricos
        ie = ie.replace(/[^\d]+/g, '');
      
        // Inscrição Estadual deve ter 12 dígitos
        if (ie.length !== 12) return false;
      
        // Validação específica para SP (exemplo simplificado)
        // Cada estado tem sua própria regra
        return true; // Implementar lógica de validação específica
      };
    
      public static formatTelefone(value: string): string {
        const onlyNums = value.replace(/\D/g, '');
        // Implementa uma lógica de formatação genérica
        if (onlyNums.length <= 12) {
          return onlyNums.replace(
            /^(\d{2})(\d{4})(\d{4})$/,
            '($1) $2-$3'
          );
        }
        return value;
      }

    public static ValidarTelefone = (telefone: string) => {
        const regex = /^\(\d{2}\) \d{4}-\d{4}$/;
        return regex.test(telefone);
      };

    public static formatCelular(value: string): string {
        const onlyNums = value.replace(/\D/g, '');
        // Implementa uma lógica de formatação genérica
        if (onlyNums.length <= 12) {
          return onlyNums.replace(
            /^(\d{2})(\d{1})(\d{4})(\d{4})$/,
            '($1) $2 $3-$4'
          );
        }
        return value;
      }

      public static ValidarCelular = (celular: string) => {
        const regex = /^\(\d{2}\) 9 \d{4}-\d{4}$/;
        return regex.test(celular);
      };
}