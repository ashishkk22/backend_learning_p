//server creation
// 1. http module
const http = require("http")
const fs = require("fs")
const server = http.createServer((req, res) => {
  console.log("request has been made from browser to server")
  console.log(req.method)
  console.log(req.url)
  res.setHeader("Content-Type", "text/html")
  //   res.write("<h1>Hello guys how are you</h1>")
  //   res.end()
  let path = "./viewss"
  switch (req.url) {
    case "/":
      path += "/index.html"
      res.statusCode = 200
      break
    case "/about":
      path += "/about.html"
      res.statusCode = 200
      break
    case "/about-me":
      res.statusCode = 301
      res.setHeader("Location", "/about")
      res.end()
      break
    default:
      path += "/404.html"
      res.statusCode = 404
      break
  }
  fs.readFile(path, (err, fileData) => {
    if (err) {
      console.log(err)
    } else {
      //   res.write(fileData)
      res.end(fileData)
    }
  })
})

//port number, host , callback fun
server.listen(3000, "localhost", () => {
  console.log("server is listening at 3000")
})
