# Solidity 開發文件

## 1. 建置環境

### 必要工具

- **Node.js**（建議使用 LTS 版本）
- **pnpm**（管理相依套件）
- **Hardhat**（Solidity 開發框架）
- **MetaMask**（瀏覽器擴充套件，用於測試鏈錢包）

### 環境建置步驟

```sh
mkdir solidity-project && cd solidity-project
pnpm init
pnpm add -D hardhat
pnpm exec hardhat
```

選擇 "Create a JavaScript project"，然後安裝 OpenZeppelin 依賴：

```sh
pnpm add @openzeppelin/contracts ethers hardhat-deploy hardhat-ethers
```

## 2. 線上資源

- **[Solidity 官方文件](https://docs.soliditylang.org/)**
- **[Ethereum 官方開發者文件](https://ethereum.org/en/developers/)**
- **[OpenZeppelin 合約庫](https://docs.openzeppelin.com/contracts/)**
- **[Alchemy 測試幣 Faucet](https://www.alchemy.com/faucets)**
- **[Polygon Mumbai 測試網](https://mumbai.polygonscan.com/)**

## 3. 串接去中心錢包（Polygon）

### 使用 ethers.js 連接 MetaMask（Polygon 網路）

```javascript
import { ethers } from 'ethers';

async function connectWallet() {
  if (window.ethereum) {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    console.log('連接成功，錢包地址：', await signer.getAddress());
  } else {
    console.log('請安裝 MetaMask');
  }
}
```

## 4. 建立智能合約

### 簡單的 ERC-20 代幣合約

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    constructor() ERC20("MyToken", "MTK") {
        _mint(msg.sender, 1000000 * 10 ** decimals());
    }
}
```

### 部署合約（Hardhat）

```javascript
const hre = require('hardhat');

async function main() {
  const MyToken = await hre.ethers.getContractFactory('MyToken');
  const myToken = await MyToken.deploy();
  await myToken.waitForDeployment();
  console.log('合約已部署，地址：', await myToken.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
```

## 5. 測試智能合約（Hardhat 測試）

在 `test/MyToken.test.js` 撰寫測試案例：

```javascript
const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('MyToken', function () {
  it('應該成功部署並鑄造初始代幣', async function () {
    const [owner] = await ethers.getSigners();
    const MyToken = await ethers.getContractFactory('MyToken');
    const myToken = await MyToken.deploy();
    await myToken.waitForDeployment();
    expect(await myToken.balanceOf(owner.address)).to.equal(1000000n * 10n ** 18n);
  });
});
```

執行測試：

```sh
pnpm hardhat test
```

### 設定 `package.json` 測試腳本

在 `package.json` 中加入：

```json
{
  "scripts": {
    "test": "hardhat test"
  }
}
```

這樣可以直接執行：

```sh
pnpm test
```

## 6. 數位內容 NFT

### 上傳數位內容至 IPFS

- 使用 **[Pinata](https://www.pinata.cloud/)** 上傳圖片，取得 CID。
- **NFT Metadata JSON 格式**：

```json
{
  "name": "My First NFT",
  "description": "This is my first NFT with digital content.",
  "image": "https://gateway.pinata.cloud/ipfs/<your_CID>",
  "attributes": [{ "trait_type": "Background", "value": "Blue" }]
}
```

### 建立 ERC-721 NFT 智能合約

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyNFT is ERC721URIStorage, Ownable {
    uint256 private _tokenIds;

    constructor() ERC721("MyNFT", "MNFT") {}

    function mintNFT(address recipient, string memory tokenURI) public onlyOwner returns (uint256) {
        _tokenIds++;
        uint256 newItemId = _tokenIds;
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);
        return newItemId;
    }
}
```

## 7. 整合到 Nuxt 3 Server 端（Polygon 網路）

### **1. 在 Nuxt 3 專案中安裝 Solidity 相關套件**

```sh
pnpm add ethers @openzeppelin/contracts
```

### **2. 在 Nuxt 3 Server 端串接 Solidity 套件**

在 `server/utils/contract.ts` 建立合約互動函式：

```typescript
import { ethers } from 'ethers';
import contractJson from '../../packages/solidity-project/artifacts/contracts/MyNFT.sol/MyNFT.json';

const provider = new ethers.JsonRpcProvider('https://polygon-mumbai.infura.io/v3/YOUR_INFURA_PROJECT_ID');
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contract = new ethers.Contract('合約地址', contractJson.abi, wallet);

export async function mintNFT(to: string, tokenURI: string) {
  const tx = await contract.mintNFT(to, tokenURI);
  await tx.wait();
  return tx.hash;
}
```

### **3. 在 Nuxt 3 API 端點提供 NFT 鑄造功能**

在 `server/api/mint.post.ts`：

```typescript
import { mintNFT } from '../utils/contract';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { to, tokenURI } = body;

  if (!to || !tokenURI) {
    throw createError({ statusCode: 400, message: '缺少必要參數' });
  }

  const txHash = await mintNFT(to, tokenURI);
  return { success: true, txHash };
});
```

這樣，Nuxt 3 Server 端就能透過 Solidity 套件來互動，並在 **Polygon 測試網（Mumbai）** 上鑄造 NFT！ 🚀
