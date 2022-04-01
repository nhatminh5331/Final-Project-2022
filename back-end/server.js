require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const SocketServer = require("./socketServer")

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

//Socket.io

const http = require('http').createServer(app)
const io = require('socket.io')(http)

io.on('connection',socket => {
  SocketServer(socket)
})

//Routes
app.use('/api', require("./routes/authRouter"));
app.use('/api', require("./routes/categoryRouter"))
app.use('/api', require("./routes/postRouter"))
app.use('/api', require("./routes/userRouter"))
app.use('/api', require("./routes/commentRouter"))
app.use('/api', require("./routes/chatRouter"))

//Connect to MongoDB
const URL = process.env.MONGODB_URL;
mongoose.connect(
  URL,
  {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    console.log("Connected to MongoDB");
  }
);

const port = process.env.PORT || 5000;
http.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
