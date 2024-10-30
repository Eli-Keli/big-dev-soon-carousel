// Add your JavaScript here.
class BEMcarousel {
    constructor() {
        this.currentSlide = 0;
        this.slides = document.querySelectorAll(".carousel__slide");
        this.thumbnails = document.querySelectorAll(".carousel__thumbnail");
        this.nextButton = document.querySelector(".carousel__button--next");
        this.prevButton = document.querySelector(".carousel__button--prev");

        this.init();
    }

    init() {
        this.addEventListeners();
        this.setupKeyboardNavigation();
        this.setupTouchNavigation();
    }

    addEventListeners() {
        this.nextButton.addEventListener("click", () => this.navigate("prev"));
        this.prevButton.addEventListener("click", () => this.navigate("next"));

        this.thumbnails.forEach((thumbnail, index) => {
            thumbnail.addEventListener("click", () => this.goToSlide(index));
        })
    }

    setupKeyboardNavigation() {
        document.addEventListener("keydown", (event) => {
            if (event.key === "ArrowLeft") this.navigate("prev");
            if (event.key === "ArrowRight") this.navigate("next");
        })
    }

    setupTouchNavigation() {
        let touchStartX = 0;
        const mainCarousel = document.querySelector(".carousel__main");

        mainCarousel.addEventListener("touchstart", (event) => {
            touchStartX = event.touches[0].clientX;
        }, { passive: true })

        mainCarousel.addEventListener("touchend", (event) => {
            const touchEndX = event.changedTouches[0].clientX;
            const diff = touchStartX - touchEndX;

            if (diff > 0) this.navigate("next");
            if (diff < 0) this.navigate("prev");
        }, { passive: true })
    }

    navigate(direction) {
        this.slides[this.currentSlide].classList.remove("carousel__slide--active");
        this.thumbnails[this.currentSlide].classList.remove("carousel__thumbnail--active");

        if (direction === "next") {
            this.currentSlide = (this.currentSlide + 1) % this.slides.length;
        } else {
            this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        }

        this.updateSlides();
    }

    goToSlide(index) {
        if (index === this.currentSlide) return;

        this.slides[this.currentSlide].classList.remove("carousel__slide--active");
        this.thumbnails[this.currentSlide].classList.remove("carousel__thumbnail--active");
        this.currentSlide = index;
        this.updateSlides();
    }

    updateSlides() {
        this.slides[this.currentSlide].classList.add("carousel__slide--active");
        this.thumbnails[this.currentSlide].classList.add("carousel__thumbnail--active");

        // Ensure active thumbnail is visible in the navigation
        this.thumbnails[this.currentSlide].scrollIntoView({ 
            block: "nearest",
            behavior: "smooth",
            inline: "center"
        });
    }
}

document.addEventListener("DOMContentLoaded", () => {
    new BEMcarousel();
});