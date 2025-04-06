##############################
# Use Ubuntu 24.04 as the base image
##############################
FROM ubuntu:24.04

##############################
# Set to build the specific platform
# Reference: https://docs.docker.com/reference/dockerfile/#automatic-platform-args-in-the-global-scope
##############################
ARG TARGETPLATFORM
RUN echo "Start building for ${TARGETPLATFORM}"

##############################
# Set locales
##############################

RUN apt-get update -y \
    && DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends locales \
    && sed -i -e 's/# en_US.UTF-8 UTF-8/en_US.UTF-8 UTF-8/' /etc/locale.gen \
    && dpkg-reconfigure --frontend=noninteractive locales \
    && update-locale LANG=en_US.UTF-8

ENV LANG=en_US.UTF-8
ENV LANGUAGE=en_US.UTF-8
ENV LC_ALL=en_US.UTF-8

##############################
# Set TimeZone
##############################

ENV TZ=Asia/Taipei
RUN DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends tzdata \
    && ln -snf /usr/share/zoneinfo/${TZ} /etc/localtime \
    && echo ${TZ} > /etc/timezone

##############################
# Install Base Tools
##############################

# Package 'python-pip' has no installation candidate on Ubuntu 20.04, use 'python3-pip' to replace it.
RUN apt-get update -y  \
    && DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends \
    apt-transport-https \
    bash \
    bash-completion \
    build-essential \
    curl \
    ca-certificates  \
    dnsutils \
    git \
    gnupg \
    gettext-base \
    iptables \
    jq \
    lsb-release \
    net-tools \
    neovim \
    python3-pip \
    pwgen \
    rsync \
    supervisor \
    software-properties-common \
    tig \
    tree \
    tmux \
    unzip \
    vim \
    wget \
    zip

##############################
# Install Docker
##############################

ARG buildtime_DOCKER_VERSION='24.0.7' \
    buildtime_DOCKER_COMPOSE_VERSION='2.24.0' \
    buildtime_BUILDX_VERSION='0.11.2'
ENV DOCKER_CHANNEL=stable \
    DOCKER_VERSION=${buildtime_DOCKER_VERSION} \
    DOCKER_COMPOSE_VERSION=${buildtime_DOCKER_COMPOSE_VERSION} \
    BUILDX_VERSION=${buildtime_BUILDX_VERSION}
RUN set -eux; \
    arch="$(uname -m)"; \
    case "$arch" in \
        x86_64) dockerArch='x86_64' ; buildx_arch='linux-amd64' ;; \
        armhf) dockerArch='armel' ; buildx_arch='linux-arm-v6' ;; \
        armv7) dockerArch='armhf' ; buildx_arch='linux-arm-v7' ;; \
        aarch64) dockerArch='aarch64' ; buildx_arch='linux-arm64' ;; \
        *) echo >&2 "error: unsupported architecture ($arch)"; exit 1 ;; \
    esac && \
    wget -O docker.tgz "https://download.docker.com/linux/static/${DOCKER_CHANNEL}/${dockerArch}/docker-${DOCKER_VERSION}.tgz" && \
    tar --extract --file docker.tgz --strip-components 1 --directory /usr/local/bin/ && \
    rm docker.tgz && \
    wget -O docker-buildx "https://github.com/docker/buildx/releases/download/v${BUILDX_VERSION}/buildx-v${BUILDX_VERSION}.${buildx_arch}" && \
    mkdir -p /usr/local/lib/docker/cli-plugins && \
    chmod +x docker-buildx && \
    mv docker-buildx /usr/local/lib/docker/cli-plugins/docker-buildx && \
    dockerd --version && \
    docker --version && \
    docker buildx version

COPY container-utility/modprobe \
      container-utility/start-docker.sh \
      container-utility/entrypoint.sh \
      /usr/local/bin/
COPY container-utility/supervisor/ /etc/supervisor/conf.d/
COPY container-utility/logger.sh /opt/bash-utils/logger.sh

RUN chmod +x /usr/local/bin/start-docker.sh \
    /usr/local/bin/entrypoint.sh \
    /usr/local/bin/modprobe

VOLUME /var/lib/docker

# Install Docker Compose
RUN set -eux; \
    curl -L "https://github.com/docker/compose/releases/download/v${DOCKER_COMPOSE_VERSION}/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose && \
    chmod +x /usr/local/bin/docker-compose && \
    docker-compose version && \
    ln -s /usr/local/bin/docker-compose /usr/local/lib/docker/cli-plugins/docker-compose

##############################
# Install nvm and install Node.js LTS version
##############################

