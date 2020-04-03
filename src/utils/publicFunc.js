// create by zhengruxiu 2020.04.02
// 由对象生成选项
export function getRadio(obj){
    let arr = [], id = 0
    for (var i in obj){
        arr.push({id: id++, label: i, name: obj[i]})
    }
    return arr
}
export function getSelect(obj){
    let arr = [], id = 0
    for (var i in obj){
        arr.push({id: id++, label: obj[i], value: i})
    }
    return arr
}