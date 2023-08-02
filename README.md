# JSON to SVG

Generates SVG from JSON

Installation: 'npm i json-to-svg'

```javascript

import svgen from 'json-to-svg';

import * as d3 from "d3";

console.log( 
    
    svgen(d3,{"target":"histogram","color":"blue","barwidth":20,"intergap":5,"dataset":[25,67,45,19,89],"size":2,"animate":false}) 
    
)

```

## HTTP server

```javascript

import svgen from 'json-to-svg'

import * as d3 from "d3";

import { webpage, getHtml } from 'htwrite'

import http from 'http'

let xml = svgen(d3,{"target":"histogram","color":"blue","barwidth":20,"intergap":5,"dataset":[25,67,45,19,89],"size":2,"animate":false}) 

http.createServer(function (req, res) {
    res.write(webpage("demo",'',xml));
    res.end();
  }).listen(8080);

console.log(`server started at http://localhost:8080`)

```
