/*--------------------Empezar función al dar enter---------------------------*/
//Rastrea el input donde se ingresó el nombre
var input = document.getElementById("pokeName");

//Ejecuta un evento cuando se suelta una tecla
input.addEventListener("keyup", function(event) {
    //Si la tecla es "Enter" entonces...
  if (event.keyCode === 13) {
    //Cancela la accion por default
   event.preventDefault();
   //Ejecuta la función que esta en el boton de busqueda en el HTML
   document.getElementById("sbutton").click();
  }
});

/*---------------------------------------------------------------------------------------------------------*/
//Función para conseguir la información del pokemon ingresado
const fetchPokemon=() => {

        //asigna a la variable pokeName el valor escrito en el input pokeName de html
    const pokeName = document.getElementById("pokeName");

        //asigna a la variable el valor en pokeName pero transformado a minusculas
    let pokeInput = pokeName.value.toLowerCase();

        //asigna una variable url con la direccion de consulta de la api y el pokemon
    const url =`https://pokeapi.co/api/v2/pokemon/${pokeInput}`;

        //consulta a la pagina del servidor y obtiene una promesa
    fetch(url).then((res) => {

        

            //Si el estatus de la respuesta es distinto a 200 (encontrado), entonces
        if(res.status !=200){

                //imprime la respuesta
                //console.log(res);
                //imagen de pokemon no hallado 
            
            let none="not";

            info(none,none);

            //Reemplazo de imagenes
            pokeImage("./Resources/Images/missingno.png")
            pokeImgF=null; pokeImgS=null;
            AndereImg(pokeImgF,pokeImgS);

            //Reemplazo de datos
            printName("No encontrado");
            idfunction("???");
            Heightfunction(000);
            Weightfunction(000);
            graphicstats("10","10","10","10","10","10");

            //Reemplazo de link con más datos
            resource("none");
            
        }
        else {
            //si es encontrado (200) nos regresa la respuesta
            return res.json();
        } 

    }).then((data) => {
        //En seguida convertimos la respuesta a una data que podemos usar
        //imprime toda la data
        //console.log(data);

        //asigna variables a la info conseguida

        //Obtiene los url de los sprite necesitados-------------------------------------------------------------
        let pokeImg=data.sprites.front_default; //macho
        let pokeImgF=data.sprites.front_female;  //hembra
        let pokeImgS=data.sprites.front_shiny;  //shiny

        console.log("Url Sprite: "+pokeImg);
        console.log("Url Sprite Hembra: "+pokeImgF);

        //Si no hay imagen de hembra----------------
        if(pokeImgF == null){
            console.log("No hay imagen hembra")
        }
        console.log("Url Sprite Shiny: "+pokeImgS);

        AndereImg(pokeImgF,pokeImgS);

        //Obtiene los Tipo del pokemon, dos tipos según el caso--------------------------------------------------
        let Types=data.types;

        if (Types.length == 2){

            //Si tiene dos tipos----------------------------------
            let open1type=Types[0];                 let open2type=Types[1];
            let Firsttype=open1type.type.name;      let Secondtype=open2type.type.name;

            info(Firsttype,Secondtype);
        }
        else{
            //Si tiene un tipo----------------------------------
            let open1type=Types[0];                 
            let Firsttype=open1type.type.name; 

            info(Firsttype,"");
        }

        //Obtiene el nombre del pokemon-----------------
        let pokeName1=data.forms;
        let pokeName2=pokeName1[0].name;
        
        printName(pokeName2);

        //Obtiene su numero en la pokedex--------------
        let pokeNumber=data.id;
        
        idfunction(pokeNumber);

        //Obtiene su altura----------------------------
        let pokeHeight=data.height;
        
        Heightfunction(pokeHeight);

        //Obtiene su peso------------------------------
        let pokeWeight=data.weight;
        
        Weightfunction(pokeWeight);

        //Estadisticas base---------------------------
        let est=data.stats;
        let hp=est[0].base_stat;    let attack=est[1].base_stat;    let defense=est[2].base_stat;    let spattack=est[3].base_stat;    let spdefense=est[4].base_stat;    let speed=est[5].base_stat;

        graphicstats(hp,attack,defense,spattack,spdefense,speed);

        //Url de pagina relacionada con más datos----------------------------
        let resurl=data.species.url;
        console.log("Segunda pag. de datos: "+resurl);
  
        //llama a la funcion pokeImage con la url de la imagen llamada pokeImg----
        pokeImage(pokeImg);
        //llama a la función resource con la url con más datos---------------------
        resource(resurl);  
    })
}

