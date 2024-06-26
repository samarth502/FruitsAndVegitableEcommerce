const { Product } = require("../Model/ProductModel");

exports.Product = async (req,res)=>{
    try {
        const response = await Product.find();

        if(!response){
            res.status(401).json({msg:"No Services found"});
        }
        res.status(201).json({msg:response});

        
    } catch (error) { 
        console.log("services",error);
        
    }

}