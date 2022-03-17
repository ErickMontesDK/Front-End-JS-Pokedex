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

        //console.log(res);

            //Si el estatus de la respuesta es distinto a 200 (encontrado), entonces
        if(res.status !=200){

                //imprime la respuesta
                //console.log(res);
                //imagen de pokemon no hallado exitosamente
            

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

            //
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
        if(pokeImgF == null){
            console.log("No hay imagen hembra")
        }
        console.log("Url Sprite Shiny: "+pokeImgS);

        AndereImg(pokeImgF,pokeImgS);


        //Obtiene los Tipo del pokemon, dos tipos según el caso--------------------------------------------------
        let Types=data.types;

        if (Types.length == 2){

            let open1type=Types[0];                 let open2type=Types[1];
            let Firsttype=open1type.type.name;      let Secondtype=open2type.type.name;

            //console.log(Firsttype);
            //console.log(Secondtype);

            info(Firsttype,Secondtype);
        }
        else{
            let open1type=Types[0];                 
            let Firsttype=open1type.type.name; 

            //console.log(Firsttype);
            
            info(Firsttype,"");
        }

        //Obtiene su nombre
        let pokeName1=data.forms;
        let pokeName2=pokeName1[0].name;
        //console.log("MONSTRUO MACARENA: "+pokeName2)

        printName(pokeName2);

        //Obtiene su numero en la pokedex
        let pokeNumber=data.id;
        //console.log("ID: "+pokeNumber);
        idfunction(pokeNumber);

        //Obtiene su altura
        let pokeHeight=data.height;
        //console.log("Altura: "+pokeHeight);
        Heightfunction(pokeHeight);

        //Obtiene su peso
        let pokeWeight=data.weight;
        //console.log("Peso: "+pokeWeight);
        Weightfunction(pokeWeight);

        //Estadisticas base
        let est=data.stats;
        let hp=est[0].base_stat;    let attack=est[1].base_stat;    let defense=est[2].base_stat;    let spattack=est[3].base_stat;    let spdefense=est[4].base_stat;    let speed=est[5].base_stat;
        //console.log("HP"+hp+", AT"+attack+", DF"+defense+", SAT"+spattack+", SDF"+spdefense+", SP"+speed);

        graphicstats(hp,attack,defense,spattack,spdefense,speed);

        //Url de pagina relacionada con más datos
        let resurl=data.species.url;
        console.log("Segunda pag. de datos: "+resurl);
  
        //llama a la funcion pokeImage con la url de la imagen llamada pokeImg
        pokeImage(pokeImg);
        //llama a la función resource con la url con más datos
        resource(resurl);
        
    })
}


/*---------------------------------------------Info extra--------------------------------------------------*/

const resource = (adress)=>{

    fetch(adress).then((res) => {

        //console.log(res);

        if(res.status !=200){
                console.log("Np no se pudo conectar")
            
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
        //En seguida convertimos la respuesta a una data que podemos usar-------------------------------
        //imprime toda la data
        //console.log(data);


        //obtiene el texto de entrada de la pokedex------------------------------------------------------
        let entrada=data.flavor_text_entries;

        let i=0;
        let openEntrada=0;
        
        while(openEntrada != "es"){

            openEntrada=entrada[i].language.name;
            key=i;
            i=i+1;
            
        }
        let EntradaPoke=entrada[key].flavor_text;
        //console.log("Entrada de Pokedex: "+EntradaPoke);
        Entradafunction(EntradaPoke);

        //obtiene el apodo del pokemon----------------------------------------------------------------
        let apodo=data.genera;

        let e=0;
        let openGenera=0;
        
        while(openGenera != "es"){

            openGenera=apodo[e].language.name;
            keyG=e;
            e=e+1;
            
        }
        let ApodoPoke=apodo[keyG].genus;

        //console.log(ApodoPoke);
        Apodofunction(ApodoPoke);

        //Obtiene url para obtener el habitat----------------------------------------------------------
        
        let habitatcheck=data.habitat;
        let habitaturl=0;

        if(habitatcheck==null){
            
            habitaturl="Se desconoce"//--------------------------------------------------------------
            //console.log(habitaturl);
        }
        else{
            habitaturl=data.habitat.url;
            //console.log("Habitat: "+habitaturl);//------------------------------------------------------
        }
        

        //obtiene url para obtener la cadena evolutiva
        let evourl=data.evolution_chain.url;
        //console.log(evourl);

        $habitat(habitaturl);
        $evolution(evourl);

    })
}

/*---------------------------------------------Habitad----------------------------------------------------*/

const $habitat=(hurl)=>{
    let HabitatName="not";

    if (hurl=="Se desconoce"){
        HabitatName=hurl;

        //console.log("Habitat en español: "+HabitatName);
        Habitatfunction(HabitatName);

    }
    else{
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
    
            //console.log(data);
    
            let namesHab=data.names;
            
            y=0;
            let openNames=0;
    
            while(openNames != "es"){
    
                openNames=namesHab[y].language.name;
                keyH=y;
                y=y+1;
                
            }
            
            HabitatName=namesHab[keyH].name;
            
            //console.log("Habitat en español: "+HabitatName); 
            Habitatfunction(HabitatName);
        })
        
    }

    
}

