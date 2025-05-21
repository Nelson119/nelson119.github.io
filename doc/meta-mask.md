# 利用 MetaMask 進行整合測試

## 階段 1：選擇可用的 Polygon Amoy 水龍頭並獲取測試 POL 代幣

我們先從 Polygon 官方水龍頭網站開始，檢查是否能找到支援 Amoy 測試網的水龍頭，並選擇一個可用的來獲取測試 POL 代幣。

### 步驟 1.1：檢查 Polygon 官方水龍頭網站

1. **訪問 Polygon 官方水龍頭**：

   - 打開瀏覽器，前往 `https://faucet.polygon.technology/`。
   - 網站顯示了多個第三方水龍頭選項，包括：
     - Paradigm Faucet
     - Alchemy Faucet
     - Quicknode Faucet
     - Coinbase Faucet
     - LayerZero Testnet Bridge
     - StakePool Faucet
     - List your Faucet（列出你的水龍頭）
   - 此外，還有一個「Get Bulk POL Test Tokens」（獲取大量 POL 測試代幣）的選項，但需要填寫表單。

2. **檢查是否支援 Amoy 測試網**：

   - 點擊每個水龍頭選項，檢查它們是否支援 Polygon Amoy 測試網。
   - 根據你的描述，網站上沒有直接提供 Amoy 測試網的選項，這是因為 Polygon 官方水龍頭服務已棄用（deprecated），目前僅列出第三方水龍頭。
   - 經過檢查：
     - **Alchemy Faucet**：支援 Amoy 測試網，點擊後會跳轉到 `https://www.alchemy.com/faucets/polygon-amoy`。
     - **Quicknode Faucet**：也支援 Amoy 測試網，點擊後會跳轉到 `https://faucet.quicknode.com/polygon/amoy`。
     - 其他選項（如 LayerZero Testnet Bridge 和 StakePool Faucet）可能不支援 Amoy。

3. **選擇可用的水龍頭**：
   - 由於 Alchemy 和 Quicknode 都支援 Amoy 測試網，我建議選擇 **Alchemy Faucet**，因為它穩定且提供較多的測試代幣（0.5 POL 需帳戶，0.2 POL 無帳戶）。

### 步驟 1.2：使用 Alchemy Faucet 領取測試 POL 代幣

1. **訪問 Alchemy Faucet**：

   - 從 `https://faucet.polygon.technology/` 點擊「Alchemy Faucet」，或直接前往 `https://www.alchemy.com/faucets/polygon-amoy`。

2. **連接錢包**：

   - 點擊「Connect Wallet」，選擇 MetaMask。
   - 如果你的 MetaMask 尚未添加 Amoy 測試網，會在後續步驟中設置；目前可以先使用任何網絡，後續再切換。

3. **檢查主網 ETH 餘額**：

   - Alchemy 要求你的錢包在 Ethereum 主網持有至少 0.001 ETH（用於防止濫用）。
   - 如果沒有，可以切換到 Ethereum Sepolia 測試網，通過水龍頭（例如 `https://sepolia-faucet.pk910.de/`）領取少量測試 ETH。

4. **領取測試 POL**：
   - 如果你有 Alchemy 帳戶，登入後可領取 0.5 POL；否則可領取 0.2 POL。
   - 輸入你的錢包地址，點擊「Send Me POL」。
   - 等待幾秒鐘，確認代幣是否到帳（需要在 Amoy 測試網查看餘額，後續步驟會設置網絡）。

---

## 階段 2：設置 Polygon Amoy 測試網

在領取測試代幣後，我們需要確保 MetaMask 已正確添加 Polygon Amoy 測試網，以便查看餘額並進行後續操作。

### 步驟 2.1：添加 Polygon Amoy 測試網到 MetaMask

1. **打開 MetaMask 並進入網絡設置**：

   - 點擊 MetaMask 插件（右上角的狐狸圖標）。
   - 點擊頂部的網絡下拉選單（可能顯示為「Ethereum Mainnet」或其他網絡）。
   - 點擊「添加網絡」或「Add Network」。

2. **填寫 Amoy 測試網資訊**：

   - 網絡名稱：`Polygon Amoy Testnet`
   - 新的 RPC URL：`https://rpc-amoy.polygon.technology`
   - 鏈 ID：`80002`
   - 貨幣符號：`MATIC`
   - 區塊瀏覽器 URL：`https://www.oklink.com/amoy`
   - 點擊「保存」，MetaMask 會切換到 Amoy 測試網。

