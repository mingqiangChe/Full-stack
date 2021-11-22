// 接口:是一种能力,一种约束而己

(() => {
    // 定义接口
    interface IPerson {
        firstName: string //性
        lastName: string  //名
    }
    //输出姓名
    function showFullName(person: IPerson) {
        return person.firstName + '-' + person.lastName
    }
    // 定义对象
    const person = {
        firstName: '东方',
        lastName: '不败'
    }
    console.log(showFullName(person));
    
})()