'use strict'
import http from 'axios'

export async function servie_list(catalogId, name) {
    var url = `/service/list?`
    var params = []
    if (catalogId) {
        params.push("catalogId=" + catalogId)
    }
    if (name) {
        params.push("query=" + name)
    }

    url += params.join('&')

    var rlt = await http.get(url)
    if (rlt && rlt.status == 200) {
        return rlt.data || []
    }
    return []
}