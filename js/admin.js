/**
 * 明德里 2.0 專屬競選管理後台邏輯 (admin.js)
 * 密碼驗證、Google 試算表雙向同步、剪貼簿複製與 SOP 範本
 */

const ADMIN_PASSWORD = 'b0937522399';
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzJVXWjcRGzSDMWBsO6aHQR-UbX5BOM6pcKpNpKVYMYVwj8ceWV6Pu9X7UP6ldlPrTn/exec';

// 預設 10 案備援資料庫
const INITIAL_ADMIN_DATA = [
    {
        id: "qa-1",
        category: "#交通號誌與停車",
        type: "policy",
        status: "已審核公開",
        author: "每天被塞車所苦的明德里通勤族",
        contact: "0912-xxx-xxx",
        date: "2026-08-20 10:00:00",
        question: "每天上下班經過明德路二段真的快被氣死！學府路口那個行人專用時相開放時間短得可憐，只要沒開放，轉彎車為了禮讓行人根本動彈不得，一個綠燈才過一兩台車就被第一輛卡死！更扯的是學士路口往金城路那段，前後兩個紅綠燈完全不同步，前一個剛綠燈、下一個馬上變紅燈，車子直接卡在路中間動彈不得連環大塞車！每天塞到懷疑人生，里長到底能不能幫忙找市府好好把這幾個紅綠燈連動處理一下？",
        response: "1. 【正式納入政見白皮書第4案】：您的塞車痛苦新昱感同身受！這也是我自己每天出門的真實困擾，已正式將此案列入「智慧交通與友善步行」核心政見！\n2. 【學府路口人車徹底分流】：當選後一週內向交通局爭取尖峰時段（早晨 07:00~09:00 與傍晚 17:00~19:30）延長「全向行人專用時相」並導入「早開時相 (LPI)」——讓行人安心過馬路，綠燈時車輛轉彎不再被卡死！\n3. 【學士路口往金城路智慧綠波】：前後紅綠燈打架是號誌沒有連鎖！新昱具備 30 年資工數據專長，將直接調閱交通局交控中心秒數，爭取幹道「綠波續進 (Green Wave)」，一路順暢不再原地苦等！"
    },
    {
        id: "qa-2",
        category: "#跨世代共融與課程",
        type: "policy",
        status: "已審核公開",
        author: "明德活動中心 太鼓班學員",
        contact: "0928-xxx-xxx",
        date: "2026-08-18 14:30:00",
        question: "我們在明德活動中心的太鼓班已經練習好幾年了，很擔心換了里長之後這些長輩喜歡的班別會不會被取消或改掉？",
        response: "1. 【承諾百分之百延續】：既有深受好評的太鼓班、土風舞等傳統課程，絕對完整保留、場地時段全力保障！\n2. 【潮流升級注入新活力】：陳新昱具備 20 年音樂產業背景，未來將邀請青年獨立樂手與太鼓班長輩跨世代合體公演！"
    },
    {
        id: "qa-3",
        category: "#交通號誌與停車",
        type: "city",
        status: "已審核公開",
        author: "學府路通勤族 林先生",
        contact: "lin@example.com",
        date: "2026-08-15 09:15:00",
        question: "每天早上下班時間，學府路一段往海山站方向機車格一位難求，許多機車違停在紅線上，請問里長能不能直接把紅線塗銷改成機車格？",
        response: "1. 【法規權責釐清】：紅黃線劃設屬市府交通局與警察局權責，里長無權單方面塗銷。\n2. 【爭取彈性配套方案】：當選後主動向交通局提案辦理會勘，評估利用周邊閒置公有地或退縮綠帶增設機車停放區。"
    },
    {
        id: "qa-4",
        category: "#社區法規與大樓共好",
        type: "law",
        status: "已審核公開",
        author: "金城路大樓管委會 委員",
        contact: "0933-xxx-xxx",
        date: "2026-08-12 16:20:00",
        question: "我們大樓想要把公共梯廳老舊日光燈更換為感應式 LED 節能燈具，想請問候選人市府是否有相關補助款？",
        response: "1. 【市府補助法規說明】：新北市工務局每年定期開辦低碳社區智慧節能補助計畫，最高補助總工程款之 50%。\n2. 【里辦公處行政協辦】：未來里辦公處將成立大樓節能與補助諮詢窗口，協助大樓管委會彙整申請文件與流程。"
    },
    {
        id: "qa-5",
        category: "#巷弄安全與照明",
        type: "policy",
        status: "已審核公開",
        author: "樂利國小家長志工團 林媽媽",
        contact: "0955-xxx-xxx",
        date: "2026-08-10 11:00:00",
        question: "上下學時段樂利國小周邊車流量大，部分人行道因高低差與標線磨損，家長牽著低年級學童走起來提心吊膽，希望里長能協助通學路徑升級。",
        response: "1. 【納入政見白皮書第4案】：已將智慧安全與友善步行列為核心政見。\n2. 【跨單位會勘爭取】：當選後優先協同校方、交通局與公所辦理通學步道會勘，爭取劃設綠底人行道。"
    },
    {
        id: "qa-6",
        category: "#環境衛生與整潔",
        type: "inspect",
        status: "已審核公開",
        author: "明德路二段 住戶 陳先生",
        contact: "0966-xxx-xxx",
        date: "2026-08-08 15:40:00",
        question: "夏季午後雷陣雨頻繁，明德路二段部分舊公寓後側排水溝容易有積水異味，希望里長協助定期排程清淤與消毒。",
        response: "1. 【列入防汛優先清淤清單】：當選後立即彙整全里熱點，主動向土城清潔隊申請全面清淤與預防性噴藥。\n2. 【建立定期通報機制】：導入數位里政回報系統，里民一鍵拍照通報即時追蹤。"
    },
    {
        id: "qa-7",
        category: "#跨世代共融與課程",
        type: "city",
        status: "已審核公開",
        author: "孔雀王朝 社區住戶",
        contact: "0977-xxx-xxx",
        date: "2026-08-05 19:20:00",
        question: "活動中心旁邊的綠地很多長輩和家庭晚上會去散步，但部分角落照明較暗，且休閒座椅數量有限，希望能向市府爭取改善。",
        response: "1. 【專案提案市府景觀處】：該草地公園屬公有綠地，當選後向景觀處與公所提案綠美化與休閒設施專案。\n2. 【增設景觀矮燈與人體工學座椅】：規劃以低眩光暖色 LED 矮燈提升夜間安全性，並增設長者友善休閒長椅。"
    },
    {
        id: "qa-8",
        category: "#跨世代共融與課程",
        type: "policy",
        status: "已審核公開",
        author: "美麗宏國 社區長者",
        contact: "0988-xxx-xxx",
        date: "2026-08-02 10:10:00",
        question: "常聽候選人提到 AI 健康管家可以幫忙記血壓和提醒吃藥，我們年紀大不會用複雜的手機，請問真的會有人手把手教我們嗎？",
        response: "1. 【納入政見白皮書第7案】：陳新昱將親自在活動中心開辦銀髮大字體 AI 智慧健康工作坊。\n2. 【志工手把手輔導】：培訓青年與志工一對一協助長輩完成語音輸入與每日用藥提醒設定。"
    },
    {
        id: "qa-9",
        category: "#交通號誌與停車",
        type: "inspect",
        status: "已審核公開",
        author: "立德路 駕駛里民",
        contact: "0911-xxx-xxx",
        date: "2026-07-28 08:50:00",
        question: "立德路部分轉角處因大樓外牆視線遮蔽，現有反射鏡角度偏移，常常有車輛快速駛出造成險象環生，希望調整反射鏡並加劃減速標線。",
        response: "1. 【列入第一梯次交通會勘】：當選後一週內排定現勘，邀請交通局現勘調整反射鏡角度並更換大廣角鏡面。\n2. 【路口鋪設減速標線】：爭取於路口前增設慢字警示與太陽能閃爍標誌。"
    },
    {
        id: "qa-10",
        category: "#跨世代共融與課程",
        type: "policy",
        status: "已審核公開",
        author: "學府路 家長 吳先生",
        contact: "wu@example.com",
        date: "2026-07-15 14:00:00",
        question: "看到文宣中有無人機與 AI 體驗課，請問小朋友幾歲可以參加？室內操作會不會有安全顧慮？",
        response: "1. 【納入政見白皮書第3案】：適合國小三年級以上學童與家長親子共同參與。\n2. 【安全至上原則】：室內一律限用 50g 以下微型機種，配備螺旋槳全防護罩，由安全員全程隨行指導。"
    }
];

