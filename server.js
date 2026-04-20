const http = require("http")
const fs = require("fs")
const port = 3000

const server = http.createServer((req, res) => {
    const requestUrl = new URL(req.url, `http://${req.headers.host}`)
    const pathname = requestUrl.pathname

    // ifs for html requests
    if(pathname === "/books")
    {
        console.log("Sending books/index.html file")
        res.writeHead(200, {"Content-Type" : "text/html"})
        res.write(fs.readFileSync("books/index.html"))
        res.end()
    }

    else if(pathname === "/book")
    {
        console.log("Sending book/index.html file")
        res.writeHead(200, {"Content-Type" : "text/html"})
        res.write(fs.readFileSync("books/book/index.html"))
        res.end()
    }

    else if(pathname === "/sing_up")
    {
        console.log("Sending sing_up/index.html file")
        res.writeHead(200, {"Content-Type" : "text/html"})
        res.write(fs.readFileSync("sing_up/index.html"))
        res.end()
    }

    else if(pathname === "/log_in")
    {
        console.log("Sending log_in/index.html file")
        res.writeHead(200, {"Content-Type" : "text/html"})
        res.write(fs.readFileSync("log_in/index.html"))
        res.end()
    }

    //ifs for css requests
    else if(req.url === "/books/style.css")
    {
        console.log("Sending books/style.css file")
        res.writeHead(200, {"Content-Type" : "text/css"})
        res.write(fs.readFileSync("books/style.css"))
        res.end()
    }

    else if(req.url === "/book/style.css")
    {
        console.log("Sending books/book/style.css file")
        res.writeHead(200, {"Content-Type" : "text/css"})
        res.write(fs.readFileSync("books/book/style.css"))
        res.end()
    }

    else if(req.url === "/sing_up/style.css")
    {
        console.log("Sending sing_up/style.css file")
        res.writeHead(200, {"Content-Type" : "text/css"})
        res.write(fs.readFileSync("sing_up/style.css"))
        res.end()
    }

    else if(req.url === "/log_in/style.css")
    {
        console.log("Sending log_in/style.css file")
        res.writeHead(200, {"Content-Type" : "text/css"})
        res.write(fs.readFileSync("log_in/style.css"))
        res.end()
    }

    
    //ifs for frontend js requests
    else if(req.url === "/books/script.js")
    {
        console.log("Sending books/script.js file")
        res.writeHead(200, {"Content-Type" : "application/javascript"})
        res.write(fs.readFileSync("books/script.js"))
        res.end()
    }

    else if(req.url === "/book/script.js")
    {
        console.log("Sending books/book/script.js file")
        res.writeHead(200, {"Content-Type" : "application/javascript"})
        res.write(fs.readFileSync("books/book/script.js"))
        res.end()
    }

    else if(req.url === "/sing_up/script.js")
    {
        console.log("Sending sing_up/script.js file")
        res.writeHead(200, {"Content-Type" : "application/javascript"})
        res.write(fs.readFileSync("sing_up/script.js"))
        res.end()
    }

    else if(req.url === "/log_in/script.js")
    {
        console.log("Sending log_in/script.js file")
        res.writeHead(200, {"Content-Type" : "application/javascript"})
        res.write(fs.readFileSync("log_in/script.js"))
        res.end()
    }

    else 
    {
        console.log("Error 404: " + req.url)
        res.writeHead(404, {"Content-Type" : "text/html"})
        res.write("Error 404. Cannot find this file")
        res.end()
    }
})

server.listen(port, () => {
    console.log("Server was started");
})