/*---------------------------------------------Info extra--------------------------------------------------*/
//Aqui recopila información de la segunda página con datos
const resource = (adress)=>{

    fetch(adress).then((res) => {

        if(res.status !=200){
                console.log("No se pudo conectar")

                //Datos si no se pudo conectar o se ingresó mal---------
                Apodofunction("pokémon no se pudo encontrar");
                Entradafunction("Asegurese de haber escrito bien el nombre del pokémon");

                $habitat("Se desconoce");
                $evolution("none");
        }
        else {
            //si es encontrado (200) nos regresa la respuesta
            return res.json();
        } 

    }).then((data) => {

        //obtiene el texto de entrada de la pokedex------------------------------------------------------
        let entrada=data.flavor_text_entries;

        let i=0;
        let openEntrada=0;
        
        //Escoge la entrada en español------------------------------------------------
        while(openEntrada != "es"){

            openEntrada=entrada[i].language.name;
            key=i;
            i=i+1;   
        }
        let EntradaPoke=entrada[key].flavor_text;
        
        Entradafunction(EntradaPoke);

        //obtiene el apodo del pokemon en español------------------------------------
        let apodo=data.genera;

        let e=0;
        let openGenera=0;
        
        while(openGenera != "es"){

            openGenera=apodo[e].language.name;
            keyG=e;
            e=e+1;
            
        }
        let ApodoPoke=apodo[keyG].genus;

        Apodofunction(ApodoPoke);

        //Obtiene url para obtener el habitat----------------------------------------------------------
        
        let habitatcheck=data.habitat;
        let habitaturl=0;

        if(habitatcheck==null){
            //Respuesta si el pokémon no tiene un hábitat conocido--------------
            habitaturl="Se desconoce"
            //console.log(habitaturl);
        }
        else{
            //Dirección con la url----------------------------------------------
            habitaturl=data.habitat.url;    
        }
        
        //obtiene url para obtener la cadena evolutiva-------------------------
        let evourl=data.evolution_chain.url;

        //Llama a función para obtener habitad y cadena evolutiva
        $habitat(habitaturl);
        $evolution(evourl);
    })
}

/*---------------------------------------------Habitad----------------------------------------------------*/
//Obtiene el habitat del pokémon en español
const $habitat=(hurl)=>{
    let HabitatName="not";

    if (hurl=="Se desconoce"){
        //Si no se sabe cual es su habitat
        HabitatName=hurl;

        Habitatfunction(HabitatName);

    }
    else{
        //Si se conoce, se conecta a la url para obtener el habitat en español
        fetch(hurl).then((res)=>{
            //console.log(res);
    
            if(res.status !=200){
                    console.log("No se pudo conectar Habitat")
                
            }
            else {
                //si es encontrado (200) nos regresa la respuesta
                return res.json();
            } 
        }).then((data) => {
    
            //Obtiene el habitat en español-------------------------------------
            let namesHab=data.names;
            
            y=0;
            let openNames=0;
    
            while(openNames != "es"){
                openNames=namesHab[y].language.name;
                keyH=y;
                y=y+1;
            }
            HabitatName=namesHab[keyH].name;
            
            //Función para poner la info en el html-------------------------- 
            Habitatfunction(HabitatName);
        })
    }
}

