var firebaseConfig = {
    apiKey: "AIzaSyCdpOAjMqksYhO_CcyMynWShJQ1Ql3o-6c",
  authDomain: "carros-c46be.firebaseapp.com",
  databaseURL: "https://carros-c46be-default-rtdb.firebaseio.com",
  projectId: "carros-c46be",
  storageBucket: "carros-c46be.appspot.com",
  messagingSenderId: "817858313721",
  appId: "1:817858313721:web:e6f6feab96b7d9d5771128",
  measurementId: "G-6CHVFTK34Q"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


function resetFields(){
    document.getElementById("Input1").value='';
    document.getElementById("Input2").value='';
    document.getElementById("Input3").value='';
    document.getElementById("Input4").value='Selecciona';
    document.getElementById("Input5").value='';
    document.getElementById("Input6").value='';
    document.getElementById("Input7").value='';
}
function createR() {
    document.getElementById("Input1").disabled = false;
    //Guardo los datos capturados usando el id de cada control
    var id = document.getElementById("Input1").value;
    var Marca = document.getElementById("Input2").value;
    var Modelo = document.getElementById("Input3").value;
    var Tipo = document.getElementById("Input4").value;
    var Cilindros = document.getElementById("Input5").value;
    var Puertas = document.getElementById("Input6").value;
    var Propietario = document.getElementById("Input7").value;

    //validaciones
    if (id.length > 0) {
        //creo un objeto que guarda los datos
        var Auto = {
            id, //matricula:id
            Marca,
            Modelo,
            Tipo,
            Cilindros,
            Puertas,
            Propietario,
        }

        //console.log(Auto);

        firebase.database().ref('Autos/' + id).update(Auto).then(() => {
           resetFields();
        }).then(()=>{
           read();
        });

        swal("Listo!", "Agregado correctamente", "success");

        
    } 
    else {
        swal("Error", "Llena todos los campos","warning");
    }

    document.getElementById("Input1").disabled = false;
        //firebase.database().ref('users/' + userId).set({
    //    username: name,
    //    email: email,
    //    profile_picture : imageUrl
    //  });
    //https://firebase.google.com/docs/database/web/read-and-write?hl=es

  
    //Esto se usa cuando no tienen un id/matricula y Firebase les genera una
    //automaticamente
    //const key = firebase.database().ref().child('Autos').push().key;
    //data[`Autos/${key}`]= Auto;
    //firebase.database().ref().update(data).then(()=>{
    //  alert('Agregado exitosamente');
    //})
}

function read(){
    document.getElementById("Table1").innerHTML='';

    var ref = firebase.database().ref('Autos');
 /* 
   ref.on('value', function(snapshot) {
        snapshot.forEach(row=>{
            printRow(row.val());
        })
    });
     */
   
    ref.on("child_added", function(snapshot) {
        printRow(snapshot.val());
    });


}

function printRow(Auto){
    
    if(Auto !=null){
        var table = document.getElementById("Table1"); 

        //creamos un nuevo elemento en la tabla en la ultima posicion
        var row = table.insertRow(-1);

        //Insertamos cada una de las celdas/columnas del registro
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);
        var cell7 = row.insertCell(6);
        var cell8 = row.insertCell(7);
        var cell9 = row.insertCell(8);
        
        
        //Agregamos la informacion a cada una de las columnas del registro
        cell1.innerHTML = Auto.id;
        cell2.innerHTML = Auto.Marca; 
        cell3.innerHTML = Auto.Modelo;
        cell4.innerHTML = Auto.Tipo;
        cell5.innerHTML = Auto.Cilindros; 
        cell6.innerHTML = Auto.Puertas;
        cell7.innerHTML = Auto.Propietario;  
        cell8.innerHTML = `<button type="button" class="btn btn-danger" onClick="deleteR(${Auto.id})">Eliminar</button>`;
        cell9.innerHTML = '<button type="button" class="btn btn-success" onClick="seekR('+Auto.id+')">Modificar</button>';
       
    }
}

function deleteR(Auto){
    firebase.database().ref('Autos/' + Auto).set(null).then(() => {
      read();
    }).then(()=>{
       swal("Listo!", "Eliminado correctamente", "success");
    });
}

function seekR(id){
    var ref = firebase.database().ref('Autos/' + id);
    ref.on('value', function(snapshot) {
      updateR(snapshot.val());
    });
}

function updateR(Auto){
    if(Auto!=null)
    {
        document.getElementById("Input1").value=Auto.id;
        document.getElementById("Input1").disabled = true;
        document.getElementById("Input2").value=Auto.Marca;
        document.getElementById("Input3").value=Auto.Modelo;
        document.getElementById("Input4").value=Auto.Tipo;
        document.getElementById("Input5").value=Auto.Cilindros;
        document.getElementById("Input6").value=Auto.Puertas;
        document.getElementById("Input7").value=Auto.Propietario;
    }
}


//Para consulta de Tipo
function readQ(){
    document.getElementById("Table2").innerHTML='';
    var c = document.getElementById("Input8").value;

    var ref = firebase.database().ref("Autos");
    ref.orderByChild("Tipo").equalTo(c).on("child_added", function(snapshot) {
        printRowQ(snapshot.val());
    });

}


function printRowQ(Auto){

    var table = document.getElementById("Table2"); 
    
    //creamos un nuevo elemento en la tabla en la ultima posicion
    var row = table.insertRow(-1);

    //Insertamos cada una de las celdas/columnas del registro
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    var cell6 = row.insertCell(5);
    var cell7 = row.insertCell(6);
  
    
    //Agregamos la informacion a cada una de las columnas del registro
    cell1.innerHTML = Auto.id;
    cell2.innerHTML = Auto.Marca; 
    cell3.innerHTML = Auto.Modelo;
    cell4.innerHTML = Auto.Tipo; 
    cell5.innerHTML = Auto.Cilindros; 
    cell6.innerHTML = Auto.Puertas;
    cell7.innerHTML = Auto.Propietario;
   
}