// 'use strict'
import http from 'axios'

export async function list(page = 1, size = 20) {
    var resp = await http.get(`/auth/list?page=${page}&size=${size}`)
    if (resp.status === 200) {
        return resp.data
    }
    return []
}

export async function auth(params) {
    var resp = await http.post(`/auth/set`, params)
    if (resp.status === 200) {
        return resp.data
    }
    return false
}

export async function approve(id, approved) {
    var resp = await http.post(`/auth/approve`, { id, approved })
    if (resp.status === 200) {
        return resp.data
    }
    return false
}