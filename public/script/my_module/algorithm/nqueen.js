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
            'codeText' : '\u265A',
            'speedAuto' : 800
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
            'codeText' : '\u265A',
            'speedAuto' : this.options.speedAuto
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

    runAuto(){
        if(!this.interval){
            let _this = this;
            _this.interval = setInterval( function(){
                if(_this.endLooking) _this.autoOff();
                _this.next();
            } ,_this.options.speedAuto);
        }
    }

    speedAuto(time){
        this.options.speedAuto = time;
        if(this.interval){
            this.autoOff();
            this.runAuto();
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