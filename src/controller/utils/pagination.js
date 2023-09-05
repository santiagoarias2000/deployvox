"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPage = void 0;
const getPage = (orderOptions, page, pageSize, orderBy, asc, sort) => {
    let newPageNumber = page ? Math.abs(parseInt(page)) : 1;
    let newPageSize = pageSize ? Math.abs(parseInt(pageSize)) : 10;
    let newAsc = asc == "asc";
    orderBy = orderBy ? orderBy : "";
    let newSort = sort ? sort : "";
    const skip = newPageNumber * newPageSize - newPageSize;
    if (!orderOptions.includes(orderBy)) {
        orderBy = orderOptions[0];
    }
    return { newPageSize, orderBy, newAsc, skip, newSort };
};
exports.getPage = getPage;
