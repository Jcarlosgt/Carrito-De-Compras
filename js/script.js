/*Conexion a base de datos  */
let db = openDatabase('dbStore', '1.0', 'Base de datos tienda en linea ', 2 * 1024 * 1024);

/*Validando si se realizo la conexion con exito*/
if (!db) {
    alert("Error, no se ha podido conectarse con la base de datos");
} else {
    console.log("Conexion a base de datos exitosa");
}

/* Funcion para realizar transacciones a la base de datos  */
let dbTransaction = (query) => {
    db.transaction((tran) => {
        tran.executeSql(query)
    }, (transaccion, error) => {
        console.log('Error:' + error.message + 'codigo:' + error.code);
    }, () => {
        console.log('Transaccion Exitosa');
    });
};

/* Funcion para insertar datos a la tabla de productos  */
let inProducto = (nombre, precio, cantidad) => {
    dbTransaction(`INSERT INTO productos(id,nombre,precio,cantidad) VALUES(null,'${nombre}',${precio},${cantidad})`);
}

let outProducto = () => {
    dbTransaction('SELECT * FROM productos');
}

/*Creación de tabla productos */
dbTransaction("CREATE TABLE IF NOT EXISTS productos(id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL ,nombre TEXT, precio DOUBLE, cantidad INTEGER);");


let btn_mas = document.getElementsByClassName("btn_up"),
    btn_menos = document.getElementsByClassName("btn_down"),
    txt_num = document.getElementsByClassName('numero');

let btn_d = document.getElementsByClassName("btn-d"),
    btn_l = document.getElementsByClassName("btn-l"),
    num_l = document.getElementsByClassName("num-l"),
    num_d = document.getElementsByClassName("num-d");


let producto = document.getElementsByClassName("producto"),
    nombre = "",
    precio = "",
    cantidad = 0;

let carrito = document.getElementById("carrito");
let contItem = document.getElementById("items");
let contador = 0;


for (let r = 0; r < btn_mas.length; r++) {
    btn_mas[r].addEventListener('click', () => {
        txt_num[r].value++;
    });
    btn_menos[r].addEventListener('click', () => {
        txt_num[r].value--;
        if (txt_num[r].value < 0) {
            txt_num[r].value = 0;
        }
    });
}

for (let k = 0; k < btn_l.length; k++) {
    btn_l[k].addEventListener('click', () => {
        num_l[k].value++;
    });
    btn_d[k].addEventListener('click', () => {
        num_d[k].value++;
    });
}


/*Elementos draggeables */

for (let i = 0; i < producto.length; i++) {
    /*Evento encargado de ejecutarce cuando el elemento inicie a 
    ser arrastrado */
    producto[i].addEventListener('dragstart', (e) => {
        producto[i].style.border = "2px dashed red";
        let dateNombre = producto[i].getElementsByClassName("nombre")[0].innerHTML;
        let datePrecio = producto[i].getElementsByClassName("precio")[0].innerHTML;
        let dateCantidad = producto[i].getElementsByClassName("numero")[0].value;
        parseInt(dateCantidad);
        nombre = dateNombre;
        precio = datePrecio;
        cantidad = dateCantidad;

    });
    /*Evento encargado de ejecutarce cuando el elemento finalice de 
    ser arrastrado */
    producto[i].addEventListener('dragend', (e) => {
        producto[i].style.border = "2px solid #c2c2c2";
    });
}
/*Elemento contenedor  */
/*Evento que se ejecuta cuando el elemento esta sobre el  */
carrito.addEventListener("dragover", (e) => {
    e.preventDefault();
    carrito.classList.add("over");
});

/*Evento que se ejecuta cuando el elemento fue soltado o 
deseleccionado */
carrito.addEventListener("drop", (e) => {
    e.preventDefault();
    contador += 1;
    carrito.classList.remove("over");
    contItem.innerHTML = contador;
    contItem.style.display = "block";

    inProducto(nombre, precio, cantidad);
    nombre = "";
    precio = "";
    cantidad = 0;

});

/*Evento que se ejecuta cuando ya no esta dentro del elemento 
contenedor */
carrito.addEventListener("dragleave", (e) => {
    e.preventDefault();
    carrito.classList.remove("over");

});