
export const appendPie = (d) => {
  if ($('.year-pie').length !== 0) {
    $('.year-pie').remove();
  }
  $('<div/>', {
    'class': 'year-pie',
    'id': `${d.Year}`,
    'text': `${d.Year} NUMBER OF PETS BY TYPE OF ANIMAL`})
    .appendTo('.main');
  renderPie(type(d));
}

const renderPie = (data) => {
  const outerWidth = $('.year-pie').width();
  const outerHeight = $('.year-pie').height();
  const margin = { top: 10, right: 10, bottom: 10, left: 10 };
  const innerWidth = outerWidth - margin.left - margin.right;
  const innerHeight = outerHeight - margin.top - margin.bottom;
  const radius = Math.min(innerWidth - 90, innerHeight) / 2;

  const outerRadius = radius * 0.8;
  const innerRadius = outerRadius / 2;

  const legendRectSize = radius * 0.05;
  const legendSpacing = radius * 0.02;

  const svg = d3.select('.year-pie')
                .append('svg')
                  .attr('width', outerWidth)
                  .attr('height', outerHeight);

  const g = svg.append('g')
              .attr('transform', `translate(${margin.left}, ${margin.top})`);
  const pieG = g.append('g');
  const colorLegengG = g.append('g')
                          .attr('class', 'color-legend')
                          .attr('transform', `translate(${outerRadius * 2 + 10}, ${margin.top})`)

  const xScale = d3.scalePoint().range([0, innerWidth]);
  const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

  const pie = d3.pie();
  const arc = d3.arc();
  arc.outerRadius(outerRadius);
  arc.innerRadius(innerRadius);

  xScale.domain(Object.values(data).slice(2));
  colorScale.domain(Object.keys(data).slice(2));
  pie.value(d=>(d));

  const pieData = pie(Object.values(data).slice(2));
  pieG.attr('transform', `translate(${innerWidth / 2 - 90}, ${innerHeight / 2})`);

  const slice = pieG.selectAll('path').data(pieData);
  slice.enter()
        .append('path')
        .attr('d', (d)=>arc(d))
        .style('fill', (d, i)=>colorScale(i));
  slice.transition().duration(1000);

  slice.exit().remove();

  const legends = svg.append('g').attr('transform', `translate(${innerWidth - 90}, ${innerHeight/2})`);

  const legend = legends.selectAll('.legend')
                    .data(Object.keys(data).slice(2))
                    .enter()
                    .append('g')
                    .attr('class', 'legend')
                    .attr('transform', (d, i) => {
                      const height = legendRectSize + legendSpacing;
                      const offset = height * Object.keys(data).slice(2).length / 2;
                      const horz = -3 * legendRectSize;
                      const vert = i * height - offset;
                      return `translate(${horz}, ${vert})`;
                    });

  legend.append('rect')
        .attr('width', legendRectSize)
        .attr('height', legendRectSize)
        .style('fill', (d, i)=>colorScale(i))
        .style('stroke', (d, i)=>colorScale(i));

  legend.append('text')
        .attr('x', legendRectSize + legendSpacing)
        .attr('y', legendRectSize - legendSpacing + 3)
        .text((d)=> d);

  legend.exit().remove();
};

const type = (d) => {
  d.Dog = +d.Dog;
  d.Cat = +d.Cat;
  d.Bird = +d.Bird;
  d['Freshwater Fish'] = +d['Freshwater Fish'];
  d.Horse = +d.Horse;
  d.Reptile = + d.Reptile;
  d['Saltwater Fish'] = +d['Saltwater Fish'];
  d['Small Animal'] = +d['Small Animal'];
  return d;
};
