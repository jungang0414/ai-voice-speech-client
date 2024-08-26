# React + Vite

## 主要應用

將公開資料(政府新聞、氣象資料)透過fetch API抓取下來，結合AI將文章修飾，使用Azure Speech Studio SDK 專為AI語音。

## 使用技術

#### firebase 資料庫

[官網](https://firebase.google.com/?gad_source=1&gclid=Cj0KCQjwz7C2BhDkARIsAA_SZKYsGh-3yHqU1eUMDddOuvxtUFmq9lV_b6yFiTR71zp82Hlw0PFIJuAaAgNfEALw_wcB&gclsrc=aw.ds)

1. Firestore Database
後端會將最後完成的文章資料儲存，前端顯示文章列表。

2. Storage
後端將生成後的音源保存，前端顯示音源列表。

3. Hosting
將網頁託管

#### Material UI

[官網](https://mui.com/material-ui/)
簡單說明: Material UI 是一個開源 React 元件庫，它實作了 Google 的 Material Design。它非常全面，可以開箱即用地用於生產。有非常多可重用的組件。

#### react-router-dom

[官網](https://reactrouter.com/en/main)

用戶端路由，允許應用程式透過連結點擊更新URL。不用像傳統網站，瀏覽器需要從Web伺服器請求文檔，下載CSS、JS資源，並呈現從伺服器發送的HTML，這個動作會使頁面重新整理。

而用戶端路由不用從伺服器再次請求文件，可以立即呈現新的頁面並發出資料請求，以Fetch更新頁面。