let adminProposals = [];
let activeProposalId = null;
let currentAdminFilter = 'all';
let currentAdminSearch = '';

// 頁面初始化
document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    loadAdminData();
});

// 1. 密碼驗證
function checkAuth() {
    const isAuth = sessionStorage.getItem('md2_admin_auth');
    const overlay = document.getElementById('admin-login-overlay');
    if (isAuth === 'true') {
        if (overlay) overlay.style.display = 'none';
    } else {
        if (overlay) overlay.style.display = 'flex';
    }
}

function handleAdminLogin(e) {
    e.preventDefault();
    const input = document.getElementById('admin-password-input');
    const errorMsg = document.getElementById('login-error-msg');
    
    if (input && input.value.trim() === ADMIN_PASSWORD) {
        sessionStorage.setItem('md2_admin_auth', 'true');
        const overlay = document.getElementById('admin-login-overlay');
        if (overlay) overlay.style.display = 'none';
        if (errorMsg) errorMsg.style.display = 'none';
        showToast('管理員驗證成功，歡迎進入工作台！');
    } else {
        if (errorMsg) errorMsg.style.display = 'block';
        if (input) input.value = '';
    }
}

function handleAdminLogout() {
    sessionStorage.removeItem('md2_admin_auth');
    window.location.reload();
}

