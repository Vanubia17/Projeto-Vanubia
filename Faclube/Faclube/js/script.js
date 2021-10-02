$(document).ready(function() {
    
    setTimeout(exibeModal, 1000)

    function exibeModal() {
        document.getElementById("btnExibeModal").click();
    }

    
    function limpaForm() {
        $("#rua").val("");
        $("#bairro").val("");
        $("#cidade").val("");
        $("#uf").val("");
    }
    
    $("#cep").blur(function() {

        var cep = $(this).val().replace(/\D/g, '');

        if (cep != "") {

            //Expressão regular para validar se o CEP tem 8 números
            var validacep = /^[0-9]{8}$/;

            // Testa a expressão regular
            if(validacep.test(cep)) {

                //Valor temporário enquando consulta o WS
                $("#rua").val("...");
                $("#bairro").val("...");
                $("#cidade").val("...");
                $("#uf").val("...");

                //Consulta o webservice viacep.com.br/
                $.getJSON("https://viacep.com.br/ws/"+ cep +"/json/?callback=?", function(dados) {

                    if (!("erro" in dados)) {
                        $("#logradouro").removeClass("d-none");
                        $("#rua").val(dados.logradouro);
                        $("#bairro").val(dados.bairro);
                        $("#cidade").val(dados.localidade);
                        $("#uf").val(dados.uf);
                    }
                    else {
                        limpaForm();
                        alert("CEP não encontrado.");
                    }
                });
            }
            else {
                limpaForm();
                $("#logradouro").addClass("d-none");
                alert("Formato de CEP inválido.");
            }
        }
        else {
            limpaForm();
            $("#logradouro").addClass("d-none");

        }
    });

    $("#botao-cadastrar").on("click", function () {
        alert("Obrigado por visitar o fã clube");
        document.getElementById("btn-close").click();
    })
});