/*---------------------------------------------Evolución--------------------------------------------------*/

const $evolution=(eurl)=>{

    fetch(eurl).then((res)=>{
        console.log(res);

        if(res.status !=200){
                console.log("No se pudo conectar Cadena")

                let fakeMembers={0:"none"};
                let fakeMembers2={0:"none"};

                UrlEvolImage("none",fakeMembers,fakeMembers2);       
        }
        else {
            //si es encontrado (200) nos regresa la respuesta
            return res.json();
        } 
    }).then((data) => {

        console.log(data);

        //Forma original del pokémon------------------------------------------------------------------------------------------
        let raiz=data.chain.species.name;
        console.log("Primer eslabón de la cadena evolutiva: "+raiz);

        //Primera evolución del Pokémon. Enlista todas las variaciones, ejemplo Eevee o Slowpoke, con más de 1 evolucion-----
        let evolvesTo=data.chain.evolves_to;

        let cVariacion=evolvesTo.length;//---------------------Numero de evoluciones Primer Nivel-------------------------

        console.log("Número de primeras evoluciones: "+cVariacion);
    
        let a=0;
        let membersFirstEvol={0:"none"};
        let membersSecondEvol={0:"none"};
 
        while(a < cVariacion){

            //Rastrea todas las variaciones de evolucion en primer nivel--------------------------------------------------
            let openEvol=evolvesTo[a].species.name;
            membersFirstEvol[a]=openEvol;


            //Rastrea todas las variaciones de evolucion en segundo nivel--------------------------------------------------
            let ConfirmEvol=evolvesTo[a].evolves_to.length;
            console.log("Numero de evoluciones Segundo Nivel: "+ConfirmEvol);
            
            b=0;
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

        UrlEvolImage(raiz,membersFirstEvol,membersSecondEvol);

    })
}

/*---------------------------------------------Imagen del poke-----------------------------------------*/
//declara la funcion pokeImage, que usando el url de la data
const pokeImage=(url)=>{
    //busca el elemento en el html con el id pokeImg
    const pokeImg =document.getElementById("pokeImg");
    
    /*cambia el src del elemento del id pokeImg con el url de la imagen,
     de forma que cambia la imagen anterior */
     console.log("aqui hay pedo"+url);
    pokeImg.src=url;  
}

/*--------------------------------------------Url de las evoluciones-------------------------------*/

const UrlEvolImage=(baby,first,second)=>{
    let FirstQuantity=Object.keys(first).length;
    let SecondQuantity=Object.keys(second).length;

    console.log(FirstQuantity, SecondQuantity);

    raizurl=`https://pokeapi.co/api/v2/pokemon/${baby}`;
    console.log(raizurl);

    q=0;
    let FQurl={};

    if (FirstQuantity==1 && first[0]=="none"){
        console.log("No tiene primera evolucion")
        q=q+1;
    }

    while(q < FirstQuantity){
        
        FQurl[q] =`https://pokeapi.co/api/v2/pokemon/${first[q]}`;
        //console.log(FQurl[q]);
        q=q+1;
    }


    p=0;
    let SQurl={};

    if (SecondQuantity==1 && second[0]=="none"){
    console.log("No tiene segunda evolucion")
        p=p+1;
    }

    while(p < SecondQuantity){
        
        SQurl[p]=`https://pokeapi.co/api/v2/pokemon/${second[p]}`;
        //console.log(SQurl[p]);
        p=p+1;
    }
    //console.log(raizurl,FQurl,SQurl);
    ImgAlle(raizurl,FQurl,SQurl);
}

/*------------------------------------------Img Url y name de las de las evoluciones----------------------------------*/
const ImgAlle=(a,b,c)=>{


    fetch(a).then((res) => {

        //console.log(res);

            //Si el estatus de la respuesta es distinto a 200 (encontrado), entonces
        if(res.status !=200){

            console.log("No se conectó con primer eslabon de cadena");


            let fakeUrlImg="./Resources/icons/cross.png";
            let fakeName="";
            
            PrintFstStage(fakeName,fakeUrlImg,"none")
            
        }
        else {
            //si es encontrado (200) nos regresa la respuesta
            return res.json();
        } 

    }).then((data) => {

        let pokeEvolBaby=data.sprites.front_default;
        let pokeEvolBabyName=data.species.name;
        
        PrintFstStage(pokeEvolBabyName,pokeEvolBaby,a);
    })

    let gateB=Object.keys(b).length;
    console.log("numero de datos: "+gateB);

    if (gateB > 0){ //----------------------Primer evolucion--------------------
        bi=0;
        let imgFsturl={};
        let imgFsturlName={};
        let gateE=gateB-1;

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
                    

                    console.log("ESSSSSSSSTOO: "+qi);
        
                    imgFsturl[qi]=data.sprites.front_default;
                    imgFsturlName[qi]=data.species.name;



                    if(qi==gateE){
                        console.log("Entro aqui con ");
                        console.log(imgFsturlName);
                        PrintSecondStage(imgFsturlName,imgFsturl);
                    }
                    
                    
                })

                bi=bi+1;
        }
    
    }else if(gateB==0){
        FakeimgFsturl={0:"./Resources/icons/cross.png"};
        FakeimgFsturlName={0:""};
        PrintSecondStage(FakeimgFsturlName,FakeimgFsturl);
        
    }

