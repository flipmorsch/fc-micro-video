FROM node:20.18.0-slim

VOLUME /var/cache/apt

RUN mkdir -p /usr/share/man/man1 && \
    echo 'deb http://ftp.debian.org/debian stretch-backports main' | tee /etc/apt/sources.list.d/stretch-backports.list && \
    apt update && apt install -y \ 
    ca-certificates \
    git \
    openjdk-11-jre \
    procps && \
    npm install -g @nestjs/cli@10.4.5 && \
    rm -rf /var/lib/apt/lists/*

ENV JAVA_HOME="/usr/lib/jvm/java-11-openjdk-amd64"

USER node

WORKDIR /home/node/app

CMD [ "tail", "-f",  "/dev/null" ]