(function(){
    //Configuracion inicial Firebase
    var config = {
        apiKey: "AIzaSyBddULIOJwkJ5SIeW0ukcFDGmlkq2POTDY",
        authDomain: "cursofirebase-c281a.firebaseapp.com",
        databaseURL: "https://cursofirebase-c281a.firebaseio.com",
        storageBucket: "cursofirebase-c281a.appspot.com",
    };
    firebase.initializeApp(config);

    //Importar modulos y creacion configuracion angularFire
    angular
        .module('app',['firebase'])           
        //Configuracion de referencias db
        .config(function($firebaseRefProvider){
            $firebaseRefProvider.registerUrl({
                default: config.databaseURL,
                object: `${config.databaseURL}/angular/object`
            });
        })
        //Clase constructora o fabrica
        .factory('ObjectFactory', ObjectFactory)
        .controller('MyCtrl',MyCtrl);

        //funcion fabrica referencia a db utilizar
        function ObjectFactory($firebaseObject, $firebaseRef){
            return $firebaseObject($firebaseRef.object);
        }

        //Controlador principal
        function MyCtrl(ObjectFactory){
            //const rootRef = firebase.database().ref().child('angular');
            //const ref     = rootRef.child('object');
            //this.object   = $firebaseObject($firebaseRef.object);
            this.object =  ObjectFactory;
            this.hola     = () =>{
                return `Hola, ${this.object.name}`;
                //return this.object.name;
            };
        }
        
        //Pruebas unitarias y ejecucion controlador
        const ctrl = new MyCtrl({name:"mundo"});
        const message = ctrl.hola();
        console.assert(message == "Hola, mundo1", `Se espearaba hola mundo: ${message}`);
}());