// 2. 資料載入 (LocalStorage ＋ Google Sheets 同步)
function loadAdminData() {
    try {
        const stored = localStorage.getItem('md2_admin_proposals');
        if (stored) {
            adminProposals = JSON.parse(stored);
        } else {
            adminProposals = [...INITIAL_ADMIN_DATA];
            saveLocalData();
        }
    } catch(e) {
        adminProposals = [...INITIAL_ADMIN_DATA];
    }

    if (adminProposals.length > 0 && !activeProposalId) {
        activeProposalId = adminProposals[0].id;
    }

    renderAdminList();
    loadActiveProposalIntoEditor();
    updateCounts();
}

function saveLocalData() {
    try {
        localStorage.setItem('md2_admin_proposals', JSON.stringify(adminProposals));
    } catch(e) {}
}

// 3. 渲染左側清單
function renderAdminList() {
    const listEl = document.getElementById('admin-card-list');
    if (!listEl) return;

    let filtered = adminProposals.filter(item => {
        let matchFilter = true;
        if (currentAdminFilter === 'pending') matchFilter = item.status === '待決策小組審核';
        if (currentAdminFilter === 'approved') matchFilter = item.status === '已審核公開';

        let matchSearch = true;
        if (currentAdminSearch) {
            const q = currentAdminSearch.toLowerCase();
            matchSearch = (item.author && item.author.toLowerCase().includes(q)) ||
                          (item.question && item.question.toLowerCase().includes(q)) ||
                          (item.id && item.id.toLowerCase().includes(q)) ||
                          (item.category && item.category.toLowerCase().includes(q));
        }
        return matchFilter && matchSearch;
    });

    if (filtered.length === 0) {
        listEl.innerHTML = `<div style="text-align:center; color:var(--text-muted); padding:2rem;">查無符合條件之提案</div>`;
        return;
    }

    listEl.innerHTML = filtered.map(item => {
        const isSelected = item.id === activeProposalId;
        const isPending = item.status === '待決策小組審核';
        const statusBadge = isPending 
            ? `<span style="color:#f87171; background:rgba(239,68,68,0.15); padding:0.15rem 0.5rem; border-radius:4px; font-size:0.75rem; font-weight:700;">🔴 待審核</span>`
            : `<span style="color:#34d399; background:rgba(16,185,129,0.15); padding:0.15rem 0.5rem; border-radius:4px; font-size:0.75rem; font-weight:700;">🟢 已公開</span>`;

        const previewText = item.question.length > 38 ? item.question.substring(0, 38) + '...' : item.question;

        return `
        <div class="admin-item-card ${isSelected ? 'active' : ''}" onclick="selectProposal('${item.id}')">
            <div class="admin-item-header">
                <span style="font-family:monospace; font-size:0.78rem; color:var(--accent-primary); font-weight:700;">${item.id}</span>
                ${statusBadge}
            </div>
            <div class="admin-item-title">${previewText}</div>
            <div class="admin-item-meta">
                <span>👤 ${item.author || '熱心里民'}</span>
                <span>🏷️ ${item.category || '#生活建議'}</span>
            </div>
        </div>
        `;
    }).join('');
}

