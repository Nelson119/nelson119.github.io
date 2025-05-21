#!/usr/bin/env node
/* eslint-disable no-async-promise-executor */
/* eslint-disable no-useless-escape */
/* eslint-disable no-unused-vars */

const fs = require('fs');
const path = require('path');
const https = require('https');
const { URL } = require('url');

String.prototype.isJSONFormat = function () {
  return /^[\],:{}\s]*$/.test(
    this.replace(/\\["\\\/bfnrtu]/g, '@')
      .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
      .replace(/(?:^|:|,)(?:\s*\[)+/g, '')
  );
};

const root = process.cwd() + '/public/images/',
  exts = ['.jpg', '.png'],
  max = 5; // 5MB
let list = [];
let success = [];
const recordPath = path.resolve('./public/images/records.json');

function moveFile(file, destinationPath) {
  try {
    let base = path.basename(file);
    let dest = path.resolve(destinationPath, `${base}`);
    let dir = path.resolve(destinationPath);
    if (fs.existsSync(dir) == false) {
      fs.mkdirSync(dir);
    }
    fs.copyFileSync(file, dest);
    // fs.unlinkSync(file);
  } catch (ex) {
    console.error(ex);
  }
}

const options = {
  method: 'POST',
  hostname: 'tinypng.com',
  path: '/backend/opt/shrink',
  headers: {
    rejectUnauthorized: false,
    'Postman-Token': Date.now(),
    'Cache-Control': 'no-cache',
    'Content-Type': 'application/x-www-form-urlencoded',
    'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36',
  },
};
const agent = 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.{version}.87 Safari/537.36';
let version = 1000;
const lagging = 2000;
console.log('=============開始作業==========');

function getRandomIP() {
  return Array.from(Array(4))
    .map(() => parseInt(Math.random() * 255))
    .join('.');
}

async function run() {
  const req = await fileList(root);
  if (req) {
    while (list && list.length > 0) {
      await runUpload();
      if (list.length) {
        console.log(`重試中: ${list.length}`);
      }
    }
    console.log('任務執行完成');
    await delay(lagging);
    process.exit();
  }
}
// 獲取檔案列表
function fileList(folder) {
  list = [];
  return new Promise((resolve) => {
    fs.readdir(folder, (err, files) => {
      if (err) {
        console.error(err);
        resolve(false);
        return;
      }
      files.forEach((file) => {
        fileFilter(path.join(folder, file));
      });
      console.log('檢查到檔案數量: ' + list.length);
      resolve(true);
    });
  });
}

function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
async function runUpload() {
  const queue = list;
  for (let i = 0; i <= queue.length; i++) {
    try {
      const ok = await fileUpload(queue[i]);
      if (ok) {
        list.splice(i, 1);
      }
    } catch (e) {
      // console.log(e)
    }
    await delay(lagging);
  }
  return true;
}

// 過濾檔案格式，返回所有jpg,png圖片
function fileFilter(file) {
  try {
    const stats = fs.statSync(file);
    if (stats.isDirectory() && !/node_modules|dist|error/.test(file)) {
      const filenames = fs.readdirSync(file);
      filenames.forEach((subFile) => fileFilter(`${file}/${subFile}`));
    } else if (
      // 必須是檔案，小於5MB，字尾 jpg||png
      stats.isFile() &&
      exts.includes(path.extname(file)) &&
      !success.includes(path.relative(process.cwd(), file))
    ) {
      if (stats.size <= max * 1024 * 1024) {
        list.push(file);
      } else {
        console.error(`\u001b[31m[${path.relative(process.cwd(), file)}]超過${max}MB,暫存到error資料夾下\u001b[0m`);
        moveFile(file, 'error');
      }
    }
  } catch (err) {
    if (err) return console.error(err);
  }
}

// 非同步API,壓縮圖片
// {"error":"Bad request","message":"Request is invalid"}
// {"input": { "size": 887, "type": "image/png" },"output": { "size": 785, "type": "image/png", "width": 81, "height": 81, "ratio": 0.885, "url": "https://tinypng.com/web/output/7aztz90nq5p9545zch8gjzqg5ubdatd6" }}
function fileUpload(img) {
  return new Promise((resolve) => {
    options.headers['X-Forwarded-For'] = getRandomIP();
    options.headers['Postman-Token'] = Date.now();
    options.headers['User-Agent'] = agent.replace('{version}', version++);

    // console.log(`開始上傳:${JSON.stringify(options)}`)
    let chunk = '';
    var req = https.request(options, function (res) {
      res.on('data', (buf) => {
        let obj;
        chunk += buf.toString();
        if (chunk.isJSONFormat()) {
          try {
            obj = JSON.parse(chunk);
            chunk = '';
            if (obj.error) {
              let imgName = path.relative(process.cwd(), img);
              console.log(`\u001b[31m[${imgName}]：*********壓縮失敗！**********：${obj.message}\u001b[0m`);
              delay(lagging).then(() => {
                resolve(false);
              });
            } else {
              fileUpdate(img, obj).then((ret) => {
                resolve(ret);
              });
            }
          } catch (e) {
            console.log(e);
          }
        } else {
          console.log(chunk);
        }
      });
    });
    req.write(fs.readFileSync(img), 'binary');
    req.on('error', (e) => {
      console.error(e);
      resolve(false);
    });
    req.end();
  });
}
// 該方法被遞迴呼叫,請求圖片資料
function fileUpdate(imgPath, obj) {
  let options = new URL(obj.output.url);
  const stats = fs.statSync(imgPath);
  return new Promise((resolve) => {
    let req = https.request(options, (res) => {
      let body = '';
      res.setEncoding('binary');
      res.on('data', function (data) {
        body += data;
      });

      res.on('end', function () {
        fs.writeFile(imgPath, body, 'binary', (err) => {
          if (err) {
            return console.error(err);
          }
          let imgName = path.relative(process.cwd(), imgPath);
          success.push(imgName);
          saveRecord();
          console.log(`\u001b[32m[${imgName}] [${stats.size}B] 最佳化比例-${obj.output.ratio}\u001b[0m`);
          resolve(true);
        });
      });
    });
    req.on('error', (e) => {
      console.error(e);
      resolve(false);
    });
    req.end();
  });
}
function saveRecord() {
  const json = JSON.stringify({ success });
  fs.writeFileSync(path.resolve(recordPath), json, (err) => {
    if (err) console.log(err);
  });
}
async function spawnChild(cmd) {
  return new Promise(async (resolveCommand) => {
    const { exec } = require('child_process');
    const child = exec(cmd);

    let data = '';
    for await (const chunk of child.stdout) {
      data += chunk;
    }
    let error = '';
    for await (const chunk of child.stderr) {
      error += chunk;
    }
    const exitCode = await new Promise((resolve, reject) => {
      child.on('close', resolve);
      resolveCommand();
    });

    if (exitCode) {
      throw `subprocess error exit ${exitCode}, ${error}`;
    }
  });
}
spawnChild('touch ./public/images/records.json').then((r) => {
  const json = fs.readFileSync(recordPath, { encoding: 'utf8', flag: 'r' });
  success = json !== '' && json.isJSONFormat() ? JSON.parse(json).success : [];
  run();
});
