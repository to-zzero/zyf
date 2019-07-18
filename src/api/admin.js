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

export async function getStatusMonitorList() {
    return [
        {
            id: 1,
            name: '海图全图',
            children: [
                {
                id: '1-1',
                name: '海图A服务'
                },
                {
                id: '1-2',
                name: '海图B服务'
                },
                {
                id: '1-3',
                name: '海图C服务'
                },
                {
                id: '1-4',
                name: '海图D服务'
                }
            ]
            },
            {
            id: 2,
            name: '基础底图',
            children: [
                {
                id: '2-1',
                name: '基础A服务'
                },
                {
                id: '2-2',
                name: '基础B服务'
                },
                {
                id: '2-3',
                name: '基础C服务'
                },
                {
                id: '2-4',
                name: '基础D服务'
                }
            ]
            },
            {
            id: 3,
            name: '分要素',
            children: [
                {
                id: '3-1',
                name: '分要素A服务'
                },
                {
                id: '3-2',
                name: '分要素B服务'
                },
                {
                id: '3-3',
                name: '分要素C服务'
                },
                {
                id: '3-4',
                name: '分要素D服务'
                },
                {
                id: '3-5',
                name: '分要素A服务'
                },
                {
                id: '3-6',
                name: '分要素B服务'
                },
                {
                id: '3-7',
                name: '分要素C服务'
                },
                {
                id: '3-8',
                name: '分要素D服务'
                },
                {
                id: '3-9',
                name: '分要素A服务'
                },
                {
                id: '3-10',
                name: '分要素B服务'
                },
                {
                id: '3-11',
                name: '分要素C服务'
                },
                {
                id: '3-12',
                name: '分要素D服务'
                }
            ]
        }
    ]
}

export async function getStatusMonitorInfo() {
    return {
        name: '服务名称',
        tag: '海图A服务',
        key: '关键字',
        abstract: '摘要',
        publish_time: '发布时间',
        status: '服务状态',
        unit: '单位'
    }
}