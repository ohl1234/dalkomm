$(function(){
    document.cookie = "safeCookie1=foo; SameSite=Lax"; 
    document.cookie = "safeCookie2=foo"; 
    document.cookie = "crossCookie=bar; SameSite=None; Secure";
    /**
     *  1. header event
     *  1-1. 스크롤 시 sticky header
     *  1-2. btn-request 클릭 시 이벤트
     *  1-3. btn-menu클릭 시 gsap이벤트
     *  1-4. 앵커포인트 클릭 시 메뉴 닫힘
     */

    $(window).scroll(function(){
        curr = $(this).scrollTop();
        href = $('#about').offset().top;

        if (curr >= href) {
            $('.header').addClass('active');
        } else {
            $('.header').removeClass('active');
        };
    });

    $('.btn-requset').click(function(){
        if($('.gnb-area').css('display') == 'block'){
            menuOpen.reverse();
            $('.requset-area').addClass('active');
        }else{
            $('.requset-area').addClass('active');
        }
    });
    $('.requset-area .btn-close').click(function(){
        $('.requset-area').removeClass('active');

        $('.requset-area .selection .blind').text('Russia');
        $('.requset-area .selection .select-flag i').addClass('russia');
        $('.requset-area .selection .select-code').text('+7');
        $('.requset-area .select-option').removeClass('active');
    });

    gsap.set('.gnb-area',{
        opacity:0,
        scale:0.8,
        yPercent:50
    });
    menuOpen = gsap.to('.gnb-area',{
        opacity:1,
        scale:1,
        display:"block",
        yPercent:0,
        paused:true // 애니메이션 중지
    });

    $('.btn-menu').click(function(){
        menuOpen.restart();  // 다시 애니메이션 시작가능
    });
    $('.gnb-area .btn-close').click(function(){
        menuOpen.reverse(); // gsap.set 상태로 
    });

    $('.gnb-area a').click(function(){
        const headerHeight = $('.header').outerHeight(); // header height값

        $('html, body').animate({
            scrollTop: $( $.attr(this, 'href') ).offset().top - (headerHeight + 40)
        },500);
        menuOpen.reverse();
    });

    /**
     *  2. main event
     *  2-1. sc-visual gsap 
     *  2-2. 공통 gsap // each문, if?문 data-fade data-stagger
     *  2-3. sc-store img
     *  2-4. sc-coffee layout
     *  2-5. sc-global tit ani
     *  2-6. 셀렉트 국기변경,정보변경 // 객체,text(),addclass,removeclass
     *  2-7. ic-plus hover 이벤트
     *  2-8. .sc-global .btn-tab 이벤트
     *  2-9. .sc-season hover 이벤트
     *  2-10 .sc-location map
     */

    const introAni = gsap.timeline({});
    introAni.addLabel('a')
    .to('.loading',{ opacity:0, display:'none', duration:1, delay:0.8},'a')
    .to('.sc-visual .ani-area',{ scale:100, duration:2, display:'none', delay:2},'a')
    .from('.sc-visual .text',{ yPercent:100, stagger:0.2, duration:0.5, delay:2.8},'a')

    gsap.from('.sc-visual .bg-area',{
        scrollTrigger:{
            trigger:".sc-visual",
            start:"top top",
            end:"bottom top",
            scrub:1,
        },
        scale:1.12
    });

    $('[data-fade]').each(function(i,el){
        child = $(this).find('>*');

        element = $(this).data('stagger') ? $(this).find('>*') : el;
        // 만약 긱 data-fade에 data-stagger가 있으면 data-stagger > * 선택. 아니면 data-fade의 갯수 
        gsap.from(element,{
            scrollTrigger:{
                trigger:el,
                start:"top 80%",
                end:"bottom top",
            },
            stagger:0.1,
            yPercent:30,
            opacity:0,
            duration:0.7
        })
    });

    gsap.from('.sc-store img',{
        scrollTrigger:{
            trigger:".sc-store",
            start:"top 80%",
            end:"bottom top",
            scrub:1
        },
        yPercent:10
    });

    const layoutAni = gsap.timeline({
        scrollTrigger:{
            trigger:".sc-coffee",
            start:"top 80%",
            end:"bottom top",
            scrub:1
        }
    });
    layoutAni.addLabel('a')
    .from('.sc-coffee .wrap1',{yPercent:40},'a')
    .from('.sc-coffee .wrap2',{yPercent:-40},'a')

    gsap.to('.sc-global .tit-ani',{
        scrollTrigger:{
            trigger:".sc-location",
            start:"60% 30%",
            end:"bottom top",
            scrub:1,
            duration:1.5
        },
        xPercent:-100
    })

    // requset-area
    $('.requset-area .selection').click(function(){
        $('.requset-area .select-option').addClass('active');
    });

    $('.requset-area .select-option button').click(function(){
        data = {
            nation:$(this).find('.country-name').text(),
            flag:$(this).find('.option-flag').data('flag'),
            code:$(this).find('.option-code').text()
        }

        $('.requset-area .selection .blind').text(data.nation);
        $('.requset-area .selection .select-flag i').removeClass().addClass(data.flag);
        $('.requset-area .selection .select-code').text(data.code);
        $('.requset-area .select-option').removeClass('active');
    });

    // sc-location
    $('.sc-location .selection').click(function(){
        $('.sc-location .select-option').addClass('active');
    });

    $('.sc-location .select-option button').click(function(){
        data = {
            nation:$(this).find('.country-name').text(),
            flag:$(this).find('.option-flag').data('flag'),
            code:$(this).find('.option-code').text()
        }

        $('.sc-location .selection .blind').text(data.nation);
        $('.sc-location .selection .select-flag i').removeClass().addClass(data.flag);
        $('.sc-location .selection .select-code').text(data.code);
        $('.sc-location .select-option').removeClass('active');
    });

    //sc-partner
    $('.sc-partner .selection').click(function(){
        $('.sc-partner .select-option').addClass('active');
    });

    $('.sc-partner .select-option button').click(function(){
        data = {
            nation:$(this).find('.country-name').text(),
            flag:$(this).find('.option-flag').data('flag'),
            code:$(this).find('.option-code').text()
        }

        $('.sc-partner .selection .blind').text(data.nation);
        $('.sc-partner .selection .select-flag i').removeClass().addClass(data.flag);
        $('.sc-partner .selection .select-code').text(data.code);
        $('.sc-partner .select-option').removeClass('active');
    });


    $('.ic-plus').hover(function(){
        $(this).parent().addClass('active');
        $(this).siblings('.info-box').addClass('active');
    },function(){
        $(this).parent().removeClass('active');
        $(this).siblings('.info-box').removeClass('active');
    });

    $('.sc-global .btn-tab').click(function(e){
        e.preventDefault();

        target = $(this).data('target');

        $(this).addClass('active').siblings().removeClass('active');
        $('[data-id='+target+']').addClass('active').siblings().removeClass('active');
    });

    $('.sc-season .thumb-box').eq(0).addClass('active')
    $('.sc-season .season-item').mouseenter(function(){
        idx = $(this).index();
        $('.sc-season .thumb-box').siblings().removeClass('active').eq(idx).addClass('active')
    })

    $('.sc-location .location-wrap').click(function(e){
        e.preventDefault();
        target = $(this).data('target');

        $('[data-id='+target+']').addClass('active').siblings().removeClass('active')
    })


    /**
     *  3. swiper-slide event
     */

    const swiper1 = new Swiper(".sc-signature .swiper", {
    effect: "fade",
    navigation: {
        nextEl: ".next1",
        prevEl: ".prev1",
        },
        pagination: {
        el: ".pagination",
        type: 'fraction'
        }
    });

    slide7Arr = ['Signature Type','Standard Type','Air Type']
    const swiper2 = new Swiper(".sc-store .swiper", {
        autoplay: {
            delay: 6000,
            disableOnInteraction: false,
            },
        pagination: {
            el: ".sc-store .tab-list",
            clickable: true,
            renderBullet: function (index, className) {
                return `<a href="#" class="tab-item ${className}">${slide7Arr[index]}</a>`;
            }
        }
    });

    const swiper3 = new Swiper(".sc-story .swiper", {
        slidesPerView: "auto",
        spaceBetween: 30,
        navigation: {
        nextEl: ".next2",
        prevEl: ".prev2",
        }
    });

    const swiper4 = new Swiper(".sc-finishing .swiper", {
        effect: "fade",
        navigation: {
          nextEl: ".btn-next",
          prevEl: ".btn-prev",
        },
        pagination: {
          el: ".pagination",
          clickable: true,
        },
    });

    const swiper5 = new Swiper(".sc-gallery .swiper", {
        navigation: {
          nextEl: ".btn-next",
          prevEl: ".btn-prev",
        },
        pagination: {
          el: ".pagination",
          clickable: true,
        },
    });
})
