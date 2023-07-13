import express from "express" ;
import fs from "fs"; 
const app = express() ;

app.get("/user" , (req , res) =>{
    req.on("data", (data)=>{
        let {id} = JSON.parse(data) ;
        fs.readFile("./node_modules/data/user.txt" , "utf-8" , (err , data)=>{
            let allData = JSON.parse(data).users ;
            Array.from(allData) ;
            allData.forEach(element => {
                if(element.id == id){
                    res.end(`User email:${element.email}, age:${element.age} , country:${element.country}`) ;
                }
            });
        })
    })
}) ;

app.post("/user/add" , (req,res)=>{
    req.on("data" , (data)=>{
        let {id, email ,age , country} = JSON.parse(data) ;
        let obj = {
            "id":id,
            "email":email,
            "age":age,
            "country":country
        }; 

        let allData = fs.readFileSync("./node_modules/data/user.txt", "utf-8") ;
        allData = JSON.parse(allData) ;
        allData.users.push(obj) ;
        fs.writeFileSync("./node_modules/data/user.txt",JSON.stringify(allData)) ;
        res.end("user added successfully") ;
    });
}) ;

app.patch("/user/update" , (req,res)=>{
    req.on("data" , (data)=>{
        let {id, email ,age , country} = JSON.parse(data) ;
        let allData = JSON.parse(fs.readFileSync("./node_modules/data/user.txt","utf-8")) ;
        allData.users.forEach((ele) =>{
            if(ele.id == id){
                if(email !== undefined)ele.email = email ;
                if(age !== undefined)ele.age = age ;
                if(country !== undefined)ele.country = country ;
            }
        });
        fs.writeFileSync("./node_modules/data/user.txt" , JSON.stringify(allData)) ;
        res.end('user is updated successfully') ;
    })
}); 

app.delete("/user/delete" , (req,res)=>{
    req.on("data", (data)=>{
        let {id} = JSON.parse(data); 
        let allData = JSON.parse(fs.readFileSync("./node_modules/data/user.txt","utf-8")) ;
        allData.users = allData.users.filter((ele) => ele.id !== id) ;
        fs.writeFileSync("./node_modules/data/user.txt" , JSON.stringify(allData)) ;
        res.end("user deleted") ;
    })
})


app.listen(3000 , ()=>{console.log("server is running")}) ;