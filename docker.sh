#!/bin/bash

if [[ $EUID -ne 0 ]]; then
   echo -e "The script requires root or sudo privileges to run.\nPlease run it with 'sudo' or as root."
   exit 1
fi

if command -v docker &> /dev/null; then
    echo "Docker is already installed."
    exit 0
fi

apt update
apt install -y apt-transport-https ca-certificates curl gnupg lsb-release

curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/$(lsb_release -is | tr '[:upper:]' '[:lower:]') \
  $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null

apt update

apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

groupadd docker
usermod -aG docker $USER
newgrp docker

docker run hello-world
