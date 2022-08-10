const express = require('express');
const cookieParser = require('cookie-parser')

const app = express();

//cookie parser middleware
const secretKey = "very secret key"
app.use(cookieParser(secretKey))

app.get('/', (req, res) => {
  res.send('Hello Express app!')
});

//cookie validation middleware
function validateCookie(req, res, next) {
  const { cookies } = req
  if ("session_id" in cookies) {
    console.log("cookie has session id")
    if (cookies.session_id === 5784122) {
      next()
    } else {
      res.status(401).send("Not Authenticated")
    }
  }

  res.status(401).send("Not Authenticated")
}

app.post('/signin', validateCookie, (req, res) => {
  res.cookie("session_id", 5784122)
  res.status(200).json({ msg: "logged in" })
});

app.post('/protected', validateCookie, (req, res) => {
  res.status(200).send("You Are Authenticated")
});

app.listen(3000, () => {
  console.log('server started');
});
