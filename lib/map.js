
const width = $('.map').width();
const height = $('.map').height();
const margin = {top: 150, right: 10, bottom: 10, left: 80};

const svg = d3.select('.map')
                .append('svg')
                .attr('width', width)
                .attr('height', height);

const path = d3.geoPath();

const g = d3.select('svg').append('g')
              .attr('transform', `translate(${margin.left}, ${margin.top})`);

export const renderMap = () => {

  d3.json('https://d3js.org/us-10m.v1.json', function(error, us) {
    if (error) throw error;

    g.append('g')
        .attr('class', 'states')
      .selectAll('path')
      .data(topojson.feature(us, us.objects.states).features)
      .enter().append('path')
        .attr('d', path)
        .style('fill', 'gray');

    g.append('path')
        .attr('class', 'state-borders')
        .attr('d', path(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; })))
        .style('stoke', 'white')
        .style('stroke-width', '1px')
        .style('fill', 'none');
  });

}
