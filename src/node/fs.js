import fs from 'fs';
import path from 'path';

// 判断文件是否存在
const fileExists = (filePath) => {
    return fs.existsSync(filePath);
};

// 创建目录
const appendFolder = (filePath, recursive) => {
    fs.mkdir(file, {recursive})
};

// 创建文件
const appendFile = (filePath) => {
    
};

// 删除文件
const deleteFile = (filePath) => {
    if (fileExist(filePath)) {
        fs.unlinkSync(filePath);
    }
};
  

// 删除目录下文件
const deleteFileFromDirectory = (filePath) => {
    if (fileExist(filePath)) {
        fs.readdirSync(filePath).forEach((file) => {
          const curPath = `${filePath}/${file}`;
          if (fs.lstatSync(curPath).isDirectory()) {
            deleteFileFromDirectory(curPath);
          } else {
            fs.unlinkSync(curPath);
          }
        });
        fs.rmdirSync(filePath);
      }
};