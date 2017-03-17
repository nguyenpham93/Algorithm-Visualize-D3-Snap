const drawroot = require("./draw_root");
class myd3 extends drawroot{
    constructor(svg){
        super();
        this.plugins();
        this.d3 = d3.select(svg);
    }
    text(x,y,yourText,opt){
        if(!yourText) yourText = opt['codeText'];
        return this.d3.append('text')
            .attr("font-size" ,opt['font-size'])
            .style("fill" ,opt['fill'])
            .attr("text-anchor", opt['text-anchor'])
            .attr("stroke",opt['stroke'])
            .attr("x",x)
            .attr("y",y)
            .text(yourText);
    }

    rect(x,y,width,height,opt){
        return this.d3.append("rect")
            .attr("x", x)
            .attr("y", y)
            .attr("width", width)
            .attr("height", height)
            .style("fill",opt.fill)
            .style("opacity",opt['opacity']);
    }
    
    setHeight(h){
        this.d3.attrs({
            'height' : h
        });
    }

    clear(){       
        this.d3.selectAll('*').remove();
    }

    append(parent,element){
        if(typeof(element) === 'object'){
            parent.node().appendChild(element.node());
        }else{ 
            this.append(String(element));
        }
    }
    
    group(){
        return this.d3.append('g');
    }

    raise(element){
        element.raise();
    }

    // prototype property animate to Object when using d3.js (Snap already using this, no need to set up)
    plugins(){
        Object.defineProperty(Object.prototype,'animate',{
            enumerable : false,
            configurable: true,
            value : function(prop,duration,cb){
                this.transition().attrs(prop).duration(duration).on('end',cb);
            }
        });
        Object.defineProperty(Object.prototype,'clear',{
            enumerable : false,
            configurable: true,
            value : function(){
                this.selectAll('*').remove();
            }
        });
        Object.defineProperty(Object.prototype,'setHeight',{
            enumerable : false,
            configurable: true,
            value : function(h){
                this.attrs({
                    'height' : h
                });
            }
        });
    }
}

module.exports = myd3;

