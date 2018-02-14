import {type} from './pie';


export const appendMonthly = (d) => {
  if ($('.month-line').length !== 0) {
    $('.month-line').remove();
    // changeData(type(d));
  }
  // } else {
    $('<div/>', {
      'class': 'month-line',
      'id': `${d.Year}`,
      'text': `${d.Year} MONTHLY NUMBER CHANGE OF PETS`})
      .appendTo('.monthly-pie-append');
      renderMonthly(type(d));
};

const renderMonthly = (data) => {
  const outerWidth = $('.month-line').width();
  const outerHeight = $('.month-line').height();
  const margin = { left: 30, top: 10, right: 10, bottom: 70};
  const innerWidth = outerWidth - margin.left - margin.right;
  const innerHeight = outerHeight - margin.top - margin.bottom;

  const svg = d3.select('.month-line')
                  .append('svg')
                  .attr('width', outerWidth)
                  .attr('height', outerHeight);

  const g = svg.append('g')
              .attr('transform', `translate(${margin.left}, ${margin.top})`);

  const x = d3.scaleBand().rangeRound([0, innerWidth])
                .domain(Object.keys(data).slice(12));
  const y = d3.scaleLinear().rangeRound([innerHeight, 0])
                .domain([100, d3.max(Object.values(data).slice(12)) + 20]);

  g.append('g')
    .attr('class', 'axis axis--x')
    .attr('transform', `translate(0, ${innerHeight})`)
    .call(d3.axisBottom(x).tickSizeOuter(0));

  g.append('g')
      .attr('class', 'axis axis--y')
      .call(d3.axisLeft(y))
    .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '0.71em')
      .attr('text-anchor', 'end')
      .text('Total (Million)');
  const path = g.append('path').attr('class', 'line');

  const pathDataX = Object.values(data).slice(12);
  const pathDataY = Object.keys(data).slice(12);

  const lineData = [];

  pathDataX.forEach((x, i)=> {
    lineData.push({month: pathDataY[i], value: x});
  });

  const line = d3.line()
                  .x(d => (x(d.month)))
                  .y(d => (y(d.value)))
                  .curve(d3.curveCardinal);

  path.attr('d', line(lineData))
      .style('fill', 'none')
      .style('stroke', 'black')
      .style('stroke-width', '1px');

};
