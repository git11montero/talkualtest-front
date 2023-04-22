export default function ({ store, redirect, route }) {
    /*console.log("redirect")
    console.log(route)
    console.log(route.meta[0].auth)
    console.log(store.getters.isLoggedIn)*/

    if (route.meta[0].auth && !store.getters.isLoggedIn) {
        return redirect('/login')
    }
}