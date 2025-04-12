$(document).ready(function () {
    // Show loader and then content
    setTimeout(function () {
        $('.loader').fadeOut();
    }, 1500);

    // Smooth scroll for navigation links
    $("nav a, .hero-buttons a").on("click", function (e) {
        if (this.hash !== "") {
            e.preventDefault();
            const target = $(this.hash);
            $("html, body").animate(
                {
                    scrollTop: target.offset().top - 80,
                },
                800,
                'swing'
            );
            
            // Update active nav link
            $('.nav-link').removeClass('active');
            $(this).addClass('active');
        }
    });

    // Lightbox functionality
    let currentIndex = 0;
    const galleryItems = $(".gallery-item");
    
    $(".view-btn").on("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        
        currentIndex = $(this).closest('.gallery-item').index();
        updateLightboxContent();
        $("#lightbox").fadeIn(300);
        $("body").css("overflow", "hidden");
    });

    function updateLightboxContent() {
        const galleryItem = galleryItems.eq(currentIndex);
        const src = galleryItem.find('img').attr('src');
        const title = galleryItem.find('h3').text();
        const description = galleryItem.find('p').text();
        const category = galleryItem.data('category');
        
        $("#lightbox img").attr("src", src);
        $(".lightbox-title").text(title);
        $(".lightbox-description").text(description);
        $(".lightbox-category").text(category);
    }

    // Close lightbox
    $("#lightbox .close").on("click", function (e) {
        e.preventDefault();
        $("#lightbox").fadeOut(300);
        $("body").css("overflow", "auto");
    });

    // Navigation between projects
    $(".lightbox-prev").on("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
        updateLightboxContent();
    });

    $(".lightbox-next").on("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        currentIndex = (currentIndex + 1) % galleryItems.length;
        updateLightboxContent();
    });

    // Keyboard navigation
    $(document).on('keydown', function(e) {
        if ($("#lightbox").is(":visible")) {
            if (e.key === 'ArrowLeft') {
                $(".lightbox-prev").click();
            } else if (e.key === 'ArrowRight') {
                $(".lightbox-next").click();
            } else if (e.key === 'Escape') {
                $("#lightbox .close").click();
            }
        }
    });

    // Project filtering
    $(".filter-btn").on("click", function () {
        const filter = $(this).data('filter');
        
        $(".filter-btn").removeClass('active');
        $(this).addClass('active');
        
        if (filter === 'all') {
            $(".gallery-item").fadeIn(300);
        } else {
            $(".gallery-item").each(function () {
                if ($(this).data('category') === filter) {
                    $(this).fadeIn(300);
                } else {
                    $(this).fadeOut(300);
                }
            });
        }
    });

    // Back to top button
    $(window).on('scroll', function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').addClass('visible');
        } else {
            $('.back-to-top').removeClass('visible');
        }
    });

    $('.back-to-top').on('click', function () {
        $('html, body').animate({ scrollTop: 0 }, 800);
    });

    // Header scroll effect
    $(window).on('scroll', function () {
        if ($(this).scrollTop() > 50) {
            $('header').addClass('scrolled');
        } else {
            $('header').removeClass('scrolled');
        }
    });

    // Active nav link based on scroll position
    $(window).on('scroll', function () {
        const scrollPosition = $(this).scrollTop() + 100;
        
        $('section').each(function () {
            const sectionTop = $(this).offset().top;
            const sectionHeight = $(this).outerHeight();
            const sectionId = $(this).attr('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                $('.nav-link').removeClass('active');
                $(`nav a[href="#${sectionId}"]`).addClass('active');
            }
        });
    });

    // Theme toggle
    $('.theme-toggle').on('click', function () {
        $('body').toggleClass('dark-mode');
        $(this).find('i').toggleClass('fa-moon fa-sun');
        
        // Update header background in dark mode
        if ($('body').hasClass('dark-mode')) {
            $('header').css('background-color', 'rgba(45, 55, 72, 0.95)');
        } else {
            $('header').css('background-color', 'rgba(255, 255, 255, 0.95)');
        }
    });

    // Animate skills on scroll
    $(window).on('scroll', function () {
        const skillsOffset = $('.skills').offset().top;
        const scrollPosition = $(this).scrollTop() + $(this).height();
        
        if (scrollPosition > skillsOffset) {
            $('.skill-level').each(function () {
                const width = $(this).parent().prev().find('span:last-child').text();
                $(this).css('width', width);
            });
        }
    });

    // Typewriter effect
    const typewriterTexts = [
        "Creating memorable brand experiences",
        "Designing with purpose",
        "Crafting visual stories",
        "Building meaningful connections"
    ];
    let currentText = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function typeWriter() {
        const text = typewriterTexts[currentText];
        const $typewriter = $('.typewriter-text');
        
        if (isDeleting) {
            $typewriter.text(text.substring(0, charIndex - 1));
            charIndex--;
            typingSpeed = 50;
        } else {
            $typewriter.text(text.substring(0, charIndex + 1));
            charIndex++;
            typingSpeed = 100;
        }
        
        if (!isDeleting && charIndex === text.length) {
            isDeleting = true;
            typingSpeed = 1500; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            currentText = (currentText + 1) % typewriterTexts.length;
            typingSpeed = 500; // Pause before start
        }
        
        setTimeout(typeWriter, typingSpeed);
    }
    
    // Start typewriter effect after loader
    setTimeout(typeWriter, 1500);
});

$(document).ready(function () {
    $('.nav-toggle').on('click', function () {
        $('#mobileNav').toggleClass('active');
        $(this).toggleClass('active');
    });

    $('.nav-link-mobile').on("click", function (e) {
        $('.nav-toggle').click();
    });
});
