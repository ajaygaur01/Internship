const express = require("express")
const Post  = require("../models/Postmodel.js")
const router = express.Router()
const multer = require("multer")

//create//

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images"); 
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + file.originalname;
        cb(null, uniqueSuffix);
    },
});

const upload = multer({ storage });


router.post("/create", upload.single("photo"), async (req, res) => {
    try {

        const imageUrl = req.file ? req.file.filename : null;

        if (!imageUrl) {
            return res.status(400).json({ message: "Image upload failed!" });
        }

       
        const newPost = new Post({
            ...req.body, 
            photo: imageUrl, 
        });

        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch (error) {
        console.error("Error creating post:", error);
        res.status(500).json({ message: "Failed to create post." });
    }
});



//Update//
router.put("/update/:id" , async (req , res) => {
    try {
        const updatepost = await Post.findByIdAndUpdate(req.params.id   , {$set : req.body} , {new:true})
        res.send(updatepost)
    } catch (error) {
        console.log(error)
    }
})


//delete//
router.delete("/delete/:id" , async (req , res) => {

try {
    await Post.findByIdAndDelete(req.params.id)
res.json("deleted")
} catch (error) {
    console.log(error)
}
}) 

//get all posts//

router.get("/allposts" , async (req , res) => {
    try {
        const allposts = await Post.find()
        res.send(allposts)
    } catch (error) {
        console.log(error)
    }
})

//get postdetails//

router.get("/:id" , async (req , res) => {
    try {
        const details  = await Post.findById(req.params.id)
      res.send(details)
    } catch (error) {
        console.log(error)
    }
})

















module.exports = router