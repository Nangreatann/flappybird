/**
 * Created by Administrator on 2017/4/12.
 */
(function (window) {
    'use strict';
    //Fly是整个游戏的全局对象，保证全局环境中只有一个全局对象
    //所有内容都是通过Fly对象获取到的

    //声明全局变量，用来存放所有的工具函数（utils）
    var FlyObj = {};

    //给全局对象添加loadImages方法
    FlyObj.loadImages = function (imgSrc, callback) {
        var count = 0,
            imgsLen = imgSrc.length,
            imgList = {};

        imgSrc.forEach(function (val, index) {
            var img = new Image();
            img.src = 'images/' + val + '.png';
            imgList[val] = img;
            img.onload = function () {
                count++;
                if (count >= imgsLen) {
                    callback(imgList);
                }
            };
        });
    };

// 将角度转化为弧度
    FlyObj.toRadian = function (angle) {
        return angle / 180 * Math.PI;
    };
//动态创建canvas
    FlyObj.createCv=function (id) {
        //创建
        var cv=document.createElement('canvas');
        cv.width=800;
        cv.height=600;
        //追加
        var container=document.getElementById(id);
        container.appendChild(cv);
        //返回上下文
        return cv.getContext('2d');
    };
    //工厂函数
    //用来实现创建对象，有了该函数以后，只要是创建对象
    //就调用这个工厂函数
    FlyObj.factory=function (type,option) {
        switch(type){
            case 'Game':
                return new Fly.Game(option);
            case 'Bird':
                return new Fly.Bird(option);
            case 'Sky':
                return new Fly.Sky(option);
            case 'Land':
                return new Fly.Land(option);
            case 'Pipe':
                return new Fly.Pipe(option);
        }
    };
    //将全局对象暴露到全局变量中
    window.Fly=FlyObj;


})(window);