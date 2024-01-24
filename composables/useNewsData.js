let news = [
    {
        title: "title1",
        paragraph: "paragrapt",
        tag: "tag1",
        images: ['image1', 'image2', 'image3']
    },

]

export const CurrentNews = () => {
    let currentUrl = "api" + window.location.pathname;
    // const route = useRoute()
    // console.log('current name', route.name)
    // console.log(this.$route.path);
    // let routePath 
    // console.log(route.path);
    return currentUrl
    // console.log('current name', useRoute().route.path)
}

