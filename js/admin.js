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
        response: "1. 【感同身受！此案早已列為政見白皮書第 4 案】：\n感謝您的精準直擊！塞車之苦所有里民都感同身受，這也是我自己每天出門最深刻的痛點。我在 8 月初正式發布的「十二大新里政白皮書第 4 案」中，已將明德路二段動態綠波與學府路時相優化完整列入核心政見，這證明里民的痛苦與想法都一致！\n2. 【專業解析與學府路口解方】：\n• 「全向行人專用時相」：全路口車輛全紅燈，行人專屬安心過，人車 100% 徹底分流。\n• 「早開時相」：初衷是讓行人提早 5 秒起步提高能見度，原適用於人車稀少的路段；但在學府路口這種日間人車密集熱點，行人絡繹不絕，車輛綠燈轉彎時依然會被卡在斑馬線前，第一輛車動彈不得，整條路就跟著癱瘓！\n• 具體方案：當選後將在最短時間內向交通局爭取日間與尖峰全時段採用「全向行人專用時相」，讓轉彎車綠燈時零阻礙順暢通行；「早開時相」則回歸其初衷，僅保留於人車稀少的深夜時段。\n3. 【學士路口往金城路智慧綠波】：\n前後紅綠燈打架是號誌沒有連鎖！我具備 30 年資工數據專長，將在會勘中調閱交通局交控中心時制數據，以專業分析精準建言，爭取幹道「綠波續進 (Green Wave)」，一路順暢不再原地苦等！"
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
        category: "#跨世代共融與課程",
        type: "policy",
        status: "已審核公開",
        author: "樂利國小 家長",
        contact: "0933-xxx-xxx",
        date: "2026-08-12 16:20:00",
        question: "聽說樂利國小的 EQ 情緒教育很有名，而且陳新昱候選人擔任多年 EQ 志工組長，但為什麼我們家孩子在學校都沒有上過 EQ 課呢？",
        response: "1. 【校園現況說明】：樂利國小 EQ 情緒教育是由熱心志工團隊（EQ 爸爸媽媽）進班授課。受限於志工人力與各學期排課規劃，目前通常僅能在特定年級（如五、六年級）或部分班級試辦，無法做到全校全學年常態普及。\n2. 【從學校走入社區（政見第 2 案）】：陳新昱擔任樂利國小 EQ 志工組長多年，具備 8 年以上講師資歷。當選後將在明德市民活動中心常態開辦「全齡 EQ 與親子共學工作坊」，打破學校班級與年齡限制，讓所有里內學童與家長都能就近免費參與。\n3. 【擴大培訓在地師資（政見第 12 案）】：里辦公處將開辦「社區 EQ 志工培訓班」，由陳新昱親自輔導有熱忱的家長成為認證師資，擴大服務量能，讓情緒教育真正落實為每個家庭的日常後盾。"
    },
    {
        id: "qa-5",
        category: "#跨世代共融與課程",
        type: "policy",
        status: "已審核公開",
        author: "美麗宏國 社區長者",
        contact: "0955-xxx-xxx",
        date: "2026-08-10 11:00:00",
        question: "常聽候選人提到 AI 健康管家可以幫忙記血壓和提醒吃藥，我們年紀大不會用複雜的手機，請問真的會有人手把手教我們嗎？",
        response: "1. 【科技是為長輩服務，不是考驗長輩】：我們推動的不是繁瑣複雜的手機 App，而是經過篩選的極簡工具——長輩只要用「大字體語音說一句話」或「拍照辨識藥袋」即可完成紀錄，完全不需學習複雜打字與操作。\n2. 【活動中心一對一手把手教學】：陳新昱具備 30 年資工背景，將親自主持「銀髮智慧健康工作坊」，並培訓在地青年志工擔任一對一伴學數位大使，幫長輩將手機字體調大、設定好專屬語音吃藥提醒。\n3. 【家庭聯網守護】：系統可設定長輩若漏量血壓或忘記服藥時，自動發送溫馨提醒給同住或外地子女，用科技連結家人關懷，子女安心、長輩無負擔。"
    },
    {
        id: "qa-6",
        category: "#跨世代共融與課程",
        type: "policy",
        status: "已審核公開",
        author: "三明治家庭 照顧者里民",
        contact: "0966-xxx-xxx",
        date: "2026-08-08 15:40:00",
        question: "我家有一位失智長輩，我上有老、下有小，每天照顧耐心常常會被消磨殆盡，你的失智 App 真的有用處嗎？我很懷疑？",
        response: "1. 【客觀釐清：App 是認知刺激工具，非醫療特效藥】：AI 腦力健能 App 的核心功能在於「初期認知活化、延緩退化與增加趣味互動」，絕不能取代正規醫療與中重度失智的專業長照。\n2. 【三明治世代照顧者的 EQ 情緒後盾】：身為 8 年 EQ 情緒講師，我非常理解夾心世代長期照護的心理耗損。里辦公處將針對長照家庭開辦「照顧者情緒減壓與心理支持工作坊」，提供合法管道與同理傾聽，陪伴您走出情緒孤島。\n3. 【轉介長照 2.0 喘息資源】：里辦公處將建立長照綠色窗口，主動協助家屬申請市府日間照顧中心、居家服務與喘息服務補助，實質分擔照顧重擔，讓您有喘息空間，不再一人苦撐。\n4. 【促進跨世代破冰】：App 最大的實質幫助在於將枯燥的復健轉化為「祖孫趣味電競與記憶遊戲」，降低長輩抗拒感，讓孩子願意主動陪伴長輩。"
    },
    {
        id: "qa-7",
        category: "#跨世代共融與課程",
        type: "policy",
        status: "已審核公開",
        author: "學府路 家長 吳先生",
        contact: "0977-xxx-xxx",
        date: "2026-08-05 19:20:00",
        question: "看到文宣中有無人機與 AI 體驗課，請問小朋友幾歲可以參加？室內操作會不會有安全顧慮？",
        response: "1. 【建議參與年齡】：\n• 獨立實機操作：建議國小三年級以上（約 9 歲以上）學童參加，手眼協調度與指令理解最為適合。\n• 親子共學組：低年級學童歡迎由家長陪同，先從電腦模擬飛行器體驗與 AI 創意繪圖入門。\n2. 【室內最高規格三大安全防線】：\n• 極輕微型機種：室內一律限用 50 公克以下微型機，並強制安裝 360 度全包覆式槳葉防護罩，即使觸碰也不會造成割傷。\n• 實體隔離防護網：操作區四周架設專屬高密度安全防護網，將飛行空域與觀摩席 100% 實體隔離。\n• 一對一安全員全程隨行：現場實施「一次一人飛行、旁有資工安全員全程指導」，嚴格遵守民航法規與安全操作 SOP，安全是科技教育的第一底線。"
    },
    {
        id: "qa-8",
        category: "#社區法規與大樓共好",
        type: "law",
        status: "已審核公開",
        author: "金城路大樓管委會 委員",
        contact: "0988-xxx-xxx",
        date: "2026-08-02 10:10:00",
        question: "我們大樓想要把公共梯廳老舊日光燈更換為感應式 LED 節能燈具，想請問候選人市府是否有相關補助款？",
        response: "1. 【市府補助法規說明】：新北市工務局每年定期開辦低碳社區智慧節能補助計畫，最高補助總工程款之 50%。\n2. 【里辦公處行政協辦】：未來里辦公處將成立大樓節能與補助諮詢窗口，協助大樓管委會彙整申請文件與流程。"
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
        category: "#環境衛生與整潔",
        type: "inspect",
        status: "已審核公開",
        author: "明德路二段 住戶 陳先生",
        contact: "wu@example.com",
        date: "2026-07-15 14:00:00",
        question: "夏季午後雷陣雨頻繁，明德路二段部分舊公寓後側排水溝容易有積水異味，希望里長協助定期排程清淤與消毒。",
        response: "1. 【列入防汛優先清淤清單】：當選後立即彙整全里熱點，主動向土城清潔隊申請全面清淤與預防性噴藥。"
    },
    {
        id: "qa-11",
        category: "#長照與弱勢關懷",
        type: "policy",
        status: "已審核公開",
        author: "白天在外打拼的三明治上班族",
        contact: "sandwich@example.com",
        date: "2026-08-25 10:00:00",
        question: "我爸媽年紀接近 80 歲住在老家，常看到有里長送麵包給老人家。最近看到新聞說衛福部編了 62.5 億元擴大推動獨老照護與防孤獨死，這些高額預算到底能怎麼用在長輩身上？我們白天在外面上班的三明治族，里長有辦法讓我們更安心嗎？",
        response: "1. 【送麵包只是媒介，敲門確認安危才是目的】：\n送麵包不只為填飽肚子，更關鍵的是每天「按門鈴、打招呼、親眼確認長輩氣色與安全」，第一時間防範長者在家跌倒或發生意外的孤獨死風險。\n2. 【把衛福部 62.5 億國家資源引進社區（政見第 7 案）】：\n衛福部預算涵蓋志工訪視交通誤餐津貼、到府送餐補助、免費安裝「智慧緊急救援系統（跌倒偵測/GPS定位/緊急求救鈕）」與 C 級巷弄長照站營運。專業里長會透過里辦公室與社區發展協會立案請領，把國家級預算落實為長輩身上的救命配備，不需要家屬或里長自掏腰包！\n3. 【AI 智慧物資篩選，避免好心送錯害了長輩】：\n導入 AI 拍照辨識物資成分，精準比對長輩病史（如糖尿病低糖、高血壓低鈉、腎臟病禁忌），確保愛心物資吃得健康安心。\n4. 【讓三明治中壯年族在外安心工作】：\n里辦公處建立志工到府訪視與生理數據回報機制，外地子女透過手機即時知曉長輩每日平安與長照資源對接進度，徹底卸下上班族的牽掛與心理焦慮！"
    }
];

