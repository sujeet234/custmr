let express=require("express");
let cors = require("cors");
let app = express();
app.use(express.json());
app.use(cors());
app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin","*");
    res.header(
        "Access-Control-Allow-Methods",
        "GET,POST,OPTIONS,PUT,PATCH,DELETE,HEAD"
    );
    res.header(
        "Access-Control-Allow-Header",
        "Origin, X-Requested-With,Content-Type,Accept"
    );
    next();
});
//process.env.PORT ||
const port = process.env.PORT || 2410;
app.listen(port,()=>console.log(`Listening on port ${port}`));
let customers=[
    {id: "DFI61", name:"Vishal", city:"Delhi", age:27, gender:"Male", payment:"Credit Card"},
    {id: "JUW88", name:"Amit", city:"Noida", age:49, gender:"Male", payment:"Debit Card"},
    {id: "KPW09", name:"Pradeep", city:"Gurgaon", age:21, gender:"Male", payment:"Wallet"},
    {id: "ABR12", name:"Rohit", city:"Jaipur", age:34, gender:"Male", payment:"Debit Card"},
    {id: "BR451", name:"Preeti", city:"Delhi", age:29, gender:"Female", payment:"Credit Card"},
    {id: "MKR52", name:"Neha", city:"Noida", age:42, gender:"Female", payment:"Debit Card"},
    {id: "BTT66", name:"Swati", city:"Gurgaon", age:24, gender:"Female", payment:"Wallet"},
    {id: "CDP09", name:"Meghna", city:"Jaipur", age:38, gender:"Female", payment:"Debit Card"},
    {id: "KK562", name:"Irfan", city:"Delhi", age:25, gender:"Male", payment:"Credit Card"},
    {id: "LPR34", name:"Gagan", city:"Noida", age:51, gender:"Female", payment:"Debit Card"},
    {id: "MQC11", name:"John", city:"Gurgaon", age:24, gender:"Male", payment:"Wallet"},
    {id: "AXY22", name:"Gurmeet", city:"Jaipur", age:31, gender:"Male", payment:"Debit Card"}
   ];


   let fs = require("fs");
   let fname = "customers.json";
   
   app.get("/resetData",function(req,res){
       let data = JSON.stringify(customers);
       fs.writeFile(fname,data,function(err){
           if(err) res.status(404).send(err);
           else res.send("Data in file is reset");
       });
   })
   
   app.get("/customers",function(req,res){
       fs.readFile(fname,"utf8",function(err,data){
           if(err) res.status(404).send(err);
           else{
               let customersArray = JSON.parse(data);
               res.send(customersArray);
           }
       })
   })
   
   app.get("/customers/:id",function(req,res){
       let id = req.params.id;
       fs.readFile(fname,"utf8",function(err,data){
           if(err) res.status(404).send(err);
           else{
               let customersArray = JSON.parse(data);
               let customer = customersArray.find((st)=>st.id===id);
               if(customer) res.send(customer);
               else res.status(404).send("No customer Found");
           }
       })
   })
   
   app.post("/customers",function(req,res){
       let body = req.body;
       fs.readFile(fname,"utf8",function(err,data){
           if(err) res.status(404).send(err);
           else{
               let customersArray = JSON.parse(data);
               let maxId = customersArray.reduce((ele,curr)=>curr.id>ele ? curr.id : ele,0);
               let newId = maxId+1+"";
                console.log(maxId);
               let newCustomer = {...body,id:newId};
               customersArray.push(newCustomer);
               let data1 = JSON.stringify(customersArray);
               fs.writeFile(fname,data1,function(err){
                   if(err) res.status(404).send(err);
                   else res.send(newCustomer)
               })
           }
       })
   })
   
   app.put("/customers/:id",function(req,res){
       let id = req.params.id;
       let body = req.body;
       fs.readFile(fname,"utf8",function(err,data){
           if(err) res.status(404).send(err);
           else{
               let customersArray = JSON.parse(data);
               let index = customersArray.findIndex((st)=>st.id===id);
               if(index>=0){
                   let updateCustomer = {...customersArray[index], ...body};
                   customersArray[index] = updateCustomer;
                   let data1 = JSON.stringify(customersArray);
                   fs.writeFile(fname,data1,function(err){
                       if(err) res.status(404).send(err);
                       else res.send(updateCustomer);
                   })
               }
               else res.status(404).send("No customer found");
           }
       });
   })
   app.delete("/customers/:id",function(req,res){
       let id = req.params.id;
       fs.readFile(fname,"utf8",function(err,data){
           if(err) res.status(404).send(err);
           else{
               let customersArray = JSON.parse(data);
               let index = customersArray.findIndex((st)=>st.id===id);
               if(index>=0){
                   let deleteCustomer = customersArray.splice(index,1);
                   let data1 = JSON.stringify(customersArray);
                   fs.writeFile(fname,data1,function(err){
                       if(err) res.status(404).send(err);
                       else res.send(deleteCustomer);
                   })
               }
               else res.status(404).send("No customer found");
           }
       });
   })
   