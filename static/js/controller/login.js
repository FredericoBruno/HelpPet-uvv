app.factory('LoginService', function($http) {
    var url = "/dynamic/login.php";
    
    var login = function(login, senha) {
        var enviar = {login: login, senha: senha};
        
        return $http.post(url, enviar).then(
            function sucesso(respostaServidor) {
                return respostaServidor.data;
            },
            function erro(respostaServidor) {
                return {resposta:"erro", mensagem: "Erro ao se comunicar com a servidor"};
            });
    }
    
    return {
        login: login
    };
});

app.controller('LoginController', 
 function($scope, $http, $location, store, LoginService)  {
    $scope.usuario = {};
    
    if($scope.isLoged()){
        $location.path('home');
    }
    
    $scope.login = function(usuario) {
        var resposta = LoginService.login($scope.usuario.login, $scope.usuario.senha);
        
        
        resposta.then(function(data) {
            if(data.resposta == "sucesso"){
                store.set('jwt', data.jwt);
                $location.path('home');
            }else{
                alert("Erro no login");
            }
        });
    };
});