const fs = require('fs');
const path = require('path');

// Đường dẫn đến thư mục cần lấy tên file
const directoryPath = 'data1/database';
let dataFile;
// Đọc các file trong thư mục
fs.readdir(directoryPath, function (err, files) {
  if (err) {
    return console.log('Unable to scan directory: ' + err);
  }
  
  // Mảng lưu trữ tên các file trong thư mục
  let fileNames = [];

  // Duyệt qua các file
  files.forEach(function (file) {
    // Thêm tên file vào mảng
    fileNames.push(file);
    // dataFile = file.toString();
    dataFile = String(file);

    console.log(dataFile);
  });

  // console.log(fileNames);
});
