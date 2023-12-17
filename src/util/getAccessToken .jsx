export const getAccessToken = () => {
    const user = localStorage.getItem("USER");
    if (!user) return "";
    return JSON.parse(user)?.accessToken;
};