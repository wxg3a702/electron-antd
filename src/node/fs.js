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
function getFilesByDirSync(dirPath) {
  try {
	const dir = fs.readdirSync(dirPath);
    dir.forEach(file => {
      const currentPath = path.join(dirPath, file);
	  const current = fs.statSync(currentPath);
      if (current.isDirectory()) {
          getFilesByDirSync(currentPath);
      } else {
		  console.log(currentPath);
      }
	})
  } catch (err) {
    throw err;
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
  getFilesByDirSync,
  deleteFileFromDirectory,
  copyDir

}