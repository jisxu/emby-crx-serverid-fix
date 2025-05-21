# Emby Server ID 修复脚本 for Emby-CRX 美化封面
为 Emby-CRX 美化封面功能修复 serverid 未定义错误，本脚本会在后台自动为 Emby 媒体卡片注入预设的 Server ID。

# 如何使用
[➡️ 一键安装 Emby Server ID 修复脚本 ⬅️](https://raw.githubusercontent.com/jisxu/emby-crx-serverid-fix/refs/heads/main/emby-crx-serverid-fix.js)

# 配置你的 Server ID
重要：脚本安装后，你需要手动修改脚本代码中的 Server ID。

# 安装脚本后，点击浏览器右上角的 Tampermonkey/Violentmonkey 图标，找到并点击这个脚本的名称以进入编辑界面。
在脚本代码中找到这行：

```javascript
const DEFAULT_SERVER_ID = "your_server_id_here"; // <<< 在这里修改你的 Server ID
```

将 "your_server_id_here" 替换为你的实际 Emby Server ID。任意点击一个媒体库，url中的serverid字段就是
保存脚本，然后刷新你的 Emby 页面即可生效。
