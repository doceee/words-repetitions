<template>
    <div
        class="testimonial-card mx-auto flex max-w-md flex-col items-center rounded-xl bg-white p-8 text-center shadow-[-4px_0px_40px_-18px_rgba(0,0,0,0.1)]"
    >
        <div
            class="relative mb-6 h-24 w-24 overflow-hidden rounded-full border-4 border-primary md:h-28 md:w-28"
        >
            <nuxt-img
                :src="testimonial.image"
                :alt="`${testimonial.name}'s picture`"
                class="h-full w-full object-cover"
            />
        </div>

        <div class="text-5xl leading-none text-primary">"</div>

        <p class="mb-2 italic leading-relaxed text-gray-700">
            {{ testimonial.quote }}
        </p>

        <div class="mt-auto">
            <h3 class="font-bold text-gray-900">
                {{ testimonial.name }}
            </h3>
        </div>
    </div>
</template>

<script setup>
defineProps({
    testimonial: {
        type: Object,
        required: true,
    },
})
</script>