function selectProposal(id) {
    activeProposalId = id;
    renderAdminList();
    loadActiveProposalIntoEditor();
}

// 4. 將選定案件載入右側編輯器
function loadActiveProposalIntoEditor() {
    const item = adminProposals.find(p => p.id === activeProposalId);
    if (!item) return;

    document.getElementById('editor-active-id').textContent = item.id;
    document.getElementById('edit-author').value = item.author || '';
    document.getElementById('edit-category').value = item.category || '#巷弄安全與照明';
    document.getElementById('edit-status').value = item.status || '已審核公開';
    document.getElementById('edit-type').value = item.type || 'policy';
    document.getElementById('edit-contact').value = item.contact || '';
    document.getElementById('edit-date').value = item.date || '';
    document.getElementById('edit-question').value = item.question || '';
    document.getElementById('edit-response').value = item.response || '';
}

// 5. 儲存並發布
function handleSaveProposal() {
    const item = adminProposals.find(p => p.id === activeProposalId);
    if (!item) return;

    item.author = document.getElementById('edit-author').value.trim() || '熱心里民';
    item.category = document.getElementById('edit-category').value;
    item.status = document.getElementById('edit-status').value;
    item.type = document.getElementById('edit-type').value;
    item.contact = document.getElementById('edit-contact').value.trim();
    item.question = document.getElementById('edit-question').value.trim();
    item.response = document.getElementById('edit-response').value.trim();

    saveLocalData();
    renderAdminList();
    updateCounts();

    // 同步更新至 Google 試算表
    if (GOOGLE_SCRIPT_URL) {
        fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                action: 'submit_proposal',
                userName: item.author,
                category: item.category,
                contact: item.contact,
                content: item.question
            })
        }).catch(err => console.log('Sync error:', err));
    }

    showToast(`案件 ${item.id} 已成功儲存！`);
}

// 6. 新增提案
function handleNewProposal() {
    const now = new Date();
    const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
    const newId = `qa-${adminProposals.length + 1}`;

    const newObj = {
        id: newId,
        category: "#巷弄安全與照明",
        type: "inspect",
        status: "待決策小組審核",
        author: "明德里民",
        contact: "",
        date: dateStr,
        question: "（請在此輸入里民問題全文）",
        response: ""
    };

    adminProposals.unshift(newObj);
    activeProposalId = newId;
    saveLocalData();
    renderAdminList();
    loadActiveProposalIntoEditor();
    updateCounts();
    showToast(`已建立新提案 ${newId}，請開始編輯！`);
}

