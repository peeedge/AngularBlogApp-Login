@echo off
cd server
start startblogserver.bat
start startmongodbserver.bat
cd ..
cd client
start startnglivedevserver.bat
start http://localhost:4200