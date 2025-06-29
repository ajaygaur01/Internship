const express = require("express")
const Post  = require("../models/Postmodel.js")
const router = express.Router()
const redisClient = require("../config/redisClient.js")
const compressImage = require("../middlewares/compression.js")
const cloudinary = require("../config/cloudinary.js");
const streamifier = require("streamifier");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });
router.post("/create", upload.single("photo"), async (req, res) => {
  try {
    const { topic, slug: customSlug } = req.body;

    const baseSlug = topic.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-");
    let slug = baseSlug;
    let count = 1;
    while (await Post.findOne({ slug })) {
      slug = `${baseSlug}-${count++}`;
    }

    // Upload image to Cloudinary
    const streamUpload = (buffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "posts" },
          (error, result) => {
            if (result) resolve(result);
            else reject(error);
          }
        );
        streamifier.createReadStream(buffer).pipe(stream);
      });
    };

    let imageUrl = "";
    if (req.file) {
      const result = await streamUpload(req.file.buffer);
      imageUrl = result.secure_url;
    }

    const newPost = new Post({
      ...req.body,
      slug,
      photo: imageUrl, // Cloudinary image URL
    });

    const savedPost = await newPost.save();
    await redisClient.del("allposts");
    res.status(200).json(savedPost);
  } catch (error) {
    console.error("Post creation failed:", error);
    res.status(500).json({ message: "Post creation error." });
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


router.get("/allposts", async (req, res) => {
  try {
    const cachedPosts = await redisClient.get("allposts");
    if (cachedPosts) {
      console.log("✅ Cache Hit: allposts");
      return res.status(200).json(JSON.parse(cachedPosts));
    }
    const allposts = await Post.find();
    await redisClient.set("allposts", JSON.stringify(allposts), { EX: 3600 });

    console.log("💾 Cache Miss: fetched from DB");
    res.status(200).json(allposts);
  } catch (error) {
    console.error("Error fetching all posts:", error);
    res.status(500).json({ message: "Failed to fetch posts." });
  }
});

//get postdetails//


router.get("/:slug", async (req, res) => {
  const slug = req.params.slug;

  try {
    const cachedPost = await redisClient.get(`post:${slug}`);
    
    if (cachedPost) {
      console.log("✅ Cache Hit for slug:", slug);
      return res.status(200).json(JSON.parse(cachedPost));
    }
    const post = await Post.findOne({ slug });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    await redisClient.set(`post:${slug}`, JSON.stringify(post), { EX: 3600 }); // EX = Expire after 1 hour

    console.log("💾 Cache Miss – fetched from DB and cached");

    res.status(200).json(post);
  } catch (error) {
    console.error("Error fetching post by slug:", error);
    res.status(500).json({ message: "Server error" });
  }
});




// GET /post/user/:userId
router.get("/user/:userId", async (req, res) => {
  try {
    const posts = await Post.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (err) {
    console.error("Error fetching user posts:", err);
    res.status(500).json({ message: "Something went wrong" });
  }
});










module.exports = router