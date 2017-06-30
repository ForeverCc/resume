/*
 * @author：forevercc
 * @desc: 简历的交互效果
 * @date： 2017
 */
(function() {
    var arrAuthor = ['打不倒的小成c'];
    var authorId = document.getElementById('authorId');
    //简历对象
    var xcResume = {
        //初始化
        init: function() {
            var _this = this;
            setTimeout(function() {
                _this.createText(authorId, arrAuthor);
            }, 500);
            this.setHeight();
            this.drawCanvas();
            this.blockClick();
            this.dotNavFn();
        },
        //设置每一屏的高度
        setHeight: function(){
            var sections = document.querySelectorAll('.section');
            var h = viewHeight();
            if ( h < 600 ) {
                h = 650;
            }
            //content.style.height = h + 'px';
            for (var i = 0; i < sections.length; i++) {
                sections[i].style.height = h + 'px';
            }
        },
        //导航的点击切换
        dotNavFn: function () {
            var _this = this;
            var aboutMe = document.querySelector('#about-me');
            var contactMe = document.querySelector('#contact-me');
            var demoMe = document.querySelector('#demo-me');
            var skillMe = document.querySelector('#skill-me');
            var dotNav = document.querySelector('#dot-nav');
            var dots = document.querySelectorAll('.dot');
            var navTexts = document.querySelectorAll('.nav-text');
            var sections = document.querySelectorAll('.section');
            var arrDOM = [aboutMe, skillMe, demoMe, contactMe];//存放元素
            var len = dots.length;
            var h = viewHeight();
            var timer = null;
            var pause = 0;//解决bug
            for (var j = 0; j < arrDOM.length; j++) {
                arrDOM[j].index = j;
                arrDOM[j].onclick = function() {
                    moveScroll((this.index + 1) * h);
                };
            }
            window.onscroll = function() {
                //滚动切换
                var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                for (var i = 0; i < dots.length; i++) {
                    if (scrollTop > getPos(sections[i]).top - h / 2) {
                        for (var j = 0; j < dots.length; j++) {
                            dots[j].className = 'dot';
                        }
                        dots[i].className = 'dot active';
                    }
                }
                if( h/2 + scrollTop > sections[1].offsetTop ){
                    _this.selfIntro();
                }
                if( h/2 + scrollTop > sections[2].offsetTop ){
                    _this.skillIn();
                }
                if( h/2 + scrollTop > sections[3].offsetTop ){
                    _this.lineShow('border-line');
                }
                if( h/2 + scrollTop > sections[4].offsetTop ){
                    _this.lineShow('border-line2');
                    _this.contactIn();
                }
                if (pause !== 1) {
                    clearInterval(timer);
                }
                pause = 2;
            };
            for (var i = 0; i < len; i++) {
                dots[i].index = i;
                dots[i].onclick = function() {
                    moveScroll(this.index * h);
                };
                dots[i].onmouseover = function() {
                    navTexts[this.index].style.opacity = 1;
                };
                dots[i].onmouseout = function() {
                    navTexts[this.index].style.opacity = 0;
                };
            }
            function moveScroll(targetPosition) {
                var icur = 0;
                var iSpeed = 0;
                clearInterval(timer);
                timer = setInterval(function() {
                    icur = document.documentElement.scrollTop || document.body.scrollTop;
                    iSpeed = (targetPosition - icur) / 8;
                    iSpeed = iSpeed > 0
                        ? Math.ceil(iSpeed)
                        : Math.floor(iSpeed);
                    if (icur === targetPosition) {
                        clearInterval(timer);
                    } else {
                        document.documentElement.scrollTop = document.body.scrollTop = icur + iSpeed;
                    }
                    pause = 1;
                }, 30);
            }
        },
        //第一屏的canvas
        drawCanvas: function(){
            var canvas = document.querySelector('canvas'),
                drawing = canvas.getContext('2d'),
                w = viewWidth(),
                h = viewHeight(),
                range = 120, //起始范围；
                start = []; //存放点的位置；
            //设置canvas宽高以及全局透明度
            canvas.width = w;
            canvas.height = h;
            drawing.globalAlpha = 0.5;
            function i() {
                //清空画布
                drawing.clearRect(0, 0, w, h);
                //起点
                start = [
                    {
                        x: 0,
                        y: h * 0.7 + range
                    }, {
                        x: 0,
                        y: h * 0.7 - range
                    }
                ];
                while (start[1].x < w + range) {
                    draw(start[0], start[1]);
                }
            }
            //绘制
            function draw(i, j) {
                var red = Math.round(Math.random() * 255),
                    green = Math.round(Math.random() * 255),
                    blue = Math.round(Math.random() * 255);
                drawing.beginPath();
                drawing.moveTo(i.x, i.y);
                drawing.lineTo(j.x, j.y);
                //随机生成下一个点的坐标
                var nextX = j.x + (Math.random() * 2 - 0.25) * range,
                    nextY = createY(j.y);
                drawing.lineTo(nextX, nextY);
                drawing.closePath();
                drawing.fillStyle = 'rgb(' + red + ',' + green + ',' + blue + ')';
                drawing.fill();
                start[0] = start[1];
                start[1] = {
                    x: nextX,
                    y: nextY
                };
            }
            //生成下一个点y坐标
            function createY(p) {
                var t = p + (Math.random() * 2 - 1.1) * range;
                //若下一个点的坐标不再画布范围内
                return (t > h || t < 0)? createY(p): t;
            }
            i();
            setInterval(i, 2000);
        },
        //介绍页面进场
        selfIntro: function(){
            var s2NavLi = document.querySelectorAll('.s2-nav li');
            var s2Wrap = document.querySelector('.s2-wrap');
            var s2Boxs = document.querySelectorAll('.s2-box');
            setTimeout(function() {
                s2Wrap.style.right = '20%';
                s2Wrap.style.opacity = 1;
            }, 30);
            for (var i = 0; i < s2NavLi.length; i++) {
                s2NavLi[i].index = i;
                s2NavLi[i].style.transition = 'all 1s ' + i * 0.2 + 's';
                //s2NavLi[i].style.left = '20%';
                //s2NavLi[i].style.opacity = 1;
                s2NavLi[i].onclick = function() {
                    for (var i = 0; i < s2Boxs.length; i++) {
                        s2Boxs[i].style.opacity = 0;
                    }
                    s2Boxs[this.index].style.opacity = 1;
                };
            }
            setTimeout(function() {
                for (var i = 0; i < s2NavLi.length; i++) {
                    s2NavLi[i].style.left = '20%';
                    s2NavLi[i].style.opacity = 1;
                }
            }, 30);
        },
        skillIn: function(){
            var mCenter = document.querySelector(".mCenter");
            mCenter.style.animation = '2s fold linear';

            mCenter.addEventListener('animationend', function() {
                circleMove(); //弹性运动走完了，接着让蓝色的圆点运动
            });
            //圆点的运动
            function circleMove() {
                var circles = document.querySelectorAll(".mCenter div:not(.arc)");
                var boxs = document.querySelectorAll(".box"); //所有的文字块内容
                var sortBoxs = []; //存放box对象
                for (var i = 0; i < boxs.length; i++) {
                    sortBoxs.push(boxs[i]);
                }
                sortBoxs.sort(function(n1, n2) {
                    //H5 data-*
                    var num1 = parseInt(n1.dataset.num);
                    var num2 = parseInt(n2.dataset.num);
                    return num1 - num2; //按从小到大的顺序排
                });
                var last = 0; //上一个有class的对象对应的下标
                for(var i = 0; i < circles.length; i++) {
                    (function(i) {
                        setTimeout(function() {
                            circles[last].className = '';
                            circles[i].className = 'active';
                            last = i; //下一次运动前，值更新为i
                            //对应的文字块区域显示出来
                            /*
                			 * 8个文字块
                			 * i为0-4		第1块显示
                			 * i为5-9		第2块显示
                			 * i为10-14		第3块显示
                			 * i为15-19		第4块显示
                			 * i为20-24		第5块显示
                			 */
                            sortBoxs[parseInt(i / 5)].style.opacity = 1;
                            //走完最后一个，最后一个的class为空
                            if (i == circles.length - 1) {
                                setTimeout(function() {
                                    circles[last].className = '';
                                }, 100);
                            }
                        }, i * 100);
                    })(i);
                }
            }
        },
        //contact页面的动画
        contactIn: function(){
            var fourth = document.getElementById('fourth');
            var infoText = fourth.getElementsByClassName('info-text');
            var contactBox = fourth.getElementsByClassName('contact-box')[0];
            //文字的运动
            for(var i = 0; i< infoText.length; i++){
                infoText[i].style.transition = 'all 1s '+ i*0.5 + 's';
                infoText[i].style.top = '0';
                infoText[i].style.opacity = 1;
            }
            //联系方式的运动
            contactBox.style.transition = 'all 1s '+ i*0.5 + 's';
            contactBox.style.top = '0';
            contactBox.style.opacity = 1;
        },
        //blog点击提示
        blockClick: function(){
            var blog = document.getElementById('blog');
            blog.onclick = function() {
                alert('尝试用nodejs开发中，敬请期待。');
            };
        },
        //创建动态文字
        createText: function(id, arr){
            var speed = 300,
                text = '',
                index = 0,
                pos = 0,
                strLen = arr[0].length;
            appendWord();
            function appendWord() {
                text = '';
                id.innerHTML = text + arr[index].slice(0, pos) + '&nbsp;|';
                if (pos === strLen) {
                    id.innerHTML = id.innerHTML.replace('|', '');
                } else {
                    pos++;
                    setTimeout(appendWord, speed);
                }
            }
        },
        lineShow: function(id){
            var line = document.getElementById(id);
            setTimeout(function() {
                line.style.width = '80px';
            }, 30);
        }

    };
    xcResume.init();
})();

//封装获取可视区宽高的函数;
function viewWidth() {
    return window.innerWidth || document.documentElement.clientWidth;
}

function viewHeight() {
    return window.innerHeight || document.documentElement.clientHeight;
}

//封装获取绝对位置的函数;
function getPos(obj) {
    var pos = {
        left: 0,
        top: 0
    };
    while (obj) {
        pos.left += obj.offsetLeft;
        pos.top += obj.offsetTop;
        obj = obj.offsetParent;
    }
    return pos;
}
