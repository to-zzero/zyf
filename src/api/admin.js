'use strict'
import http from 'axios'

export async function login(userName, password, captcha) {
    let resp = await http.post('/admin/login', {
        userName, password, captcha
    })
    if (resp && resp.status == 200) {
        return resp.data
    }
    throw '请求发生错误'
}

export async function getUserInfo() {
    let resp = await http.post('/admin/info')
    return resp.data
}

export async function logout() {
    let resp = await http.post('/admin/logout')
    return resp.data
}

export async function register(username, password, userId, userInfo) {
    let resp = await http.post('/admin/register', {
        username, password, userId,
        userInfo: userInfo ? JSON.stringify(userInfo) : ''
    })
    if (resp && resp.status == 200) {
        return resp.data
    }
    throw '请求发生错误'
}

export async function userList() {
    let resp = await http.post('/admin/users')
    if (resp && resp.status == 200) {
        return resp.data
    }
}

export async function getLogList(page, size) {
    let resp = await http.get(`/admin/log?page=${page}&size=${size}`)
    if (resp && resp.status == 200) {
        return resp.data
    }
}

