// ==UserScript==
// @name         Emby Server ID 自动配置
// @namespace    https://github.com/jisxu/emby-crx-serverid-fix
// @version      1.0
// @description  自动将预设的 Server ID 应用到 Emby 媒体库卡片上
// @author       jisxu
// @match        *://*/web/index.html*
// @grant        GM_getValue
// @grant        GM_setValue
// @run-at       document_idle
// @license      GPL-3.0 license
// ==/UserScript==

(function() {
    'use strict';

    // *** 在这里配置你的 Server ID ***
    // 将 'your_server_id_here' 替换为你要设置的实际 Server ID。
    // 例如: const DEFAULT_SERVER_ID = "f1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6";
    const DEFAULT_SERVER_ID = "";

    // 使用 GM_setValue 和 GM_getValue 保持兼容性，但实际上值已硬编码在脚本里
    // 脚本启动时，直接使用 DEFAULT_SERVER_ID 的值
    let serverId = DEFAULT_SERVER_ID;
    // 如果你希望在脚本首次运行时就将 DEFAULT_SERVER_ID 存入 GM_storage，可以取消注释下面一行
    // GM_setValue('configuredServerId', DEFAULT_SERVER_ID);
    // 如果你想在脚本中读取存储的值（例如，如果你之前用过有UI的版本），可以这样读取
    // let serverId = GM_getValue('customServerId', DEFAULT_SERVER_ID);


    // --- 核心功能：应用 Server ID 到卡片 ---
    // 这个函数会查找页面上所有的媒体卡片，并为它们设置 data-serverid 属性
    function applyServerIdToCards() {
        const librarys = document.querySelectorAll(".view:not(.hide) .section0 .card");
        librarys.forEach(library => {
            // 只有当卡片尚未设置或设置的ID与当前不同时才更新
            if (library.getAttribute("data-serverid") !== serverId) {
                library.setAttribute("data-serverid", serverId);
                library.setAttribute("data-type", "CollectionFolder");
            }
        });
        // 打印日志以便调试，确认脚本正在工作
        console.log(`[Emby Server ID 脚本] 已将 Server ID: ${serverId} 应用到 ${librarys.length} 个媒体库卡片上。`);
    }

    // --- 脚本初始化和 DOM 观察 ---

    // 在页面 DOM 加载完成后立即执行一次 applyServerIdToCards
    document.addEventListener('DOMContentLoaded', () => {
        applyServerIdToCards();
    });

    // 持续监听 DOM 变化，以便为动态加载的媒体卡片应用 Server ID
    // 确保即使 Emby 动态加载或重新渲染内容，Server ID 也能被正确设置
    const contentObserver = new MutationObserver((mutationsList) => {
        for (const mutation of mutationsList) {
            // 仅在子节点被添加时检查
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                // 优化：检查新增的节点中是否包含 .card 元素，减少不必要的 applyServerIdToCards 调用
                const hasNewCard = Array.from(mutation.addedNodes).some(node =>
                    node.nodeType === Node.ELEMENT_NODE &&
                    (node.matches('.card') || node.querySelector('.card')) // 检查自身或子元素
                );
                if (hasNewCard) {
                    applyServerIdToCards();
                }
            }
        }
    });

    // 观察整个文档的 body 元素，包括其子树的所有变化
    contentObserver.observe(document.body, { childList: true, subtree: true });

})();
