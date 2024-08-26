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