let db = openDatabase('dbStore', '1.0', 'Base de datos tienda en linea ', 2 * 1024 * 1024);

/*Validando si se realizo la conexion con exito*/
if (!db) {
    alert("Error, no se ha podido conectarse con la base de datos");
} else {
    console.log("Conexion a base de datos exitosa");
}

let total = 0;
let resultados = 0;

db.transaction(function(tran) {

    tran.executeSql('SELECT * FROM productos', [], function(tran, data) {
        resultados = data.rows.length;
        let contenedor = document.getElementById("contenido");
        let tabla = document.createElement("table");
        let thead = document.createElement("thead"),
            thEliminar = document.createElement("th"),
            thId = document.createElement("th"),
            thNombre = document.createElement("th"),
            thPrecio = document.createElement("th"),
            thCantidad = document.createElement("th"),
            thSubTotal = document.createElement("th");

        thEliminar.appendChild(document.createTextNode("Eliminar"));
        thId.appendChild(document.createTextNode("ID"));
        thNombre.appendChild(document.createTextNode("Nombre"));
        thPrecio.appendChild(document.createTextNode("Precio"));
        thCantidad.appendChild(document.createTextNode("Cantidad"));
        thSubTotal.appendChild(document.createTextNode("Sub Total"));

        thead.appendChild(thEliminar);
        thead.appendChild(thId);
        thead.appendChild(thNombre);
        thead.appendChild(thPrecio);
        thead.appendChild(thCantidad);
        thead.appendChild(thSubTotal);

        let tbody = document.createElement("tbody");

        for (i = 0; i < data.rows.length; i++) {
            let hilera = document.createElement("tr");
            for (let j = 0; j < 1; j++) {
                /* CREANDO ELEMENTOS  */
                let tdEliminar = document.createElement("td"),
                    tdId = document.createElement("td"),
                    tdNombre = document.createElement("td"),
                    tdPrecio = document.createElement("td"),
                    tdCantidad = document.createElement("td"),
                    tdSubTotal = document.createElement("td");

                /*Obteninedo el valor del precio y la cantidad para calcular el total */
                let price = data.rows[i].precio;
                let count = data.rows[i].cantidad;
                total += price * count;

                /* CREANDO NODOS  */
                let txtEliminar = document.createElement("input"),
                    id = document.createTextNode(data.rows[i].id),
                    nombre = document.createTextNode(data.rows[i].nombre),
                    precio = document.createTextNode(data.rows[i].precio),
                    txtCantidad = document.createElement("input"),
                    subTotal = document.createTextNode(price * count);


                /*Agregnado los nodos a los contenedores padres */
                txtEliminar.setAttribute("type", "checkbox");
                txtEliminar.setAttribute("class", "check");
                tdEliminar.appendChild(txtEliminar);
                tdId.setAttribute("class", "td");
                tdId.appendChild(id);
                tdNombre.appendChild(nombre);
                tdPrecio.appendChild(precio);
                txtCantidad.setAttribute("type", "number");
                txtCantidad.setAttribute("id", data.rows[i].id);
                txtCantidad.value = count;
                tdCantidad.appendChild(txtCantidad);
                tdSubTotal.appendChild(subTotal);

                hilera.appendChild(tdEliminar);
                hilera.appendChild(tdId);
                hilera.appendChild(tdNombre);
                hilera.appendChild(tdPrecio);
                hilera.appendChild(tdCantidad);
                hilera.appendChild(tdSubTotal);
            }
            tbody.appendChild(hilera);
        }
        tabla.appendChild(thead);
        tabla.appendChild(tbody);
        contenedor.appendChild(tabla);


        let divTotal = document.createElement("div");
        divTotal.classList.add("total");
        let hTotal = document.createElement("h2");
        let pTotal = document.createElement("p");


        hTotal.appendChild(document.createTextNode("Total:"));
        pTotal.appendChild(document.createTextNode(" " + total));
        hTotal.style.display = "inline";
        pTotal.style.display = "inline";

        divTotal.appendChild(hTotal);
        divTotal.appendChild(pTotal);

        contenedor.appendChild(divTotal);
    });
});

let actualizar = () => {
    let id = document.getElementsByClassName("td");
    let check = document.getElementsByClassName("check");
    db.transaction((tran) => {
        for (let i = 1; i <= resultados; i++) {
            tran.executeSql(`UPDATE productos SET cantidad = '${document.getElementById(id[i - 1].innerHTML).value}' WHERE id = '${id[i - 1].innerHTML}'`);
            if (check[i - 1].checked) {
                tran.executeSql(`DELETE FROM productos WHERE id = ${id[i - 1].innerHTML}`);
            }
        }
    });
}

let confirmar = () => {
    alert("Su Compra ha sido Exitosa");
    db.transaction((tran) => {
        tran.executeSql("DROP TABLE productos");
    })
}