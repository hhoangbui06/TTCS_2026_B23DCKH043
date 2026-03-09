module.exports=(query)=>{
    let filterStatus = [
        {
            name: "Tất cả",
            status: "",
            check: "",
        },
        {
            name: "Hoạt động",
            status: "",
            check: "active"
        },
        {
            name: "Dừng hoạt động",
            status: "",
            check: "inactive"
        }
    ]
    let queryStatus = query.status || ""
    for (let stt of filterStatus) {
        if (stt.check == queryStatus) {
            stt.status = "active"
        }
        else {
            stt.status = ""
        }
    }
    return filterStatus;
}