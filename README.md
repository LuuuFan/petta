# Petta
## Overview
Petta is a data visualization project base on pet data in US. User can easily tell from graphic that the change of the different type of pets in US by year and month, and the percentage of different breed.

Petta will be designed to be able to read the data from csv form file easily. Each visualization is going to show the different levels of details interactively.

Petta is going to use D3.js for constructing each visualization component.
* Year and month change in bar chart
* Percentage of breed in sunburst chart
* (Bonus) Map of breeder range

## Technologies
This project will be implemented with the following technologies:
* Vanilla JavaScript for overall structure
* jQuery for DOM munipulation and event handling
* D3.js for constructing each visualization component.
* Webpack to bundle and serve up the various scripts.

File structure:
* data/
* lib/
  * entry.js: combined all the script in this folder and invoke them
  * year.js: draw the year bar chart
  * month.js: draw the month bar chart
  * breed.js: draw the different breed sunbrust chart
  * map.js (bonus): draw the track of breeder for pets
* application.css
* index.html

## MVP
In Petta, users will be able to:

- [ ] See the overview of number of U.S. households that own a pet, by type of animal and year.
- [ ] Use can click the year bar to see the different type of pet in this year.
- [ ] User can double click to check the monthly change of this year.
- [ ] By clicking type of pet, petta will show the percentage of breed in this type as a sunbrust chart.

Bonus
<<<<<<< HEAD
- [ ] By clicking the breed of pet, user can see the breeder location and their pets destination.


## Wireframes
![](https://res.cloudinary.com/ddwejrtgh/image/upload/v1518402124/Screenshot_from_2018-02-11_18-13-50_csymhb.png)![](https://res.cloudinary.com/ddwejrtgh/image/upload/v1518404143/Screenshot_from_2018-02-11_18-55-32_yctcem.png)

## Timeline

### Over weekend:
- [ ] Research the interested data sets and design project
- [ ] Finish proposal
- [ ] Completed D3 Tutorial
- [ ] Setup all necessary Node modules, including getting webpack up and running. Create `webpack.config.js` adn `package.json`.
- [ ] Finish basic bar chart practice

### Day 1
- [ ] Deep learning D3 bar chart, get familiar with sunbrust chart
- [ ] Finish year bar chart and interactive the type of pet and monthly line chart
- [ ] Finish monthly line chart

### Day 2
- [ ] Get more data about breed or emulate some
- [ ] Finish the type of pet by year
- [ ] Start working on sunbrust chart

## Day 3
- [ ] Dedicate on sunbrust chart and finish it.
- [ ] Interactive sunbrust chart
- [ ] Bonus: learn map tracking

### Day 4
- [ ] Polish the unideal component
- [ ] Emulate breeder tracking data, try to make map tracking chart

## Bonus features
- [ ] User can click breed to see the breeder in US and their pets track
