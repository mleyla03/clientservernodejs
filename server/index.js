const { application } = require('express')
const express = require('express')
const app = express()
const PORT = 7070
const bodyParser=require("body-parser")
const crypto=require("crypto")
app.use(bodyParser.json())
let ID=undefined;
const fakeData=[
    {
        id:1,
        name:"Leyla",
        price:3000
    },
    {
        id:2,
        name:"Efsane",
        price:2900
        
    }
]
if(fakeData.length==0){
    ID=1
}
else{
   ID=fakeData.sort((a,b)=> b.id-a.id)[0].id
}


app.get('/api', (req, res) => {
    res.send('Hello World!')
})
app.get("/api/products",(req,res)=>{
    res.status(200).send({
        data:fakeData,
       
    })
})
app.get("/api/products/:id",(req,res)=>{
    const id=req.params.id
    const product =fakeData.find((x)=>x.id==id)
    if(product===undefined){
        res.send({
          message:"product not found"
        })
    }
    else{
           res.status(200).send(product)
    }
 

})
app.post("/api/products",(req,res)=>{
    const{name,price} =req.body
    const newProduct=
    {
        id:++ID,
        name:name,
        price:price
    }
    fakeData.push(newProduct)
    res.status(201).send({
        message:"product created seccessfully",
        data:newProduct
    })
})
app.delete("/api/products/:id",(req,res)=>{
    const id=req.params.id
    const deleteingProduct=fakeData.find((x)=>x.id==id)
   let idx= fakeData.indexOf(deleteingProduct)
   fakeData.splice(idx,1)
   if(deleteingProduct===undefined){
    res.status(204).send("product not found")
   }
   else{
    res.status(203).send({
        message:"product deleted sucessfully"
    })
   }
   res.status(203).send({
    message:"product deleted successfully"
   })
})
app.put("/api/products/:id",(req,res)=>{
    const id=req.params.id
    const{name,price}=req.body
    let editingProduct=fakeData.find((x)=>x.id==id)
    if(name){
        editingProduct.name=name
    }
    if(price){
       editingProduct.price=price
    }
    res.status(200).send({
        message:"product update successfully"
    })
})
  app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
  })