/*---------------------------------------------Evolución--------------------------------------------------*/
//Obtiene la lista de todas las evoluciones del pokémon
const $evolution=(eurl)=>{

    //Se conecta a la cadena evolutiva
    fetch(eurl).then((res)=>{
        console.log(res);

        if(res.status !=200){
                console.log("No se pudo conectar Cadena")

                //Si no se conecta o no tiene evolución, manda datos falsos
                let fakeMembers={0:"none"};
                let fakeMembers2={0:"none"};

                UrlEvolImage("none",fakeMembers,fakeMembers2);       
        }
        else {
            //si es encontrado (200) nos regresa la respuesta
            return res.json();
        } 
    }).then((data) => {

        //Forma original del pokémon------------------------------------------------------------------------------------------
        let raiz=data.chain.species.name;
        console.log("Primer eslabón de la cadena evolutiva: "+raiz);

        //Primera evolución del Pokémon. Enlista todas las variaciones, ejemplo Eevee o Slowpoke, con más de 1 evolucion-----
        let evolvesTo=data.chain.evolves_to;

        let cVariacion=evolvesTo.length;//Numero de evoluciones Primer Nivel------------

        console.log("Número de primeras evoluciones: "+cVariacion);
    
        let a=0;
        //Objetos que tendrán todas las evoluciones recabadas----------------- 
        let membersFirstEvol={0:"none"};
        let membersSecondEvol={0:"none"};
 
        //Rastrea todas las variaciones de evolucion en primer nivel--------------------------------------------------
        while(a < cVariacion){
            let openEvol=evolvesTo[a].species.name;
            membersFirstEvol[a]=openEvol;

            //Número de evoluciones en segundo nivel----------------------
            let ConfirmEvol=evolvesTo[a].evolves_to.length;
            console.log("Numero de evoluciones Segundo Nivel: "+ConfirmEvol);
            
            b=0;
            //Rastrea todas las variaciones de evolucion en segundo nivel--------------------------------------------------
            while(b < ConfirmEvol){
                let openSecondEvol=evolvesTo[a].evolves_to;
                let openSecondEvol2=openSecondEvol[b].species.name;
                membersSecondEvol[b]=openSecondEvol2;

                b=b+1;
            }
            a=a+1;
        }
        console.log("Evoluciones Primer nivel: ")//---------------------------------------------------------------------
        console.log(membersFirstEvol);

        console.log("Evoluciones Segundo nivel: ")//--------------------------------------------------------------------
        console.log(membersSecondEvol);

        //Función para obtener el url de las evoluciones----------
        UrlEvolImage(raiz,membersFirstEvol,membersSecondEvol);
    })
}

/*---------------------------------------------Imagen del poke-----------------------------------------*/
//Consigue la imagen del pokémon ingresado
const pokeImage=(url)=>{
    //Busca el elemento en el html con el id pokeImg
    const pokeImg =document.getElementById("pokeImg");
    
    /*cambia el src del elemento del id pokeImg con el url de la imagen,
     de forma que cambia la imagen anterior */
     console.log("Url de imagen"+url);
    pokeImg.src=url;  
}

/*--------------------------------------------Url de las evoluciones-------------------------------*/
//Obtiene el url de todas las evoluciones del pokémon ingresado
const UrlEvolImage=(baby,first,second)=>{
    let FirstQuantity=Object.keys(first).length;
    let SecondQuantity=Object.keys(second).length;

    console.log(FirstQuantity, SecondQuantity);

    //Url del pokémon base, el más pequeño, estado con que nace---------------
    raizurl=`https://pokeapi.co/api/v2/pokemon/${baby}`;
    console.log(raizurl);

    q=0;
    //Objeto con los urls de las primeras evoluciones------------------------
    let FQurl={};

    //Primeras evoluciones---------------------------------------------------
    if (FirstQuantity==1 && first[0]=="none"){
        //Si el pokémon no tiene una primera evolución
        console.log("No tiene primera evolucion")
        q=q+1;
    }

    while(q < FirstQuantity){
        //Url de pokémon, lo anexa a la lista
        FQurl[q] =`https://pokeapi.co/api/v2/pokemon/${first[q]}`;
        //console.log(FQurl[q]);
        q=q+1;
    }

    p=0;
    //Objetos con los urls de las segundas evoluciones---------------------
    let SQurl={};

    if (SecondQuantity==1 && second[0]=="none"){
        //Si el pokémon no tiene una segunda evolución
        console.log("No tiene segunda evolucion")
        p=p+1;
    }

    while(p < SecondQuantity){
        //Url de pokémon, lo anexa a la lista---------------------------
        SQurl[p]=`https://pokeapi.co/api/v2/pokemon/${second[p]}`;
        //console.log(SQurl[p]);
        p=p+1;
    }
    //Llama a la función para obtener la dirección de las imagenes de las evoluciones
    ImgAlle(raizurl,FQurl,SQurl);
}

