import Mock from 'mockjs';

let Random = Mock.Random
const numebr = Random.integer(18, 30)
const county = Random.county(true)
const name = Random.cname(true)

Mock.mock("/api/uploadfile", {
    "data": [name, county, numebr]
})