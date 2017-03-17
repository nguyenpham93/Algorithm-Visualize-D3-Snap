const myd3 = require("./d3.js");
const mysnap = require("./snap.js");

class bluejs{
    constructor(svg){
        this.svgId = svg;
        this.svg = '';
        this.opt = {
            'font-size' : 60,
            'text-anchor' : 'middle',
            'fill' : 'black',
            'stroke' : 'black',
            'codeText' : '\u265A',
            'opacity' : 1
        }
    }

    d3(){
        this.svg = new myd3(this.svgId);
    }
    
    snap(){
        this.svg = new mysnap(this.svgId);
    }

    append(parent,element){
        this.svg.append(parent,element);
    }

    text(x,y,yourText,opt){
        opt = this.validateOpt(opt);
        return this.svg.text(x,y,yourText,opt);
    }

    rect(x,y,width,height,opt){
        opt = this.validateOpt(opt);
        return this.svg.rect(x,y,width,height,opt);
    }

    setHeight(h){
        this.svg.setHeight(h);
    }

    checkOddCell(row,col){
        return (row % 2 == 0 && col % 2 == 0) || (row % 2 != 0 && col % 2 != 0);
    }

    group(){
        return this.svg.group();
    }

    clear(){
        this.svg.clear();
    }

    raise(element){
        this.svg.raise(element);
    }

    chess_board(x,y,width,height,n){
        let space = width/2;
        for(let i = 0 ; i < n;i++){
            for(let j = 0; j < n;j++){
                let opt = {},
                    rx = j * width + space + x,
                    ry = i * height + space + y;
                if(this.checkOddCell(i,j)) opt = {"fill" : "#fff"}; 
                this.rect(rx,ry,width,height,opt); 
                // draw A,B,C,1,2,3
                if(i == 0){
                    let tx = j * width + width + x,
                        ty = i * height + space/2 + y;
                    this.text(tx,ty,String.fromCharCode(65 + j),{"font-size" : 20});
                }
                if(j == 0){
                    let tx = j * width + space/2 + x,
                        ty = i * height + height + y;
                    this.text(tx,ty,i + 1,{"font-size" : 20});
                }
            }
        }  
    }

    validateOpt(opt){
        if(typeof opt === 'object'){
            for(let prop in this.opt){
                if(!opt[prop]){
                    opt[prop] = this.opt[prop];
                }
            }
            return opt;
        }
        return this.opt;
    }
}

module.exports = function(svg){
    return new bluejs(svg);
};