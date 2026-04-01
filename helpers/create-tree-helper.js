let createTree = (arr, parentId = "") => {
    let tree = []
    arr.forEach((item) => {
        if (item.parent_id == parentId) {
            let newItem = item;
            let children = createTree(arr, item._id);
            if (children.length > 0) {
                newItem.children = children;
            }
            tree.push(newItem)

        }
    })
    return tree;
}
module.exports.create=(arr,parentId="")=>{
    let tree=createTree(arr,parentId="");
    return tree;
}