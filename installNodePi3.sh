#!/bin/bash
# UNTESTED
#Get latest node 4 for raspberry pi 3 (Arm V8)
wget https://nodejs.org/dist/v4.4.5/node-v4.4.5-linux-arm64.tar.xz
tar -xvf node-v4.4.5-linux-arm64.tar.xz

#Move to /usr/local
cd node-v4.4.5-linux-arm64
sudo cp -R * /usr/local/

#remove temp files
rm -rf node-v4.4.5-linux-arm64*