/*------------------------------------------Img Url y name de las de las evoluciones----------------------------------*/
//Consigue la dirección y el nombre de todas las evoluciones del pokémon ingresado
const ImgAlle=(a,b,c)=>{

    //Se conecta al url del pokémon base
    fetch(a).then((res) => {

        //console.log(res);

            //Si el estatus de la respuesta es distinto a 200 (encontrado), entonces
        if(res.status !=200){
            console.log("No se conectó con primer eslabon de cadena");

            //Si no se conecta, lanza imagen con cruz-----------------------
            let fakeUrlImg="./Resources/icons/cross.png";
            let fakeName="";
            
            PrintFstStage(fakeName,fakeUrlImg,"none")  
        }
        else {
            //si es encontrado (200) nos regresa la respuesta
            return res.json();
        } 
    }).then((data) => {
        //Almacena la dirección de la imagen del pokémon base----------
        let pokeEvolBaby=data.sprites.front_default;
        //Obtiene el nombre del pokémon base----------------------------
        let pokeEvolBabyName=data.species.name;
        //Función que imprime la imagén y nombre del pokémon base------
        PrintFstStage(pokeEvolBabyName,pokeEvolBaby,a);
    })

    let gateB=Object.keys(b).length;
    console.log("numero de datos: "+gateB);

    //------------Dirección de las primeras evolucion--------------------
    if (gateB > 0){ 
        bi=0;
        //Objetos con los nombres y dirección de las primeras evoluciones 
        let imgFsturl={};
        let imgFsturlName={};

        let gateE=gateB-1;

        //Conecta al url de cada pokémon--------------------------------
        while(bi<gateB){
            
            let Bi=b[bi];
            let qi=bi;
            console.log("Primero: "+bi);
            console.log(Bi)

            fetch(Bi).then((res) => {

                //console.log(res);
        
                    //Si el estatus de la respuesta es distinto a 200 (encontrado), entonces
                if(res.status !=200){
        
                    console.log("No se conectó con segundo eslabon de cadena"); 
                }
                else {
                    //si es encontrado (200) nos regresa la respuesta
                    return res.json();  
                } 
                }).then((data) => {
                    
                    //Almacena la dirección y nombre de la evolución----------------
                    imgFsturl[qi]=data.sprites.front_default;
                    imgFsturlName[qi]=data.species.name;

                    //Cuando se cubren todas las primeras evoluciones, llama a la función
                    if(qi==gateE){
                        console.log("Entro aqui con ");
                        console.log(imgFsturlName);

                        //Función que imprime el nombre y agrega el src de la imagen------
                        PrintSecondStage(imgFsturlName,imgFsturl);
                    }  
                })
                bi=bi+1;
        }
    
    }else if(gateB==0){
        //Si no tiene evolucion, entonces imprime las cruces y dato falsos-----------
        FakeimgFsturl={0:"./Resources/icons/cross.png"};
        FakeimgFsturlName={0:""};

        PrintSecondStage(FakeimgFsturlName,FakeimgFsturl);  
    }

    //Numero de segundas evoluciones------------------------------------------------
    let gateC=Object.keys(c).length;
    console.log("numero de datos: "+gateC);

    //----------------------Segunda evolucion--------------------
    if (gateC > 0){ 
        ci=0;

        //Objetos que almacena img y nombres de las segundas evoluciones-----------
        let imgSndurl={};
        let imgSndurlName={};
        let gateD=gateC-1;

        //Conecta con el url de cada segunda evolución----------------------------
        while(ci<gateC){
            
            let Ci=c[ci];
            let ri=ci;
            console.log("Primero: "+ci);
            console.log(Ci)

            fetch(Ci).then((res) => {

        
                //Si el estatus de la respuesta es distinto a 200 (encontrado), entonces
                if(res.status !=200){
        
                    console.log("No se conectó con segundo eslabon de cadena");  
                }
                else {
                    //si es encontrado (200) nos regresa la respuesta
                    return res.json();    
                } 
                }).then((data) => {

                    //Alamacena la dirección y nombre de la segunda evolución
                    imgSndurl[ri]=data.sprites.front_default;
                    imgSndurlName[ri]=data.species.name;

                    //Cuando se cubren todas las evoluciones, llama la sig función
                    if(ri==gateD){
                        console.log("Entro aqui con ");
                        console.log(imgSndurlName);

                        //Función que imprime el nombre y cambie el src de la imagen
                        PrintLastStage(imgSndurlName,imgSndurl);
                    }   
                })
                ci=ci+1;
        }
    
    }else if(gateC==0){
        //Si no tiene segunda evolucion, pone cruz y datos falsos--------------------
        FakeimgSndurl={0:"./Resources/icons/cross.png"};
        FakeimgSndurlName={0:""};

        //Llama a la función que imprime los datos
        PrintLastStage(FakeimgSndurlName,FakeimgSndurl);   
    }
}

