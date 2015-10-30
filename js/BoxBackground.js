(function (root, factory) {
        root.BoxBackground = factory();
}(this, function () {

    var BoxBackground = {};

    BoxBackground.Graph = function(args) {

        var self = this;

        this.initialize = function(args) {

            if (!args.element) throw "BoxBackground.Graph needs a reference to an element";
            if (args.element.nodeType !== 1) throw "BoxBackground.Graph element was defined but not an HTML element";

            this.defaults = {
                height: 750,
                cellWidth: 75, 
                cellHeight: 75, 
                cellSpace: 0,
                lagTime: 400,
                mainColor: 'rgb(0, 46, 98)',
                displayType: 'slowfade'
            };

            this.element = args.element;
            this.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
            this.height = args.height || this.defaults.height;
            this.cellWidth = args.cellWidth || this.defaults.cellWidth;
            this.cellHeight = args.cellHeight || this.defaults.cellHeight;
            this.cellSpace = args.cellSpace || this.defaults.cellSpace;
            this.lagTime = args.lagTime || this.defaults.lagTime;
            this.mainColor = args.mainColor || this.defaults.mainColor;
            this.dataset = [];

            this.displayType = args.displayType || this.defaults.displayType;
            if ((this.displayType!='click') && (this.displayType!='slowfade')&&(this.displayType!='rain')){
                console.error('Make sure you entered a correct display type to not use default');
                this.displayType = 'slowfade';
            };


            this.createMatrixData();
            this.renderChart();
            this.initializeDisplayType();
        };

        this.initializeDisplayType = function() {

            if (this.displayType == 'click'){

                //change cell on click
                d3.selectAll("rect")
                        .on("click", function(d,i) {
                            d3.select(this)
                            .transition()
                            .duration(3000)
                            .attr("fill",'white');
                        });

            }
            else if (this.displayType == 'slowfade'){

                // random cell color change
                window.setInterval( function() {
                                var randint = Math.floor(Math.random() * self.dataset.length);

                                d3.select(self.svg.selectAll('rect')[0][randint])
                                    .transition()
                                    .duration(3000)
                                    .attr("fill-opacity",'.4')
                                    .transition()
                                    .duration(3000)
                                    .attr("fill-opacity",function() { return Math.random()*(1-0.8+1)+0.8; } );

                            }, 2000);

            }
            else {

                // defaults to 'rain'
                // full row change and change back
                window.setInterval( function() {
                                var lag = 0;
                                var randint = Math.floor(Math.floor(Math.random() * self.maxcols) * self.maxrows);
                                for (var row=randint;row<randint+self.maxrows;row++) {

                                    d3.select(self.svg.selectAll('rect')[0][row])
                                        .transition()
                                        .delay(lag)
                                        .duration(3000)
                                        .attr("fill-opacity",'.4')
                                        .transition()
                                        .duration(4000)
                                        .attr("fill-opacity",function() { return Math.random()*(1-0.8+1)+0.8; } );

                                    lag+=self.lagTime;
                                };

                            }, 3000);  

            };   
        };

        this.renderChart = function() {
            
            this.svg = d3.select(this.element).attr("height",this.height).attr("width",this.width);

            this.svg.selectAll("rect")
                  .data(this.dataset)
                  .enter()
                  .append("rect")
                  .attr("width",this.cellWidth)
                  .attr("height",this.cellHeight)
                  .attr("fill",this.mainColor)
                  .attr("fill-opacity",function() { return Math.random()*(1-0.8+1)+0.8; } );


            this.svg.selectAll("rect").attr("x",function(d,i) {
                    return d[1]*(self.cellWidth+self.cellSpace);
                    })
                  .attr("y", function(d,i) {
                    return d[0]*(self.cellHeight+self.cellSpace);
                    });
        };

        this.createMatrixData = function(){
            this.maxrows = Math.ceil(this.height/(this.cellHeight+this.cellSpace));
            this.maxcols = Math.ceil(this.width/(this.cellWidth+this.cellSpace));
            for (cols=0;cols<this.maxcols;cols++) {
                for (rows=0;rows<this.maxrows;rows++) {
                        this.dataset.push([rows,cols]);
                };
            };
        };

        this.initialize(args);

    };

    return BoxBackground;


}));
