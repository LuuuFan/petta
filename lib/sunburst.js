// import {type} from './pie';

export const renderSunburst = () => {

  const outerWidth = $('.sunburst').width();
  const outerHeight = $('.sunburst').height();
  const margin = {top: 10, right: 10, bottom: 10, left: 10};

  const radius = Math.min(outerWidth, outerHeight) * 0.4;
  const colorScale = d3.scaleOrdinal(d3.schemeCategory10);
  let totalSize = 0;

  const svg = d3.select('.sunburst').append('svg')
                  .attr('width', outerWidth)
                  .attr('height', outerHeight);

  const g = svg.append('g')
                .attr('transform', `translate(${outerWidth / 2}, ${outerHeight * 0.52})`);

  const partition = d3.partition()
                        .size([2 * Math.PI,  radius]);

  // const x = d3.scaleLinear().domain([0, radius])
  //               .range([0, Math.PI * 2])
  //               .clamp(true);

  const arc = d3.arc()
                  .startAngle((d)=>(d.x0))
                  .endAngle((d)=>(d.x1))
                  .innerRadius((d)=>(d.y0))
                  .outerRadius((d)=>(d.y1));

  d3.json('../data/sunburst-2.json', (error, data)=>{
    if (error) throw error;
    const root = d3.hierarchy(data)
                    .sum((d)=>{
                      return d.size;
                    });

    svg.append('g').attr('class', 'explanation')
          .attr('transform', `translate(${outerWidth / 2 - 20} , ${outerHeight * 0.53})`)
          .append('text')
          .attr('id', 'percentage')
          .text('')
          .style("font-size", "24px")
          .style("fill", "24px");

    svg.append('g')
          .attr('transform', `translate(${outerWidth / 2 - 50} , 80)`)
          .append('text').attr('id', 'name').text('')
          .style("font-size", "24px")
          .style("font-weight", "bold");


    partition(root);
    const path = g.selectAll('path')
                    .data(root.descendants())
                      .enter()
                      .append('path')
                        .attr('id', 'sunburstPath')
                        .attr('display', (d) => d.depth ? null: "none")
                        .attr('d', (d)=>arc(d))
                        .style('stroke', '#fff')
                        .style('fill', (d)=>colorScale((d.children ? d : d.parent).data.name))
                        .style('fill-rule', 'evenodd')
                        .on('mouseover', mouseOver);

    g.on('mouseleave', mouseLeave);

    totalSize = path.datum().value;

  });

  const mouseOver = (d) => {
    const percentage = (100 * d.value / totalSize).toPrecision(2);
    let percentageString = percentage + "%";
    const name = d.data.name;

    if (percentage < 0.1) {
      percentageString = "< 0.1%";
    }

    d3.select('.explanation').style('visibility', null);
    d3.select('#name').style('visibility', null);
    

    d3.select('#name')
      .transition().duration(1000)
      .text(name);

    d3.select('#percentage')
      .transition().duration(1000)
      .text(percentageString);


    const sequenceArray = d.ancestors().reverse();
    sequenceArray.shift(); // remove root node from the array
    // updateBreadcrumbs(sequenceArray, percentageString);

    d3.selectAll('#sunburstPath').style('opacity', 0.3);
    g.selectAll('#sunburstPath')
      .filter((node)=>{
        return (sequenceArray.indexOf(node) >= 0)
      })
      .style('opacity', 1);
  };

  const mouseLeave = () => {
    d3.selectAll('#sunburstPath').on('mouseOver', null);

    d3.selectAll('#sunburstPath')
      .transition().duration(1000)
      .style('opacity', 1)
      .on('end', ()=>{
        d3.select(this).on('mouseover', mouseOver);
      });

    d3.select("#name").style("visibility", "hidden");
    d3.select(".explanation").style("visibility", "hidden");
  };

};
