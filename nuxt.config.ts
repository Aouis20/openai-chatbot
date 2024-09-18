// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: ["nuxt-chatgpt", "@nuxtjs/tailwindcss", "shadcn-nuxt"],
  chatgpt: {
    apiKey: process.env.API_KEY,
  },
});
