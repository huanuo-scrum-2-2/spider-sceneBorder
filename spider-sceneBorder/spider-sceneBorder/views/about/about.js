      var arrImg = ['../../static/images/关于轮播1.jpg', '../../static/images/关于轮播2.jpg', '../../static/images/关于轮播3.jpg'], 
      //背景url地址数组，更加多自己增加这个数组项
          dom =  document.getElementById('about_head'),
                    timer = 2000;
        function changeImg(index,arrImg,t) {
            var l = arrImg.length
            if (index >= l) index = 0; 
            dom.style.backgroundImage = 'url(' + arrImg[index] + ')';
            index++;
            setTimeout(function(){
                    changeImg(index,arrImg,t)
            },timer)
        }
        changeImg(0,arrImg,timer);

