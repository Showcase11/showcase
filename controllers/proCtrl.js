const { response } = require('express');
const ProUser = require('../models/productModel')

// Filter, sorting and paginating

class APIfeatures {
    constructor(query, queryString){
        this.query = query;
        this.queryString = queryString;
    }
    filtering(){
       const queryObj = {...this.queryString} //queryString = req.query

       const excludedFields = ['page', 'sort', 'limit']
       excludedFields.forEach(el => delete(queryObj[el]))
       
       let queryStr = JSON.stringify(queryObj)
       queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match)

    //    gte = greater than or equal
    //    lte = lesser than or equal
    //    lt = lesser than
    //    gt = greater than
       this.query.find(JSON.parse(queryStr))
         
       return this;
    }

    sorting(){
        if(this.queryString.sort){
            const sortBy = this.queryString.sort.split(',').join(' ')
            this.query = this.query.sort(sortBy)
        }else{
            this.query = this.query.sort('-createdAt')
        }

        return this;
    }

    paginating(){
        const page = this.queryString.page * 1 || 1
        const limit = this.queryString.limit * 1 || 9
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit)
        return this;
    }
}

const productCtrl = {
    getProducts: async(req, res) =>{
        try {
            const features = new APIfeatures(ProUser.find(), req.query)
            .filtering().sorting().paginating()

            const products = await features.query

            res.json({
                status: 'success',
                result: products.length,
                products: products
            })
            
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    createProduct: async(req, res) =>{
        try {
            const { link, companyName, email,  brand, type, category, price, Description,latitude,longitude,imgLink} = req.body || {};
            console.log(req.body);
            if(!link) return res.status(400).json({msg: "No video upload"})
            const product = await ProUser.findById(req?.user?.id)
            if(product)
                return res.status(400).json({msg: "This product already exists."})

            const newProduct = new ProUser({
                link, companyName, email,  brand, type, category, price, Description,
                latitude,longitude,imgLink
            })

            const result=await newProduct.save()
            console.log('result',result)
            res.json({msg: "Created a product",result})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    deleteProduct: async(req, res) =>{
        try {
            await ProUser.findByIdAndDelete(req.params.id)
            res.json({msg: "Deleted a Product"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    searchProduct: async(req,res)=>{
        try {
            // console.log(req.params.key)
            const data = await ProUser.find(
                {
                    "$or":[
                        { "category": {$regex:req.params.key}}
                    ]
                }
            )
            res.send(data)

        } catch (err){
            return res.status(500).json({msg: err.message})
        }
    },

    updateProduct: async(req, res) =>{
        try {
            const {link, brand, type, category, price, Description} = req.body;
            if(!images) return res.status(400).json({msg: "No image upload"})

            await ProUser.findOneAndUpdate({_id: req.params.id}, {
                link, brand, type, category, price, Description
            })

            res.json({msg: "Updated a Product"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}


module.exports = productCtrl