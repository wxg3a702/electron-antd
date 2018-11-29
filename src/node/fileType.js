import path from 'path';

/**
 * 同步获取某个目录下的所有文件
 * @param fileName 文件名 String
 * @returns extname 后缀名 String
 */
export const getFileExtname = (fileName) => {
    switch (path.extname(fileName)) {
        case '.json':
            return 'json';
        case '.js':
            return 'javascript';
        case '.html':
            return 'html';
        case '.css':
            return 'css';
        case '.less':
            return 'less';
        case '.scss':
            return 'scss';
        case '.md':
            return 'markdown';
        default:
            return ''; 
    }
} 