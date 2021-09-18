
const router = require("express").Router();
const fs = require("fs")
const formidable = require("formidable");
const {data} = require("../models/model")

router.post("/upload",(req,res)=>{
    
    let FileName;
   
    const form = formidable({multiples:true, uploadDir:'./uploadFile' });
    form.parse(req, (err, fields, files) => {
        if (err) {
            next(err);
            return;
        }
        FileName = files.file.path.split("\\");      
        FileName = FileName[1];
        console.log(FileName)
        const filedata = fs.readFileSync(`uploadFile/${FileName}`, {encoding:'utf8', flag:'r'})

        data.create({name:files.file.name,data:filedata}); 
      res.json({ fields, files });
    });
        

})
    router.get("/readfile",async(req,res)=>{
        const result =await data.findOne({name:req.body.name})
        if (result) {
            return res.send(result)
        }
    })
    router.put("/updateFile",async(req,res)=>{
        const result =await data.findOne({name:req.body.name})
        if (result) {
            result.data = req.body.data
            result.save();
        return res.send(`data updated:${result}`);
        }
       return res.send("file does not exist.")
    })
    router.delete("/deleteFile",async(req,res)=>{
        await data.findOneAndDelete({name:req.body.name}).then(res.json("file deleted."));
    })
module.exports = router