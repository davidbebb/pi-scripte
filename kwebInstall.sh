#!/bin/bash

# Install Kweb
wget http://steinerdatenbank.de/software/kweb-1.7.1.tar.gz
tar -xzf kweb-1.7.1.tar.gz
cd kweb-1.7.1
./debinstall

# Install dependencies
sudo apt-get install xterm uget evince lxterminal tint2

echo 'manual at : http://steinerdatenbank.de/software/kweb_manual.pdf'
