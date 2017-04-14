/**
 * Created by Administrator on 2017/4/12.
 */
(function (Fly) {
    'use strict';
    var Game=function (id) {
        //creatCv()方法会返回一个上下文
        this.ctx=Fly.createCv(id);
        //两帧的时间间隔
        this.delta=0;
        //上一帧的时间
        this.lastFrameTime=new Date();
        //当前帧事件
        this.curFrameTime=0;
        // 用来存放游戏中所有的角色（对象）
        this.rolesList = [];

        // 图片资源
        this.imgSrc = ['birds', 'land', 'sky', 'pipe1', 'pipe2'];
        //表示游戏是否要继续进行
        this.isStart=true;
        //游戏持续时间
        this.playTime=0;
        //英雄（小鸟）
        this.hero=null;
    };
    Game.prototype={
        constructor:Game,
        //开始游戏方法
        startGame:function () {
            var that=this;
            //图片完全加载完毕后执行回调函数
            Fly.loadImages(this.imgSrc,function (imgList) {
                //初始化角色
                that.initRoles(imgList);
                //渲染角色
                that.draw(imgList);
                //绑定事件
                that.bindEvent();
            });

        },
        //游戏停止方法
        overGame:function () {
            this.isStart=false;
        },
        //初始化游戏中角色
        initRoles:function (imgList) {
            var ctx=this.ctx;
            //创建小鸟对象
            this.hero = Fly.factory('Bird',{
                ctx:ctx,
                img:imgList.birds
            });
            // 创建天空对象
            for(var i = 0; i < 2; i++) {
                var sky = Fly.factory('Sky',{
                    ctx: ctx,
                    img: imgList.sky,
                    x: i * imgList.sky.width
                });

                this.rolesList.push( sky );
            }
            // 创建管道对象
            for(var i = 0; i < 6; i++) {
                var pipe = Fly.factory('Pipe',{
                    ctx: ctx,
                    imgPipeTop: imgList.pipe2,
                    imgPipeBottom: imgList.pipe1,
                    x: i * imgList.pipe1.width*3+200
                });

                this.rolesList.push( pipe );
            }

            // 创建陆地对象
            for(var i = 0; i < 4; i++) {
                var land = Fly.factory('Land',{
                    ctx: ctx,
                    img: imgList.land,
                    x: i * imgList.land.width
                });

                this.rolesList.push( land );
            }
        },
        //渲染游戏角色
        draw:function (imgList) {
            var that=this,
                cv=this.ctx.canvas,
                ctx=this.ctx;
            (function render() {
                //获取当前帧时间
                that.curFrameTime=new Date();
                //两帧时间间隔
                that.delta=that.curFrameTime-that.lastFrameTime;
                //将当前时间赋值给上一帧时间
                that.lastFrameTime=that.curFrameTime;
                //游戏持续时间增加
                that.playTime+=that.delta;

                //清空画布
                ctx.clearRect(0,0,cv.width,cv.height);
                ctx.beginPath();


                //绘制天空背景、管道、陆地背景
                //渲染所有游戏角色
                that.rolesList.forEach(function( role ) {
                    role.render( that.delta );
                });

                //渲染小鸟
                that.hero.render(that.delta);
                //书写游戏时间
                ctx.textBaseline='top';
                ctx.font='20px';
                ctx.fillText('游戏分数'+that.playTime,0,0);

                //小鸟碰撞检测,上，下，管道
                if(that.hero.y-10<=0||that.hero.y>=ctx.canvas.height-imgList.land.height||ctx.isPointInPath(that.hero.x,that.hero.y)){
                    // that.isStart=false;
                    that.overGame();
                }

                if(that.isStart) {
                    window.requestAnimationFrame(render);
                }
            })();
        },
        //绑定事件，鼠标点击小鸟跳一跳
        bindEvent:function () {
            var that=this;
            //为cv创建点击事件，让小鸟跳起来
            that.ctx.canvas.addEventListener('click',function () {
                that.hero.changeSpeed(-0.3);
            });
        }

    };



    Fly.Game=Game;
})(Fly);





