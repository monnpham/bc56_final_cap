import { https } from "./config";

export let userService = {
    login: (valueForm) => {
        return https.post("/api/Users/signin", valueForm);
    },
    register: (valueForm) => {
        return https.post("/api/Users/signup", valueForm);
    },

    getDetail: (id) => {
        return https.get(`/api/Users/getUser${id}`);
    },
    getListAllProject: () => {
        return https.get("/api/Project/getAllProject");
    },
    getProjectCategory: () => {
        return https.get("/api/ProjectCategory");
    },
    postCreateProject: (valueForm) => {
        return https.post("/api/Project/createProject", valueForm);
    }

};
export let projectService = {
    postCreateProject: (valueForm) => {
        return https.post("/api/Project/createProject", valueForm);
    },
    getProjectDetail: (id) => {
        return https.get(`/api/Project/getProjectDetail?id=${id}`);
    },
    putUpdateProject: (id, updatedData) => {
        return https.put(`/api/Project/updateProject?projectId=${id}`, updatedData);
    }
}

// export let movieService = {
//     getList: (page, perPage) => {
//         return https.get(
//             `/api/QuanLyPhim/LayDanhSachPhimPhanTrang?maNhom=GP09&soTrang=${page}&soPhanTuTrenTrang=${perPage}`
//         );
//     },
//     getListAllMovie: () => {
//         return https.get("/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP09");
//     },

//     getDetail: (id) => {
//         return https.get(`/api/QuanLyPhim/LayThongTinPhim?MaPhim=${id}`);
//     },
//     getBanner: () => {
//         return https.get("/api/QuanLyPhim/LayDanhSachBanner");
//     },
//     getMovieByTheater: () => {
//         return https.get(
//             "/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=GP09"
//         );
//     },
//     getShowTimesMovie: (maPhim) => {
//         return https.get(
//             `/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`
//         );
//     },
// };

