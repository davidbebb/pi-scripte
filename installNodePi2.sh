#!/bin/bash

#Get latest node 4 for raspberry pi 2 (Arm V7)
wget https://nodejs.org/dist/v4.4.5/node-v4.4.5-linux-armv7l.tar.gz
tar -xvf node-v4.4.5-linux-armv7l.tar.gz

#Move to /usr/local
cd node-v4.4.5-linux-armv7l
sudo cp -R * /usr/local/

#remove temp files
rm -rf node-v4.4.5-linux-armv7l*
