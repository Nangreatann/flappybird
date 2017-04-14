/**
 * Created by Administrator on 2017/4/12.
 */
(function( Fly ) {

    'use strict';

    var Land = function( option ) {
        this.ctx = option.ctx;
        this.img = option.img;

        this.imgW = this.img.width;
        this.imgH = this.img.height;
        this.x = option.x || 0;
        this.y = this.ctx.canvas.height - this.imgH;
        this.speed = -0.15;
    };

    Land.prototype.render = function( delta ) {
        var ctx = this.ctx;

        // 绘制陆地背景
        ctx.drawImage(this.img, this.x, this.y);

        // 陆地背景为匀速运动
        this.x += this.speed * delta;

        // 判断陆地背景位置
        if( this.x <= -this.imgW ) {
            this.x += this.imgW * 4;
        }
    };


// 暴露给 全局对象 Fly
    Fly.Land = Land;

})( Fly );