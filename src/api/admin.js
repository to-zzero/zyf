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

export async function auth(auth, userId) {
    let resp = await http.post(`/admin/auth`, { access: JSON.stringify(auth || []), to: userId })
    if (resp && resp.status == 200) {
        return resp.data
    }
}

export async function getStatusMonitorAPI(params = {}) {
    return [
        {
            date_time: new Date().getTime(),
            times: 3
        },
        {
            date_time: new Date().getTime() + 100,
            times: 1
        },
        {
            date_time: new Date().getTime() + 300,
            times: 6
        },
        {
            date_time: new Date().getTime() + 500,
            times: 4
        },
        {
            date_time: new Date().getTime() + 600,
            times: 2
        },
        {
            date_time: new Date().getTime() + 700,
            times: 5
        }
    ]
    const result = await http.get(`/api/service/servelog/monitor?serviceId=${params.serviceId}&type=${params.type}`)
    return result
}

export async function getSafetyWarningAPI(params) {
    return [
        {
            date_time: new Date().getTime(),
            ip_number: 3
        },
        {
            date_time: new Date().getTime() + 100,
            ip_number: 1
        },
        {
            date_time: new Date().getTime() + 300,
            ip_number: 6
        },
        {
            date_time: new Date().getTime() + 500,
            ip_number: 4
        },
        {
            date_time: new Date().getTime() + 600,
            ip_number: 2
        },
        {
            date_time: new Date().getTime() + 700,
            ip_number: 5
        }
    ]
    const result = await http.get(`/api/service/servelog/amount?type=${params.type}&from=${params.from}&to=${params.to}`)
    return result
}

export async function getDiachargeAPI(params) {
    return [
        {
            date_time: new Date().getTime(),
            count: 3
        },
        {
            date_time: new Date().getTime() + 100,
            count: 1
        },
        {
            date_time: new Date().getTime() + 300,
            count: 6
        },
        {
            date_time: new Date().getTime() + 500,
            count: 4
        },
        {
            date_time: new Date().getTime() + 600,
            count: 2
        },
        {
            date_time: new Date().getTime() + 700,
            count: 5
        }
    ]
    const result = await http.get(`/api/service/servelog/count?type=${params.type}&from=${params.from}&to=${params.to}`)
    return result
}
