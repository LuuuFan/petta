
export const appendPie = (d) => {
  if ($('.year-pie').length !== 0) {
    $('.year-pie').remove();
    // renderPie(type(d));
  }
  // } else {
    $('<div/>', {
      'class': 'year-pie',
      'id': `${d.Year}`,
      'text': `${d.Year} NUMBER OF PETS BY TYPE OF ANIMAL`})
      .appendTo('.monthly-pie-append');
      renderPie(type(d));
  // }
}

const renderPie = (data) => {
  const outerWidth = $('.year-pie').width();
  const outerHeight = $('.year-pie').height();
  const margin = { top: 10, right: 10, bottom: 10, left: 10 };
  const innerWidth = outerWidth - margin.left - margin.right;
  const innerHeight = outerHeight - margin.top - margin.bottom;
  const radius = Math.min(innerWidth, innerHeight - 60) / 2;

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

  const pieG = g.append('g').attr('id', 'pieG');

  const xScale = d3.scalePoint().range([0, innerWidth]);
  const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

  const pie = d3.pie();
  const arc = d3.arc();
  arc.outerRadius(outerRadius);
  arc.innerRadius(innerRadius);

  const dataValues = Object.values(data).slice(2, 10);
  const dataKeys = Object.keys(data).slice(2, 10);

  xScale.domain(dataValues);
  colorScale.domain(['pet'].concat(dataKeys));
  // pie.value(d=>(d));

  const pieData = pie(dataValues);

  const finalData = [];

  pieData.forEach((e, i)=> finalData.push({key: dataKeys[i], value: e}));

  pieG.attr('transform', `translate(${innerWidth / 2}, ${innerHeight / 2 - 50})`);

  const slice = pieG.selectAll('path').data(finalData);
  slice.enter()
        .insert('path')
        .attr('d', (d)=>arc(d.value))
        .style('fill', (d)=>colorScale(d.key));

  d3.select('d').on('mouseover', (d)=>{
          // console.log(d);
        });

  slice.exit().remove();

  const legends = svg.append('g').attr('transform', `translate(10, ${innerHeight - 30})`);

  const legend = legends.selectAll('.legend')
                    .data(dataKeys)
                    .enter()
                    .append('g')
                    .attr('class', 'legend')
                    .attr('transform', (d, i) => {
                      const height = legendRectSize + legendSpacing;
                      let horz;
                      let vert;
                      if (i < 4) {
                        horz = (legendRectSize + 80 ) * i;
                        vert = height - 60;
                      } else {
                        horz = (legendRectSize + 80) * (i - 4);
                        vert = height - 30
                      }
                      return `translate(${horz}, ${vert})`;
                    });

  legend.append('rect')
        .attr('width', legendRectSize)
        .attr('height', legendRectSize)
        .style('fill', (d)=>colorScale(d))
        .style('stroke', (d)=>colorScale(d));

  legend.append('text')
        .attr('x', legendRectSize + legendSpacing)
        .attr('y', legendRectSize - legendSpacing + 3)
        .text((d)=> d);
  legend.exit().remove();
};

const changeData = (data) => {
  const prePieById = _.reduce(pie(prevData))
};

export const type = (d) => {
  Object.keys(d).forEach(key => {
    d[key] = +d[key];
  });
  return d;
};
