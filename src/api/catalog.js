'use strict'
import http from 'axios'

export const catalog_list =async function () {
    var result=await http.get('/catalog/list', {
    })

    if(result && result.status==200){
        return result.data||[]
    }
    return []
}