//NUMBER OF U.S. HOUSEHOLDS THAT OWN A PET, BY TYPE OF ANIMAL

const petYear = [
  {year: 2018, total: 144.2, dog: 60.2, cat: 47.1, 'Freshwater fish': 12.5, Bird: 7.9, 'Small animal': 6.7, Reptile: 4.7, Horse: 2.6, 'Saltwater fish': 2.5},
  {year: 2016, total: 129.8, dog: 54.4, cat: 42.9, 'Freshwater fish': 12.3, Bird: 6.1, 'Small animal': 5.4, Reptile: 4.9, Horse: 2.5, 'Saltwater fish': 1.3},
  {year: 2014, total: 140.3, dog: 56.7, cat: 45.3, 'Freshwater fish': 14.3, Bird: 6.9, 'Small animal': 6.9, Reptile: 5.6, Horse: 2.8, 'Saltwater fish': 1.8},
  {year: 2012, total: 115.5, dog: 46.3, cat: 38.9, 'Freshwater fish': 11.9, Bird: 5.7, 'Small animal': 5.0, Reptile: 4.6, Horse: 2.4, 'Saltwater fish': 0.7}
];

const createBars = (data) => {

  var x = d3.scale.linear()
          .domain([0, d3.max(data.total)])

  d3.select('.year').transition()
    .duration(750)
    .selectAll('div')
    .data(data)
      .enter()
      .append('div')
      .style('height', (d)=>(`${d.total}px`))
      .text((d)=>(`${d.total}`));
};



export const displayYear = () => {
  createBars(petYear);
};
