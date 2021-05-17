d3.csv("https://swakana0327.github.io/InfoVis2021/w04_task02.csv")
    .then( data => {
        data.forEach( d => {d.width= +d.width;});

        var config = {
            parent: '#drawing_region',
            width: 500,
            height: 400,
        };

        const piechart = new Piechart( config, data );
        piechart.update();
    })
    .catch( error => {
        console.log( error );
    });

    
class Piechart {

    constructor( config, data ) {
        this.config = {
            parent: config.parent,
            width: config.width || 256,
            height: config.height || 256,
            radius: config.radius|| 128

        }
        this.data = data;
        this.init();
    }

    init() {
        let self = this;

        self.svg = d3.select( self.config.parent )
            .attr('width', self.config.width)
            .attr('height', self.config.height);

        self.chart = self.svg.append('g')
            .attr('transform', `translate(${self.config.width/2}, ${self.config.height/2})`);

        
        self.pie = d3.pie()
            .value( d => d.width );

        self.arc = d3.arc()
            .innerRadius(self.config.radius/4)
            .outerRadius(self.config.radius);

            
    }

    update() {
        let self = this;
        self.render();
    }

    render() {
        let self = this;

        self.chart.selectAll('pie')
            .data( self.pie(self.data) )
            .enter()
            .append('path')
            .attr('d', self.arc)
            .attr('fill', 'black')
            .attr('stroke', 'white')
            .style('stroke-width', '2px');
        
    }
}
