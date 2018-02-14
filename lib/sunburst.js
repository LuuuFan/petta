// import {type} from './pie';

export const renderSunburst = () => {

  const outerWidth = $('.sunburst').width();
  const outerHeight = $('.sunburst').height();
  const margin = {top: 10, right: 10, bottom: 10, left: 10};

  const radius = Math.min(outerWidth, outerHeight) / 2;
  const colorScale = d3.scaleOrdinal(d3.schemeCategory20c);

  const svg = d3.select('.sunburst').append('svg')
                  .attr('width', outerWidth)
                  .attr('height', outerHeight);

  const g = svg.append('g')
                .attr('transform', `translate(${outerWidth / 2}, ${outerHeight * 0.52})`);

  const partition = d3.partition()
                        .size([2 * Math.Pi,  radius])

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
                      // if (d.children) {
                      //   return 0
                      // } else {
                      //   return 1
                      // }
                    });

    partition(root);
    // .datum(data)

    const path = g.selectAll('path')
                    .data(root.descendants())
                      .enter()
                      .append('path')
                        .attr('display', (d) => d.depth ? null: "none")
                        .attr('d', (d)=>{
                          // debugger
                          return arc(d);
                        })
                        .style('stroke', '#fff')
                        // .style('fill', (d)=>colorScale((d.children ? d : d.parent).name))
                        .style('fill', (d, i)=>colorScale(i))
                        // .style('fill-rule', 'evenodd')
                        // .each(stash);
  });

  // const stash = (d) => {
  //   d.x0 = d.x;
  //   d.dx0 = d.dx;
  // };

};