3. **確認代幣餘額**：
   - 切換到 Amoy 測試網後，檢查你的錢包餘額，應該能看到剛剛從 Alchemy Faucet 領取的 0.2 或 0.5 POL。
   - 如果未收到，可以在 `https://www.oklink.com/amoy` 上查看交易詳情。

---

## 階段 3：部署 MyToken 合約到 Polygon Amoy 測試網

### 步驟 3.1：環境準備

1. **安裝必要工具**：

   - **Node.js**：確保已安裝 Node.js（建議版本 18.x 或更高）。
   - **Hardhat**：用於編譯、部署和測試智能合約。

     ```bash
     npm install -g hardhat
     ```

2. **創建 Hardhat 項目**：

   - 創建一個新目錄並初始化 Hardhat 項目：

     ```bash
     mkdir mytoken-polygon
     cd mytoken-polygon
     npx hardhat init
     ```

   - 選擇「Create a JavaScript project」，接受默認配置。

3. **安裝依賴**：

   - 安裝 OpenZeppelin 庫和其他必要依賴：

     ```bash
     npm install @openzeppelin/contracts @nomiclabs/hardhat-ethers ethers dotenv
     ```

### 步驟 3.2：添加 MyToken 合約

1. **創建合約檔案**：

   - 在 `contracts` 目錄下創建 `MyToken.sol`，貼上你的合約程式碼：

     ```solidity
     // SPDX-License-Identifier: MIT
     pragma solidity ^0.8.22;

     import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
     import {ERC20Burnable} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
     import {ERC20FlashMint} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20FlashMint.sol";
     import {ERC20Pausable} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Pausable.sol";
     import {ERC20Permit} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
     import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

     contract MyToken is ERC20, ERC20Burnable, ERC20Pausable, Ownable, ERC20Permit, ERC20FlashMint {
         constructor()
             ERC20("MyToken", "TCT")
             Ownable(msg.sender)
             ERC20Permit("MyToken")
         {
         }

         function pause() public onlyOwner {
             _pause();
         }

         function unpause() public onlyOwner {
             _unpause();
         }

         function mint(address to, uint256 amount) public onlyOwner {
             _mint(to, amount);
         }

         function _update(address from, address to, uint256 value)
             internal
             override(ERC20, ERC20Pausable)
         {
             super._update(from, to, value);
         }
     }
     ```

### 步驟 3.3：配置 Hardhat

1. **創建環境變數檔案**：

   - 創建 `.env` 檔案：

     ```bash
     touch .env
     ```

   - 在 `.env` 中添加以下內容：

     ```env
     PRIVATE_KEY=你的MetaMask私鑰
     AMOY_RPC_URL=https://rpc-amoy.polygon.technology
     ```

     > **注意**：私鑰可以從 MetaMask 導出（設置 -> 帳戶詳情 -> 導出私鑰）。請勿將私鑰上傳到公開倉庫！

2. **修改 Hardhat 配置文件**：

   - 編輯 `hardhat.config.js`：

     ```javascript
     require('@nomiclabs/hardhat-ethers');
     require('dotenv').config();

     module.exports = {
       solidity: '0.8.22',
       networks: {
         amoy: {
           url: process.env.AMOY_RPC_URL,
           accounts: [process.env.PRIVATE_KEY],
         },
       },
     };
     ```

### 步驟 3.4：編譯與部署合約

1. **編譯合約**：

   - 運行以下命令：

     ```bash
     npx hardhat compile
     ```

   - 編譯成功後，合約的 ABI 和字節碼會生成在 `artifacts` 目錄中。

2. **部署合約到 Amoy 測試網**：

   - 在 `scripts` 目錄下創建 `deploy.js`：

     ```javascript
     const hre = require('hardhat');

     async function main() {
       const MyToken = await hre.ethers.getContractFactory('MyToken');
       const myToken = await MyToken.deploy();
       await myToken.deployed();
       console.log('MyToken deployed to:', myToken.address);
     }

     main().catch((error) => {
       console.error(error);
       process.exitCode = 1;
     });
     ```

   - 運行部署命令：

     ```bash
     npx hardhat run scripts/deploy.js --network amoy
     ```

   - 部署成功後，控制台會輸出合約地址，例如：

     ```md
     MyToken deployed to: 0x1234...abcd
     ```

   - 記下這個地址，後續 Nuxt 3 專案需要使用。

