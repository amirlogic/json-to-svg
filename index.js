
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
                        .attr('height', svgheight);

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

        const dmax = d3.max(jsondata?.dataset);

        svg.append('g')
		.attr('fill', jsondata?.color)
		.attr('transform', `translate(200,200)`)
		.selectAll('rect')
		.data(jsondata?.dataset)
		.join('rect')
		.attr('x', (d, i) => i * (jsondata?.intergap+jsondata?.barwidth))
		.attr('width', jsondata?.barwidth)
		.attr("y", d =>(dmax - d))
		.attr("height", d => d)
		

    }
    
    console.log(svg.node().outerHTML)

    return svg.node().outerHTML;
}

module.exports = { svgen }
