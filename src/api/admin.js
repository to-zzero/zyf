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
    if (!params.serviceId)
        return []
    const resp = await http.get(`/service/servelog/monitor?serviceId=${params.serviceId}&type=${params.type}`)
    var result = { items: [] }
    if (resp && resp.status == 200) {
        result.items = resp.data.items.map(r => {
            return {
                date_time: r.time,
                times: r.count
            }
        })
        result.avg = resp.data.avg
        result.max = resp.data.max
        return result;
    }
    return []
}

export async function getSafetyWarningAPI(params) {
    var paramArr = []
    if (params.from) {
        paramArr.push(`from=${params.from}`)
    }

    if (params.to) {
        paramArr.push(`to=${params.to}`)
    }


    const resp = await http.get(`/service/servelog/warn?type=${params.type}&${paramArr.join('&')}`)
    if (resp && resp.status == 200) {
        var result = { ...resp.data }
        result.stat_list = resp.data.stat_list.map(r => {
            return {
                date_time: r.time,
                ip_number: r.count
            }
        })
        return result
    }
    return []
}

function date2str(d) {
    return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
    // return d.toISOString();
}

export async function getDiachargeAPI(params) {
    var paramArr = []
    if (params.from instanceof Date) {
        paramArr.push(`from=${date2str(params.from)}`)
    }

    if (params.to instanceof Date) {
        paramArr.push(`to=${date2str(params.to)}`)
    }

    if (params.type) {
        paramArr.push(`prop=${params.type}`)
    }

    const resp = await http.get(`/service/servelog/amount?type=${params.time}&${paramArr.join('&')}`)
    if (resp && resp.status == 200) {
        var result = {}
        result.items = resp.data.items.map(r => {
            return {
                date_time: r.time,
                count: r.count
            }
        })
        result.today = resp.data.today || 0
        result.yesterday = resp.data.yesterday || 0
        result.month = resp.data.month || 0
        result.year = resp.data.year || 0
        return result
    }
    return []
}
