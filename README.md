# Rscience
https://steven04090.github.io/Rscience/  
網頁風格為Hud、Sci-fi、Dashboard方向的風格，logo為(玻璃瓶+一張可愛的表情)來象徵科學。  
預計主題有  
* 資料圖表中心  
* 未來UI設計  
* 低成本三王  
* 3D Model  
  
此外本站不會額外製作圖片與動畫(除了之後的自製3d modal)，RWD也僅滿足基本需求。  
  
## 資料圖表中心(Infographic)
### 職業DPS(Job DPS)
主要使用套件:Chart.js  
資料蒐集:人工蒐集  
資料來源:巴哈各玩家分享  
圖表:目前做法為參考巴哈上玩家分享的裝備與傷害，再重新輸入自[Ro計算機](https://landgris.github.io)，統一每個職業的技能與傷害對象，讓每個裝備基準點一樣，得到客觀的傷害。由於裝備資料會列在我的網頁上，裝備的引用來源為巴哈的玩家所發表之文章，在未取得作者之同意下，是否符合著作權法中的「合理使用」，有待商榷，因此會與每位玩家連繫後取得許可再將裝備資料列出，所以目前只顯示職業成長曲線，此部分確實需待資料補齊後，才能得到更精準的數據。  
  
另職業的裝備、技能與傷害皆有紀錄，惟各個職業的輸出方式不同，例如:咒術(火地輪放)、元素(持續傷害)、修羅(接技)目前放在同一個頁面難免會有不客觀之處。  
### 能力雷達圖(Job Ability Radar)  
主要使用套件:Chart.js  
資料蒐集:自身經驗  
資料來源:自身經驗  
圖表:目前僅有自身的評分，預計讓有興趣的玩家輸入，上傳到某地方，能夠有數據更客觀的評價各職業。  
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
不會使用玩家ID、僅title與內文，再用結疤分詞，提取前30多字，拼貼的圖片看要用遊戲內的怪物or?  
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
## 未來UI設計(UI optimization)

## 3d modal
Blender

## 低成本三王  

##### 無解Bug
1. google charts載入後離開頁面，如果有  
`window.addEventListener('resize', drawTimeline, false)`  
2. google charts-timeline 沒內建pan、zoom等功能(explore不能用)，filter也只能day調整。  
3. 檢測tag的value時，分開寫成js，寫法改變?  
    `const val = $(this).attributes.value`  
    `const val = $(this)[0].attributes.value.value`  
