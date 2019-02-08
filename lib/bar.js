//NUMBER OF U.S. HOUSEHOLDS THAT OWN A PET, BY TYPE OF ANIMAL
import {appendPie} from './pie';
import {appendMonthly} from './monthly';

const outerWidth = $('.year').width();
const outerHeight = $('.year').height();
const margin = { top: 10, right: 10, bottom: 100, left: 40 };
const innerWidth = outerWidth - margin.left - margin.right;
const innerHeight = outerHeight - margin.top - margin.bottom;
const svg = d3.select('.year')
  .append('svg')
  .attr('id', 'year-chart')
  .attr('width', outerWidth)
  .attr('height', outerHeight);

const x = d3.scaleBand().rangeRound([0, innerWidth]).padding(0.1);
const y = d3.scaleLinear().rangeRound([innerHeight, 0]);

const g = svg.append('g')
  .attr('width', innerWidth)
  .attr('height', innerHeight)
  .attr('transform', `translate(${margin.left}, ${margin.top})`);

export const renderYear = () => {
  d3.csv('./lib/year.csv', (d)=>{
    d.Total = +d.Total;
    return d;
  }, (error, data)=>{
    if (error) throw error;
    x.domain(data.map(d=>(d.Year)));
    y.domain([80, d3.max(data, (d)=>(d.Total)) + 10]);

    g.append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', `translate(0, ${innerHeight})`)
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
          .attr('id', (d)=>(`year${d.Year}`))
          .attr('x', (d)=>(x(d.Year)))
          .attr('y', (d)=>(y(d.Total)))
          .attr('width', x.bandwidth())
          .attr('height', 0)
          .transition()
          .duration(200)
          .delay((d, i) => i * 200)
          .attr('height', (d)=>(innerHeight - y(d.Total)));

    bar.selectAll('.bar').on('click', (d)=>{
      const div = document.querySelector('.monthly-pie-append');
      div.classList.add('extend');
      $('.monthly-pie-append').animate({ scrollTop: 0 }, "slow");
      appendMonthly(d);
      appendPie(d);
    });

    bar.selectAll('text').data(data).enter()
          .append('text')
          .attr('x', (d)=>(x(d.Year) + x.bandwidth() / 4))
          .attr('y', (d)=>(y(d.Total) + 20))
          .attr('fill', 'white')
          .transition().duration(2000).delay(2000)
          .text((d)=>(`${d.Total}`));
  });
}