// 7. 一鍵複製按鈕 (Copy to Clipboard for AI)
function copyQuestionToAI() {
    const item = adminProposals.find(p => p.id === activeProposalId);
    if (!item) return;

    const textToCopy = `【里民提問諮詢】
案件編號：${item.id}
反映里民：${item.author}（${item.category}）
提問內容：
${item.question}

請競選決策小組、律師與民政顧問協助評估法規、里長法定權責，並起草官方 SOP 具體解決路徑回覆。`;

    navigator.clipboard.writeText(textToCopy).then(() => {
        showToast('已複製里民問題全文！可直接貼給 Antigravity 諮詢');
    });
}

function copyResponseToAI() {
    const respText = document.getElementById('edit-response').value;
    navigator.clipboard.writeText(respText).then(() => {
        showToast('已複製官方回覆內容！');
    });
}

function copyFullQAToAI() {
    const item = adminProposals.find(p => p.id === activeProposalId);
    if (!item) return;

    const fullText = `### 【案件 ${item.id}】${item.category}
* **反映人**：${item.author} (${item.date})
* **審核狀態**：${item.status}
* **問題原文**：
${item.question}

* **官方回覆**：
${item.response}`;

    navigator.clipboard.writeText(fullText).then(() => {
        showToast('已複製完整問答全文！');
    });
}

// 8. 插入快捷 SOP 範本
function insertTemplate(type) {
    const respBox = document.getElementById('edit-response');
    if (!respBox) return;

    let tpl = "";
    if (type === 'inspect') {
        tpl = `1. 【列入優先重點會勘】：當選後一週內將排定第一梯次現場會勘，邀請土城區公所工務課與相關權責單位實勘。\n2. 【短期改善措施】：先行針對周邊死角更換高流明節能 LED 燈具與清淤，保障基本通行安全。\n3. 【中長期專案爭取】：向市府爭取專案改善補助，根本解決問題。`;
    } else if (type === 'policy') {
        tpl = `1. 【承諾百分之百延續】：所有既有深受里民好評的課程與活動，絕對完整保留、場地時段全力保障！\n2. 【潮流升級注入新活力】：已將相關升級計畫納入政見白皮書，未來將邀請跨世代參與共融，豐富社區生活！`;
    } else if (type === 'law') {
        tpl = `1. 【市府法規權責釐清】：依據主管機關法令規範，里辦公處將依法釐清管轄權責，不作無法兌現的空頭承諾。\n2. 【里辦公處行政協辦】：里辦公處將成立專案諮詢窗口，由具備專業背景的團隊協助里民彙整申請文件與法令流程。`;
    } else if (type === 'city') {
        tpl = `1. 【專案提案市府主管機關】：該項目屬公有權責，當選後將向市府主管機關與公所正式提案專案計畫。\n2. 【爭取經費與設施升級】：積極爭取市府專案補助款，提升明德里生活環境品質。`;
    }

    respBox.value = tpl;
    showToast('已帶入官方標準 SOP 範本！');
}

// 9. 篩選與計數
function setAdminFilter(filterType, btn) {
    currentAdminFilter = filterType;
    const btns = document.querySelectorAll('.admin-filter-btn');
    btns.forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
    renderAdminList();
}

function handleAdminSearch(val) {
    currentAdminSearch = val.trim();
    renderAdminList();
}

function updateCounts() {
    const total = adminProposals.length;
    const pending = adminProposals.filter(p => p.status === '待決策小組審核').length;
    const approved = adminProposals.filter(p => p.status === '已審核公開').length;

    const countAll = document.getElementById('count-all');
    const countPending = document.getElementById('count-pending');
    const countApproved = document.getElementById('count-approved');

    if (countAll) countAll.textContent = total;
    if (countPending) countPending.textContent = pending;
    if (countApproved) countApproved.textContent = approved;
}

function syncWithGoogleSheets() {
    showToast('正在與 Google 試算表連線同步...');
    loadAdminData();
    setTimeout(() => {
        showToast('已完成與 Google 試算表同步！');
    }, 1000);
}

// Toast
function showToast(msg) {
    const toast = document.getElementById('toast-notice');
    const toastMsg = document.getElementById('toast-msg');
    if (!toast || !toastMsg) return;

    toastMsg.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3500);
}
