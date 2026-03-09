module.exports = async(objectPagination, query) => {
    objectPagination.pageNumber = Math.ceil(objectPagination.totalProduct / objectPagination.limitItems);
    if (query.page) {
        objectPagination.currentPage = Number(query.page);
    }
    else objectPagination.currentPage=1;
    objectPagination.skipItems = (objectPagination.currentPage - 1) * objectPagination.limitItems
}