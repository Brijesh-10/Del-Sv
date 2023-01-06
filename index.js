const express=require("express")
const path=require("path")
var con=require('./connection')
const bodyparser=require("body-parser")
const port=4000;
const app=express();
const session=require('express-session');
const hbs= require("hbs")
app.use(session({'secret':'kaib23', secret:'mysecnd',
resave: false,
saveUninitialized:false}))
//expree specific stuff
const staticpath=path.join(__dirname, "./public");
app.use(express.static(staticpath))
console.log(path.join(__dirname, "./public"))
// // to set view enegine
app.set('view engine', 'hbs');


app.set('views',path.join(__dirname, "./views"))


app.use(bodyparser.json({limit:'100mb'}));
app.use(bodyparser.urlencoded({limit:'100mb',extended:true}));

// template enegine route

app.get("/", (req,res)=>{
    res.render('index')
})

// //Endpoints
app.get("/shp-details",(req,res)=>{
    res.render(`shp-details`)
})
app.post("/shp-details",function(req,res){
        
        if(req.body.mno.length==10){
         var sql="insert into seller values('"+req.body.sname+"', '"+req.body.email+"', '"+req.body.mno+"', '"+req.body.services+"','"+req.body.select+"')";
        con.query(sql,function(error,result){
            try{if(error){
                res.redirect(`./html/phn.html`) 
            }
             else{res.redirect(`/`)}}   
            catch(err){
        console.log("wrong")}
            //if(error)throw error;
            
        })}
    })
app.get("/services-delivery-opt",(req,res)=>{
    res.render(`services-delivery-opt`)
})

app.get("/delivery",(req,res)=>{
    res.render(`delivery`)
})
app.post("/delivery",(req,res)=>{
   req.session.loc=req.body.select
    console.log("passed-deliver")
    if(req.body.hasOwnProperty("veg")){
        req.session.type="vegetables"
    }
    if(req.body.hasOwnProperty("fru")){
        req.session.type="fruits"
    }
    if(req.body.hasOwnProperty("bev")){
        req.session.type="beverage"
    }
     if(req.body.select==undefined){
        res.redirect(`location-del`)}
        else{
        res.redirect(`/display`)
    }
   
})
app.get("/location-del",(req,res)=>{
    res.render(`location-del`)
})
app.get("/location-serv",(req,res)=>{
    res.render(`location-serv`)
})


app.get("/services",(req,res)=>{
    res.render(`services`)
    
    
})

app.post("/services",(req,res)=>{
    req.session.loc=req.body.select
    console.log("passed-service")
    if(req.body.hasOwnProperty("plumber")){
        req.session.type="plumber"
    }
    if(req.body.hasOwnProperty("techni")){
        req.session.type="technician"
    }
    if(req.body.hasOwnProperty("electri")){
        req.session.type="electrician"
    }
     if(req.body.select==undefined){
        res.redirect(`location-serv`)}
        else{
        res.redirect(`/display`)
    }
    
})


app.get("/display", function(req, res){
    let location=req.session.loc
    let tips=req.session.type
    var sql="select * from seller where type='"+tips+"' and address='"+location+"'";
    con.query(sql,function(error,data){
        console.log(location)
        if(error)throw error;
        res.render(`display`,{sampledata: data})
    })
    console.log(tips)
     })

// error page
app.get('*',(req,res)=>{
    res.render(`error`)
})


// start the server
app.listen(port,()=>{
    console.log("the application started");
})


