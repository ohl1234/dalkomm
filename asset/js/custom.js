$(function(){

    $('.btn-requset').click(function(){
        if($('.gnb-area').css('display') == 'block'){
            menuActive.reverse();
            $('.requset-area').addClass('active');
        }else{
            $('.requset-area').addClass('active');
        }
    })
    $('.btn-close').click(function(){
        $('.requset-area').removeClass('active');
    })

    let lastScroll = 0;
    $(window).scroll(function(){
        curr = $(this).scrollTop();
        here = $('.sc-about').offset().top;
        console.log(here);

        if(curr >= here){
            $(".header").addClass('active')
        }else{
            $(".header").removeClass('active')
        }
    })

    $('.gnb-area a').click(function(){

        const headerHeight = $('.header').outerHeight(); //header 의 높이 만큼 조절 하면 됨

        $('html, body').animate({
  
            scrollTop: $( $.attr(this, 'href') ).offset().top - ( headerHeight + 15)
  
        }, 500);
        menuActive.reverse();

    })
    //1. 스케일
    gsap.to('.ani-area',1,{
        scale:1.1,
        repeat:-1, //음수는 무한
        yoyo:true

    })

    gsap.from('.sc-visual .thumb-area',{
        scrollTrigger:{
            trigger:".sc-visual",
            start:"top top",
            end:"bottom top",
            scrub:1,
            //markers:true
        },
        scale:1.15
    })

    gsap.set('.gnb-area',{
        opacity: 0,
        scale:0.8,
        yPercent:50,
    })
    menuActive = gsap.to('.gnb-area',{
        opacity: 1,
        scale:1,
        display: 'block',
        yPercent:0,
        paused:true
    })

    $('.btn-menu').click(function(){
        menuActive.restart();
    })
    $('.gnb-area .btn-close').click(function(){
        menuActive.reverse();
    })

    /**
     * 
     * 
     * @data-fade
     * @data-stagger
     * 
     */

    $('[data-fade]').each(function(i,el){
        child = $(this).find('>*');
        
        element = $(this).data('stagger') ? $(this).find(">*") : el
        gsap.from(element,{
            scrollTrigger:{
                trigger:el,
                start:"top 80%",
                end:"bottom top",
                //markers:true
            },
            stagger:0.1,
            yPercent:30,
            opacity:0,
            duration:0.7
        })
    })

    gsap.from('.sc-infrastructure img',{
        scrollTrigger:{
            trigger:".sc-infrastructure",
            start:"top 80%",
            end:"bottom top",
            scrub:1
        },
        yPercent: 10
    })

    const layoutAni = gsap.timeline({
        scrollTrigger:{
            trigger:'.sc-apartments',
            start:"top 80%",
            end:"bottom top",
            duration: 1,
            scrub:1
        }
    })
    layoutAni.addLabel('a')
    .from('.sc-apartments .wrap1',{yPercent:40},'a')
    .from('.sc-apartments .wrap2',{ yPercent:-40},'a')



    gsap.to('.sc-developer .tit-ani',{
        scrollTrigger:{
            trigger:".group-project .project-area",
            start:"top 30%",
            end:"bottom top",
            //markers:true,
            scrub:1,
            duration:1.5
        },
        xPercent:-100
    })
    


    $('.selection').click(function(){
        $('.select-option').addClass('active');
    })

    $('.select-option button').click(function(){
        data = {
            nation:$(this).find('.country-name').text(),
            flag:$(this).find('.option-flag').data('flag'),
            code:$(this).find('.option-code').text()
        }
        $('.selection .blind').text(data.nation)
        $('.selection .select-flag i').removeClass().addClass(data.flag)
        $('.selection .select-code').text(data.code)
        $('.select-option').removeClass('active');
    })


    const swiper1 = new Swiper(".sc-benefits .swiper", {
        effect: "fade",
        navigation: {
            nextEl: ".btn-next",
            prevEl: ".btn-prev",
            },
            pagination: {
            el: ".pagination",
            type: 'fraction'
            }
        });

    slide7Arr = ['Dream Island','Kolomenskoye','CSKA Arena','Riviera Mall']
    const swiper2 = new Swiper(".sc-infrastructure .swiper", {
        autoplay: {
            delay: 6000,
            disableOnInteraction: false,
            },
        pagination: {
            el: ".sc-infrastructure .tab-list",
            clickable: true,
            renderBullet: function (index, className) {
                //return '<span class="' + className + '">' + (index + 1) + "</span>";
                return `<a href="#" class="tab-item ${className}">${slide7Arr[index]}</a>`;
            }
        }
    });

    const swiper3 = new Swiper(".sc-rare .swiper", {
        slidesPerView: "auto",
        spaceBetween: 30,
        navigation: {
        nextEl: ".btn-next",
        prevEl: ".btn-prev",
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

    $('.ic-plus').hover(function(){
        $('.info-hover').removeClass('active')
        $('.info-hover').find('.info-box').removeClass('active')
        $(this).parent('.info-hover').toggleClass('active')
        $(this).parent('.info-hover').find('.info-box').addClass('active')
    },function(){
        $('.info-hover').removeClass('active')
        $('.info-hover').find('.info-box').removeClass('active')
    })

    let isHover = false; // settimeout  중복실행방지

    $('.storage-list .storage-item').hover(function(){
        idx = $(this).index();
        if(isHover === false){
            isHover = true; // 실행이 되자마자 true -> 그 다음에 실행 ㄴㄴ
            $('.sc-storage .current').addClass('hide')// top 100% 더내림
            $('.sc-storage .thumb-box').removeClass('active').eq(idx).addClass('active') // top 0
            
            setTimeout(function(){
                $('.sc-storage .current').removeClass('hide') // top 100% -> top  -100%
                $('.sc-storage .thumb-box').removeClass('current').eq(idx).addClass('current') // 작동중인 애한테 넣기
            },1000)
            // 하이드빼고 커런트 들어가야함
        }
    })

    $('.sc-finishing .btn-tab').click(function(e){
        e.preventDefault();
        href = $(this).data('target');

        $('[data-id='+href+']').addClass('active').siblings().removeClass('active');
        $(this).addClass('active').siblings().removeClass('active')
    });
})

    // $('[data-stagger]').each(function(i,el){

    //     child = $(this).find('>*')
        
    //     gsap.from(child,{
    //         scrollTrigger:{
    //             trigger:el,
    //             start:"top 80%",
    //             end:"bottom top",
    //             markers:true
    //         },
    //         stagger:0.2,
    //         yPercent:30,
    //         opacity:0
    //     })
    // })