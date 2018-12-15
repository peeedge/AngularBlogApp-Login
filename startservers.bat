@echo off
cd server
start startblogserver.bat
start startmongodbserver.bat
cd ..
cd client
start startnglivedevserver.bat
mean
start https://localhost:4200