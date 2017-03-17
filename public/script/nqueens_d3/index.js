const runner = require('../my_module/runner')();
runner.d3();
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
