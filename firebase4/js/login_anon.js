//Inicializar funcion principal
window.onload = initApp;

/**
 * @function initApp
 * @description Funcion que permite inicializar los metodos de la clase cls_login_anon
 */
function initApp(){
    login_anon = new cls_login_anon();  //Instancia nueva de la clase 
    login_anon.stateLogin();            //Invocar metodo state login

}

/**
 * Clase principa Login Anonymous con Firebase
 * @public
 * @class cls_login_anon
 * @property {string} stateLogin validar si el usuario ya inicio sesion
 * @description Clase principal con los metodos login anonymous
 */
function cls_login_anon(){

    /**
     * @public
     * @method stateLogin
     * @description Metodo que permite validar si el usuario ya inicio sesion previamente. Estado Login
     */
    this.stateLogin = function(){

        //Obtener elementos del DOM
        var btnIngresar     = document.getElementById('ingresar');       //Boton Ingresar
        var btnCerrarSesion = document.getElementById('cerrarSesion');   //Boton cerrar sesion
        var status          = document.getElementById('status');         //Estatus de login

        // Autenticacion con firebase
        firebase.auth().onAuthStateChanged(function(user) {

            //Validacion de usuario 
            if (user) {
                // Si el usuario ya ha iniciado sesion se cambia el status
                status.textContent = 'Sesion iniciada';
                btnCerrarSesion.disabled  = false;
            }else{
                //Si el usuario no ha iniciado sesion, se cambia el status
                status.textContent = 'no se ha iniciado sesion';
                btnCerrarSesion.disabled  = true;
            }
            //Se cambia el estado del boton a habilitado
            btnIngresar.disabled      = false;
        });

        //Se agrega un evento clic al boton "ingresar", que llama al metodo btnIngresar
        btnIngresar.addEventListener('click', login_anon.btnIngresar, false);
        //Se agrega un evento clic al boton "cerrarSesion", que llama al metodo btnCerrarSesion
        btnCerrarSesion.addEventListener('click', login_anon.btnCerrarSesion, false);
    };

    /**
     * @public
     * @method btnIngresar
     * @description Metodo que se ejecuta cuando el usuario presiona el boton
     */
    this.btnIngresar = function(){

      //Se valida que no exista un usuario ya logueado
      if (firebase.auth().currentUser) {

            //Si existe un usuario loguead, se procede a desconectar
            firebase.auth().signOut();

      } else {

        // [INICIO Autenticacion anonima]
        firebase.auth().signInAnonymously().catch(function(error) {
          // validacion de Errores.
          var errorCode = error.code;
          var errorMessage = error.message;

          //Validacion de errores
          if (errorCode === 'auth/operation-not-allowed') {
            alert('No tienes habilitada en Firebase Consola la autenticacion Anonima');
          } else {
            console.error(error);
          }
        });
      }
      //Se desabilita el boton de ingresar
      document.getElementById('ingresar').disabled = true;
      //Se habilita el boton de cerrar sesion
      document.getElementById('cerrarSesion').disabled = false;
    };

    /**
     * @public 
     * @method btnCerrarSesion
     * @description Metodo que se ejecuta al dar clic en el boton "cerrar sesion"
     */
    this.btnCerrarSesion = function(){
        //Si existe un usuario loguead, se procede a desconectar
        firebase.auth().signOut();
        document.getElementById('ingresar').disabled = false;
        document.getElementById('cerrarSesion').disabled = true;
    };
}