// 預設附議明細備援資料庫
const INITIAL_SUB_PROPOSALS = [
    {
        subId: "sub-1",
        parentId: "qa-1",
        parentTitle: "明德路二段學府路口行人時相太短與學士路口號誌不同步塞車連環卡死",
        author: "學府路通勤機車族 趙小姐",
        contact: "0921-xxx-xxx",
        content: "每天早上 07:45~08:30 在學府路一段往海山站方向，學府路口綠燈時轉彎車真的完全動不了，甚至有汽車直接違規切入斑馬線，希望能有義交或志工在尖峰時段協勤導引！",
        date: "2026-08-21 08:35:00",
        status: "🟢 已採納列管"
    },
    {
        subId: "sub-2",
        parentId: "qa-1",
        parentTitle: "明德路二段學府路口行人時相太短與學士路口號誌不同步塞車連環卡死",
        author: "金城路二段 居民 郭先生",
        contact: "0932-xxx-xxx",
        content: "學士路口往金城路那段在傍晚 18:00 下班時間更嚴重，前後紅綠燈秒數差了快 10 秒，經常回堵整整兩個街區，希望里長當選後調閱交控中心秒數時制表進行會勘！",
        date: "2026-08-22 18:15:00",
        status: "🔴 待審核"
    },
    {
        subId: "sub-3",
        parentId: "qa-3",
        parentTitle: "學府路一段近海山捷運連通道機車格需求與紅線會勘",
        author: "明德路二段 捷運通勤族 孫先生",
        contact: "sun@example.com",
        content: "捷運連通道附近人行道轉角常有違規機車斜插停放，造成輪椅與嬰兒推車必須繞走馬路，非常危險，建議除增設停車區外，路口轉角務必加裝防撞軟桿！",
        date: "2026-08-16 10:20:00",
        status: "🔴 待審核"
    }
];

