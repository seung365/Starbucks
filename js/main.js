const searchEl = document.querySelector('.search'); //클래스가 search인 요소를 css 선택자로 찾아서 그것을 searchEl이라는 변수에다 할당 
//document도 하나의 요소로 볼 수 있다. html이라 생각하면 된다
const searchInputEl = searchEl.querySelector('input');

searchEl.addEventListener('click',function() {
    searchInputEl.focus(); //search라는 클래스를 가지고 있는 검색 요소를 선택을 하게 되면 input요소를 focus하겠다.
});

searchInputEl.addEventListener('focus',function()
{
    searchEl.classList.add('focused'); //검색요소 부분에 focused라는 클래스를 추가하겠다.
    searchInputEl.setAttribute('placeholder','통합검색'); //html의 속성을 지정할 때 쓰는 메소드
});

searchInputEl.addEventListener('blur',function() //focus가 해제되면.
{
    searchEl.classList.remove('focused'); //검색요소 부분에 focused라는 클래스를 추가하겠다.
    searchInputEl.setAttribute('placeholder',''); //html의 속성을 지정할 때 쓰는 메소드
});

const badgeEL = document.querySelector('header .badges');
const toTopEl= document.querySelector('#to-top');

window.addEventListener('scroll', _.throttle(function () {
    console.log(window.scrollY);
    if(window.scrollY>500){ //scrollY를 통해 위치를 알 수 있다.
        //배지 숨기기
        //gsap.to(요소,지속시간,옵션);
        gsap.to(badgeEL, .6, {
            opacity: 0,
            display: 'none'
        });
        //버튼 보이기
        gsap.to(toTopEl,.2,{
            x: 0
        });


    }
    else
    {
        //배지 보이기
        gsap.to(badgeEL, .6, {
            opacity: 1,
            display: 'block'
        });
        //버튼 숨기기
        gsap.to(toTopEl,.2,{
            x: 100
        });
    }
},300));
 //0.3초 단위로 부하를 줘서 한번에 실행되는것을 방지
//window 객체는 하나의 브라우저 탭, 보고있는 화면자체다
//화면에서 스크롤 이벤트를 할때 throttle이 많이 사용된다.
//_.throttle(함수, 시간)


toTopEl.addEventListener('click',function(){
    gsap.to(window,.7,{
        scrollTo: 0 //scrollToPlugin이 있어야 가능
    }); //window객체는 우리의 페이지가 출력되고 있는 그 화면 자체이다.
});



const fadeEls = document.querySelectorAll('.visual .fade-in');
fadeEls.forEach(function(fadeEl, index) { 
    gsap.to(fadeEl,1,{
        delay: (index+1)*0.7,  //index는 0부터 시작
        opacity: 1
    });
});

//new Swiper(선택자, 옵션)
new Swiper('.notice-line .swiper-container', {
    direction: 'vertical',
    autoplay: true, loop: true  //자동 재생을 무한히
 });

 new Swiper('.promotion .swiper-container',{
    //direction에 horizontal이라는 기본값이 지정되어있다. 
    slidesPerView:3, //한번에 보여줄 슬라이드 개수
    spaceBetween:10, //슬라이드 사이 여백
    centeredSlides: true, //1번 슬라이드가 가운데 보이기
    autoplay: {
        delay:5000
    }, //swiper-slide-active
    loop: true,
    pagination:{
        el:'.promotion .swiper-pagination', //페이지 번호 요소 
        clickable: true //사용자의 페이지 번호 요소 제어
    },
    navigation:{
        prevEl: '.promotion .swiper-prev',
        nextEl: '.promotion .swiper-next'
    }

 });

 new Swiper('.awards .swiper-container',{
    // direction:'horisontal' 기본값
    autoplay:true,
    loop:true,
    spaceBetween:30,
    slidesPerView: 5,
    navigation:{
        prevEl:'.awards .swiper-prev',
        nextEl:'.awards .swiper-next'
    }
 });


 const promotionEl = document.querySelector('.promotion'); //promotion이란 클래스를 가진 요소를 찾아서 할당
 const promotionToggleBtn = document.querySelector('.toggle-promotion');//toggle-promotion 이란 클래스를 가진 요소를 찾아서 할당
 let isHidePromotion = false;

 promotionToggleBtn.addEventListener('click',function(){
    isHidePromotion = !isHidePromotion; //반대의 값을 반환
    
    if(isHidePromotion)
    {//숨김 처리
        promotionEl.classList.add('hide'); //hide라는 클래스를 추가한다.

    }else
    {//보임 처리
        promotionEl.classList.remove('hide');
    }


 }); //click하면 어떤 함수를 동작 이 함수를 이벤트 핸들러

// 범위 랜덤 함수(소수점 2자리까지)
function random(min, max) {
    // `.toFixed()`를 통해 반환된 문자 데이터를,
    // `parseFloat()`을 통해 소수점을 가지는 숫자 데이터로 변환
    return parseFloat((Math.random() * (max - min) + min).toFixed(2))
}


 function floadingObject(selector,delay,size)
 { //gsap.to(요소,시간,옵션)
    gsap.to(selector, //선택자
        random(1.5,2.5), //애니메이션 동작시간
        { //옵션
        y:size,
        repeat:-1,
        yoyo: true,
        ease: "power1.inOut",
        delay: random(0,delay) //지연시간

    });
 }
 floadingObject('.floating1',1,15);
 floadingObject('.floating2',.5,15);
 floadingObject('.floating3',1.5,20);

 const spyEls = document.querySelectorAll('section.scroll-spy');
 spyEls.forEach(function(spyEl){ 
    new ScrollMagic
    .Scene({
        triggerElement: spyEl, //보여짐 여부를 감시할 요소를 지정.
        triggerHook: .8 //뷰포트 시작 0 가장 끝 1 중간은 0.5가 된다.
    })
    .setClassToggle(spyEl,'show') //show라는 클래스를 추가해준다.
    .addTo(new ScrollMagic.Controller()); 
 }); 

 const thisYear = document.querySelector('.this-year');
 thisYear.textContent = new Date().getFullYear(); //올해의 연도