
# 專案使用說明

## 1. 下載 Git Repository

<details>

<summary>下載專案方式</summary>

1. 使用 `Git Clone by HTTPS`

    ```bash
    git clone https://github.com/shuttler-tw/shuttler-frontend.git
    ```

2. 使用 `git clone by SSH`

    ```bash
    git clone git@github.com:shuttler-tw/shuttler-frontend.git
    ```

3. 使用 `Download repository zip`

    - 用 `curl` 來下載 zip 檔

    ```bash
    curl -sSL https://github.com/shuttler-tw/shuttler-frontend/archive/refs/heads/main.zip -o shuttler-frontend.zip
    ```

    - 用 `unzip` 解壓縮 zip 檔

    ```bash
    unzip shuttler-frontend.zip
    ```

</details>

## 2. 啟動容器

<details>

<summary>使用容器說明</summary>

1. 進入到 `shuttler-frontend` 專案目錄

    ```bash
    cd shuttler-frontend
    ```

2. 先把 `.env.example` 重新命名為 `.env`

    ```bash
    cp .env.example .env
    ```

3. 確認當前 CPU 架構

    請按照 `uname -m` 輸出結果，來修改 `.env` 中的 `PLATFORM` 的預設值

    ```bash
    uname -m
    ```

    輸出結果的意義，請參考下表說明

    | 輸出結果 | 意思 |
    | --- | --- |
    | x86_64   | 64 位元的 Intel/AMD CPU |
    | i686     | 32 位元的 Intel/AMD CPU |
    | aarch64  | ARM 所定義的新 64 位指令集架構 （ISA）|
    | arm64    | 是指 64 位 ARM 架構 （AArch64）。 沒有像 WoA64 這樣的事情 |

    參考來源:
      - [ARM架構](https://zh.wikipedia.org/zh-tw/ARM%E6%9E%B6%E6%A7%8B)
      - [ARM64 ABI 慣例概觀](https://learn.microsoft.com/zh-tw/cpp/build/arm64-windows-abi-conventions?view=msvc-170)

4. 請依據輸出結果，修改 `.env`

    `.env` 請按照自已所需要的做修改即可

    | 變數名稱 | 預設值 | 說明 |
    | --- | --- | --- |
    | PROJECT_NAME | demo | 專案名稱 |
    | DOCKERHUB_ACCOUNT | demo | Docker Hub 上的使用者名稱 |
    | PLATFORM | arm64 | 當前電腦的 CPU 架構 |
    | NVM_VERSION | 0.40.2 | NVM 版本 |
    | NODE_VERSION | 22.14.0 | NODE 版本 |
    | PNPM_HOME | /pnpm | pnpm 套件的全局目錄 |
    | PNPM_VERSION | 10.8.1 | PNPM 版本 |
    | YARN_VERSION | 1.22.22 | YARN 版本 |
    | GOLANG_VERSION | 1.24.2 | GOLANG 版本 |
    | GUM_VERSION | 0.16.0 | GUM 版本 |
    | LOCAL_PORT | 3000 | 使用本機的 3000 埠號 |
    | NITRO_PORT | 3000 | Nuxt 3 應用程式監聽埠 |
    | NUXT_CONTAINER_PORT | 3000 | 使用容器內的 3000 埠號 |
    | NUXT_SESSION_PASSWORD | 32 characters | Nuxt Auth Utils 使用 |
    | NUXT_BASE_URL | / | 使用根目錄 |
    | NUXT_API_BASE_URL | https:// | API 路徑 |

5. make 指令使用說明

    在終端機中，輸入指令 `make` 會看到下圖的說明及使用方法

    ![image](https://hackmd.io/_uploads/Hkaup-GA1g.png)

    $\textcolor{Crimson}{P.S. 以下指令，請務必在本機執行}$

    - 查看目前執行中的容器

      ```bash
      make show
      ```

    - 按 Dockerfile 內容，進行編譯容器映像檔

      ```bash
      make build
      ```

    - 將當前路徑掛載至容器，並啟動容器

      ```bash
      make run
      ```

    - 容器狀態為 `exited` 時，重新啟動容器

      ```bash
      make reattach
      ```

    - 容器狀態為 `running` 時，重新進入到容器

      ```bash
      make attach
      ```

    - 容器狀態為 `running` 時，停止運行容器

      ```bash
      make halt
      ```

    - 清除容器狀態為 `exited` 以及容器映像檔為 `none`

      ```bash
      make clean
      ```

</details>

## 3. pnpm 套件使用說明


<details>

<summary>pnpm 常用指令</summary>

1. 安裝套件

    ```bash
    pnpm install nodemon
    ```

2. 確認目前 pnpm store 路徑

    ```bash
    pnpm store path
    ```

3. 確認 pnpm global store 路徑

    ```bash
    pnpm config get store-dir
    ```

4. 修改 pnpm global store 路徑

    ```bash
    pnpm config set store-dir "${PNPM_HOME}"
    ```
</details>
    
## 4. Nuxt 啟動方式

<details>

1. 確認當前目錄已在容器內，預設路徑為 /work

2. 進入預設名稱的資料夾

    ```bash
    cd nuxt-app
    ```

3. 首次啟動需執行安裝

    ```bash
    pnpm i
    ```

4. 查看可用指令

    ```bash
    pnpm run
    ```

    指令說明如下：

    | 指令 | 用途 | 適用場景 | 輸出結果 |
    | -------- | -------- | -------- | -------- |
    | `pnpm run build` | 構建生產環境版本 | 部署到伺服器 | `.output` 資料夾|
    | `pnpm run dev` | 啟動開發伺服器 | 開發過程 | 即時預覽|
    | `pnpm run generate` | 生成靜態站點 | 部署到靜態網站託管服務 | `dist` 資料夾 |
    | `pnpm run preview` | 預覽生產環境構建結果 | 部署前檢查 | `.output` 資料夾的預覽 |
    | `pnpm run start` | 執行生產環境構建結果 | 部屬 | `.output` 資料夾|

5. 執行開發環境

    ```bash
    pnpm run dev
    ```

</details>
