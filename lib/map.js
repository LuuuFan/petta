
const width = $('.map').width();
const height = $('.map').height();
const margin = {top: 150, right: 10, bottom: 10, left: 80};

const svg = d3.select('.map')
                .append('svg')
                .attr('width', width)
                .attr('height', height);


const g = d3.select('svg').append('g')
              .attr('transform', `translate(${margin.left}, ${margin.top})`);

const projection = d3.geoAlbersUsa()
                      // .rotate([86.884, 0])
                      // .center([0, 33.507])
                      // .translate([width / 2, height / 2])
                      // .scale(100);

const path = d3.geoPath()
                .projection(projection);

const colorScale = d3.scaleOrdinal(d3.schemeCategory20c);


export const renderMap = (error, data) => {

  if (error) throw error;

  g.append('g')
    .attr('class', 'states')
    .selectAll('path')
    .data(topojson.feature(data, data.objects.states).features)
    .enter().append('path')
      .attr('d', (d)=>{
        return path(d);
      })
      .attr('class', 'state')
      .attr('id', (d)=>(`state-${d.id}`))
      .style('stoke', 'white')
      .style('stroke-width', 1)
      .style('fill', 'gray')
      .on('mouseover', (d)=>{
        d3.select(`#state-${d.id}`)
            .style('fill', (d)=>colorScale(d.id))
      })
      .on('mouseleave', ()=>{
        d3.selectAll('.state')
            .style('fill', 'gray')
      });

    // g.append('path')
    //     .attr('class', 'state-borders')
    //     .attr('d', path(topojson.mesh(data, data.objects.states, function(a, b) { return a !== b; })))
    //     .style('stoke', 'white')
    //     .style('stroke-width', '1px')
    //     .style('fill', 'none');

}