/*----------------------------Imagenes hembra y shiny----------------------------------*/
//Obtiene las imagenes de la hembra y el shiny del pokémon
const AndereImg=(h,s)=>{

    //Rastrea donde colocar las imagenes-------------------------------------
    const $LastCont=document.getElementById("imgH")
    const $Cont=document.getElementById("imgS")

    //Borra las imagenes anteriores-----------------------------------------
    while($LastCont.firstChild){
        $LastCont.removeChild($LastCont.firstChild);
    }
    while($Cont.firstChild){
        $Cont.removeChild($Cont.firstChild);
    }

    if(h==null){
        //En caso de que no tenga diferencias en las hembras---------------
        //Inserta una cruz
        const imageP=document.createElement("img");
        imageP.setAttribute("width","40px");
        imageP.setAttribute("id","pokeImgFemale");
        imageP.setAttribute("src",`./Resources/icons/cross.png`);

        //Crea span vacio para cubrir la vacante----------------------------
        const titleFem=document.createElement("span");
        titleFem.innerText=``;
        console.log(titleFem);
    
        //Rastrea el contenedor--------------------------------------------
        const $contenedorP = document.getElementById("imgH");

        //Inserta la imagen y el texto creado
        $contenedorP.prepend(titleFem);
        $contenedorP.prepend(imageP);

    }else{
        //Crea la imagen de la hembra-----------------------------
        const imageP=document.createElement("img");
        imageP.setAttribute("width","70px");
        imageP.setAttribute("id","pokeImgFemale");
        imageP.setAttribute("src",`${h}`);

        //Crea el texto "hembra"----------------------------------
        const titleFem=document.createElement("span");
        titleFem.innerText=`Hembra`;
        console.log(titleFem);
        
        //Rastrea el contenedor-----------------------------------
        const $contenedorP = document.getElementById("imgH");

        //Inserta la imagen y texto creado
        $contenedorP.prepend(titleFem);
        $contenedorP.prepend(imageP);
    }

    if(s==null){
        //Si no tiene shiny, inserta una cruz--------------------
        const imageS=document.createElement("img");
        imageS.setAttribute("width","40px");
        imageS.setAttribute("id","pokeImgShiny");
        imageS.setAttribute("src",`./Resources/icons/cross.png`);
    
        //Crea un span vacio para llenar la vacante-------------
        const titleShin=document.createElement("span");
        titleShin.innerText=``;
        console.log(titleShin);

        //Rastrea el contenedor--------------------------------
        const $contenedorS = document.getElementById("imgS");
       
        //Inserta la imagen y el texto creado------------------
        $contenedorS.prepend(titleShin);
        $contenedorS.prepend(imageS);

    }else{
        //Crea la imagen del pokémon shiny--------------------
        const imageS=document.createElement("img");
        imageS.setAttribute("width","70px");
        imageS.setAttribute("id","pokeImgShiny");
        imageS.setAttribute("src",`${s}`);
    
        //Crea un texto con palabra "Shiny"------------------
        const titleShin=document.createElement("span");
        titleShin.innerText=`Shiny`;
        console.log(titleShin);

        //Rastrea el contenedor------------------------------
        const $contenedorS = document.getElementById("imgS");
        
        //Inserta la imagen y el texto creado----------------
        $contenedorS.prepend(titleShin);
        $contenedorS.prepend(imageS);
    }
}

/*-------------------------Impresion imagenes cadena evolutiva------------------------*/
//Muestra las imagenes de todas las evoluciones
const PrintFstStage=(a,b,c)=>{
    //Rastrea el contenedor del pokémon base--------------------
    const $LastCont=document.getElementById("babyStage")

    //Remueve toda la información anterior--------------------
    while($LastCont.firstChild){
        $LastCont.removeChild($LastCont.firstChild);
    }
    //Crea un div que contiene la imagen y el nombre del pokémon-------
    const imageP=document.createElement("div");
    imageP.setAttribute("class","card");
    
    //Crea la imagen del pokémon---------------------------------------
    imageP.innerHTML=`<img src="${b}" width=150% alt="Pokemon"></img> <p class="nameE">${a}</p>`;

    //Rastrea el contenedor-----------------------------------------
    const $contenedorP = document.getElementById("babyStage");
    
    //Inserta los datos al contenedor HTML
    $contenedorP.prepend(imageP);
}

