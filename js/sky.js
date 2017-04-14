/**
 * Created by Administrator on 2017/4/12.
 */
(function( Fly ) {

    'use strict';

    var Sky = function( option ) {
        this.ctx = option.ctx;
        this.img = option.img;
        this.x = option.x || 0;
        this.y = option.y || 0;
        this.imgW = this.img.width;
        this.speed = -0.15;
    };

    Sky.prototype.render = function( delta ) {
        var ctx = this.ctx;

        // 绘制天空背景
        ctx.drawImage(this.img, this.x, this.y);

        // 天空背景为匀速运动
        this.x += this.speed * delta;

        // 判断天空背景位置
        if( this.x <= -this.imgW ) {
            this.x += this.imgW * 2;
        }
    };


// 暴露给 全局对象 Fly
    Fly.Sky = Sky;

})( Fly )