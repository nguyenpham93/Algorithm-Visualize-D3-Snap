# Algorithm-Visualize-D3-Snap (AVS)
AVG is module Visualize algorithm by using Svg modules (D3.js, Snapsvg.js) </br>
Demo : 
```
git clone https://github.com/nguyenpham93/Algorithm-Visualize-D3-Snap.git
cd Algorithm-Visualize-D3-Snap
yarn install / npm install
npm start
```
Open browser : [http://localhost:5000](http://localhost:5000)

(pic1.jpg)

## Main features :

**Firstly : require `runner.js` from `my_module`**
``` 
    const runner = require('../my_module/runner')();
```
**Using SnapSvg module**
```
  runner.snap();
```
**Or D3.js**
```
  runner.d3();
```
**Choose which algorithm function you want to visualize. For example, nqueens-problem**
```
  // This return object of nqueens-problem
  /***
  * @param svgMain : Id SVG element to visual
  * @param svgResult: Id SVG element to show results
  ***/
  const queen = runner.nqueens(svgMain,svgResult);
```
**Create default chessboard**
```
  queen.init();
```
**You can draw chess board with options**
  * *Options* :
    * *fill* : Color hex code, fill color chess
    * *width* : Width of each box
    * *height* : Height of each box
    * *codeText* : Unicode chess 
    * *speedAuto* : time chess moving per turn
```
/***
* @param num : number cells of chess board
* @param cb : callback function with (err) param
* @param options : properties optional
***/
  queen.runner(num,cb,options);
  function cb(err){
      if(err) return new Error(err);
  }
```
**Run manual**
```
  queen.runManual();      
```
**Set automated speeding**
```
  queen.speedAuto(yourSpeed);
```
**Run automatic**
```
queen.runAuto();       
```

