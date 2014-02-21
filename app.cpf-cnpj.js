var MINHAAPLICACAO = MINHAAPLICACAO || {};

(function(x, $) {
    x.validacao = {
        mascaraCPF: function(valor) {
            var retorno;
            var grupo01 = valor.substring(0,3);
            retorno = grupo01;
            var grupo02 = valor.substring(3,6);
            if(grupo02 != ''){
                retorno += '.' + grupo02;
            }
            var grupo03 = valor.substring(6,9);
            if(grupo03 != ''){
                retorno += '.' + grupo03
            }
            var grupo04 = valor.substring(9);
            if(grupo04 != ''){
                retorno += '-' + grupo04;
            }
            return  retorno;
        },
        mascaraCNPJ: function(valor) {
            var retorno;
            var grupo01 = valor.substring(0,2);
            retorno = grupo01;
            var grupo02 = valor.substring(2,5);
            if(grupo02 != ''){
                retorno += '.' + grupo02;
            }
            var grupo03 = valor.substring(5,8);
            if(grupo03 != ''){
                retorno += '.' + grupo03
            }
            var grupo04 = valor.substring(8,12);
            if(grupo04 != ''){
                retorno += '/' + grupo04;
            }
            var grupo05 = valor.substring(12);
            if(grupo05 != ''){
                retorno += '-' + grupo05;
            }
            return  retorno;
        },
        isCpf: function(cpf) {
            var soma;
            var resto;
            var i;
            if ( (cpf.length != 11) ||
                (cpf == "00000000000") || (cpf == "11111111111") ||
                (cpf == "22222222222") || (cpf == "33333333333") ||
                (cpf == "44444444444") || (cpf == "55555555555") ||
                (cpf == "66666666666") || (cpf == "77777777777") ||
                (cpf == "88888888888") || (cpf == "99999999999") ) {
                return false;
            }
            soma = 0;
            for (i = 1; i <= 9; i++) {
                soma += Math.floor(cpf.charAt(i-1)) * (11 - i);
            }
            resto = 11 - (soma - (Math.floor(soma / 11) * 11));
            if ( (resto == 10) || (resto == 11) ) {
                resto = 0;
            }
            if ( resto != Math.floor(cpf.charAt(9)) ) {
                return false;
            }
            soma = 0;
            for (i = 1; i<=10; i++) {
                soma += cpf.charAt(i-1) * (12 - i);
            }
            resto = 11 - (soma - (Math.floor(soma / 11) * 11));
 
            if ( (resto == 10) || (resto == 11) ) {
                resto = 0;
            }
            if (resto != Math.floor(cpf.charAt(10)) ) {
                return false;
            }
            return true;
        },
        isCnpj: function(cnpj){
            var i;
            var c = cnpj.substr(0,12);
            var dv = cnpj.substr(12,2);
            var d1 = 0;
            for (i = 0; i < 12; i++){
                d1 += c.charAt(11-i)*(2+(i % 8));
            }
            if (d1 == 0) return false;
            d1 = 11 - (d1 % 11);
            if (d1 > 9) d1 = 0;
            if (dv.charAt(0) != d1){
                return false;
            }
            d1 *= 2;
            for (i = 0; i < 12; i++){
                d1 += c.charAt(11-i)*(2+((i+1) % 8));
            }
            d1 = 11 - (d1 % 11);
            if (d1 > 9) d1 = 0;
            if (dv.charAt(1) != d1){
                return false;
            }
            return true;
        },
        somenteNumero: function(event) {
            //teclas permitidas na ordem de código abaixo (tab,delete,backspace,setas direita e esquerda)
            TeclasPermitidas = new Array(8,9,37,39,46);
            //Adicionando os numeros de 0 a 9 do teclado alfanumerico
            for(var x=48;x<=57;x++){
                TeclasPermitidas.push(x);
            }
            //adicionando os numeros de 0 a 9 do teclado numerico
            for(var x=96;x<=105;x++){
                TeclasPermitidas.push(x);
            }
            //Pega a tecla digitada dentro do input
            var CodigoTecla = (event) ? event.keyCode : event.which;
            //Verifica se a tecla digitada é permitida
            if ($.inArray(CodigoTecla,TeclasPermitidas) != -1){
                return true;
            }
            return false;
        }
    };
    $(function() {
        });
    //Validação de campo CPF ou CNPJ Numero
    $('.cpf-cpnj').keydown(function(event) {
        return x.validacao.somenteNumero(event);
    });
    //Validação de mascara CPF ou CNPJ
    $('.cpf-cpnj').keyup(function(event) {
        var texto = $(this).val().replace(/[_\.\-\/]/g, "");
        if(texto.length > 11){
            texto = x.validacao.mascaraCNPJ(texto);
        }else{
            texto = x.validacao.mascaraCPF(texto);
        }
        $(this).val(texto);
    });
})(MINHAAPLICACAO, jQuery);
