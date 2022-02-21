const nonEmpty = data => {
    if (typeof data == 'number') {
        return true;
    }
    if(typeof data == 'boolean'){
        return true;
    }
    if (data) {
        return true;
    }
    return false;
};
const paramJudge = async (data, ...param) => {
    let info;
    param.every(item => {
        info = 'true';
        if(!nonEmpty(data[item])){
            info = item;
        }
        return nonEmpty(data[item]);
    });
    return info;
};
export default paramJudge;