(function(){

    //Configuracion inicial Firebase
    var config = {
    apiKey: "AIzaSyBddULIOJwkJ5SIeW0ukcFDGmlkq2POTDY",
    authDomain: "cursofirebase-c281a.firebaseapp.com",
    databaseURL: "https://cursofirebase-c281a.firebaseio.com",
    storageBucket: "cursofirebase-c281a.appspot.com",
    messagingSenderId: "822174615829"
    };

    firebase.initializeApp(config);

    //Obtener elementos
    var preObject = document.getElementById('object');
    var ulList    = document.getElementById('list');

    //Crear referencias
    var dbrefObject = firebase.database().ref().child('object');  //Obtener object 
    var dbrefList   = dbrefObject.child('hobbies');               //Obtener hijo de object

    //Sincronizar cambios del objeto
    dbrefObject.on('value', snap => {
        preObject.innerText = JSON.stringify(snap.val(),null,3);
    });  

    //Obtener elementos agregados a la lista
    dbrefList.on('child_added', snap => {

        var li = document.createElement('li'); //Crear un nuevo elemento 
        li.innerText =  snap.val();            //Asignar los valores a la lista
        li.id = snap.key;                      //Asignar Id a cada elemento de la lista
        ulList.appendChild(li);                //Agregar contenido al DOM

    });

    //Obtener elementos modificados en la lista
    dbrefList.on('child_changed', snap => {
    
        var liChanged = document.getElementById(snap.key); //Obtengo el elemento a cambiar
        liChanged.innerText = snap.val();                  //Asigno el nuevo valor, cambiado de la base de datos
    });

    //Detectar elemento removido. Eliminar de la lista
    dbrefList.on('child_removed', snap => {

        var liToRemove = document.getElementById(snap.key); //Obtener id a eliminar
        liToRemove.remove();                                //Remover clave obtenida por el DOM.

    });

}());
