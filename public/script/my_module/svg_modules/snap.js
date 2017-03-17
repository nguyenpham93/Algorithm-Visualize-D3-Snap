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