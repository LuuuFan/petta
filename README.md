# Petta
## Overview
Petta is a data visualization project base on pet data in US. User can easily tell from graphic that the change of the different type of pets in US by year and month, and the percentage of different breed.

Petta is designed to be able to read the data from csv form file easily. Each visualization is going to show the different levels of details interactively.

Petta is using D3.js for constructing each visualization component.
* Year and month change in bar chart, line chart and pie chart.
![](/doc/Screenshot from 2018-02-28 10-14-29.png)
* Percentage of breed in sunburst chart
![](/doc/Screenshot from 2018-02-28 10-18-53.png)
* Sample Map of breeder range
![](/doc/Screenshot from 2018-02-28 10-19-24.png)

## Technologies
This project is implemented with the following technologies:
* Vanilla JavaScript for overall structure
* jQuery for DOM munipulation and event handling
* D3.js for constructing each visualization component.
* Webpack to bundle and serve up the various scripts.

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


## Future Development