/* Aqui ya ni le toques naaaaaaaaaaaaaaaaaaaaaaadaaaaaaaaaaaaaa----------*/
    let gateC=Object.keys(c).length;
    console.log("numero de datos: "+gateC);

    if (gateC > 0){ //----------------------Segunda evolucion--------------------
        ci=0;
        let imgSndurl={};
        let imgSndurlName={};
        let gateD=gateC-1;

        while(ci<gateC){
            
            let Ci=c[ci];
            let ri=ci;
            console.log("Primero: "+ci);
            console.log(Ci)

            fetch(Ci).then((res) => {

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
                    

                    console.log("ESSSSSSSSTOO: "+ri);
        
                    imgSndurl[ri]=data.sprites.front_default;
                    imgSndurlName[ri]=data.species.name;



                    if(ri==gateD){
                        console.log("Entro aqui con ");
                        console.log(imgSndurlName);
                        PrintLastStage(imgSndurlName,imgSndurl);
                    }
                    
                    
                })

                ci=ci+1;
        }
    
    }else if(gateC==0){
        FakeimgSndurl={0:"./Resources/icons/cross.png"};
        FakeimgSndurlName={0:""};
        PrintLastStage(FakeimgSndurlName,FakeimgSndurl);
        
    }
}

/*----------------------------Imagenes hembra y shiny----------------------------------*/
const AndereImg=(h,s)=>{

    const $LastCont=document.getElementById("imgH")
    const $Cont=document.getElementById("imgS")

    while($LastCont.firstChild){
        $LastCont.removeChild($LastCont.firstChild);
    }
    while($Cont.firstChild){
        $Cont.removeChild($Cont.firstChild);
    }


    if(h==null){
        const imageP=document.createElement("img");
        imageP.setAttribute("width","40px");
        imageP.setAttribute("id","pokeImgFemale");
        imageP.setAttribute("src",`./Resources/icons/cross.png`);

        const titleFem=document.createElement("span");
        titleFem.innerText=``;
        console.log(titleFem);
    
    
        const $contenedorP = document.getElementById("imgH");

        $contenedorP.prepend(titleFem);
        $contenedorP.prepend(imageP);
    }else{
        const imageP=document.createElement("img");
        imageP.setAttribute("width","70px");
        imageP.setAttribute("id","pokeImgFemale");
        imageP.setAttribute("src",`${h}`);

        const titleFem=document.createElement("span");
        titleFem.innerText=`Hembra`;
        console.log(titleFem);
    
        const $contenedorP = document.getElementById("imgH");
        
        $contenedorP.prepend(titleFem);
        $contenedorP.prepend(imageP);
    }

    if(s==null){
        const imageS=document.createElement("img");
        imageS.setAttribute("width","40px");
        imageS.setAttribute("id","pokeImgShiny");
        imageS.setAttribute("src",`./Resources/icons/cross.png`);
    
        const titleShin=document.createElement("span");
        titleShin.innerText=``;
        console.log(titleShin);

        const $contenedorS = document.getElementById("imgS");
       
        $contenedorS.prepend(titleShin);
        $contenedorS.prepend(imageS);
    }else{
        const imageS=document.createElement("img");
        imageS.setAttribute("width","70px");
        imageS.setAttribute("id","pokeImgShiny");
        imageS.setAttribute("src",`${s}`);
    
        const titleShin=document.createElement("span");
        titleShin.innerText=`Shiny`;
        console.log(titleShin);

        const $contenedorS = document.getElementById("imgS");
        
        $contenedorS.prepend(titleShin);
        $contenedorS.prepend(imageS);
    }

   
}



