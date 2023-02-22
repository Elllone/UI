// Получение данных с сервера 

const link = "http://127.0.0.1:8888/new"

import axios from "axios"

export async function getDataBoss() {
    let resp = await axios.get(`${link}/boss/getData`)
    return resp.data
}