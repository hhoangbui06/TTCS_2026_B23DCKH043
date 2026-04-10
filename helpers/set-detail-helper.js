module.exports.setStatus = (records) => {
  for (let record of records) {
    if (record.status == "active") {
      record.stt = "Hoạt động"
      record.badge = "badge badge-success"
    }
    else {
      record.stt = "Dừng hoạt động"
      record.badge = "badge badge-danger"
    }
  }
  return records
}

module.exports.setPrice = (records) => {
  records.forEach(item => {
    item.priceNew = Math.round(item.price * (100 - item.discountPercentage) / 100);
  }
  )
  return records;
}