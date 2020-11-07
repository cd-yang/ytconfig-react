import Mock from 'mockjs';

//#region upload project data

Mock.mock("/api/uploadfile", {
    "isprojectvalid": true
})

//#endregion

//#region get Subsystem data

let Random = Mock.Random
const num = Random.integer(3, 7);
let returnValue = [];
for (let i = 0; i < num; i++) {
    const id = Random.guid();
    const name = Random.cword(3, 5);
    returnValue.push({name: name, id: id});
}
Mock.mock("/api/subsystemdata", {
    "subsystemData": returnValue
})

//#endregion
