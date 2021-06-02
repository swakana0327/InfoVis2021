d3.csv("https://vizlab-kobe-lecture.github.io/InfoVis2021/W04/data.csv")
    .then( data => {
        data.forEach( d => { d.x = +d.x; d.y = +d.y; });

        var config = {
            parent: '#drawing_region',
            width: 256,
            height: 256,
            margin: {top:10, right:10, bottom:20, left:10}
        };

        const scatter_plot = new ScatterPlot( config, data );
        scatter_plot.update();
    })
    .catch( error => {
        console.log( error );
    });

class ScatterPlot {

    constructor( config, data ) {
        this.config = {
            parent: config.parent,
            width: config.width || 256,
            height: config.height || 256,
            margin: config.margin || {top:10, right:10, bottom:10, left:10}
        }
        this.data = data;
        this.init();
    }

    init() {
        let self = this;

        self.svg = d3.select( self.config.parent )
            .attr('width', self.config.width)
            .attr('height', self.config.height)
         

        self.chart = self.svg.append('g')
            .attr('transform', `translate(${self.config.margin.left}, ${self.config.margin.top})`);

        self.inner_width = self.config.width - self.config.margin.left - self.config.margin.right;
        self.inner_height = self.config.height - self.config.margin.top - self.config.margin.bottom;

        self.xscale = d3.scaleLinear()
            .range( [0, self.inner_width] );

        self.yscale = d3.scaleLinear()
            .range( [self.inner_height,0] );

        self.xaxis = d3.axisBottom( self.xscale )
            .ticks(12);
            

        self.xaxis_group = self.chart.append('g')
            .attr('transform', `translate(30, 215)`);

 

        self.yaxis_group = self.chart.append('g')
            .attr("class", "y axis")
            .attr('transform', `translate(30,-12)`);

        self.yaxis = d3.axisLeft( self.yscale )
            .ticks(12);

          // SVG領域にテキスト要素を追加
        self.svg.append("text")
        .attr("x", 100)  // x座標
        .attr("y", 13) // y座標
        .text("Task2 Title")  // プレーンテキスト

        self.svg.append("text")
        .attr("x", 100)  // x座標
        .attr("y", 256) // y座標
        .text("x-label")  // プレーンテキスト

        self.svg.append("text")
        .attr("x", 10)  // x座標
        .attr("y", 100) // y座標
        .attr("style", "fill: black; writing-mode: tb; glyph-orientation-vertical: 0")
        .text("y-label")  // プレーンテキスト
   
    }


 


    update() {
        let self = this;

        const xmin = d3.min( self.data, d => d.x );
        const xmax = d3.max( self.data, d => d.x );
        self.xscale.domain( [xmin, xmax] );

        const ymin = d3.min( self.data, d => d.y );
        const ymax = d3.max( self.data, d => d.y );
        self.yscale.domain( [ymin, ymax] );

        self.render();
    }

    render() {
        let self = this;

        self.chart.selectAll("circle")
            .data(self.data)
            .enter()
            .append("circle")
            .attr("cx", d => self.xscale( d.x ) )
            .attr("cy", d => self.yscale( d.y ) )
            .attr("r", d => d.r );

        self.xaxis_group
            .call( self.xaxis );

        self.yaxis_group
            .call( self.yaxis );
    }


}