ARG buildtime_NVM_VERSION='0.40.1'
ENV NVM_VERSION=${buildtime_NVM_VERSION}
ARG buildtime_NODE_VERSION='22.14.0'
ENV NODE_VERSION=${buildtime_NODE_VERSION}
ENV NVM_DIR='/root/.nvm'
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v${NVM_VERSION}/install.sh | bash \
    && . ${NVM_DIR}/nvm.sh \
    && nvm install ${NODE_VERSION} \
    && nvm alias default ${NODE_VERSION} \
    && nvm use default \
    && ln -sf ${NVM_DIR}/versions/node/$(nvm version)/bin/node /usr/local/bin/node \
    && ln -sf ${NVM_DIR}/versions/node/$(nvm version)/bin/npm /usr/local/bin/npm \
    && ln -sf ${NVM_DIR}/versions/node/$(nvm version)/bin/npx /usr/local/bin/npx \
    && npm install -g nodemon

##############################
# Install pnpm
##############################

ARG buildtime_PNPM_VERSION='10.7.1'
ENV PNPM_VERSION=${buildtime_PNPM_VERSION}
RUN set -eux; \
    LOWER_ARCH=$(dpkg --print-architecture); \
    case "${LOWER_ARCH}" in \
      amd64) curl -sL "https://github.com/pnpm/pnpm/releases/download/v${buildtime_PNPM_VERSION}/pnpm-linux-x64" -o "/usr/local/bin/pnpm" ;;  \
      arm64) curl -sL "https://github.com/pnpm/pnpm/releases/download/v${buildtime_PNPM_VERSION}/pnpm-linux-arm64" -o "/usr/local/bin/pnpm" ;; \
      *) echo >&2 "Unsupported architecture: $LOWER_ARCH"; exit 1; \
    esac; \
    chmod +x /usr/local/bin/pnpm

##############################
# Install Yarn
##############################

ARG buildtime_YARN_VERSION='1.22.22'
ENV YARN_VERSION=${buildtime_YARN_VERSION}
RUN curl -fsSL https://dl.yarnpkg.com/debian/pubkey.gpg | gpg --dearmor -o /usr/share/keyrings/yarn-keyring.gpg \
    && echo "deb [signed-by=/usr/share/keyrings/yarn-keyring.gpg] https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list \
    && apt-get update -y || true \
    && DEBIAN_FRONTEND=noninteractive apt-get install -y yarn=${YARN_VERSION}-1

##############################
# Install Go
##############################

ARG buildtime_GOLANG_VERSION='1.20.3'
ENV GOLANG_VERSION=${buildtime_GOLANG_VERSION}
RUN set -eux; \
    LOWER_ARCH=$(dpkg --print-architecture); \
    curl -LO https://go.dev/dl/go${GOLANG_VERSION}.linux-${LOWER_ARCH}.tar.gz \
    && tar -zxvf go${GOLANG_VERSION}.linux-${LOWER_ARCH}.tar.gz -C /usr/local/ \
    && rm -rf go${GOLANG_VERSION}.linux-${LOWER_ARCH}.tar.gz \
    && echo 'export PATH=$PATH:/usr/local/go/bin' >> /root/.bashrc

##############################
# Install gum
# Reference: https://github.com/charmbracelet/gum
##############################

ARG buildtime_GUM_VERSION='0.13.0'
ENV GUM_VERSION=${buildtime_GUM_VERSION}

RUN set -eux; \
    LOWER_ARCH=$(dpkg --print-architecture); \
    case "${LOWER_ARCH}" in \
    amd64) \
      curl -LO https://github.com/charmbracelet/gum/releases/download/v${GUM_VERSION}/gum_${GUM_VERSION}_Linux_x86_64.tar.gz \
      && tar -zxvf gum_${GUM_VERSION}_Linux_x86_64.tar.gz --strip-components=1 -C /usr/local/bin gum_${GUM_VERSION}_Linux_x86_64/gum \
      && chmod +x /usr/local/bin/gum \
      && rm -rf gum_${GUM_VERSION}_Linux_x86_64.tar.gz; \
    ;; \
    arm64) \
      curl -LO https://github.com/charmbracelet/gum/releases/download/v${GUM_VERSION}/gum_${GUM_VERSION}_Linux_arm64.tar.gz \
      && tar -zxvf gum_${GUM_VERSION}_Linux_arm64.tar.gz --strip-components=1 -C /usr/local/bin gum_${GUM_VERSION}_Linux_arm64/gum \
      && chmod +x /usr/local/bin/gum \
      && rm -rf gum_${GUM_VERSION}_Linux_arm64.tar.gz; \
    ;; \
    *) echo >&2 "Unsupported architecture: $LOWER_ARCH"; exit 1; \
    esac

##############################
# Setup make auto completion
##############################

COPY container-utility/make_completion.sh /etc/bash_completion.d/make_completion.sh

##############################
# Clean apt-get cache
##############################

RUN apt-get clean \
    && rm -rf /var/lib/apt/lists/* /tmp/*

ENV TERM=xterm-256color

##############################
# Create Work Directory
##############################

RUN mkdir -p /work

##############################
# Create a mount point for the volume and work directory
##############################

VOLUME ["/work/"]
WORKDIR /work

##############################
# Setup container listen port
##############################

ARG buildtime_CONTAINER_PORT=3000
EXPOSE ${buildtime_CONTAINER_PORT}

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
CMD ["bash"]
