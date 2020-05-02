# note
我的学习笔i记
pip升级问题：python -m pip install --upgrade pip -ihttps://pypi.douban.com/simple
pip安装命令：pip install ...
如何用vscode编写C/Python
https://zhuanlan.zhihu.com/p/77645306
https://zhuanlan.zhihu.com/p/112431369


配置c
        {
            "name": "C/C++",
            "type": "cppdbg",
            "request": "launch",
            "program": "${fileDirname}/${fileBasenameNoExtension}.exe",
            "args": [],
            "stopAtEntry": false,
            "cwd": "${workspaceFolder}",
            "environment": [],
            "externalConsole": false,
            "MIMode": "gdb",
            "miDebuggerPath": "D:/rjxz/gw/mingw64/bin/gdb.exe",
            "preLaunchTask": "compile",
            "setupCommands": [
                {
                    "description": "Enable pretty-printing for gdb",
                    "text": "-enable-pretty-printing",
                    "ignoreFailures": true
                }
            ],
        }

配置python
        {
            "name": "Python: 当前文件",
            "type": "python",
            "request": "launch",
            "program": "${file}",
            "console": "integratedTerminal"
        },

配置java
        {
            "type": "java",
            "name": "Debug (Launch) - Current File",
            "request": "launch",
            "mainClass": "${file}"
        }