---

## 階段 4：創建 Nuxt 3 專案並整合 MyToken 合約

### 步驟 4.1：創建 Nuxt 3 專案

1. **初始化 Nuxt 3 專案**：

   - 創建一個新目錄並初始化：

     ```bash
     mkdir mytoken-nuxt
     cd mytoken-nuxt
     npx nuxi init
     ```

   - 安裝依賴：

     ```bash
     npm install
     ```

2. **啟動開發服務器**：

   - 運行：

     ```bash
     npm run dev
     ```

   - 訪問 `http://localhost:3000`，確認 Nuxt 3 歡迎頁面顯示正常。

### 步驟 4.2：安裝 Web3 依賴

1. **安裝 ethers.js**：

   ```bash
   npm install ethers
   ```

2. **安裝 MetaMask 相關庫**：

   ```bash
   npm install @metamask/detect-provider
   ```

### 步驟 4.3：創建與 MyToken 合約交互的工具

1. **添加合約 ABI**：

   - 從 Hardhat 項目的 `artifacts/contracts/MyToken.sol/MyToken.json` 中複製 `abi` 部分。
   - 在 Nuxt 3 專案的根目錄下創建 `utils` 目錄，並添加 `MyTokenABI.js`：

     ```javascript
     export const MyTokenABI = [
       // 貼上從 MyToken.json 複製的 ABI
     ];
     ```

2. **創建 Web3 工具**：

   - 在 `utils` 目錄下創建 `web3.js`：

     ```javascript
     import { ethers } from 'ethers';
     import detectEthereumProvider from '@metamask/detect-provider';
     import { MyTokenABI } from './MyTokenABI';

     const CONTRACT_ADDRESS = '0x1234...abcd'; // 替換為你部署的合約地址
     const CHAIN_ID = '80002'; // Amoy 測試網的鏈 ID

     export async function initWeb3() {
       const provider = await detectEthereumProvider();
       if (provider) {
         await provider.request({ method: 'eth_requestAccounts' });
         const chainId = await provider.request({ method: 'eth_chainId' });
         if (chainId !== CHAIN_ID) {
           await provider.request({
             method: 'wallet_switchEthereumChain',
             params: [{ chainId: `0x${parseInt(CHAIN_ID).toString(16)}` }],
           });
         }
         const web3Provider = new ethers.providers.Web3Provider(provider);
         const signer = web3Provider.getSigner();
         const contract = new ethers.Contract(CONTRACT_ADDRESS, MyTokenABI, signer);
         return { provider: web3Provider, signer, contract };
       } else {
         throw new Error('請安裝 MetaMask！');
       }
     }

     export async function getBalance(address) {
       const { contract } = await initWeb3();
       const balance = await contract.balanceOf(address);
       return ethers.utils.formatEther(balance);
     }

     export async function mintTokens(to, amount) {
       const { contract } = await initWeb3();
       const tx = await contract.mint(to, ethers.utils.parseEther(amount));
       await tx.wait();
       return tx;
     }
     ```

### 步驟 4.4：創建前端頁面

1. **修改 `pages/index.vue`**：

   - 編輯 `pages/index.vue`，添加與合約交互的前端邏輯：

     ```vue
     <template>
       <div class="container mx-auto p-4">
         <h1 class="text-3xl font-bold mb-4">MyToken on Polygon Amoy</h1>
         <div v-if="!account">
           <button @click="connectWallet" class="bg-blue-500 text-white px-4 py-2 rounded">連接錢包</button>
         </div>
         <div v-else>
           <p>已連接帳戶：{{ account }}</p>
           <p>餘額：{{ balance }} TCT</p>
           <div class="mt-4">
             <h2 class="text-xl font-semibold">鑄造代幣</h2>
             <input v-model="mintAmount" type="number" placeholder="輸入要鑄造的數量" class="border p-2 mr-2" />
             <button @click="mint" class="bg-green-500 text-white px-4 py-2 rounded">鑄造</button>
           </div>
         </div>
       </div>
     </template>

     <script>
       import { initWeb3, getBalance, mintTokens } from '~/utils/web3';

       export default {
         data() {
           return {
             account: null,
             balance: 0,
             mintAmount: '',
           };
         },
         methods: {
           async connectWallet() {
             try {
               const { provider, signer } = await initWeb3();
               this.account = await signer.getAddress();
               this.balance = await getBalance(this.account);
             } catch (error) {
               console.error(error);
               alert(error.message);
             }
           },
           async mint() {
             try {
               await mintTokens(this.account, this.mintAmount);
               this.balance = await getBalance(this.account);
               alert('代幣鑄造成功！');
             } catch (error) {
               console.error(error);
               alert('鑄造失敗：' + error.message);
             }
           },
         },
       };
     </script>
     ```

