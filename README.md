# Rscience
https://steven04090.github.io/Rscience/

## Infographic
### 職業DPS(Job DPS)
主要使用套件:Chart.js  
資料蒐集:人工蒐集  
資料來源:巴哈各玩家分享  
圖表:統計玩家分享的裝備與傷害(不涉及個資)，在各自輸入[Ro計算機](https://landgris.github.io)，讓每個裝備基準點一樣，得到客觀的傷害。圖表重點在於藉由裝備得到各個職業的成長曲線。
職業的裝備、技能與傷害皆有紀錄，惟各個職業的輸出方式不同，例如:咒術(火地輪放)、元素(持續傷害)、修羅(接技)目前放在同一個頁面難免會有不客觀之處。  
### 能力雷達圖(Job Ability Radar)  
主要使用套件:Chart.js  
資料蒐集:自身經驗  
資料來源:自身經驗  
圖表:目前僅有自身的評分，預計讓玩家輸入，上傳到某地方，能夠有數據更客觀的評價各職業。
### 停權人數(Suspension)  
主要使用套件:Chart.js  
資料蒐集:python crawer  
資料來源:Ro官網  
圖表:目前由於沒有遊戲內總人數，因此無太大意義，無法探討兩者關聯度。  
### 物價走勢(Goods Price)  
主要使用套件:Chart.js  
資料蒐集:人工蒐集    
資料來源:RO遊戲內露天價格   
圖表:巴基力伺服器的商城物品與農產品物價走勢圖，未來可再結合官方活動、線上遊戲人數、外掛等，能夠看出影響因子。  
### 每周or每月熱門主題(Hot Topic)  
預計作法:撈巴哈前三頁?  
推文跟發文分開  
### 伺服器穩定度(Stability)  
主要使用套件:js-year-calendar.js  
資料蒐集:python crawer  
資料來源:Ro官網  
圖表:預計顯示一整年的伺服器維修情形，列出正常維修、臨時維修、延長維修等，來看出官方對RO遊戲的用心程度如何。  
### 經驗值表(Level Exp)  
主要使用套件:Chart.js  
資料蒐集:人工蒐集  
資料來源:Ro官網  
圖表:無解釋  
### 官方活動(Activity)
主要使用套件:google chart.js  
資料蒐集:人工蒐集  
資料來源:Ro官網  
圖表:列出2021與2022Ro官方網站所公布的公告，來預測幾年的活動規劃情形。  
### 三王密碼(MVP password)
三王密碼公式:(月+日)*5
### relation chart:Fetch data  
其他應用  
### 線上玩家人數(population)  
目前無法取得  
## UI optimization

## 3d modal
Blender

## gacha
gacha simulator

## 無解Bug
1. google charts載入後離開頁面，如果有  
`window.addEventListener('resize', drawTimeline, false)`  
2. google charts-timeline 沒內建pan、zoom等功能(explore不能用)，filter也只能day調整。  
3. 檢測tag的value時，分開寫成js，寫法改變?  
    `const val = $(this).attributes.value`  
    `const val = $(this)[0].attributes.value.value`  
