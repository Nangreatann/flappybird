/**
 * Created by Administrator on 2017/4/12.
 */
(function( Fly ) {

    'use strict';
    //当前游戏场景中的管道长度是不变的
    //下一次竖线的管道高度是随机生成的
    //管道之间的间距固定的

    var Pipe = function( option ) {
        this.ctx = option.ctx;
        this.imgPipeTop = option.imgPipeTop;
        this.imgPipeBottom = option.imgPipeBottom;

        this.imgW = option.imgPipeTop.width;
        this.imgH = option.imgPipeTop.height;
        this.x = option.x || 0;
        this.topY = option.topY || 0;
        this.bottomY = option.bottomY || 0;
        this.pipeSpace = 150;
        this.speed = -0.15;
        //创建对象的时候随机生成管道高度
        this.initPipeHeight();
    };

    Pipe.prototype.initPipeHeight=function () {
        //随机生成的管道高度
        var pipeHeight=Math.random()*200+50;
        this.topY=pipeHeight-this.imgH;
        this.bottomY=pipeHeight+this.pipeSpace;
    };
    Pipe.prototype.render = function( delta ) {
        var ctx = this.ctx;

        // 绘制管道
        ctx.drawImage(this.imgPipeTop, this.x, this.topY);
        ctx.drawImage(this.imgPipeBottom, this.x, this.bottomY);

        //绘制管道路径（碰撞检测）
        ctx.rect(this.x,this.topY,this.imgW,this.imgH);
        ctx.rect(this.x,this.bottomY,this.imgW,this.imgH);

        // 管道为匀速运动
        this.x += this.speed * delta;

        // 判断管道位置
        if( this.x <= -this.imgW ) {
            //*3表示每一组管道的宽度和间距，*6表四有六组管道
            this.x += this.imgW *3*6;
            //重新出现的管道高度重新定义
            this.initPipeHeight();
        }
    };


// 暴露给 全局对象 Fly
    Fly.Pipe = Pipe;

})( Fly );