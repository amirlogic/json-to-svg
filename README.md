# JSON to SVG

Generate SVG from JSON


```javascript

import * as d3 from "d3";

const { svgen } = require('json-to-svg')

console.log( svgen(d3,{"target":"histogram","color":"blue","barwidth":20,"intergap":5,"dataset":[25,67,45,19,89],"size":2,"animate":true}) )

```
