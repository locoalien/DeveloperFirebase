(function(){

    const config = {
        apiKey: "AIzaSyBddULIOJwkJ5SIeW0ukcFDGmlkq2POTDY",
        authDomain: "cursofirebase-c281a.firebaseapp.com",
        databaseURL: "https://cursofirebase-c281a.firebaseio.com",
        storageBucket: "cursofirebase-c281a.appspot.com",
    };
  firebase.initializeApp(config);

  //Obtener elementos DOM del formulario
  const txtEmail     = document.getElementById("txtEmail");
  const txtPassword  = document.getElementById("txtPassword");
  const btnIngresar  = document.getElementById("btnIngresar");
  const btnRegistrar = document.getElementById("btnRegistrar");
  const btnSalir     = document.getElementById("btnSalir");

  //Agregar evento Login
  btnIngresar.addEventListener('click', e => { 
      const email = txtEmail.value;
      const pass  = txtPassword.value;
      const auth  = firebase.auth();

      //Validar usuario
      const promise = auth.signInWithEmailAndPassword(email,pass);
      promise.catch(e => console.log(e.message));
  });

  btnRegistrar.addEventListener('click', e =>{
      //TODO: Verificar que el EMAIL sea real
      const email = txtEmail.value;
      const pass  = txtPassword.value;
      const auth  = firebase.auth();

      //Crear usuario
      const promise = auth.createUserWithEmailAndPassword(email,pass);
      promise
        .then(user => console.log(user))
        .catch(e => console.log(e.message));
  });

btnSalir.addEventListener('click', e => {
    firebase.auth().signOut();
});


 //Agregar escuchador en tiempo real
 firebase.auth().onAuthStateChanged(firebaseUser =>{
     if(firebaseUser){
         console.log(firebaseUser);
     }else{
         console.log("Usuario no Logueado");
     }
 });
}());



