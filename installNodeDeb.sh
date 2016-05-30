#!/bin/bash

#nodejs
#Add nodejs reop
curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -

sudo apt-get install -y nodejs

# Add build tools
sudo apt-get install -y build-essential
