// 封装 小鸟对象 Bird
// 因为我们游戏的全局对象是 Fly 对象，所以，只需要将
// Fly全局对象，传入进来
// 为了保证全局环境中只有一个全局对象，所以，我们将 Fly 传入到沙箱中
(function( Fly ) {
    'use strict';

// 构造函数
    var Bird = function( option ) {
        // 绘制上下文
        this.ctx = option.ctx;
        // 小鸟图片
        this.img = option.img;
        // 图片的宽度
        this.imgW = this.img.width / 3;
        // 图片的高度
        this.imgH = this.img.height;

        // 记录当前绘制的帧数
        this.frameIndex = 0;
        // 瞬时速度
        this.speed = 0;
        // 小鸟垂直方向的初始位置
        this.x = 100;
        this.y = 100;
        // 当前角度
        this.curAngle = 0;

        // 加速度
        this.a = 0.0005;
        // 最大旋转角度
        this.maxAngle = 45;
        // 达到最大角度时的速度
        this.maxSpeed = 0.5;
    };

// 原型对象
    Bird.prototype = {
        constructor: Bird,

        // 渲染自身位置的方法
        render: function( delta ) {
            var ctx = this.ctx;

            // 保存默认状态
            ctx.save();

            ctx.translate(this.x, this.y);

            // 计算当前速度对应的旋转角度
            // 因为 speed 是有正负（方向）的，所以，curAngle 就会有方向
            this.curAngle = this.speed / this.maxSpeed * this.maxAngle;
            if( this.curAngle > 45 ) {
                this.curAngle = 45;
            } else if( this.curAngle < -45 ) {
                this.curAngle = -45;
            }

            // 根据计算的角度来 旋转
            ctx.rotate( Fly.toRadian(this.curAngle) );

            ctx.drawImage(this.img, this.imgW * this.frameIndex++, 0, this.imgW, this.imgH, -1/2*this.imgW, -1/2*this.imgH, this.imgW, this.imgH);

            // 计算下一帧小鸟的垂直位置
            // delta 表示时间（两帧的时间间隔）
            this.speed = this.speed + this.a * delta;
            // console.log( speed )
            this.y =this.y + (this.speed * delta + 1/2 * this.a * Math.pow(delta, 2));
            this.frameIndex %= 3;

            // 恢复保存的默认状态
            ctx.restore();
        },

        // 小鸟改变速度的方法
        changeSpeed: function( speed ) {
            this.speed = speed;
        }
    };

// 将 Bird 构造函数，暴露给全局对象Fly
    Fly.Bird = Bird;

})( Fly );