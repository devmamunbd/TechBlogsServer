const express = require('express')
const cors = require('cors')
const app = express()
require('dotenv').config()
const port = process.env.PORT || 9000
const { MongoClient, ServerApiVersion } = require('mongodb');



app.use(cors())
app.use(express.json())




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.lskduub.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    const blogsCollention = client.db("TechBlogs").collection("blogs")
    const usersCollention = client.db("TechBlogs").collection("users")


    
    app.post('/users', async(req,res)=> {
      const users = req.body
      const result = await usersCollention.insertOne(users)
      res.send(result)
    })

    app.get("/allBlogs", async(req,res)=> {
      const result = await blogsCollention.find().toArray()
      res.send(result)
    })



    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);





app.get('/', (req, res) => {
    res.send('Hello Tech Blogs')
})
app.listen(port, ()=>{
    console.log(`Tech Blogs Server Is Running ${port}`)
})