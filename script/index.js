import {KEY, URL} from "./const.js";
getMovies(URL)
async function getMovies(url){
const resp = await fetch(url, {
    headers:{
        "Content-Type": "application.json",
        "x-api-key": KEY
    }
})
const respData = resp.json();
console.log(respData);
}