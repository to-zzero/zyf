'use strict'
import http from 'axios'

export const catalog_list = async function () {
    var result = await http.get('/catalog/list', {
    })

    if (result && result.status == 200) {
        return result.data || []
    }
    return []
}

export const save_catalog = async function (name, pid) {
    var result = await http.post('/catalog/create', {
        name,
        pid
    })

    if (result && result.status == 200) {
        return result.data || []
    }
    return null
}

export async function add_services(ids) {
    var result = await http.post('/catalog/add_services', {
        services: ids.join(',')
    })
    if (result && result.status == 200) {
        return result.data
    }
    return false
}

export async function remove_services(ids) {
    var result = await http.post('/catalog/remove_services', {
        services: ids.join(',')
    })
    if (result && result.status == 200) {
        return result.data
    }
    return false
}