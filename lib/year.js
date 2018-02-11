//NUMBER OF U.S. HOUSEHOLDS THAT OWN A PET, BY TYPE OF ANIMAL

const petYear = [
  {year: 2018, total: 144.2, dog: 60.2, cat: 47.1, 'Freshwater fish': 12.5, Bird: 7.9, 'Small animal': 6.7, Reptile: 4.7, Horse: 2.6, 'Saltwater fish': 2.5},
  {year: 2016, total: 129.8, dog: 54.4, cat: 42.9, 'Freshwater fish': 12.3, Bird: 6.1, 'Small animal': 5.4, Reptile: 4.9, Horse: 2.5, 'Saltwater fish': 1.3},
  {year: 2014, total: 140.3, dog: 56.7, cat: 45.3, 'Freshwater fish': 14.3, Bird: 6.9, 'Small animal': 6.9, Reptile: 5.6, Horse: 2.8, 'Saltwater fish': 1.8},
  {year: 2012, total: 115.5, dog: 46.3, cat: 38.9, 'Freshwater fish': 11.9, Bird: 5.7, 'Small animal': 5.0, Reptile: 4.6, Horse: 2.4, 'Saltwater fish': 0.7}
];

const createBars = () => {

  const svg = d3.select('.year-chart');
  const margin = {top: 20, right: 20, bottom: 30, left:40};
  const width = +svg.attr('width') - margin.left - margin.right;
  const height = +svg.attr('height') - margin.top - margin.bottom;

  const x = d3.scaleBand().rangeRound([0, width]).padding(0.1);
  const y = d3.scaleLinear().rangeRound([height, 0]);

  const g = svg.append('g')
                .attr('transform', `translate(${margin.left}, ${margin.top})`);

  d3.csv('../data/year.csv', (d)=>{
    d.Year = +d.Year
    d.Total = +d.Total;
    return d;
  }, (error, data)=>{
    if (error) throw error;
    x.domain(data.map(d=>(d.Year)));
    y.domain([0, d3.max(data, (d)=>(d.Total))]);
    g.append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(x));

    g.append('g')
        .attr('class', 'axis axis--y')
        .call(d3.axisLeft(y).ticks(10, '%'))
      .append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', 6)
        .attr('dy', '0.71em')
        .attr('text-anchor', 'end')
        .text('Total');

    g.selectAll('.bar')
      .data(data)
      .enter().append('rect')
        .attr('class', 'bar')
        .attr('x', (d)=>(x(d.Year)))
        .attr('y', (d)=>(y(d.Total)))
        .attr('width', x.bandwidth())
        .attr('height', (d)=>(height - y(d.Total)));
  });
}

export const displayYear = () => {
  createBars();
};
