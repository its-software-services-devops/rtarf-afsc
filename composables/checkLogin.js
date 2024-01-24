let username = ''
// let auth_key = ''

export const useCheckLogin = () => {
    const router = useRouter()
    let currentUrl = new URL(window.location)
    let userInfo = localStorage.getItem("UserProfile")
    // console.log(userInfo)
    let userProfileJson = JSON.parse(localStorage.getItem('UserProfile'))
    // console.log(userProfileJson)
    // console.log(currentUrl)
    if (userInfo) {

        let jsonInfo = JSON.parse(userInfo)
        try {
            if (jsonInfo.username) {
                console.log('logged in !')
            } else {
                localStorage.removeItem('UserProfile')
                // location.replace(currentUrl.origin + "/login")
                console.log('user route push')
                router.push("/login")
            }

        } catch (error) {
            localStorage.removeItem('UserProfile')
            console.log('user route push')
            router.push("/login")
            // location.replace(currentUrl.origin + "/login") 

        }
        username = jsonInfo.username
        // auth_key = jsonInfo.auth_key

        if (currentUrl.pathname === '/login') {

            // location.replace(currentUrl.origin)
            router.push("/")
        }

    } else {

        if (currentUrl.pathname != '/login') {

            // location.replace(currentUrl.origin + "/login")
            router.push("/login")
        }

    }
};

export const useGetUsername = () => {
    return username
};

export const useGetAuthKey = () => {
    return auth_key
};



