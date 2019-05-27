**API请求前缀: /v1/api/service**
**所有请求都需要携带token**

## 服务目录 
url前缀 `/catalog`
### 获取目录分类
```js
POST /list
body:
return:
[{
    "subject": [{
        "name": "ht全图",
        "count": 0,
        "id": "1"
      }
    ],
    "name": "ht全图",
    "id": "1"
  },
  {
    "subject": [{
        "name": "基础底图",
        "count": 0,
        "id": "2"
      }
    ],
    "name": "基础底图",
    "id": "2"
  },
  {
    "subject": [{
        "name": "分要素",
        "count": 0,
        "id": "3"
      }
    ],
    "name": "分要素",
    "id": "3"
  }
]
```

### 创建目录
```js
POST /create
body:{name:'xxx',pid:'xxx'}
return: success|fail
```

### 更新目录名称
```js
POST /update
body:{name:'xxx',id:'xxx'}
return : success|fail
```

### 删除目录
```js
POST /delete
body：{id:'xxx'}
return : success|fail
```

## 服务
url前缀 `/service`
### 获取目录下的服务
```js
POST /list
body:{catalogId:'xxx',query:'xxx'}
return: [{
    id:'1',
    name:'航道线',
    metadata:"{}",
    visit:13,
    status:1|0,
    keyword:"影像底图;经纬度;wmts",
    thumbnail:'qegewjuyadaewwqwq',
    createAt:"2019-05-25 15:10:56"
},{
    id:'2',
    name:'航道面',
    metadata:"{}",
    visit:22,
    status:1|0,
    keyword:"影像底图;经纬度;wmts",
    thumbnail:'qegewjuyadaewwqwq',
    createAt:"2019-05-25 15:10:56"
}]
```

###获取服务的详细信息
```js
POST /get
body:{id:'xxx'}
return {
    id:'2',
    name:'航道面',
    metadata:"{
        provider:'国家基础地理信息中心',
        abstract:'全球影像地图服务',
        url:'http://t0.tianditu.gov.cn/img_c/wmts'
    }",
    visit:22,
    status:1|0,
    keyword:"影像底图;经纬度;wmts",
    thumbnail:'qegewjuyadaewwqwq',
    createAt:"2019-05-25 15:10:56"
}

```

###  发布服务
```js
POST /publish
body:{
    name:'航道面',
    metadata:"{}",
    status:1|0,
    keyword:"影像底图;经纬度;wmts",
    thumbnail:'qegewjuyadaewwqwq' //拇指图
}
```
### 上传拇指图(暂不需要)

### 获取拇指图
```js
GET /thumbnail/{id}
return image

```

### 服务操作
```json
POST /action
body:{
    serviceId:'xxxx',
    method:'on|off|delete'
}
return success|fail
```