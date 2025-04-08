
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

2. 先把 `Makefile.origin` 重新命名為 `Makefile`

    ```bash
    cp Makefile.origin Makefile
    ```

3. 確認當前 CPU 架構

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

4. 請依據輸出結果，修改 `Makefile`

    Makefile 請按照自已所需要的做修改即可

    | 變數名稱 | 預設值 | 說明 |
    | --- | --- | --- |
    | LOCAL_PORT | 3000 | 使用本機的 3000 埠號 |
    | CONTAINER_PORT | 3000 | 使用容器內的 3000 埠號 |
    | PLATFORMS | linux/amd64 linux/arm64/v8 | 確定容器可使用平台 |
    | MAP_PLATFORMS | amd64 arm64v8 | 確定容器可使用平台 |
    | DOCKER_VERSION | 28.0.4 | Docker 版本 |
    | DOCKER_COMPOSE_VERSION | 2.34.0 | Docker Compose 版本 |
    | BUILDX_VERSION | 0.22.0 | Docker Buildx 版本 |
    | NVM_VERSION | 0.40.2 | NVM 版本 |
    | NODE_VERSION | 22.14.0 | NODE 版本 |
    | PNPM_VERSION | 10.7.1 | PNPM 版本 |
    | YARN_VERSION | 1.22.22 | YARN 版本 |
    | GOLANG_VERSION | 1.24.2 | GOLANG 版本 |
    | GUM_VERSION | 0.14.5 | GUM 版本 |
    | DOCKERHUB_ACCOUNT | demo | Docker Hub 上的使用者名稱 |

    請按照 `uname -m` 輸出結果，來修改 `PLATFORMS` & `MAP_PLATFORMS` 的預設值

    - 輸出結果為 $\textcolor{Orange}{x86\\_64}$
      - 請修改為 PLATFORMS=`linux/amd64`
      - 請修改為 MAP_PLATFORMS=`amd64`
    - 輸出結果為 $\textcolor{Orange}{arm64}$
      - 請修改為 PLATFORMS=`linux/arm64/v8`
      - 請修改為 MAP_PLATFORMS=`arm64v8`

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


