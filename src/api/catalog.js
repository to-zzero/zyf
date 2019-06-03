'use strict'
import http from 'axios'

/**
 * 目录列表。一级二级目录
 */
export async function catalog_list() {
    var result = await http.get('/catalog/list', {
    })

    if (result && result.status == 200) {
        return result.data || []
    }
    return []
}

/**
 * 添加目录
 * @param {*} name 
 * @param {*} pid 
 */
export async function save_catalog(name, pid) {
    var result = await http.post('/catalog/create', {
        name,
        pid
    })

    if (result && result.status == 200) {
        return result.data || []
    }
    return null
}

/**
 * 添加服务到某二级目录下
 * @param {*} ids 
 */
export async function add_services(ids) {
    var result = await http.post('/catalog/add_services', {
        services: ids.join(',')
    })
    if (result && result.status == 200) {
        return result.data
    }
    return false
}

/**
 * 从某二级目录下移除服务
 * @param {*} ids 
 */
export async function remove_services(ids) {
    var result = await http.post('/catalog/remove_services', {
        services: ids.join(',')
    })
    if (result && result.status == 200) {
        return result.data
    }
    return false
}

export async function checkname(catalogId, name, selfId) {
    let rlt = await http.post('/catalog/checkname', {
        id: selfId,
        name: name,
        catelogId: catalogId
    })
    if (rlt && rlt.status == 200) {
        return rlt.data
    }
    return false
}

export async function create(catalog) {
    delete catalog.id
    let rlt = await http.post('/catalog/create', catalog)
    if (rlt && rlt.status == 200) {
        return rlt.data
    }
}

export async function update(catalog) {
    let rlt = await http.post('/catalog/create', catalog)
    if (rlt && rlt.status == 200) {
        return rlt.data
    }
}

export async function delCatalog(id) {
    let rlt = await http.post(`/catalog/delete/${id}`)
    if (rlt && rlt.status == 200) {
        return rlt.data
    }
}