// 'use strict'
import http from 'axios'

export async function list(page = 1, size = 20) {
    var resp = await http.get(`/auth/list?page=${page}&size=${size}`)
    if (resp.status === 200) {
        return resp.data
    }
    return []
}