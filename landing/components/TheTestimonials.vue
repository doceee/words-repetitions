<template>
    <div class="py-4 md:py-10">
        <div class="container mx-auto px-4">
            <div class="mb-4 text-center md:mb-8">
                <h2 class="mb-2 text-4xl font-bold text-primary">
                    Co mówią o nas inni?
                </h2>
                <div class="bg-primary-500 mx-auto h-1 w-20"></div>
            </div>

            <splide :options="splideOptions" aria-label="Client Testimonials">
                <splide-slide
                    v-for="(testimonial, index) in testimonials"
                    :key="index"
                >
                    <testimonial-card :testimonial="testimonial" />
                </splide-slide>
            </splide>
        </div>
    </div>
</template>

<script setup>
import { Splide, SplideSlide } from "@splidejs/vue-splide"
import TestimonialCard from "./TestimonialCard.vue"

const splideOptions = {
    type: "slide",
    perPage: 3,
    perMove: 1,
    gap: "2rem",
    pagination: true,
    arrows: true,
    autoplay: true,
    interval: 5000,
    pauseOnHover: true,
    breakpoints: {
        1024: {
            perPage: 2,
        },
        640: {
            perPage: 1,
        },
    },
}

const testimonials = [
    {
        name: "Ania Adamek",
        quote: "Korzystanie z tej aplikacji do nauki angielskiego było niesamowite! Dzięki niej w końcu mogę swobodnie rozmawiać w pracy i na wakacjach.",
        image: "/images/people/0.webp",
    },
    {
        name: "Marek Piotrowski",
        quote: "Nigdy wcześniej nauka języka nie była tak przyjemna i efektywna. Polecam każdemu, kto chce szybko poprawić swoje umiejętności językowe.",
        image: "/images/people/1.webp",
    },
    {
        name: "Robert Sokół",
        quote: "Aplikacja pomogła mi przełamać barierę językową. Teraz mogę bez stresu prowadzić rozmowy po angielsku, co wcześniej wydawało się niemożliwe.",
        image: "/images/people/2.webp",
    },
    {
        name: "Ewa Szuba",
        quote: "Dzięki tej aplikacji nauka angielskiego stała się częścią mojej codziennej rutyny. Widzę ogromny postęp w zaledwie kilka miesięcy!",
        image: "/images/people/3.webp",
    },
]
</script>
