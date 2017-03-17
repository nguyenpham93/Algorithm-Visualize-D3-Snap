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

$("#btnSpeed").click(function(){
    let curSpeed = $(this).text(); 
    let speed = 0;
    switch (curSpeed){
        case "X1" :
            speed = 400;
            $(this).text("X2");
            break;
        case "X2" :
            speed = 100;
            $(this).text("X3");
            break;
        case "X3" :
            speed = 800;
            $(this).text("X1");
            break;
        default :
             speed = 800; 
    }         
    queen.speedAuto(speed);
});

$("#btnAuto").click(function(){
    queen.runAuto();        
});
