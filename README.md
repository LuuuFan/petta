# Petta
## Overview
Petta is a data visualization project base on pet data in US. User can easily tell from graphic that the change of the different type of pets in US by year and month, and the percentage of different breed.

Petta is designed to be able to read the data from csv form file easily. Each visualization is going to show the different levels of details interactively.

## Technologies
This project is implemented with the following technologies:
* Vanilla JavaScript for overall structure
* jQuery for DOM munipulation and event handling
* D3.js for constructing each visualization component.
* Webpack to bundle and serve up the various scripts.

## Features
Petta is using D3.js for constructing each visualization component.
* Year and month change in bar chart, line chart and pie chart.
![](https://github.com/LuuuFan/petta/blob/master/doc/Screenshot%20from%202018-02-28%2010-14-29.png)
* Percentage of breed in sunburst chart
![](https://github.com/LuuuFan/petta/blob/master/doc/Screenshot%20from%202018-02-28%2010-18-53.png)
* Sample Map of breeder range
![](https://github.com/LuuuFan/petta/blob/master/doc/Screenshot%20from%202018-02-28%2010-19-24.png)


## File structure:
* lib/
  * entry.js: combined all the script in this folder and invoke them
  * year.js: draw the year bar chart
  * month.js: draw the month line chart
  * pie.js: draw the pie chart for
  * sunburst.js: draw the different breed sunbrust chart
  * map.js: draw the track of breeder for pets
* application.css: overall styling
* index.html: static page

## Select Code Snippets
### Sunburst
```js
d3.json('./lib/sunburst-2.json', (error, data)=>{
    if (error) throw error;
    const root = d3.hierarchy(data)
                    .sum((d)=>{
                      return d.size;
                    });

    partition(root);
    const path = g.selectAll('path')
                    .data(root.descendants())
                      .enter()
                      .append('path')
                        .attr('id', 'sunburstPath')
                        .attr('display', (d) => d.depth ? null: "none")
                        .attr('d', (d)=>arc(d))
                        .style('stroke', '#fff')
                        .style('fill', (d)=>colorScale((d.children ? d : d.parent).data.name))
                        .style('fill-rule', 'evenodd')
                        .on('mouseover', mouseOver);
});
```

## Future Development

-[ ] Make animation on montly line chart/
-[ ] Make the path of breeder and their puppies as arc 
-[ ] Make the breeder's puppies to show as animation
