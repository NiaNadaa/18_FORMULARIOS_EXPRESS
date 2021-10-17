const express = require("express");
const app = express();
let animales = require("./animales");

app.use(express.static("./public"));
//app.use(express.static(__dirname + '/public'));

app.use(express.urlencoded({extended:false}));

app.get("/animales", (req,res)=>{
    res.send(animales);
});

app.get("/sumar",(req,res)=>{
    let animalNew = {
        nombre: req.query.nombre,
        edad: parseInt(req.query.edad),
        tipo: req.query.tipo
    }
    animales.push(animalNew);
    res.send(`<h2>Animal añadido</h2>`)
});
app.post("/dejar",(req,res)=>{
    let animalDejar = {
        nombre: req.body.nombre,
        edad: req.body.edad,
        tipo: req.body.tipo
    }
    animales.push(animalDejar)
    res.send(`<h1>Animal añadido</h1>`)
})
app.get("/adoptar",(req,res)=>{
    /* let animalAdoptar = {
        nombre: req.query.nombre
    } */
   /*  let animalesAdopt = [];
    for(i=0;i<animales.length;i++){
        if(animales[i].nombre!==req.query.nombre){
            animalesAdopt.push(animales[i])
        }
        console.log(animalesAdopt)
        res.send(`<h2>Animal adoptado</h2>`)
        
    } */
    for(let i=0; i<animales.length; i++){
        if (animales[i].nombre.toLowerCase() === req.query.nombre) {
            animales = animales.slice(0, i).concat(animales.slice(i + 1 , animales.length - 1));
            res.send(`<h2>Animal adoptado</h2>`)
            break;
        }
    }
    res.send(`<h2>Ese animal no está</h2>`)
});


//localhost:3009/sumar-animal/?nombre=laika&edad=23&tipo=serpiente


/* mostrarAnimales()

function mostrarAnimales(){
    document.getElementById("show").innerHTML=`${animales}`
} */

app.listen(process.env.PORT || 3009);