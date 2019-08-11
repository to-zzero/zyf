'use strict'
import http from 'axios'
import { async } from 'q';

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

export async function getLogList(page, size, username) {
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
        paramArr.push(`from=${date2str(params.from)}`)
    }

    if (params.to) {
        paramArr.push(`to=${date2str(params.to)}`)
    }

    paramArr.push(`page=${params.page}`)
    paramArr.push(`size=${params.size}`)
    if (params.logOnly) {
        paramArr.push(`queryOnly=${!!params.page}`)
    }


    const resp = await http.get(`/service/servelog/warn?type=${params.type}&${paramArr.join('&')}`)
    if (resp && resp.status == 200) {
        var result = { ...resp.data }
        if (!params.logOnly) {
            result.stat_list = resp.data.stat_list.map(r => {
                return {
                    date_time: r.time,
                    ip_number: r.count
                }
            })
        }
        return result
    }
    return []
}

function date2str(d) {
    return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
    // return d.toISOString();
}

export async function getDiachargeSmmary() {
    const resp = await http.get(`/service/servelog/amount/summary`)
    if (resp && resp.status == 200) {
        return resp.data
    }
    return {}
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
        return result
    }
    return {}
}

/**
 * 
 * @param { {from:Date,to:Date,type:'today'|'week'|'month',page:Number,size:Number,logOnly:Boolean} param 
 */
export async function getAccessLog(param) {
    var paramArr = []

    paramArr.push(`type=${param.type}`)
    paramArr.push(`page=${param.page}`)
    paramArr.push(`size=${param.size}`)

    if (param.from) {
        paramArr.push(`from=${date2str(param.from)}`)
    }

    if (param.to) {
        paramArr.push(`to=${date2str(param.to)}`)
    }

    if (param.logOnly) {
        paramArr.push(`queryOnly=true`)
    }

    return {
        total: 100,
        page: 1,
        size: 10,
        stat_list: [
            {
                time: '2019-1-1 0:0:0',
                count: 13
            },
            {
                time: '2019-1-1 0:0:0',
                count: 12
            },
            {
                time: '2019-1-1 0:0:0',
                count: 32
            },
            {
                time: '2019-1-1 0:0:0',
                count: 11
            },
            {
                time: '2019-1-1 0:0:0',
                count: 43
            },
            {
                time: '2019-1-1 0:0:0',
                count: 21
            },
            {
                time: '2019-1-1 0:0:0',
                count: 63
            }
        ]
    }

    const resp = await http.get(`/service/servelog/visit?${paramArr.join("&")}`)
    if (resp && resp.status == 200) {
        return resp.data
    }
    return {}
}
