# 開發區塊鏈碳積分平台：技術、功能與合規要點

## 一、開發目標

**目的**：透過 Blockchain（區塊鏈，分散式帳本技術，確保透明與不可篡改）實現 Carbon Points（碳積分，用戶減碳獎勳，可以轉換為 Carbon
Credits）的透明化與流通性，激勵減碳行為並兌換價值。

**場景**：

- **用戶**：消費節能產品、低碳交通，獲得 Carbon Points。
- **店家**：接受 TCT（碳積分，TaiCarbon 發行）支付，參與 Certification（減碳認證）。
- **平台**：與台灣環保署（EPA）合作，符合相關法規。

## 二、技術架構

**區塊鏈**：

- **選擇**：Polygon（低成本、高效，符合國際標準）。
  - **理由**：低 Gas Fee（交易費用）。
- **其他選擇**：
  - Ethereum（生態成熟，但 Gas Fee 高，不符合減碳主題）。
  - BSC（低費用，主要在亞洲市場使用，但需符合 AML 規範）。

**Smart Contract（智能合約）**：

- **功能**：
  - 發行 TCT（碳積分，TaiCarbon 發行），符合 ERC-20 標準。
  - 支付：用戶付店家 TCT。
  - 兌換：將 TCT 轉換為法幣或回饋。
  - 減碳認證：店家上傳減碳證明，Smart Contract 發放獎勳。
- **工具**：Solidity（區塊鏈開發語言）。
  - 使用 Remix 編譯與 OpenZeppelin 安全模板。

**後端**：

- **技術**：Node.js + Web3.js。
- **功能**：部署合約、監聽事件、串接台灣環保署（EPA）API。

**前端**：

- **技術**：Nuxt.js（Vue.js 框架） + MetaMask（錢包）。
- **資安風險**：區塊鏈智能合約漏洞、私鑰洩漏、DDoS 攻擊。
  - **防護建議**：使用 AWS 雲端服務、OpenZeppelin 合約模板與 CertiK 審計、AWS KMS 加密私鑰、AWS Shield 與 CloudFront 防護。

## 三、功能設計

**Carbon Points**：

- **計算**：1 CO2e = 1 TCT。
- **法規**：防止雙重計算（Double Counting）。

**Payment 與交易**：

- 用戶使用 TCT 支付給店家，Smart Contract 執行。
- 可選即時換匯（透過 DEX 如 Uniswap）。

**Redemption**：

- 用戶可將 TCT 換成 Stablecoin（如 USDT）。

**Certification**：

- 店家上傳減碳證明，Smart Contract 發放 TCT 作為獎勳。

## 四、法規與合規

**台灣**：

- **氣候變遷因應法**（CCRL）：台灣碳權交易所（TCX）管理。
- **洗錢防制法**（MPLA）：需執行 KYC（身份驗證）與可疑交易報告（STR）。
- **虛擬通貨平台**（VASP）：需註冊並符合內控要求。

**國際**：

- **FATF**：要求符合 Travel Rule（身份共享）。
- **ISO 14064**：碳計量標準。
- **Verra**：碳權認證，符合自願碳市場（VCM）標準。

## 五、開發步驟

**初期**：

- 測試 Polygon 並部署 TCT。
- 串接台灣環保署（EPA）API。
- 建立 KYC 機制。

**中期**：

- 平台提供 TCT 兌換法幣功能。
- 整合 POS（銷售系統）。
- 註冊金管會（FSC）。

**長期**：

- 開放 DEX 交易。
- 接受 USDT 支付。
- 與台灣碳權交易所（TCX）與 Verra 對接。

## 六、挑戰與解決

**技術**：

- **Gas Fee**：選擇 Polygon 解決高交易成本問題。
- **數據準確性**：串接台灣環保署（EPA）API，並進行人工審核。

**店家採用**：

- **門檻**：提供易用的 App 以簡化操作。
- **意願**：透過 TCT 獎勳激勳鼓勵店家參與。

**洗錢防範**：

- **解決**：實施 KYC 機制、限制兌換金額、加強交易監控。

**法規遵循**：

- 確保符合《洗錢防制法》（MPLA）與金融行動特別工作組（FATF）的要求。

## 七、優勢

- **透明性**：區塊鏈提升平台信任。
- **效率**：智能合約自動執行交易與驗證。
- **激勵性**：TCT 碳積分鼓勵減碳行為。

---