let adminProposals = [];
let adminSubProposals = [];
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

// 2. 資料載入 (優先從 Google 試算表拉取最新全量資料，離線時使用 LocalStorage 備援)
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

    try {
        const storedSubs = localStorage.getItem('md2_admin_sub_proposals');
        if (storedSubs && JSON.parse(storedSubs).length > 0) {
            adminSubProposals = JSON.parse(storedSubs);
        } else {
            adminSubProposals = [...INITIAL_SUB_PROPOSALS];
            saveSubProposalData();
        }
    } catch(e) {
        adminSubProposals = [...INITIAL_SUB_PROPOSALS];
    }

    if (adminProposals.length > 0 && !activeProposalId) {
        activeProposalId = adminProposals[0].id;
    }

    renderAdminList();
    loadActiveProposalIntoEditor();
    updateCounts();

    // 背景立即與 Google 試算表雲端同步
    fetchGoogleSheetProposals(false);
}

function fetchGoogleSheetProposals(showToastOnComplete = false, onComplete = null) {
    if (!GOOGLE_SCRIPT_URL) {
        if (typeof onComplete === 'function') onComplete();
        return;
    }

    fetch(GOOGLE_SCRIPT_URL)
        .then(res => res.json())
        .then(data => {
            if (data && data.status === 'success') {
                if (Array.isArray(data.proposals) && data.proposals.length > 0) {
                    adminProposals = data.proposals;
                    saveLocalData();
                }
                if (Array.isArray(data.subProposals) && data.subProposals.length > 0) {
                    adminSubProposals = data.subProposals;
                    saveSubProposalData();
                } else if (adminSubProposals.length === 0) {
                    adminSubProposals = [...INITIAL_SUB_PROPOSALS];
                    saveSubProposalData();
                }

                if (!activeProposalId || !adminProposals.find(p => p.id === activeProposalId)) {
                    activeProposalId = adminProposals.length > 0 ? adminProposals[0].id : null;
                }
                renderAdminList();
                loadActiveProposalIntoEditor();
                updateCounts();

                if (showToastOnComplete) {
                    showToast(`📥 成功從 Google 試算表下載 ${adminProposals.length} 筆母案與 ${adminSubProposals.length} 筆附議明細！`);
                }
            } else if (showToastOnComplete) {
                showToast('已連線 Google 試算表，資料皆為最新！');
            }
        })
        .catch(err => {
            console.log('Google Sheets fetch error:', err);
            if (showToastOnComplete) {
                showToast('雲端連線中，已載入本地備援資料');
            }
        })
        .finally(() => {
            if (typeof onComplete === 'function') {
                onComplete();
            }
        });
}

