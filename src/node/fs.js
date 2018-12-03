import fs from 'fs';
import path from 'path';

/**
 * 判断目录或文件是否存在
 * @param filePath 文件地址
 * @returns undefined
 */
function fileExists(filePath) {
  return fs.existsSync(filePath);
}

/**
 * 创建目录
 * @param filePath 文件地址
 * @param options { recursive <boolean> 默认为 false 是否创建父目录
                    mode <integer> 不支持 Windows 平台。默认为 0o777。 }
 * @returns undefined
 */
function appendFolder(filePath, options) {
  fs.mkdir(filePath, options);
}

/**
 * 创建文件
 * @param filePath 文件地址
 * @returns undefined
 */
function appendFile(filePath) {
  fs.appendFile(filePath);
}

/**
 * 删除文件
 * @param filePath 文件地址
 * @returns undefined
 */
function deleteFile(filePath) {
  fs.unlinkSync(filePath);
}

/**
 * 保存文件
 * @param filePath 文件地址
 * @returns undefined
 */
function writeFilePromise(file, dataBuffer) {
  return new Promise((res, rej) => {
    fs.writeFile(file, dataBuffer, (err) => {
      if (err) {
        rej(err);
      } else {
        res(file);
      }
    });
  });
}

/**
 * 同步读取文件
 * @param filePath 文件地址
 * @returns undefined
 */
function readFileSync(filePath) {
  try {
    const data = fs.readFileSync(filePath).toString();
    return data;
  } catch (err) {
    throw new Error(`文件读取失败:${err}filePath: ${filePath}`);
  }
}

/**
 * 异步读取文件返回Promise
 * @param filePath 文件地址
 * @returns undefined
 */
function readFilePromise(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        reject(err);
      } else {
        try {
          resolve(data);
        } catch (e) {
          reject(e);
        }
      }
    });
  });
}

/**
 * 异步获取某个目录下的所有文件
 * @param dirPath 目录
 * @returns undefined
 */
function getFilesByDirPromise(dirPath) {
  return new Promise((resolve, reject) => {
    fs.readdir(dirPath, (err, files) => {
      if (err) {
        reject(err);
      } else {
        resolve(files);
      }
    });
  });
}

/**
 * 同步获取某个目录下的所有文件
 * @param dirPath 目录
 * @returns undefined
 */
function fileDisplay(filePath){
  fs.readdir(filePath,function(err,files){
      if(err){
          console.warn(err)
      }else{
          files.forEach(function(filename){
              var filedir = path.join(filePath,filename);
              fs.stat(filedir,function(eror,stats){
                  if(eror){
                      console.warn('获取文件stats失败');
                  }else{
                      var isFile = stats.isFile();
                      var isDir = stats.isDirectory();
                      if(isFile){
                          console.log(filedir);
                      }
                      if(isDir){
                          fileDisplay(filedir);//递归，如果是文件夹，就继续遍历该文件夹下面的文件
                      }
                  }
              })
          });
      }
  });
}

function geFileList(path)
{
   let filesList = [];
   let targetObj = {};
   readFile(path,filesList,targetObj);
   return filesList;
}


function readFile(path,filesList,targetObj)
{
  const files = fs.readdirSync(path);//需要用到同步读取
   files.forEach(walk);
   function walk(file){  
    const states = fs.statSync(path+'/'+file);         
        if(states.isDirectory())
        {
            let item ;
            if(targetObj["children"])
            {
                item = {name:file,children:[]};
                targetObj["children"].push(item);
            }
            else
            {
               item = {name:file,children:[]};
               filesList.push(item);
            }

            readFile(path+'/'+file,filesList,item);
        }
        else
        {   
            //创建一个对象保存信息
            let obj = new Object();
            obj.size = states.size;//文件大小，以字节为单位
            obj.name = file;//文件名
            obj.path = path+'/'+file; //文件绝对路径

            if(targetObj["children"])
            {
               const item = {name:file,value:obj.path}
               targetObj["children"].push(item);
            }
            else
            {
                const item = {name:file,value:obj.path};
                filesList.push(item);
            }
        }     
    }
}
/**
 * 检查目录是否存在
 * @param dirPath 目录
 * @returns undefined
 */
function ensureDirectoryExistence(dirPath) {
  try {
    if (!fs.existsSync(dirPath)) {
      const parentDir = path.dirname(dirPath);
      ensureDirectoryExistence(parentDir);
      fs.mkdirSync(dirPath);
    }
  } catch (err) {
    throw err;
  }
}

/**
 * 删除目录下文件
 * @param filePath 文件地址
 * @returns undefined
 */
function deleteFileFromDirectory(filePath) {
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
}

/**
 * 复制文件夹以及文件夹下目录
 * @param src 来源目录
 * @param dest 目标目录
 * @returns undefined
 */
function copyDir(src, dest) {
  fs.mkdirSync(dest);
  const files = fs.readdirSync(src);
  for (let i = 0; i < files.length; i++) {
    const current = fs.lstatSync(path.join(src, files[i]));
    if (current.isDirectory()) {
      copyDir(path.join(src, files[i]), path.join(dest, files[i]));
    } else if (current.isSymbolicLink()) {
      const symlink = fs.readlinkSync(path.join(src, files[i]));
      fs.symlinkSync(symlink, path.join(dest, files[i]));
    } else {
      fs.copyFileSync(path.join(src, files[i]), path.join(dest, files[i]));
    }
  }
}


export default {
  fileExists,
  appendFolder,
  appendFile,
  deleteFile,
  writeFilePromise,
  readFileSync,
  readFilePromise,
  ensureDirectoryExistence,
  getFilesByDirPromise,
  deleteFileFromDirectory,
  copyDir,
  fileDisplay,
  geFileList
}