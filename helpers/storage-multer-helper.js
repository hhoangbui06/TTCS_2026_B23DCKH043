const multer=require('multer')
module.exports=()=>{
    const storage=multer.diskStorage({
        destination: function(req,file,cb){
            // Sửa thư mục dẫn đến folder lưu ảnh
            cb(null, "./public/uploads/")
        },
        filename:function(req,file,cb){
            // Sửa định dạng kiểu tên file
            const uniqueSuffix=Date.now();
            cb(null, `${uniqueSuffix}-${file.originalname}`);
        }
    })
    return storage;
}