import axios from "axios";
import { store } from "..";
import {
    turnOffLoadingAction,
    turnOnLoadingAction,
} from "../redux/action/spinner";
import { getAccessToken } from "../util/getAccessToken ";

const TOKEN_CYBERSOFT =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA1NiIsIkhldEhhblN0cmluZyI6IjAzLzA0LzIwMjQiLCJIZXRIYW5UaW1lIjoiMTcxMjEwMjQwMDAwMCIsIm5iZiI6MTY4MzMwNjAwMCwiZXhwIjoxNzEyMjUwMDAwfQ.YeDhc_oSixV2XtFPDzcpxFhBos5832JpQpndHNoqZLk";
const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiMTExMTExIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiR1YiLCJuYmYiOjE3MDE0MDI4MTMsImV4cCI6MTcwMTQwNjQxM30.H-jhTQCQiJX2B4DyCncuF-Vy9whDgyYv9H7SyJfVfvE";

export let https = axios.create({
    baseURL: "https://jiranew.cybersoft.edu.vn",
    headers: {
        tokenCybersoft: TOKEN_CYBERSOFT,
        Authorization: 'Bearer ' + getAccessToken()
    },
});

// export let httpsTicket = axios.create({
//     baseURL: "https://domain.xyz/",
//     headers: {
//         tokenCybersoft: TOKEN_CYBERSOFT,
//     },
// });

https.interceptors.request.use(
    function (config) {
        //api đi
        store.dispatch(turnOnLoadingAction());
        return config;
    },
    function (error) {
        store.dispatch(turnOffLoadingAction());
        return Promise.reject(error);
    }
);

https.interceptors.response.use(
    function (response) {
        //api về
        store.dispatch(turnOffLoadingAction());
        return response;
    },
    function (error) {
        store.dispatch(turnOffLoadingAction());
        return Promise.reject(error);
    }
);