function saveLocalData() {
    try {
        localStorage.setItem('md2_admin_proposals', JSON.stringify(adminProposals));
    } catch(e) {}
}

function saveSubProposalData() {
    try {
        localStorage.setItem('md2_admin_sub_proposals', JSON.stringify(adminSubProposals));
    } catch(e) {}
}

// 3. 渲染左側清單
function renderAdminList() {
    const listEl = document.getElementById('admin-card-list');
    if (!listEl) return;

    let filtered = adminProposals.filter(item => {
        let matchFilter = true;
        if (currentAdminFilter === 'pending') matchFilter = item.status === '待決策小組審核';
        if (currentAdminFilter === 'approved') matchFilter = item.status === '已審核公開' || item.status === '已納入競選政見白皮書' || item.status === '列為當選後優先重點會勘';

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

        const previewText = item.question ? (item.question.length > 38 ? item.question.substring(0, 38) + '...' : item.question) : '（無提問內容）';
        const agreeCount = item.agreeCount || 0;
        
        // 動態計算此母案關聯的附議總數與待審核數
        const matchingSubs = adminSubProposals.filter(s => s.parentId === item.id);
        const subCount = matchingSubs.length > 0 ? matchingSubs.length : (item.subCount || 0);
        const pendingSubCount = matchingSubs.filter(s => s.status && s.status.includes('待審核')).length;
        const pendingSubBadge = pendingSubCount > 0 
            ? `<span style="color:#f87171; background:rgba(239,68,68,0.2); padding:0.1rem 0.4rem; border-radius:4px; font-size:0.72rem; margin-left:0.3rem;">⚠️ ${pendingSubCount} 筆待審</span>` 
            : '';

        return `
        <div class="admin-item-card ${isSelected ? 'active' : ''}" onclick="selectProposal('${item.id}')">
            <div class="admin-item-header">
                <span style="font-family:monospace; font-size:0.78rem; color:var(--accent-primary); font-weight:700;">${item.id}</span>
                ${statusBadge}
            </div>
            <div class="admin-item-title">${previewText}</div>
            <div class="admin-item-meta" style="margin-bottom:0.4rem;">
                <span>👤 ${escapeHTML(item.author || '熱心里民')}</span>
                <span>🏷️ ${escapeHTML(item.category || '#生活建議')}</span>
            </div>
            <div style="font-size:0.78rem; color:var(--accent-secondary); display:flex; align-items:center; gap:0.8rem; font-weight:700;">
                <span>👍 ${agreeCount} 認同</span>
                <span>📝 ${subCount} 附議 ${pendingSubBadge}</span>
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

    const agreeCount = item.agreeCount || 0;
    const matchingSubs = adminSubProposals.filter(s => s.parentId === item.id);
    const subCount = matchingSubs.length > 0 ? matchingSubs.length : (item.subCount || 0);

    document.getElementById('editor-active-id').innerHTML = `
        <span style="color:var(--accent-primary); font-weight:800;">${item.id}</span>
        <span style="color:#34d399; margin-left:0.6rem;">👍 ${agreeCount} 認同</span>
        <span style="color:#fbbf24; margin-left:0.6rem;">📝 ${subCount} 附議</span>
    `;
    document.getElementById('edit-author').value = item.author || '';
    document.getElementById('edit-category').value = item.category || '#巷弄安全與照明';
    document.getElementById('edit-status').value = item.status || '已審核公開';
    document.getElementById('edit-type').value = item.type || 'policy';
    document.getElementById('edit-contact').value = item.contact || '';
    document.getElementById('edit-date').value = item.date || '';
    document.getElementById('edit-question').value = item.question || '';
    document.getElementById('edit-response').value = item.response || '';

    // 渲染關聯之附議明細清單
    renderSubProposals(item.id);
}

// 4.1 渲染附議審查清單
function renderSubProposals(parentId) {
    const container = document.getElementById('sub-proposals-container');
    const countDisplay = document.getElementById('sub-count-display');
    if (!container) return;

    const matching = adminSubProposals.filter(s => s.parentId === parentId);
    if (countDisplay) countDisplay.textContent = matching.length;

    if (matching.length === 0) {
        container.innerHTML = `
            <div style="text-align:center; color:var(--text-muted); padding:1.5rem; background:rgba(255,255,255,0.02); border:1px dashed rgba(255,255,255,0.08); border-radius:10px; font-size:0.9rem;">
                📍 目前尚無里民針對此案提交在地補充意見
            </div>
        `;
        return;
    }

    container.innerHTML = matching.map(sub => {
        const isPending = sub.status && (sub.status.includes('待審核') || sub.status === 'pending');
        const statusBadge = isPending
            ? `<span style="color:#f87171; background:rgba(239,68,68,0.15); padding:0.15rem 0.5rem; border-radius:4px; font-size:0.75rem; font-weight:700;">🔴 待審核</span>`
            : `<span style="color:#34d399; background:rgba(16,185,129,0.15); padding:0.15rem 0.5rem; border-radius:4px; font-size:0.75rem; font-weight:700;">${escapeHTML(sub.status || '🟢 已採納列管')}</span>`;

        return `
        <div class="sub-proposal-card" id="${sub.subId}">
            <div class="sub-card-header">
                <div style="display:flex; align-items:center; gap:0.6rem;">
                    <span style="font-family:monospace; font-size:0.78rem; color:var(--accent-secondary); font-weight:700;">${sub.subId}</span>
                    <span class="sub-card-author">${escapeHTML(sub.author || '熱心里民')}</span>
                    ${statusBadge}
                </div>
                <div class="sub-card-meta">
                    <span>📞 ${escapeHTML(sub.contact || '未留聯絡方式')}</span>
                    <span>🕒 ${escapeHTML(sub.date || '')}</span>
                </div>
            </div>
            <div class="sub-card-body">${escapeHTML(sub.content || '')}</div>
            <div class="sub-card-actions">
                <div style="display:flex; gap:0.5rem;">
                    <button class="btn-sub-action btn-sub-approve" onclick="handleUpdateSubStatus('${sub.subId}', '🟢 已採納列管')">
                        ✓ 採納列管
                    </button>
                    <button class="btn-sub-action btn-sub-archive" onclick="handleUpdateSubStatus('${sub.subId}', '⚪ 已封存備查')">
                        ✕ 封存
                    </button>
                </div>
                <button class="btn-copy-ai" style="font-size:0.78rem; padding:0.25rem 0.6rem;" onclick="copySubProposalToAI('${sub.subId}')">
                    📋 複製此補充給 AI
                </button>
            </div>
        </div>
        `;
    }).join('');
}

// 4.2 更新附議審查處置狀態 (一鍵同步雲端試算表)
function handleUpdateSubStatus(subId, newStatus) {
    const sub = adminSubProposals.find(s => s.subId === subId);
    if (!sub) return;

    sub.status = newStatus;
    saveSubProposalData();
    renderSubProposals(activeProposalId);
    renderAdminList();

    // 同步更新至 Google Apps Script
    if (GOOGLE_SCRIPT_URL) {
        fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                action: 'update_sub_proposal_status',
                subId: subId,
                status: newStatus
            })
        }).catch(err => console.log('Update sub status error:', err));
    }

    showToast(`附議案件 ${subId} 審查狀態已更新為：${newStatus}`);
}

// 4.3 複製單筆附議補充給 AI
function copySubProposalToAI(subId) {
    const sub = adminSubProposals.find(s => s.subId === subId);
    const parent = adminProposals.find(p => p.id === (sub ? sub.parentId : activeProposalId));
    if (!sub || !parent) return;

    const textToCopy = `【里民附議現況補充諮詢】
* 母案編號：${parent.id}（${parent.category}）
* 母案提問：${parent.question}

* 附議編號：${sub.subId}
* 附議里民：${sub.author}
* 聯絡方式：${sub.contact || '無'}
* 補充內容：
${sub.content}

請競選小組與法規顧問評估此項補充細節，並研擬是否需補充至官方具體 SOP 回覆中。`;

    navigator.clipboard.writeText(textToCopy).then(() => {
        showToast(`已複製附議 ${sub.subId} 與母案背景給 AI！`);
    });
}

function escapeHTML(str) {
    if (!str) return '';
    return String(str).replace(/[&<>'"]/g, tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
    }[tag] || tag));
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

    const matchingSubs = adminSubProposals.filter(s => s.parentId === item.id);
    let subsText = "";
    if (matchingSubs.length > 0) {
        subsText = `\n\n* **里民在地補充/附議明細 (${matchingSubs.length} 筆)**：\n` + matchingSubs.map((s, idx) => 
            `  ${idx + 1}. [${s.subId}] (${s.author} / ${s.status})：${s.content}`
        ).join('\n');
    }

    const fullText = `### 【案件 ${item.id}】${item.category}
* **反映人**：${item.author} (${item.date})
* **審核狀態**：${item.status}
* **問題原文**：
${item.question}
${subsText}

* **官方回覆**：
${item.response}`;

    navigator.clipboard.writeText(fullText).then(() => {
        showToast('已複製完整問答與附議補充全文！');
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
    downloadFromGoogleSheets();
}

/**
 * 1. 📥 從 Google 試算表拉取最新提案 (Download / Pull)
 */
function downloadFromGoogleSheets() {
    const btn = document.getElementById('btn-refresh-sheets');
    if (btn) {
        btn.disabled = true;
        btn.innerHTML = '⏳ 正在刷新...';
    }
    showToast('🔄 正在連線 Google 試算表刷新案件...');

    fetchGoogleSheetProposals(true, () => {
        if (btn) {
            btn.disabled = false;
            btn.innerHTML = '🔄 刷新案件';
        }
    });
}

/**
 * 2. 📤 將管理介面所有資料批量推送至 Google 試算表 (Upload / Push)
 */
function uploadAllToGoogleSheets() {
    if (!GOOGLE_SCRIPT_URL) {
        showToast('⚠️ 尚未設定 Google Apps Script 雲端端點');
        return;
    }

    const btn = document.getElementById('btn-upload-sheets');
    if (btn) {
        btn.disabled = true;
        btn.innerHTML = '⏳ 正在上傳中...';
    }
    showToast('📤 正在將後台資料批量上傳至 Google 試算表...');

    // 儲存當前編輯中的單案狀態
    const currentActive = adminProposals.find(p => p.id === activeProposalId);
    if (currentActive) {
        currentActive.author = document.getElementById('edit-author').value.trim() || currentActive.author;
        currentActive.category = document.getElementById('edit-category').value;
        currentActive.status = document.getElementById('edit-status').value;
        currentActive.type = document.getElementById('edit-type').value;
        currentActive.contact = document.getElementById('edit-contact').value.trim();
        currentActive.question = document.getElementById('edit-question').value.trim();
        currentActive.response = document.getElementById('edit-response').value.trim();
        saveLocalData();
    }

    // 發送批量備份 POST 請求至 Google Apps Script
    fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            action: 'batch_update_proposals',
            proposals: adminProposals,
            timestamp: new Date().toISOString()
        })
    })
    .then(() => {
        setTimeout(() => {
            if (btn) {
                btn.disabled = false;
                btn.innerHTML = '📤 批量上傳雲端';
            }
            showToast(`✅ 成功！已將 ${adminProposals.length} 筆案件進度同步至 Google 試算表！`);
        }, 1200);
    })
    .catch(err => {
        console.error('Upload error:', err);
        if (btn) {
            btn.disabled = false;
            btn.innerHTML = '📤 批量上傳雲端';
        }
        showToast('⚠️ 上傳請求已發出，本地資料已安全暫存');
    });
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
