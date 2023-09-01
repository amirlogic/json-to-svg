
//import * as d3 from "d3";

const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const { document } = (new JSDOM(`<!DOCTYPE html><html><body></body></html>`)).window;


const svgen = (d3,jsondata={})=>{

    let svgwidth = 500
    let svgheight = 500

    let svg = d3.select(document.body)
                    .append('svg')
                        .attr('width', svgwidth)
                        .attr('height', svgheight)
                        .attr('xmlns', 'http://www.w3.org/2000/svg');

    if( jsondata.hasOwnProperty('bgcolor') ){

        svg.append('rect')
                .attr('width', svgwidth)
                .attr('height', svgheight)
                .attr('fill', jsondata.bgcolor);
    }


    if( jsondata?.target === 'demo'){

        svg.append('circle')
                .attr('cx', 250)
                .attr('cy', 150)
                .attr('r', 55)
                .attr('fill', 'blue');
    }
    else if( jsondata?.target === 'text'){

        svg.append('text')
            .attr("y", 150)
            .attr("x", 150)
            .attr("font-size", 20)
            .attr("fill", "red")
                .text(jsondata?.content)

    }
    else if( jsondata?.target === 'circles'){

        svg.append('g')
                //.attr('fill', origcolor)
                //.attr('transform', `translate(${200 * zoom}, ${200 * zoom})`)
            .selectAll('circle')
            .data(jsondata?.dataset)
            .join('circle')
                .attr('cx', d => d?.cx)
                .attr('cy', d => d?.cy)
                .attr('r', d => d?.r)
                .attr('fill', d => d?.color)

    }
    else if( jsondata?.target === 'table'){

        let toptext = Object.keys(jsondata?.dataset[0])

        /* svg.append('table')
            .append("thead")
                .join("tr")
                .selectAll("th")
                .data(toptext)
                .join("th")
                .text(d => d)
                .style("background-color", "#aaa")
                .style("color", "#fff")
            .append("tbody")
                .selectAll("tr")
                .data(jsondata?.dataset)
                .join("tr")
                .selectAll("td")
                .data(row => Object.values(row))
                .join("td")
                .text(d => d);    // d.value */



    }
    else if( jsondata?.target === 'histogram'){

        let size = ( jsondata.hasOwnProperty('size') ) ? parseFloat(jsondata.size) : 1;

        const dmax = d3.max(jsondata?.dataset);

        let animate = ( jsondata.hasOwnProperty('animate') ) ? jsondata.animate : false;

        if(animate){

            function enterAnim(enter){

                enter.append('rect')
                    .attr('x', (d, i) => i * (jsondata?.intergap+jsondata?.barwidth) * size)
                    .attr('width', jsondata?.barwidth*size)
                    .attr("y", d =>(dmax - d)*size)
                    .attr("height", d => d*size)
                    .attr("class", 'bar')
                

                .call( rect => 
                    rect.append('animate')
                    .attr('attributeName', "height")
                    .attr('values', (d)=> `0;1;${ d*size }` )
                    .attr('keyTimes', (d,i)=> `0;${Math.trunc(1000*(1-(1/(3*i+3))))/1000};1` ) // ="0; 0.25; 0.5; 0.75; 1"
                    .attr('dur', (d,i)=>`${i*2+2}s`)  
                    .attr('repeatcount', 1)
                    
                )

                .call( rect => 
                    rect.append('animate')
                    .attr('attributeName', "y")
                    .attr('values', (d)=> `${dmax*size};${dmax*size};${ (dmax - d)*size }` )
                    .attr('keyTimes', (d,i)=> `0;${Math.trunc(1000*(1-(1/(3*i+3))))/1000};1` )
                    .attr('dur', (d,i)=>`${i*2+2}s`)  
                    .attr('repeatcount', 1)
                )
            }

            svg.append('g')
                .attr('fill', jsondata?.color)
                .attr('transform', `translate(${200/size},${200/size})`)
            .selectAll('rect')
            .data(jsondata?.dataset)
            .join(
                enter=>enterAnim(enter)
            )
            /* .selectAll('animate')
            .data([d => d], (h,i)=>{ return { "begin":i, "height":h} } )        // 
            .join( 
                enter=>enter.append('animate')
                    .attr('attributeName', "height")
                    .attr('values', (d)=> `0;${ d.height }` )   // `0;50`   function(d){ return `0;${ d }` }
                    .attr('begin', d => `2s` ) // `${d.begin}s`   () =>{ indx++; `${ indx }s`; }
                    .attr('dur', "1s")  
                    .attr('repeatcount', 1)
            ) */
        }
        else{

            svg.append('g')
                .attr('fill', jsondata?.color)
                .attr('transform', `translate(${200/size},${200/size})`)
            .selectAll('rect')
            .data(jsondata?.dataset)
            .join('rect')
                .attr('x', (d, i) => i * (jsondata?.intergap+jsondata?.barwidth) * size)
                .attr('width', jsondata?.barwidth*size)
                .attr("y", d =>(dmax - d)*size)
                .attr("height", d => d*size)
        }

        svg.append('g')
            .attr('fill', jsondata?.color)
            .attr('transform', `translate(${200/size},${200/size})`)
        .selectAll('text')
        .data(jsondata?.dataset)
        .join('text')
            .attr('x', (d, i) => i * (jsondata?.intergap+jsondata?.barwidth) * size)
            .attr("y", d =>(dmax - d)*size - 20)
            .style("font-size", 10+size*2)
            .style('font-family', 'sans-serif')
            .text(d => d)
		

    }

    //console.log(svg.node().outerHTML)

    return `<?xml version="1.0" encoding="utf-8"?>${svg.node().outerHTML}`;
}


module.exports = svgen;