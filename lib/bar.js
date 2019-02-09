//NUMBER OF U.S. HOUSEHOLDS THAT OWN A PET, BY TYPE OF ANIMAL
import {appendPie} from './pie';
import {appendMonthly} from './line';

let svg, g;


const updateDeminsion = () => {
  const outerWidth = $('.year').width();
  const outerHeight = $('.year').height();
  const margin = { top: 10, right: 10, bottom: 100, left: 40 };
  const innerWidth = outerWidth - margin.left - margin.right;
  const innerHeight = outerHeight - margin.top - margin.bottom;
  return {outerWidth, outerHeight, margin, innerWidth, innerHeight}
}


const renderSVG = () => {
  const {outerWidth, outerHeight, margin, innerWidth, innerHeight} = updateDeminsion();
  svg = svg || d3.select('.year')
          .append('svg')
          .attr('id', 'year-chart')
          .attr('width', outerWidth)
          .attr('height', outerHeight);
  return {svg};
}

export const renderYear = (idx) => {
  const {outerWidth, outerHeight, margin, innerWidth, innerHeight} = updateDeminsion();
  const i = idx;
  const {svg} = renderSVG();
  g = g || svg.append('g')
            .attr('width', innerWidth)
            .attr('height', innerHeight)
            .attr('transform', `translate(${margin.left}, ${margin.top})`);

  d3.csv('./lib/year.csv', (d)=>{
    d.Total = +d.Total;
    return d;
  }, (error, data)=>{
    if (error) throw error;
    const x = d3.scaleBand().rangeRound([0, innerWidth]).padding(0.1);
    const y = d3.scaleLinear().domain(d3.min(data), d3.max(data)).rangeRound([0, innerHeight]);

    x.domain(data.map(d=>(d.Year)));
    y.domain([80, d3.max(data, (d)=>(d.Total)) + 10]);

    d3.selectAll('.axis').remove();
    d3.selectAll('.bar').remove();
    d3.selectAll('.bar-text').remove();

    g.append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', `translate(0, ${innerHeight})`)
      .call(d3.axisBottom(x));

    g.append('g')
        .attr('class', 'axis axis--y')
        // .call(d3.axisLeft(y))
      .append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', 6)
        .attr('dy', '0.71em')
        .attr('text-anchor', 'end')
        .text('Total (Million)');

    const barEnter = g.append('g').attr('class', 'bars').selectAll('.bar').data(data);
    barEnter.enter().append('rect')
              .attr('class', 'bar')
              .attr('id', (d)=>(`year${d.Year}`))
              .attr('x', (d)=>(x(d.Year)))
              .attr('width', x.bandwidth())
              .attr('y', i ? d => innerHeight - y(d.Total) : innerHeight)
              .attr('height', i ? d => y(d.Total) : 0)
              .call(i ? dummy : transition)

    function dummy(){
      return;
    }

    function transition(bar){
      bar.transition()
          .duration(200)
          .delay((d, i) => i * 200)
          .attr('y', d => innerHeight - y(d.Total))
          .attr('height', (d)=>(y(d.Total)));
    }

    g.selectAll('.bar').on('click', (d)=>{
      const div = document.querySelector('.monthly-pie-append');
      div.classList.add('extend');
      $('body, html').animate({ scrollTop: $(div).offset().top - 20}, "slow");
      appendMonthly(d);
      appendPie(d);
    });

    barEnter.enter()
          .append('text')
          .attr('class', 'bar-text')
          .attr('x', (d)=>(x(d.Year) + x.bandwidth() / 4))
          .attr('y', (d)=>(innerHeight - y(d.Total) + 20))
          .attr('fill', 'white')
          .transition().duration(2000).delay(i ? 0 : 2000)
          .text((d)=>(`${d.Total}`));
  });
}
