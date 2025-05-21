## 初衷

[tinypng](https://tinypng.com/) 網頁版，其實是挺方便的。但是他有上傳圖片數量的限制，比如每天只能上傳 20 張，如果超過這個數量，就會斷斷續續的出現
`Too many files uploaded at once` 錯誤 。所以才決定使用 Node 來開發一個繞過數量限制的 npm 包。

## 使用方法

安裝：

```bash
npm i @hwao/hwao-tinypng -g # or yarn global add hwao-tinypng
```

自動取代所有根目錄以內除了 `node_modules` 與 `dist` 以外所有圖檔，請自行備份

## 說明

- tinypng 預設是會對使用者上傳數量有限制的，使用了 `X-Forwarded-For` 頭繞過該限制