/*Impresion imagenes cadena evolutiva*/

const PrintFstStage=(a,b,c)=>{

    const $LastCont=document.getElementById("babyStage")

    console.log("webos "+c);

    while($LastCont.firstChild){
        $LastCont.removeChild($LastCont.firstChild);
    }

    const imageP=document.createElement("div");
    imageP.setAttribute("class","card");
    
    imageP.innerHTML=`<img src="${b}" width=150% alt="Pokemon"></img> <p class="nameE">${a}</p>`;


    const $contenedorP = document.getElementById("babyStage");
    $contenedorP.prepend(imageP);



}

const PrintLastStage=(a,b)=>{

    let gateA=Object.keys(a).length;

    const $LastCont=document.getElementById("LastStage")

    while($LastCont.firstChild){
        $LastCont.removeChild($LastCont.firstChild);
    }

    
    i=0;
    while(i<gateA){

       
        const imageP=document.createElement("div");
        imageP.setAttribute("class","card");

        imageP.innerHTML=`<img src="${b[i]}" width=120% alt="Pokemon"></img> <p class="nameE">${a[i]}</p>`;


        const $contenedorP = document.getElementById("LastStage");
        $contenedorP.prepend(imageP);
        

        i=i+1;
    }
}

const PrintSecondStage=(a,b)=>{

    console.log(a); console.log(b);

    let gateA=Object.keys(a).length;

    const $LastCont=document.getElementById("SndStage")

    while($LastCont.firstChild){
        $LastCont.removeChild($LastCont.firstChild);
    }

    
    i=0;
    while(i<gateA){

       
        const imageP=document.createElement("div");
        imageP.setAttribute("class","card");

        imageP.innerHTML=`<img src="${b[i]}" width=150% alt="Pokemon"></img> <p class="nameE">${a[i]}</p>`;


        const $contenedorP = document.getElementById("SndStage");
        $contenedorP.prepend(imageP);
        

        i=i+1;
    }
}




