const bluesvg = require('./svg_modules/bluesvg');
const nqueens = require('./algorithm/nqueen');
class runner{
    constructor(){
        this.tool = 'd3';
    }
    d3(){
        this.tool = 'd3';
    }
    snap(){
        this.tool = 'snap';
    }

    nqueens(svgMain,svgResult){
        let mainSvg = new bluesvg(svgMain);
        let resultSvg = new bluesvg(svgResult);
        if(this.tool === 'd3'){
            mainSvg.d3();
            resultSvg.d3(); 
        }else if(this.tool === 'snap'){
            mainSvg.snap();
            resultSvg.snap(); 
        }
        return new nqueens(mainSvg,resultSvg);
    }
}
module.exports = function(){
    return new runner();
};