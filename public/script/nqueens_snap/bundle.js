(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// Maked by Nguyen Pham
/**
* @param arrChess : chứa những quân hậu đạt điều kiện
* @param arrCross : chứa giá trị đưòng chéo chính của các quân hậu
* @param arrCross1 : chứa giá trị đưòng chéo phụ của các quân hậu
* @param total_solutions : chứa tối đa tất cả các solutions có thể tìm đuợc  
*/
// N-Queens Problem

// const draw = require('./drawBoard'); 

class nqueen {
    constructor(svgMain,svgStatus){
        this.arrChess = [];
        this.arrCross = []; // i + j
        this.arrCross1 = []; // j - i + end
        this.total_solutions = [];
        this.i = 0; // row
        this.j = []; //col
        this.s = svgMain;
        this.s2 = svgStatus;
        this.statusGroup = this.s.group();
        this.acceptChess = []; 
        this.mainchess = '',
        this.interval = '',
        this.isBack = false,
        this.findOut = false,
        this.endLooking = false,
        this.length = 4,
        //default options
        this.options = {
            'fill' : 'orange',
            'font-size' : 60,
            'width' : 80,
            'height' : 80,
            'codeText' : '\u265A'
        };
    }
    solve_n_queens(i,j,n){
        let flag = true,
        color = 'green',
        isBack = this.isBack,
        findOut = this.findOut,
        arrChess = this.arrChess,
        arrCross = this.arrCross,
        arrCross1 = this.arrCross1,
        width = this.options.width,
        height = this.options.height,
        statusGroup = this.statusGroup,
        drawStateChess = this.drawStateChess,
        s = this.s,
        calXBox = this.calXBox,
        calYBox = this.calYBox;

        if(!j[i]) j[i] = 0;
        if(this.checkEnd(i,j[i],n)){
            this.endLoop = true;
            return;
        }

        if(j[i] > (n - 1)){
            flag = false;
            color = 'red';
            j[i]--;
        }
        if(isBack || findOut){
            isBack = findOut = false;
            this.acceptChess[i].remove();
        } 
        this.movingAnimate(this.mainchess,i,j[i]);

        let cross = i + j[i];
        let cross1 = j[i] - i + (n-1);
        let len = arrChess.length;
        let whereError = [];
        
        // Kiểm tra xem quân hậu hiện tại có bị khống chế không, nếu có thì flag = false
        for(let k = 0; k < len ; k++){
            // Kiểm tra hàng dọc
            if(k == arrChess[k][0] && j[i] == arrChess[k][1]){
                flag = false;
                whereError[0] = 1;
            }
            // Kiểm tra 2 hàng chéo
            if (cross == arrCross[k]){
                flag = false;
                whereError[1] = 2;
            }
            if(cross1 == arrCross1[k]){
                flag = false;
                whereError[2] = 3;
            }
        }
        if(!flag) color = 'red';
        // push chess to last
        // Hien thi trang thai quan hau
        for(let e = 0; e < n;e++){
            for(let f = 0;f < n; f++){
                let temp = e + f;
                let temp1 = f - e + (n-1);
                if(!whereError.length){
                    if(temp == cross || temp1 == cross1 || f == j[i]){
                        let t = drawStateChess(s,calXBox(f,width),calYBox(e,height),width,height,{'fill' : color});
                        s.append(statusGroup,t);
                    }
                }else{
                    whereError.forEach(function(val){
                        if(val === 1 && f == j[i]){
                            let t = drawStateChess(s,calXBox(f,width),calYBox(e,height),width,height,{'fill' : color});
                            s.append(statusGroup,t);
                        }
                        if(val === 2 && temp == cross){
                            let t = drawStateChess(s,calXBox(f,width),calYBox(e,height),width,height,{'fill' : color});    
                            s.append(statusGroup,t);
                        }
                        if(val === 3 && temp1 == cross1){
                            let t = drawStateChess(s,calXBox(f,width),calYBox(e,height),width,height,{'fill' : color});     
                            s.append(statusGroup,t);
                        }
                    });
                }
            }
        }
        s.raise(statusGroup);
        this.s.raise(this.mainchess);
        if(flag){
            arrChess.push([i,j[i]]);
            arrCross.push(cross);
            arrCross1.push(cross1);
            //Count chess 
            let flagChess = this.s.text((j[i] * width) + width,(i * height) + (height + 15),'' + parseInt(i + 1),{
                'font-size' : this.options['font-size'],
                'fill' : this.options['fill']
            });   
            this.animateFont(flagChess,150,function(){
                flagChess.animate({
                    'font-size' : '60px'
                },700);
            });
            this.acceptChess[i] = flagChess;
            // Kiểm tra xem đã đủ n quân hậu chưa, nếu đủ thì lưu solution đó lại
            if(arrChess.length == n){
                let solution = arrChess.slice(0);
                this.board_include_solution(this.s2,
                                            40, //width
                                            40, //height
                                            this.length,
                                            solution, //array 
                                            this.total_solutions.length,
                                            {
                                                'codeText' : this.options.codeText,
                                                'fill' : this.options.fill
                                            }); //options
                this.total_solutions.push(solution);
                this.popArr([arrChess,arrCross,arrCross1]);
                j[i]++;
                findOut = true;
            }else{
                i++;
                j[i] = 0;
            }    
        }else{
            if(j[i] >= (n-1)){
                i--;
                this.popArr([arrChess,arrCross,arrCross1]);
                isBack = true;
            }
            j[i]++;
        }
        this.remark(i,j,arrChess,arrCross,arrCross1,isBack,findOut);
    }

    animateFont(text,size,cb){
        text.animate({
            'font-size' : size + 'px'
        },700,cb);
    }

    calXBox(x,width){
        return x * width + (width/2);
    }

    calYBox(y,height){
        return y * height + (height/2);
    }
    
    drawStateChess(svg,x,y,w,h,opts){
        let rect = svg.rect(x,y,w,h,{'fill':opts['fill'],'opacity' : 0.7});
        return rect;
    }

    board_include_solution(svg,width,height,number,arrsolution,num_solution,opts){
        let space = width/2;
        let boardsPerRow = number > 6 ? 4 : 5;
        let sizeBoard = width * number + space;
        let thick = Math.floor(num_solution/boardsPerRow); 
        let x = 0;
        let y = thick * sizeBoard + 20 * (thick + 1) ;  
        if(y == 0) y += 20;
        let newSvgHeight = (thick + 1) * sizeBoard + 50;
        this.s2.setHeight(newSvgHeight);
        if(num_solution % boardsPerRow != 0){
            x = sizeBoard * (num_solution - (thick * boardsPerRow));    
        } 
        svg.chess_board(x,y,width,height,number);
        arrsolution.forEach(function(arr){
            svg.text(arr[0] * width + width + x,arr[1] * height + height + width/3 + y,opts.codeText,{
                                                    'font-size' : width,
                                                    'fill': opts['fill']
                                                });
        });   
    }

    remark(i,j,arrChess,arrCross,arrCross1,isBack,findOut){
        this.i = i;
        this.j = j;
        this.arrChess = arrChess;
        this.arrCross = arrCross;
        this.arrCross1 = arrCross1;
        this.isBack = isBack;
        this.findOut = findOut;    
    }

    checkEnd(x,y,n){
        if(x == 0 && (y > (n - 1))){
            $("#end").text("End");
            return true;
        }
        return false;
    }

    popArr(arrays){
        $.each(arrays,function(index,value){
            value.pop();
        })
    }

    movingAnimate(chess,x,y){
        chess.animate(
        {
            'x': (y * this.options.width) + this.options.width + 'px',
            'y' : (x * this.options.height) + (this.options.height + 15) + 'px'
        }, 500);
    }

    //clear snap
    reset(){
        this.s.clear();
        this.s2.clear();
        this.statusGroup = this.s.group();
        this.i = 0;
        this.j = [];
        this.arrChess = [];
        this.arrCross = [];
        this.arrCross1 = [];
        this.total_solutions = [];
        this.acceptChess = [];
        this.isBack = false;
        this.endLoop = false;
        this.length = 4;
        this.findOut = false;
        this.resetOptions();
        this.autoOff();
    }

    resetOptions(){
        this.options = {
            'fill' : 'orange',
            'font-size' : 60,
            'width' : 80,
            'height' : 80,
            'codeText' : '\u265A'
        };
    }

    validateInput(num){
        if(!num){
            throw new Error("Enter number");
        }
        if (isNaN(num)){
            throw new Error("Input must be a number");
        }
        num = parseInt(num);
        if(num > 8 || num < 4){
            throw new Error("4 < Input < 8");
        }
        this.length = num;
        return num;
    }

    init(){
        //default table
        this.s.chess_board(0,0,this.options.width,this.options.height,this.length);
        // //default chess
        this.mainchess = this.s.text(-1,-1,this.options.codeText,{
            'font-size' : this.options['font-size'],
            'fill' : this.options['fill']
        });   
    }

    checkOption(opt){
        if(opt){
            for(let p in opt){
                let prop = this.options;
                if(prop[p]) prop[p] = opt[p]; 
            }
        }
    }

    //Calculate width, height of box to fix screen
    calSize(num){
        let opt = this.options;
        if(num > 6 && opt.width > 60 && opt.height > 60 && opt['font-size'] > 40){
            this.options.width = 60;
            this.options.height = 60;
            this.options['font-size'] = 40;
        }
    }

    runAuto(timeout){
        if(!this.interval){
            let _this = this;
            _this.interval = setInterval( function(){
                if(_this.endLooking) _this.autoOff();
                _this.next();
            } ,timeout || 800);
        }
    }

    autoOff(){
        if(this.interval) clearInterval(this.interval);
        this.interval = '';
    }

    runManual(){
        this.autoOff();
        this.next();
    }

    next(){
        this.statusGroup.clear();
        this.solve_n_queens(this.i,this.j,this.length);
        $("#mysolve").text("Solutions : " + this.total_solutions.length);
    }

    // Run app
    runner(num,cb,opt){
        try{
            this.reset();
            num = this.validateInput(num);
            this.checkOption(opt);
            this.calSize(num);
            cb(null);
        }catch(err){
            cb(err.message);
        }finally{
            this.init();
        }
    }
}

module.exports = nqueen;
},{}],2:[function(require,module,exports){
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
},{"./algorithm/nqueen":1,"./svg_modules/bluesvg":3}],3:[function(require,module,exports){
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
},{"./d3.js":4,"./snap.js":6}],4:[function(require,module,exports){
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


},{"./draw_root":5}],5:[function(require,module,exports){

class draw_root{
    text(x,y,yourText,opt){}

    rect(x,y,width,height,opt){}
}
module.exports = draw_root;


},{}],6:[function(require,module,exports){
const drawroot = require("./draw_root");
class mySnap extends drawroot{
    constructor(svg){
        super();
        this.plugins();
        this.snap = Snap(svg);
    }

    text(x,y,yourText,opt){
        if(!yourText) yourText = opt['codeText'];
        let text = this.snap.text(x,y,yourText);
        text.attr({
            'font-size' : opt['font-size'],
            'text-anchor' : opt['text-anchor'],
            'fill' : opt['fill'],
            'stroke' : opt['stroke']
        });
        return text;
    }

    rect(x,y,width,height,opt){
        let rect = this.snap.rect(x,y,width,height);
        rect.attr({
            'fill' : opt['fill'],
            'opacity' : opt['opacity']
        });
        return rect;
    }

    clear(){
        this.snap.clear();
    }

    setHeight(h){
        this.snap.attr({
            'height' : h
        });
    }

    append(parent,element){
        parent.append(element);    
    }
    
    group(){
        return this.snap.group();
    }

    raise(element){
        this.snap.append(element);
    }
    plugins(){
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
module.exports = mySnap;
},{"./draw_root":5}],7:[function(require,module,exports){
const runner = require('../my_module/runner')();
runner.snap();
const queen = runner.nqueens("#mainsvg","#svg_solutions");
queen.init();

$("#btnChess").click(function(){
    let num = $("#inputNum").val();
    $("#mysolve,#status,#end").text("");
    queen.runner(num,function(err){
        if(err) $("#status").text(err);
    });
});

$("#btnNext").click(function(){
    queen.runManual();        
});

$("#btnAuto").click(function(){
    queen.runAuto(50);        
});

},{"../my_module/runner":2}]},{},[7]);