2. **（可選）添加 Tailwind CSS**：

   - 安裝 Tailwind CSS：

     ```bash
     npm install -D tailwindcss postcss autoprefixer
     npx tailwindcss init -p
     ```

   - 修改 `tailwind.config.js`：

     ```javascript
     module.exports = {
       content: ['./components/**/*.{vue,js}', './pages/**/*.{vue,js}'],
       theme: {
         extend: {},
       },
       plugins: [],
     };
     ```

   - 在 `assets/css` 目錄下創建 `main.css`：

     ```css
     @tailwind base;
     @tailwind components;
     @tailwind utilities;
     ```

   - 修改 `nuxt.config.js`：

     ```javascript
     export default defineNuxtConfig({
       css: ['~/assets/css/main.css'],
       postcss: {
         plugins: {
           tailwindcss: {},
           autoprefixer: {},
         },
       },
     });
     ```

---

## 階段 5：在 Polygon Amoy 測試網上測試

### 步驟 5.1：測試合約功能

1. **檢查部署是否成功**：

   - 訪問 `https://www.oklink.com/amoy/address/0x1234...abcd`，確認合約已部署。
   - 如果需要驗證合約，可以使用 Hardhat 的 Etherscan 插件（需要 Oklink API 密鑰）。

2. **使用 Remix 測試（可選）**：
   - 在 Remix 中，選擇「Deploy & Run Transactions」，設置環境為「Injected Web3」。
   - 確保 MetaMask 已連接到 Amoy 測試網。
   - 輸入合約地址，載入合約，測試功能（如 `mint`、`pause` 等）。

### 步驟 5.2：測試 Nuxt 3 前端

1. **啟動 Nuxt 3 應用**：

   - 運行：

     ```bash
     npm run dev
     ```

   - 訪問 `http://localhost:3000`。

2. **連接錢包**：

   - 點擊「連接錢包」按鈕，MetaMask 會彈出提示，確認連接。
   - 如果 MetaMask 不在 Amoy 測試網，程式碼會自動切換。
   - 成功後，你應該能看到你的錢包地址和 TCT 餘額（初始為 0）。

3. **鑄造代幣**：

   - 輸入一個數量（例如 `100`），點擊「鑄造」按鈕。
   - MetaMask 會彈出交易確認，確認後等待交易完成。
   - 交易成功後，頁面上的餘額應更新為 `100 TCT`。

4. **檢查交易**：
   - 在 `https://www.oklink.com/amoy` 上查看交易詳情，確認代幣已鑄造並轉移到你的地址。

### 步驟 5.3：常見問題與解決

- **MetaMask 網絡錯誤**：確保 MetaMask 已切換到 Amoy 測試網，且有足夠的測試 POL。
- **Gas 費用不足**：從 Alchemy Faucet 或其他水龍頭領取更多測試 POL。
- **合約交互失敗**：檢查合約地址和 ABI 是否正確，確保你有權限（例如，只有合約擁有者可以調用 `mint`）。

---

總結這次的流程按照以下順序完成：

1. **先選擇可用的水龍頭**：
   - 從 `https://faucet.polygon.technology/` 開始，發現官方水龍頭已棄用，選擇了支援 Amoy 的 Alchemy
     Faucet（`https://www.alchemy.com/faucets/polygon-amoy`），並成功領取測試 POL 代幣。
2. **設置網絡**：
   - 在 MetaMask 中添加 Polygon Amoy 測試網，確認代幣餘額。
3. **部署合約**：
   - 使用 Hardhat 將 `MyToken` 合約部署到 Amoy 測試網。
4. **整合 Nuxt 3**：
   - 創建 Nuxt 3 專案，添加與合約交互的前端邏輯。
5. **測試**：
   - 在 Amoy 測試網上測試合約功能，包括鑄造代幣和查看餘額。

如果你在任何步驟中遇到問題（例如水龍頭不可用、部署失敗等），可以告訴我，我會繼續幫你解決！
