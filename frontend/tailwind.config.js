/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.{vue,html,js}'],
    theme: {
        extend: {
            colors: {
                primary: '#e5e7eb'
            }
        },
        fontFamily: {
            sans: ['Inter', 'sans-serif']
        }
    },
    plugins: [
        require('@tailwindcss/forms'),
        require('@tailwindcss/aspect-ratio')
    ]
};