/*-------------------------------------Impresion de info---------------------------------------------------*/

    //Nombre del pokemon
    const printName=(a)=>{

        const elementoPI=document.createElement("span");
        elementoPI.innerText=`${a}`;
        console.log(elementoPI);

        const $contenedorPI = document.getElementById("pokemon");
        $contenedorPI.removeChild($contenedorPI.childNodes[0]);
        $contenedorPI.prepend(elementoPI);

    }

    //Impresion de los tipos
    const info=(type1,type2)=>{


        //Primer tipo
        const elementoPT1=document.createElement("span");
        
        elementoPT1.innerText=type1;
        console.log(elementoPT1);

        const $contenedorPT1 = document.getElementById("poketipo1");

        $contenedorPT1.removeAttribute("class");
        $contenedorPT1.setAttribute("class",`${type1}`);
        $contenedorPT1.removeChild($contenedorPT1.childNodes[0]);
        $contenedorPT1.prepend(elementoPT1);

        const $CambioTitulo = document.getElementById("pokemon");
        const $CambioFondo = document.getElementById("pokeImg");

        if(type1=="not"){
            $CambioTitulo.removeAttribute("class");
            $CambioTitulo.setAttribute("class",`blank`);

            $CambioFondo.removeAttribute("class");
            $CambioFondo.setAttribute("class",`blank`);

        }else{
            $CambioTitulo.removeAttribute("class");
            $CambioTitulo.setAttribute("class",`${type1}`);

            $CambioFondo.removeAttribute("class");
            $CambioFondo.setAttribute("class",`${type1}`);
            
        }

        //Segundo tipo

        let typeCorrection=0;

        if(type2==""){
            typeCorrection="none";
        }else{
            typeCorrection=type2;
        }

        const elementoPT2=document.createElement("span");
        
        elementoPT2.innerText=type2;
        console.log(elementoPT2);

        const $contenedorPT2 = document.getElementById("poketipo2");

        $contenedorPT2.removeAttribute("class");
        $contenedorPT2.setAttribute("class",`${typeCorrection}`);
        $contenedorPT2.removeChild($contenedorPT2.childNodes[0]);
        $contenedorPT2.prepend(elementoPT2);
    }

    //Id de pokemon
    const idfunction=($id)=>{
        const elementoPI=document.createElement("span");
        elementoPI.innerText=`ID: ${$id}`;
        console.log(elementoPI);

        const $contenedorPI = document.getElementById("pokeID");
        $contenedorPI.removeChild($contenedorPI.childNodes[0]);
        $contenedorPI.prepend(elementoPI);
    }

    //Altura de pokemon
    const Heightfunction=($Height)=>{
        let HeightEst=$Height/10;

        const imageWei=document.createElement("img");
        imageWei.setAttribute("src","./Resources/icons/icons8-regla-64.png");
        imageWei.setAttribute("width","25px");

        const elementoPH=document.createElement("span");
        elementoPH.innerText=`${HeightEst}m`;
        console.log(elementoPH);

        const $contenedorPH = document.getElementById("pokeHeight");

        while($contenedorPH.firstChild){
            $contenedorPH.removeChild($contenedorPH.firstChild);
            }
        
        
        $contenedorPH.prepend(elementoPH);
        $contenedorPH.prepend(imageWei);
    }

    //Peso de pokemon
    const Weightfunction=($Weight)=>{
        let WeightEst=$Weight/10;

        const imageWei=document.createElement("img");
        imageWei.setAttribute("src","./Resources/icons/icons8-peso-64.png");
        imageWei.setAttribute("width","25px");

        const elementoPW=document.createElement("span");
        elementoPW.innerText=`${WeightEst}Kg`;
        console.log(elementoPW);

        const $contenedorPW = document.getElementById("pokeWeight");

        while($contenedorPW.firstChild){
            $contenedorPW.removeChild($contenedorPW.firstChild);
            }

          
        $contenedorPW.prepend(elementoPW);
        $contenedorPW.prepend(imageWei);  

        

    }

    //Entrada de pokemon
    const Entradafunction=($Entrada)=>{
        
        const elementoPE=document.createElement("p");
        elementoPE.setAttribute("class","PokeEntrada");
        elementoPE.innerText=`${$Entrada} `;
        console.log(elementoPE);

        const $contenedorPE = document.getElementById("pokeEntrada");
        
        while($contenedorPE.firstChild){
            $contenedorPE.removeChild($contenedorPE.firstChild);
            }

        $contenedorPE.prepend(elementoPE);
    }

    //Apodo de pokemon
    const Apodofunction=($Apodo)=>{

        
        const elementoPA=document.createElement("p");
        elementoPA.setAttribute("class","PokeApodo");
        elementoPA.innerText=`Entrada Pokedex: El ${$Apodo} `;
        console.log(elementoPA);

        const $contenedorPA = document.getElementById("pokeApodo");
        
        while($contenedorPA.firstChild){
            $contenedorPA.removeChild($contenedorPA.firstChild);
            }

        $contenedorPA.prepend(elementoPA);
    }

    //Habitat de pokemon
    const Habitatfunction=($HabitatF)=>{

        const imageWei=document.createElement("img");
        imageWei.setAttribute("src","./Resources/icons/icons8-bosque-50.png");
        imageWei.setAttribute("width","20px");

        const elementoPHA=document.createElement("span");
        elementoPHA.innerText=`${$HabitatF} `;
        console.log(elementoPHA);

        const $contenedorPHA = document.getElementById("pokeHabitat");
  
        while($contenedorPHA.firstChild){
            $contenedorPHA.removeChild($contenedorPHA.firstChild);
            }

        
        $contenedorPHA.prepend(elementoPHA);
        $contenedorPHA.prepend(imageWei);
    }



    //Gráfica de stats--------------------------------------------------------
    const graphicstats=(a,b,c,d,e,f)=>{
        let $hpF=parseInt((a/255)*100); let $hpE=100-$hpF;
        let $AtF=parseInt((b/255)*100); let $AtE=100-$AtF;
        let $DfF=parseInt((c/255)*100); let $DfE=100-$DfF;
        let $SAtF=parseInt((d/255)*100); let $SAtE=100-$SAtF;
        let $SDfF=parseInt((e/255)*100); let $SDfE=100-$SDfF;
        let $SpF=parseInt((f/255)*100); let $SpE=100-$SpF;

        console.log($hpF,$AtF,$DfF,$SAtF,$SDfF,$SpF)


        //--------HP-------------------------------------
        const graphicHP=document.createElement("div");
        graphicHP.setAttribute("class","b");
        graphicHP.setAttribute("style",`grid-template-rows: ${$hpE}% ${$hpF}%;`);
        graphicHP.innerHTML=`<div>HP</div><div></div>`;
        console.log(graphicHP);

        //--------Attack-------------------------------------
        const graphicAT=document.createElement("div");
        graphicAT.setAttribute("class","b");
        graphicAT.setAttribute("style",`grid-template-rows: ${$AtE}% ${$AtF}%;`);
        graphicAT.innerHTML=`<div>At</div><div></div>`;
        console.log(graphicAT);

        //--------Defense-------------------------------------
        const graphicDF=document.createElement("div");
        graphicDF.setAttribute("class","b");
        graphicDF.setAttribute("style",`grid-template-rows: ${$DfE}% ${$DfF}%;`);
        graphicDF.innerHTML=`<div>Df</div><div></div>`;
        console.log(graphicDF);
        
        //--------Special Attack-------------------------------------
        const graphicSAT=document.createElement("div");
        graphicSAT.setAttribute("class","b");
        graphicSAT.setAttribute("style",`grid-template-rows: ${$SAtE}% ${$SAtF}%;`);
        graphicSAT.innerHTML=`<div>SAt</div><div></div>`;
        console.log(graphicSAT);
        
        //--------Special Defense-------------------------------------
        const graphicSDF=document.createElement("div");
        graphicSDF.setAttribute("class","b");
        graphicSDF.setAttribute("style",`grid-template-rows: ${$SDfE}% ${$SDfF}%;`);
        graphicSDF.innerHTML=`<div>SDf</div><div></div>`;
        console.log(graphicSDF);
        
        //--------Speed-------------------------------------
        const graphicSp=document.createElement("div");
        graphicSp.setAttribute("class","b");
        graphicSp.setAttribute("style",`grid-template-rows: ${$SpE}% ${$SpF}%;`);
        graphicSp.innerHTML=`<div>Spd</div><div></div>`;
        console.log(graphicSp);    

        const $contenedorGraphic = document.getElementById("stats");
 

        while($contenedorGraphic.firstChild){
            $contenedorGraphic.removeChild($contenedorGraphic.firstChild);
        }

        $contenedorGraphic.prepend(graphicSp);
        $contenedorGraphic.prepend(graphicSDF);
        $contenedorGraphic.prepend(graphicSAT);
        $contenedorGraphic.prepend(graphicDF);
        $contenedorGraphic.prepend(graphicAT);
        $contenedorGraphic.prepend(graphicHP);

    }