const PrintLastStage=(a,b)=>{
    //Determina cuantas ultimas evoluciones tiene--------------------
    let gateA=Object.keys(a).length;

    //Rastrea el contenedor------------------------------
    const $LastCont=document.getElementById("LastStage")

    //Elimina los datos anteriores-----------------------
    while($LastCont.firstChild){
        $LastCont.removeChild($LastCont.firstChild);
    }

    i=0;

    //Crea e imprime las imagenes y nombres de todas las evoluciones
    while(i<gateA){

       //Crea el div con imagen y nombre del pokémon---------------
        const imageP=document.createElement("div");
        imageP.setAttribute("class","card");
        
        //Crea la imagen del pokémon
        imageP.innerHTML=`<img src="${b[i]}" width=120% alt="Pokemon"></img> <p class="nameE">${a[i]}</p>`;

        //Rastrea el contenedor-----------------------------------
        const $contenedorP = document.getElementById("LastStage");

        //Inserta los datos al contenedor HTML
        $contenedorP.prepend(imageP);
        
        i=i+1;
    }
}

const PrintSecondStage=(a,b)=>{

    //Evalua cuantas primeras evoluciones hay------------------------
    let gateA=Object.keys(a).length;

    //Rastrea el contenedor-----------------------------------------
    const $LastCont=document.getElementById("SndStage")

    //Remueve todos los datos anteriores---------------------------
    while($LastCont.firstChild){
        $LastCont.removeChild($LastCont.firstChild);
    }
    i=0;

    //Crea e imprime las imagenes y datos de las evoluciones--------
    while(i<gateA){

       //Crea el div con la imagen y nombre del pokémon-------------
        const imageP=document.createElement("div");
        imageP.setAttribute("class","card");

        //Crea la imagen del pokémon--------------------------------
        imageP.innerHTML=`<img src="${b[i]}" width=150% alt="Pokemon"></img> <p class="nameE">${a[i]}</p>`;

        //Rastrea el contenedor------------------------------------
        const $contenedorP = document.getElementById("SndStage");
        //Agrega la imagen al contenedor---------------------------
        $contenedorP.prepend(imageP);
        
        i=i+1;
    }
}


