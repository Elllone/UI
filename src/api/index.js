const link = "http://127.0.0.1:8888/new"

import axios from "axios"

export function getData() {
	return axios.get(`${link}/boss/getData`).then(({ data }) => data)
}