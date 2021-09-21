  //////////////////////////////////////////////////////
  //////////////ARMADO DE ESTRUCTURA////////////////////
  //////////////////////////////////////////////////////
  let main = document.querySelector("main");

  let div1 = document.createElement("div");
  div1.setAttribute("id", "divTitulo")
  let h1 = document.createElement("h1");
  h1.setAttribute("id", "titulo");


  let p1 = document.createElement("p")
  p1.textContent = "EXPENSES CALCULATOR";
  p1.setAttribute("id", "parrafoTitulo");

  //Estructuramos los elementos
  div1.appendChild(h1);
  h1.appendChild(p1);

  //Lo añadimos al selector del DOM
  main.appendChild(div1);
  main.insertBefore(div1, div2);




  //////////////////////////////////////////////////////
  //////////////////ENTIDAD/////////////////////////////
  //////////////////////////////////////////////////////

  class Usuario {
    constructor(nombre, edad, provincia, mes, sueldo) {
      this.nombre = nombre;
      this.edad = edad;
      this.provincia = provincia;
      this.mes = mes;
      this.sueldo = sueldo;
    }
  }

  //////////////////////////////////////////////////////
  /////// VARIABLES / CONSTANTES / SELECTORES  /////////
  //////////////////////////////////////////////////////

  let listaUsuarios = [];
  let listaGastos = [];
  let listaFinal = [];
  let listaCantidad = [];
  const provincias = [];
  const meses = [{
      m: 'Enero'
    }, {
      m: 'Febrero'
    }, {
      m: 'Marzo'
    }, {
      m: 'Abril'
    }, {
      m: 'Mayo'
    },
    {
      m: 'Junio'
    },
    {
      m: 'Julio'
    },
    {
      m: 'Agosto'
    },
    {
      m: 'Septiembre'
    },
    {
      m: 'Octubre'
    },
    {
      m: 'Noviembre'
    },
    {
      m: 'Diciembre'
    }
  ]


  let edad = Number(document.querySelector("#edad").disabled = true);
  let provincia = document.querySelector("#provincia").disabled = true;
  let mes = document.querySelector("#mes").disabled = true;
  let sueldo = Number(document.querySelector("#sueldo").disabled = true);
  let check = document.querySelector("#check").disabled = true;
  let cantidad = 0;

  let boton1 = document.querySelector("#boton1").disabled = true;
  let boton2 = document.querySelector("#boton2");
  let boton3 = document.querySelector("#boton3");
  let boton4 = document.querySelector("#boton4");
  let form = document.querySelector("#form");
  let div3 = document.querySelector("#div3");
  let divCant = document.querySelector("#divCant");

  //API Provincias/Ciudad
  const url = "https://apis.datos.gob.ar/georef/api/provincias";


  //////////////////////////////////////////////////////
  ///////////////////   FUNCIONES  /////////////////////
  //////////////////////////////////////////////////////

  //Agregamos info de API en array que estará en el select de provincias

  $.get(url, (respuesta, estado) => {

    if (estado === "success") {
      let provincias = [];
      respuesta.provincias.forEach(e => {

        provincias.push(e.nombre);

      })

      let provOrd = provincias.sort();

      provOrd.forEach(e => {

        let optionProv = document.createElement("option");
        optionProv.setAttribute("value", `${e}`);
        optionProv.textContent = `${e}`;
        document.querySelector("#provincia").appendChild(optionProv);

      })

    }

  });

  //Agregamos dinámicamente los meses del array en el select

  meses.forEach(e => {
    let optionMes = document.createElement("option");
    optionMes.setAttribute("value", `${e.m}`);
    optionMes.textContent = `${e.m}`;
    document.querySelector("#mes").appendChild(optionMes);
  });


  // Función para calcular sueldo neto
  function sueldoNeto() {
    let sueldo = Number(document.querySelector("#sueldo").value);
    let neto = Number(sueldo - (sueldo * 0.17));
    sueldo = neto;
    let mes = document.querySelector("#mes").value;
    if (mes === "Junio") {
      let bonus = sueldo + (sueldo * 0.5);
      sueldo = bonus;
      return sueldo;
    } else if (mes === "Diciembre") {
      let bonus = sueldo + (sueldo * 0.5);
      sueldo = bonus;
      return sueldo;
    } else {
      return sueldo;
    }
  }


  // Función para saber cuando cobra aguinaldo
  function aguinaldo() {
    let dataToPrint = JSON.parse(localStorage.getItem("users"));
    let ultimoUser = dataToPrint.pop();
    let aguinaldo = "";
    switch (ultimoUser.mes) {
      case "Enero":
      case "Julio":
        aguinaldo = 'faltan 5 meses para cobrar el aguinaldo';
        break;
      case "Febrero":
      case "Agosto":
        aguinaldo = 'faltan 4 meses para cobrar el aguinaldo';
        break;
      case "Marzo":
      case "Septiembre":
        aguinaldo = 'faltan 3 meses para cobrar el aguinaldo';
        break;
      case "Abril":
      case "Octubre":
        aguinaldo = 'faltan 2 meses para cobrar el aguinaldo';
        break;
      case "Mayo":
      case "Noviembre":
        aguinaldo = 'el mes que viene se cobrará el aguinaldo';
        break;
      case "Junio":
      case "Diciembre":
        aguinaldo = 'está incluido el aguinaldo';
        break;
    }
    return aguinaldo;
  }

  // Función que guarda datos del form en Storage
  const guardaDatos = (e) => {
    e.preventDefault()


    let nombre = document.querySelector("#nombre").value;
    let edad = Number(document.querySelector("#edad").value);
    let provincia = document.querySelector("#provincia").value;
    let mes = document.querySelector("#mes").value;

    if (JSON.parse(localStorage.getItem("users") != null)) {
      listaUsuarios = JSON.parse(localStorage.getItem("users"));
      let user = new Usuario(nombre, edad, provincia, mes, sueldoNeto());
      listaUsuarios.push(user);
      localStorage.setItem("users", JSON.stringify(listaUsuarios));

    } else {
      let user = new Usuario(nombre, edad, provincia, mes, sueldoNeto());
      listaUsuarios.push(user);
      localStorage.setItem("users", JSON.stringify(listaUsuarios));
    }
  }

  // Función que muestra los datos ingresados en el form
  const printData = () => {

    let dataToPrint = JSON.parse(localStorage.getItem("users"));

    let ultimoUser = dataToPrint.pop();

    let div1 = document.createElement("div");
    div1.setAttribute("id", "divUsuario");

    let h2 = document.createElement("h2");
    h2.setAttribute("id", "tituloUsuario");

    let p2 = document.createElement("p");
    p2.textContent = `${ultimoUser.nombre}, tu sueldo neto es de $${ultimoUser.sueldo.toFixed(2)} y ` + aguinaldo() + ".";
    p2.setAttribute("id", "parrafoUno");

    //Estructuramos los elementos
    div1.appendChild(h2);
    h2.appendChild(p2);

    //Lo añadimos al selector del DOM
    main.appendChild(div1);
    main.insertBefore(div1, boton2);

  };


  // Funciones que desbloquean próximo input/botón
  const activaEdad = () => {
    document.querySelector("#edad").disabled = false;
  }

  const activaProvincia = () => {
    document.querySelector("#provincia").disabled = false;
  }

  const activaMes = () => {
    document.querySelector("#mes").disabled = false;
  }

  const activaSueldo = () => {
    document.querySelector("#sueldo").disabled = false;
  }

  const activaCheck = () => {
    document.querySelector("#check").disabled = false;
  };
  const activaBoton1 = () => {
    document.querySelector("#boton1").disabled = false;
    document.querySelector("#boton1").setAttribute("style", "opacity:1");
  };




  // Funciones que desactiva botones
  const desactivarBoton = () => {
    boton1.disabled = true;
  }


  // Función que elimina el formulario anterior
  const desapareceForm = () => {
    form.setAttribute("style", "display:none");
    div2.setAttribute("style", "background-color:#0D0D0D");
  };

  // Función que activa botón de ingreso de gastos
  const activaBoton2 = () => {

    $("#form").on("submit", () => {
      $("#boton2").fadeIn(1000);
      setTimeout(() => {
          $("#boton2").attr("style", "display:block");
        }

      )
    });

  }

  // Función que desactiva botón de ingreso de gastos
  const desactivaBoton2 = () => {
    setTimeout(() =>
      $("#boton2").on("click", () => {
        $("#boton2").attr("style", "display:none");

      }), 1000);
  }

  // Función que activa div de cantidad 
  const activaDiv = () => {

    $("#boton2").on("click", () => {
      $("#divCant").fadeIn(2000);
      setTimeout(() => {
        $("#divCant").attr("style", "display:block");
      }, 10);

    });
  }

  // Función que activa ingreso de gastos y guarda los input en array
  const ingresaGastos = () => {

    let h5 = document.createElement("h5");

    let pCant = document.createElement("p");
    pCant.setAttribute("id", "pCant");
    pCant.textContent = "¿Cuántos gastos vas a ingresar?";

    let divUs = document.querySelector("#divUsuario");
    divUs.setAttribute("style", "display:none")

    let inputCant = document.createElement("input");
    inputCant.setAttribute("type", "text");
    inputCant.setAttribute("id", "inputCant");
    inputCant.setAttribute("placeholder", "Ingresá aquí la cantidad");
    inputCant.setAttribute("autocomplete", "off");

    boton4.setAttribute("style", "display:block");

    main.appendChild(divCant);
    divCant.appendChild(h5);
    divCant.appendChild(inputCant);
    h5.appendChild(pCant);

    divCant.insertBefore(inputCant, boton4);
    divCant.insertBefore(h5, inputCant);


  }

  const imprimeGastos = () => {

    divCant.setAttribute("style", "display:none");

    let cantidad = inputCant.value;

    if (cantidad > 20) {
      alert("Se pueden ingresar hasta 20 gastos. Por favor inténtelo de nuevo.")
      divCant.setAttribute("style", "display:block");
    } else if (cantidad > 0 && cantidad <= 20) {
      boton2.setAttribute("style", "display:none");
      let divNeto = document.querySelector("#divUsuario")
      divNeto.setAttribute("style", "display:none")

      let div3 = document.querySelector("#div3");
      div3.setAttribute("id", "divGastos");
      div3.setAttribute("style", "display:block")

      let h3 = document.createElement("h3");
      h3.setAttribute("id", "tituloGastos");
      h3.textContent = 'Gastos';

      main.appendChild(div3);
      div3.appendChild(h3);


      for (i = 0; i < cantidad; i++) {

        listaGastos.push(i + 1);
        sessionStorage.setItem("gastos", JSON.stringify(listaGastos));

      }

      let imprimirGastos = JSON.parse(sessionStorage.getItem("gastos"));

      imprimirGastos.forEach(e => {

        let labelGasto = document.createElement("label");
        labelGasto.setAttribute("id", "labelGasto");
        labelGasto.setAttribute("for", "gasto1");
        labelGasto.textContent = `Gasto ${e}`;

        let inputNombre = document.createElement("input");
        inputNombre.setAttribute("class", `inputNombre${e}`);
        inputNombre.setAttribute("type", "text");
        inputNombre.setAttribute("name", "gasto1");
        inputNombre.setAttribute("placeholder", "Nombre de gasto");
        inputNombre.setAttribute("autocomplete", "off");

        let inputGasto = document.createElement("input");
        inputGasto.setAttribute("id", `inputGasto${e}`);
        inputGasto.setAttribute("type", "text");
        inputGasto.setAttribute("name", "gasto2");
        inputGasto.setAttribute("placeholder", "Valor de gasto");
        inputGasto.setAttribute("autocomplete", "off");
        listaFinal.push(inputGasto);

        div3.appendChild(labelGasto);
        div3.appendChild(inputNombre);
        div3.appendChild(inputGasto);
      });

      boton3.setAttribute("style", "display:block");
      div3.appendChild(boton3);

    } else if (cantidad === '0') {
      let divUs = document.querySelector("#divUsuario");
      divUs.setAttribute("style", "display:flex")
    } else {
      alert("Revise el dato ingresado.")
      divCant.setAttribute("style", "display:block");
    }

  }


  // Función que toma los valores de los gastos e imprime resultado final
  const calculoFinal = () => {

    let suma = 0;
    let porcentaje = 0;


    listaFinal.forEach(e => {
      suma += Number(e.value);
    });

    let restante = sueldoNeto() - suma.toFixed(2);
    porcentaje = (suma / sueldoNeto()) * 100;

    let div4 = document.querySelector("#div4");
    div4.setAttribute("style", "display:block");

    let h4 = document.createElement("h4");
    h4.setAttribute("id", "h4");

    let p3 = document.createElement("p");
    p3.setAttribute("id", "p3");

    //Estructuramos los elementos
    div4.appendChild(h4);
    h4.appendChild(p3);

    //Lo añadimos al selector del DOM
    main.appendChild(div4);

    if (sueldoNeto() - suma > 0) {
      p3.textContent = `Te restarán $` + (restante.toFixed(2)) + ". " + "Has utilizado un " + porcentaje.toFixed(2) + "% de tu sueldo.";
      div3.setAttribute("style", "display:none");

    } else {
      p3.textContent = `No te restará dinero y te faltarán $` + (restante - restante * 2).toFixed(2) + ". " + "Has utilizado más de un " + (porcentaje - 100).toFixed(2) + "% de tu sueldo.";
      div3.setAttribute("style", "display:none");
    }
  }





  //////////////////////////////////////////////////////
  ///////////////////   EVENTOS    /////////////////////
  //////////////////////////////////////////////////////
  form.addEventListener("submit", guardaDatos);
  form.addEventListener("submit", printData);
  form.addEventListener("submit", desactivarBoton);
  form.addEventListener("submit", desapareceForm);
  activaBoton2();
  desactivaBoton2();
  activaDiv();
  boton2.addEventListener("click", ingresaGastos);
  boton4.addEventListener("click", imprimeGastos);
  boton3.addEventListener("click", calculoFinal);