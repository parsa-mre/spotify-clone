/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                malachite: "#1BD860",
                night: "#121212",
                silver: "#A7A7A7",
                outerspace: "#4B5252",
                eerie: "#232323",
            },
        },
    },
    plugins: [],
};
