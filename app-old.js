const http = require('http');
const fs = require('fs');
const PORT = 3000;
const server = http.createServer((req, res) => {
    if (req.url === '/about') {
        res.writeHead(200, {
            "Content-Type": "application/json"
        })
        res.end(JSON.stringify({
            data: 'I am about page',
        }));
        res.end();
    } else if (req.url === '/create-file') {
        const writeToFile = '<h1>Just testing bro1</h1>';
        fs.writeFile("temp/test.html", writeToFile, (err) => {
            if (err) {
                console.log(err, "Ddd");
                throw err
            }
            res.write('File has been created');
            res.end();

        })

    } else if (req.url === '/update-file') {
        const writeToFile = '<h1>Edit stuff</h1>';
        for(let x = 0; x<5;x++){
            fs.appendFile("temp/test.html", writeToFile, (err) => {
                if (err) {
                    console.log(err, "Ddd");
                    throw err
                }
            })
        }
        
        res.write('File has been created');
        res.end();

    }
    else {
        res.writeHead(404, {
            "Content-Type": "text/html"
        });
        fs.readFile("page/notfound.html", "utf-8", (err, data) => {
            if (err) {
                console.log('dff', err);
                throw err;
            }
            res.write(data);
            res.end();
        });


    }

})

server.listen(PORT);