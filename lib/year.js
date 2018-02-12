//NUMBER OF U.S. HOUSEHOLDS THAT OWN A PET, BY TYPE OF ANIMAL

const createBars = () => {

  const svg = d3.select('#year-chart');
  const margin = {top: 20, right: 20, bottom: 30, left:40};
  const width = $('#year-chart').width() - margin.left - margin.right;
  const height = $('#year-chart').height() - margin.top - margin.bottom;

  const x = d3.scaleBand().rangeRound([0, width]).padding(0.1);
  const y = d3.scaleLinear().rangeRound([height, 0]);

  const g = svg.append('g')
                .attr('transform', `translate(${margin.left}, ${margin.top})`);

  d3.csv('../data/year.csv', (d)=>{
    // d.Year = +d.Year;
    d.Total = +d.Total;
    return d;
  }, (error, data)=>{
    if (error) throw error;

    x.domain(data.map(d=>(d.Year)));
    y.domain([0, d3.max(data, (d)=>(d.Total)) + 30]);

    g.append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(x));

    g.append('g')
        .attr('class', 'axis axis--y')
        .call(d3.axisLeft(y))
      .append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', 6)
        .attr('dy', '0.71em')
        .attr('text-anchor', 'end')
        .text('Total (Million)');

    const bar = g.append('g').attr('class', 'bars');

    bar.selectAll('.bar').data(data).enter()
        .append('rect')
          .attr('class', 'bar')
          .attr('x', (d)=>(x(d.Year)))
          .attr('y', (d)=>(y(d.Total)))
          .attr('width', x.bandwidth())
          .attr('height', (d)=>(height - y(d.Total)));

    bar.selectAll('text').data(data).enter()
          .append('text')
          .attr('x', (d)=>(x(d.Year) + x.bandwidth() / 3))
          .attr('y', (d)=>(y(d.Total) + 20))
          .attr('fill', 'white')
          .text((d)=>(`${d.Total}`));
  });
}

export const displayYear = () => (createBars());