/*-------------------------------------Impresion de info---------------------------------------------------*/
    //Nombre del pokemon
    const printName=(a)=>{
        //Crea el span con el nombre
        const elementoPI=document.createElement("span");
        elementoPI.innerText=`${a}`;
        console.log(elementoPI);

        //Rastrea el contenedor
        const $contenedorPI = document.getElementById("pokemon");
        //Elimina la info anterior
        $contenedorPI.removeChild($contenedorPI.childNodes[0]);
        //Inserta el dato
        $contenedorPI.prepend(elementoPI);
    }

    //Impresion de los tipos
    const info=(type1,type2)=>{

        //Primer tipo----------------------------------------------
        //Crea el span con el nombre del elemento
        const elementoPT1=document.createElement("span");
        
        elementoPT1.innerText=type1;
        console.log(elementoPT1);

        //Rastrea el contenedor
        const $contenedorPT1 = document.getElementById("poketipo1");
        //Cambia la class----------
        $contenedorPT1.removeAttribute("class");
        $contenedorPT1.setAttribute("class",`${type1}`);
        //Remueve la info anterior
        $contenedorPT1.removeChild($contenedorPT1.childNodes[0]);
        //Inserta el dato
        $contenedorPT1.prepend(elementoPT1);

        //Rastrea  el fondo de la imagen del pokemón y su tipo principal---------
        const $CambioTitulo = document.getElementById("pokemon");
        const $CambioFondo = document.getElementById("pokeImg");

        //Si no hay tipo o fue error, borra la info de tipo con la class blank en CSS
        if(type1=="not"){
            $CambioTitulo.removeAttribute("class");
            $CambioTitulo.setAttribute("class",`blank`);

            $CambioFondo.removeAttribute("class");
            $CambioFondo.setAttribute("class",`blank`);

        }else{
            //Si si hay un tipo, les pone la class dependiento de su tipo, para decorar en CSS
            $CambioTitulo.removeAttribute("class");
            $CambioTitulo.setAttribute("class",`${type1}`);

            $CambioFondo.removeAttribute("class");
            $CambioFondo.setAttribute("class",`${type1}`);
            
        }

        //Segundo tipo

        let typeCorrection=0;

        //Determina si tiene un segundo tipo, si no tiene, le pone class "none" y lo oculta
        if(type2==""){
            typeCorrection="none";
        }else{
            typeCorrection=type2;
        }
        //Crea span con el 2do tipo
        const elementoPT2=document.createElement("span");
        elementoPT2.innerText=type2;
        console.log(elementoPT2);
        //Rastrea el contenedor del segundo tipo---------------
        const $contenedorPT2 = document.getElementById("poketipo2");
        //Modifica su class------------
        $contenedorPT2.removeAttribute("class");
        $contenedorPT2.setAttribute("class",`${typeCorrection}`);
        //Remueve la info anterior
        $contenedorPT2.removeChild($contenedorPT2.childNodes[0]);
        //Inserta la info
        $contenedorPT2.prepend(elementoPT2);
    }

    //Id de pokemon
    const idfunction=($id)=>{
        //Crea el span con el ID
        const elementoPI=document.createElement("span");
        elementoPI.innerText=`ID: ${$id}`;
        console.log(elementoPI);

        //Rastrea el contenedor
        const $contenedorPI = document.getElementById("pokeID");
        //Elimina la info anterior
        $contenedorPI.removeChild($contenedorPI.childNodes[0]);
        //Inserta el dato
        $contenedorPI.prepend(elementoPI);
    }

    //Altura de pokemon
    const Heightfunction=($Height)=>{
        //COnvierte la altura a metros
        let HeightEst=$Height/10;

        //Agrega el icono para el peso
        const imageWei=document.createElement("img");
        imageWei.setAttribute("src","./Resources/icons/icons8-regla-64.png");
        imageWei.setAttribute("width","25px");
        //Crea span con la altura
        const elementoPH=document.createElement("span");
        elementoPH.innerText=`${HeightEst}m`;
        console.log(elementoPH);
        //Rastrea el contenedor
        const $contenedorPH = document.getElementById("pokeHeight");

        //Borra la info anterior
        while($contenedorPH.firstChild){
            $contenedorPH.removeChild($contenedorPH.firstChild);
            }
        //Inserta la imagen y la info
        $contenedorPH.prepend(elementoPH);
        $contenedorPH.prepend(imageWei);
    }

    //Peso de pokemon
    const Weightfunction=($Weight)=>{
        //Convierte el peso a kg
        let WeightEst=$Weight/10;
        
        //Agrega el icono de la altura
        const imageWei=document.createElement("img");
        imageWei.setAttribute("src","./Resources/icons/icons8-peso-64.png");
        imageWei.setAttribute("width","25px");
        //Crea el span con el peso
        const elementoPW=document.createElement("span");
        elementoPW.innerText=`${WeightEst}Kg`;
        console.log(elementoPW);
        //Rastrea el contenedor
        const $contenedorPW = document.getElementById("pokeWeight");

        //Borra la info anterior
        while($contenedorPW.firstChild){
            $contenedorPW.removeChild($contenedorPW.firstChild);
            }
        //Inserta la imagen y la info
        $contenedorPW.prepend(elementoPW);
        $contenedorPW.prepend(imageWei);  
    }

    //Entrada de pokemon
    const Entradafunction=($Entrada)=>{

        //Crea el span con la entrada del pokémon
        const elementoPE=document.createElement("p");
        elementoPE.setAttribute("class","PokeEntrada");
        elementoPE.innerText=`${$Entrada} `;
        console.log(elementoPE);
        //Rastrea el contenedor
        const $contenedorPE = document.getElementById("pokeEntrada");
        
        //Borra la info anterior
        while($contenedorPE.firstChild){
            $contenedorPE.removeChild($contenedorPE.firstChild);
            }
        //Inserta la info
        $contenedorPE.prepend(elementoPE);
    }

    //Apodo de pokemon
    const Apodofunction=($Apodo)=>{

        //Crea el span con el apodo del pokémon
        const elementoPA=document.createElement("p");
        elementoPA.setAttribute("class","PokeApodo");
        elementoPA.innerText=`Entrada Pokedex: El ${$Apodo} `;
        console.log(elementoPA);
        //Rastrea el contenedor
        const $contenedorPA = document.getElementById("pokeApodo");
        
        //Borra la info anterior
        while($contenedorPA.firstChild){
            $contenedorPA.removeChild($contenedorPA.firstChild);
            }
        //Inserta la info
        $contenedorPA.prepend(elementoPA);
    }

    //Habitat de pokemon
    const Habitatfunction=($HabitatF)=>{

        //Inserta la imagen del habitat
        const imageWei=document.createElement("img");
        imageWei.setAttribute("src","./Resources/icons/icons8-bosque-50.png");
        imageWei.setAttribute("width","20px");

        //Crea span con nombre del habitat
        const elementoPHA=document.createElement("span");
        elementoPHA.innerText=`${$HabitatF} `;
        console.log(elementoPHA);
        //Rastrea el contenedor
        const $contenedorPHA = document.getElementById("pokeHabitat");
        
        //Elimina la info anterior
        while($contenedorPHA.firstChild){
            $contenedorPHA.removeChild($contenedorPHA.firstChild);
            }
        //INserta la imagen y la info
        $contenedorPHA.prepend(elementoPHA);
        $contenedorPHA.prepend(imageWei);
    }

    //Gráfica de stats--------------------------------------------------------
    const graphicstats=(a,b,c,d,e,f)=>{

        //Convierte los stats a porcentajes-------------------------------
        let $hpF=parseInt((a/255)*100); let $hpE=100-$hpF;
        let $AtF=parseInt((b/255)*100); let $AtE=100-$AtF;
        let $DfF=parseInt((c/255)*100); let $DfE=100-$DfF;
        let $SAtF=parseInt((d/255)*100); let $SAtE=100-$SAtF;
        let $SDfF=parseInt((e/255)*100); let $SDfE=100-$SDfF;
        let $SpF=parseInt((f/255)*100); let $SpE=100-$SpF;

        console.log($hpF,$AtF,$DfF,$SAtF,$SDfF,$SpF)


        //--------HP-------------------------------------
        //Crea una grid en base a los porcentajes del stat------
        const graphicHP=document.createElement("div");
        graphicHP.setAttribute("class","b");
        graphicHP.setAttribute("style",`grid-template-rows: ${$hpE}% ${$hpF}%;`);
        graphicHP.innerHTML=`<div>HP</div><div></div>`;
        console.log(graphicHP);

        //--------Attack-------------------------------------
        //Crea una grid en base a los porcentajes del stat------        
        const graphicAT=document.createElement("div");
        graphicAT.setAttribute("class","b");
        graphicAT.setAttribute("style",`grid-template-rows: ${$AtE}% ${$AtF}%;`);
        graphicAT.innerHTML=`<div>At</div><div></div>`;
        console.log(graphicAT);

        //--------Defense-------------------------------------
        //Crea una grid en base a los porcentajes del stat------
        const graphicDF=document.createElement("div");
        graphicDF.setAttribute("class","b");
        graphicDF.setAttribute("style",`grid-template-rows: ${$DfE}% ${$DfF}%;`);
        graphicDF.innerHTML=`<div>Df</div><div></div>`;
        console.log(graphicDF);
        
        //--------Special Attack-------------------------------------
        //Crea una grid en base a los porcentajes del stat------
        const graphicSAT=document.createElement("div");
        graphicSAT.setAttribute("class","b");
        graphicSAT.setAttribute("style",`grid-template-rows: ${$SAtE}% ${$SAtF}%;`);
        graphicSAT.innerHTML=`<div>SAt</div><div></div>`;
        console.log(graphicSAT);
        
        //--------Special Defense-------------------------------------
        //Crea una grid en base a los porcentajes del stat------
        const graphicSDF=document.createElement("div");
        graphicSDF.setAttribute("class","b");
        graphicSDF.setAttribute("style",`grid-template-rows: ${$SDfE}% ${$SDfF}%;`);
        graphicSDF.innerHTML=`<div>SDf</div><div></div>`;
        console.log(graphicSDF);
        
        //--------Speed-------------------------------------
        //Crea una grid en base a los porcentajes del stat------
        const graphicSp=document.createElement("div");
        graphicSp.setAttribute("class","b");
        graphicSp.setAttribute("style",`grid-template-rows: ${$SpE}% ${$SpF}%;`);
        graphicSp.innerHTML=`<div>Spd</div><div></div>`;
        console.log(graphicSp);  

        //Rastrea el contenedor de la gráfica---------------------------------------------
        const $contenedorGraphic = document.getElementById("stats");
 
        //Borra la gráfica anterior-----------------------------------------------
        while($contenedorGraphic.firstChild){
            $contenedorGraphic.removeChild($contenedorGraphic.firstChild);
        }
        //Inserta todos los divs con las grid definidas en base a su porcentaje------
        $contenedorGraphic.prepend(graphicSp);
        $contenedorGraphic.prepend(graphicSDF);
        $contenedorGraphic.prepend(graphicSAT);
        $contenedorGraphic.prepend(graphicDF);
        $contenedorGraphic.prepend(graphicAT);
        $contenedorGraphic.prepend(graphicHP);
    }
