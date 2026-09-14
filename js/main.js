// ==========================================================================
// 參與式政見「我想要」基底票數與投票狀態
// ==========================================================================
const POLICY_BASE_VOTES = {
    1: 82,   // 原 13 銀髮共餐
    2: 64,   // 原 05 數位里政
    3: 92,   // 原 01 草地音樂節
    4: 52,   // 原 06 傳統課程升級
    5: 88,   // 原 04 智慧交通
    6: 85,   // 原 03 無人機/AI
    7: 76,   // 原 14 友善步道
    8: 56,   // 原 10 鄰里和諧
    9: 38,   // 原 12 斜槓導師
    10: 95,  // 原 07 AI健康管家
    11: 78,  // 原 02 EQ教育
    12: 45,  // 原 09 活動中心
    13: 68,  // 原 08 預防失智
    14: 72,  // 原 11 幸福寵物
    15: 75   // 計畫 15 食用廢油變黃金
};
let liveCloudPolicyVotes = {};
try {
    const cachedVotes = localStorage.getItem('md2_cloud_policy_votes');
    if (cachedVotes) liveCloudPolicyVotes = JSON.parse(cachedVotes);
} catch (e) {}
const VOTE_COOLDOWN_MS = 60 * 60 * 1000; // 1 小時防刷冷卻
let pendingVotePolicyId = null;

const POLICIES_DATA = [
    {
        id: 1,
        title: "民歌Live草地音樂節",
        subtitle: "邀請歌手吉他彈唱互動，春秋兩季相約活動中心草地野餐，用音樂找回與鄰居的連結",
        image: "images/policy_01_music.png",
        budgetSource: "文化局社造專案（5~20萬）",
        budgetSub: "<span class=\"hl-keyword\">完全不會用到</span>明德里 88 萬基層款",
        budgetDesc: "",
        highlight: "現場吉他彈唱互動、散步就能抵達！每年春、秋兩季定期各辦 1 次，善用市民活動中心旁公園草地，串聯街頭民歌手、獨立樂手與學生社團，打造有歌聲、有笑聲的草地音樂生活節。",
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>`,
        hooks: [
            { question: "各位是否懷念早期民歌時代，<span class=\"hl-keyword\">一把吉他、一片草地、一張野餐墊</span>，就可以拉近人與人之間的距離呢？", answer: "" },
            { question: "假日想帶長輩小孩散步放鬆，<span class=\"hl-keyword\">為什麼非得塞車跑去大安森林公園？</span>", answer: "" }
        ],
        howToDo: [
            "固定於<span class=\"hl-keyword\">每年春、秋兩季假日試辦</span>，下樓散步就能倘佯在草地音樂的懷抱，反應熱烈則會加辦場次。"
        ],
        whyPossible: "候選人擁有 <span class=\"hl-keyword\">20 年流行音樂產業背景</span>，有人脈，<span class=\"hl-keyword\">懂得如何申請經費</span>。"
    },
    {
        id: 2,
        title: "里民手機共治 ＋ 社區平行微活動",
        subtitle: "首創「社區平行微活動」善用每個社區的公設，下樓就能參加，活動瞬間加倍，你來點、我來辦",
        image: "images/policy_02_clubhouse_stem.jpg",
        sectionOrder: "innovation-first",
        budgetSource: "我自己開發「里民作主」App",
        budgetSub: "<span class=\"hl-keyword\">完全不會用到</span>明德里 88 萬基層款",
        budgetDesc: "不用爭奪活動中心，同時間多社區平行舉辦，微型活動，人數少也有機會成班",
        highlight: "首創「社區平行微活動」！善用明德里 20 個大型社區公設，下樓就能參加，活動瞬間加倍，不用爭奪活動中心，手機作主你來點、我來辦！",
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>`,
        hookTitle: "創新",
        hooks: [
            "<span class=\"hl-keyword\">試想你下樓就可以參加你想要的活動...</span><br>我們明德里是由 20 個大型社區所組成，我會主動與各管委會討論善用公設空間給住戶使用，<span class=\"hl-keyword\">社區出場地，我來出活動</span>，活動加倍，里民、長輩更便捷！"
        ],
        howToDo: [
            "<span class=\"hl-keyword\">想要什麼活動、你做主</span>，手機簡單提案，隨時可報名，熱門先辦，告別一言堂的黑箱蚊子活動！"
        ],
        whyPossible: "<span class=\"hl-keyword\">你點得出，我就辦得出</span>，我曾舉辦過直排輪、桌球、學生與長輩無人機入門、EQ親子營、手機 AI 短劇製作、長輩血壓AI管理、AI 家教與AI程式開發...等<span class=\"hl-keyword\">十餘種體驗營經驗</span>，<span class=\"hl-keyword\">我知道哪裡有經費，我會寫企劃案</span>，因此我做得到！"
    },
    {
        id: 3,
        category: "democracy",
        categoryName: "人本交通與通學安全",
        title: "防滑走廊 ＋ 友善步道 ＋ 通學安全",
        subtitle: "明德里為捷運通勤與校園通學必經動線，部分騎樓防滑係數不足，爭取市府全額整平！",
        image: "images/policy_04_safety_2_wide.png",
        budgetSource: "工務局<span class=\"hl-keyword\">騎樓整平</span>計畫 ＋ <span class=\"hl-keyword\">人本交通</span>專案款",
        budgetSub: "<span class=\"hl-keyword\">完全不會用到</span>明德里 88 萬基層款",
        budgetDesc: "主動彙整里民人行<span class=\"hl-keyword\">危險點資料庫</span>，召開跨局會勘爭取<span class=\"hl-keyword\">市府專案款</span>改善鋪面",
        highlight: "聚焦明德里捷運通勤與學童通學核心動線！試行高摩擦防滑速解雨天濕滑，主動對接工務局騎樓整平專案爭取市府全額鋪設，守護長青、推車與學童步步安心！",
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 4v16M17 8l-4-4-4 4M7 20h10"></path><circle cx="12" cy="4" r="2"></circle></svg>`,
        hooks: [
            "明德里周邊主要社區騎樓，是<span class=\"hl-keyword\">學童上學</span>、<span class=\"hl-keyword\">上班族</span>前往捷運與<span class=\"hl-keyword\">居民採買</span>的必經重要動線；然而部分路段地面<span class=\"hl-keyword\">防滑係數不足</span>、遇雨濕滑，仍有極大改善空間，雨天老人小孩行走令人提心吊膽！"
        ],
        howToDo: [
            "【近期】：針對人流密集的<span class=\"hl-keyword\">通學</span>與<span class=\"hl-keyword\">捷運</span>必經動線，花費極少經費試行<span class=\"hl-keyword\">高摩擦防滑塗料</span>，快速提升防滑係數，雨天立即見效。",
            "【中期】：主動對接工務局<span class=\"hl-keyword\">騎樓整平計畫</span>與<span class=\"hl-keyword\">人本交通專款</span>，跨社區聯合提報會勘，爭取市府出資整平並換裝防滑鋪面！",
            "【長期】：我開發「<span class=\"hl-keyword\">一鍵通報</span>」App，便利通報<span class=\"hl-keyword\">地磚破損</span>、<span class=\"hl-keyword\">燈號故障</span>、<span class=\"hl-keyword\">危險路段</span>與<span class=\"hl-keyword\">監控盲區</span>等狀況；守護里民通行安全，更替沿線管委會消除法律賠償風險。"
        ],
        whyPossible: "我<span class=\"hl-keyword\">懂法規、善協調、深諳公門運作</span>，擁有 10 年管委會實戰經驗；曾於 403 地震研究法規，<span class=\"hl-keyword\">成功協調權責機關跨局處施工</span>，<span class=\"hl-keyword\">搶通三不管</span>重要便道下陷的行人安全問題。"
    },
    {
        id: 4,
        category: "democracy",
        categoryName: "人本交通與智慧安防",
        title: "智慧交通號誌 ＋ 解決塞車問題",
        subtitle: "海山、學府、學士路口紅綠燈不同步，爭取動態綠波與行人專用時相，告別塞車！",
        image: "images/policy_04_traffic.png",
        budgetSource: "交通局交控專案 ＋ 行人友善改善計畫",
        budgetSub: "<span class=\"hl-keyword\">完全不會用到</span>明德里 88 萬基層款",
        budgetDesc: "",
        highlight: "聚焦海山路、學府路、學士路到金城路塞車痛點！爭取學府明德與海山明德路口白天行人專用時相，運用資工專長向交通局爭取全廊道動態綠波，直行綠燈同步，告別塞車！",
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"></polygon><line x1="9" y1="3" x2="9" y2="18"></line><line x1="15" y1="6" x2="15" y2="21"></line></svg>`,
        hooks: [
            "你是否被<span class=\"hl-keyword\">海山、學府、學士到金城路口</span>，<span class=\"hl-keyword\">塞車塞到懷疑人生</span>？<span class=\"hl-keyword\">直行綠燈不同步</span>、轉彎車因<span class=\"hl-keyword\">人車爭道</span>卡死在斑馬線，一個綠燈只能過一兩台車，每天下班回家的路漫長又痛苦，明德里值得更好的智慧交通！"
        ],
        howToDo: [
            "推動學府明德路口與海山明德路口白天<span class=\"hl-keyword\">「行人專用號誌」</span>，徹底人車分流，根除轉彎車卡死動線的塞車主因！",
            "用<span class=\"hl-keyword\">「全廊道動態綠波」</span>，同步直行綠燈暢通，不再走走停停！"
        ],
        whyPossible: "運用我<span class=\"hl-keyword\">資工專長</span>，以車流數據向交通局爭取會勘，<span class=\"hl-keyword\">精準解讀車流流量與號誌週期邏輯</span>；在市府交通會勘中，直接拿出<span class=\"hl-keyword\">科學數據</span>與交通局交控中心專業對話，為明德里爭取最有感、最順暢的交通升級！"
    },
    {
        id: 5,
        category: "education",
        categoryName: "生活美學與未來教育",
        title: "無人機飛行 ＋ 實戰 AI 體驗營",
        subtitle: "每學期寒暑假定期開辦，自備微型防護設備，長輩小孩都能親手操控的前瞻科技啟蒙！",
        image: "images/policy_03_tech.png",
        budgetSource: "青年科普培育專案 ＋ 區公所文康專款",
        budgetSub: "<span class=\"hl-keyword\">完全不會用到</span>明德里 88 萬基層款",
        budgetDesc: "我運用 30 年科技背景自帶微型安全設備與志工團隊，對接青年科普專案補助，里民免費體驗。",
        highlight: "每學期寒暑假定期開辦！為里內家庭提供安全的無人機與 AI 體驗課。無人機是未來趨勢，大人、小孩到長輩都適合學習，全面提升手腦協調與科技視野。",
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>`,
        hooks: [
            "AI 與無人機時代全面來臨，孩子只能在手機螢幕上看別人玩？外面昂貴的科技夏令營動輒數萬元，基層家庭負擔沉重。<span class=\"hl-keyword\">我自備合格設備與安全防護網</span>，讓里內孩子與長輩在社區就能親手操控、啟發前瞻視野！"
        ],
        howToDo: [
            "【室內微型安全飛行營】：每學期寒暑假定期開辦，設置<span class=\"hl-keyword\">專屬保護網與 50g 以下微型機</span>，由合格安全員一對一引導，安全零風險。",
            "【學童手機 AI 錯題本工作坊】：指導學童運用手機 AI 拍照整理專屬錯題本，<span class=\"hl-keyword\">拆解學業盲點、建立主動學習習慣</span>。",
            "【長青 AI 老照片修復】：手把手教長輩用手機修復家族老照片與生成藝術照，<span class=\"hl-keyword\">用趣味科技溫暖拉近跨世代距離</span>。"
        ],
        whyPossible: "我具備 <span class=\"hl-keyword\">30 年資工與科技管理實務</span>，熟諳無人機飛控與 AI 工具，能凝聚科技青年志工團隊，自帶設備並成功申請科普專案補助，<span class=\"hl-keyword\">把頂尖科技資源無償帶進明德里</span>！"
    },
    {
        id: 6,
        category: "governance",
        categoryName: "專業治理與精準服務",
        title: "AI健康管家 ＋ 獨居長輩暖心守護",
        subtitle: "對接衛福部 62.5 億獨老專案，一塊麵包到府探視確認安危，建立公費緊急防跌救護網！",
        image: "images/policy_07_health.png",
        budgetSource: "衛福部獨老安居專案 ＋ 長照 2.0 專款",
        budgetSub: "<span class=\"hl-keyword\">完全不會用到</span>明德里 88 萬基層款",
        budgetDesc: "直接對接中央「擴大獨老在宅安居計畫」，協助申請公費緊急救援防跌系統，中央全額補助。",
        highlight: "開設實用 AI 健康工作坊，對接衛福部 62.5 億獨老安危專案，導入主動式福利媒合、物資智慧適配與居家緊急防跌，讓三明治世代安心工作。",
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>`,
        hooks: [
            "子女在外打拼，最牽掛家中長輩的突發安危與跌倒風險。許多長輩省吃儉用不願麻煩子女，政府每年編列超過 60 億照顧專款卻因公文繁瑣鮮為人知。<span class=\"hl-keyword\">我主張以最溫暖的方式走進長輩生活</span>，用科技與制度替全家守住平安！"
        ],
        howToDo: [
            "【送餐敲門確認安危】：以新鮮物資與送餐為媒介，志工按門鈴親自交付，<span class=\"hl-keyword\">第一時間掌握長者起居與防跌安危</span>。",
            "【主動式福利導航與公費防跌】：建立里民一站式福利綠色窗口，主動協助申請每月<span class=\"hl-keyword\">身障生活補助（約 4,049 元）</span>與衛福部公費<span class=\"hl-keyword\">「智慧緊急救援防跌系統」</span>，公文一次辦到位！",
            "【長輩手機 AI 拍照健康紀錄】：手把手指導長輩用手機拍照紀錄藥袋與血壓趨勢，<span class=\"hl-keyword\">雲端同步讓外地子女隨時安心掌握</span>。"
        ],
        whyPossible: "我擁有 <span class=\"hl-keyword\">30 年資工背景</span>與 <span class=\"hl-keyword\">10 年社區治理實務</span>，深諳政府社福、衛政補助法規與公文流程；<span class=\"hl-keyword\">我懂如何打破官僚障礙</span>，將國家級長照專款精準轉化為明德里長輩的居家守護盾。"
    },
    {
        id: 7,
        category: "governance",
        categoryName: "專業治理與長照支持",
        title: "自研健腦 App ＋ 預防失智樂齡體驗",
        subtitle: "自研大字體健腦遊戲活化大腦刺激，主動對接長照喘息補助，做三明治世代最強後盾！",
        image: "images/policy_08_brain.png",
        budgetSource: "失智友善社區專案 ＋ 長者健康促進補助",
        budgetSub: "<span class=\"hl-keyword\">完全不會用到</span>明德里 88 萬基層款",
        budgetDesc: "結合失智友善專案引進健腦教具，由候選人自研無廣告健腦 App，專案全額補助，零公款支出。",
        highlight: "引進臨床 AI 腦力健能遊戲延緩退化，主動協助阿茲海默與失智長輩對接身障生活補助與長照 2.0 喘息資源，做三明治世代最堅實的後盾。",
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-2.04z"></path><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-2.04z"></path></svg>`,
        hooks: [
            "長輩常常忘東忘西，卻非常排斥去醫院做冰冷的認知測驗；家中有退化跡象的長輩，三明治世代往往獨自承受龐大照顧壓力。<span class=\"hl-keyword\">我希望用充滿歡笑的趣味遊戲取代嚴肅的醫療檢測</span>，讓長輩開開心心動腦防退化！"
        ],
        howToDo: [
            "【樂齡 AI 大腦健能體驗角】：引進大螢幕平板與我自研的<span class=\"hl-keyword\">「1 至 50 數字尋寶」</span>等大字體趣味手腦遊戲，長輩在歡笑中活化大腦神經。",
            "【主動式長照喘息綠色窗口】：主動協助疑似或確診長輩申請<span class=\"hl-keyword\">長照 2.0 喘息服務</span>與日間照顧，引進政府公費照顧人力，讓子女安心喘息。",
            "【照顧者 EQ 心理支持工作坊】：開辦長照家庭照顧者心理支持工作坊，<span class=\"hl-keyword\">陪伴三明治世代走出照顧焦慮與疲憊</span>。"
        ],
        whyPossible: "我具備 <span class=\"hl-keyword\">8 年 EQ 講師</span>與 <span class=\"hl-keyword\">30 年軟體開發經驗</span>，能親自研發適合長輩操作的無廣告健腦系統；深知長照家庭痛點，<span class=\"hl-keyword\">懂得如何導入失智友善專款</span>，為社區建立溫暖後盾。"
    },
    {
        id: 8,
        category: "governance",
        categoryName: "健康樂齡與活力共融",
        title: "銀髮共餐 ＋ 全民灶咖跨世代同樂",
        subtitle: "餐前趣味動腦尋寶，鄰里一人一菜週末共享廚房，青銀共煮告別枯燥看電視！",
        image: "images/policy_13_dining.png?v=20260830_2",
        budgetSource: "社會局銀髮共餐專案 ＋ 志願服務專款",
        budgetSub: "<span class=\"hl-keyword\">完全不會用到</span>明德里 88 萬基層款",
        budgetDesc: "食材由社會局專款專用核銷；動腦教材與志工四大保障由專案支應，完全不排擠里內修繕款。",
        highlight: "打破吃飯看電視的傳統模式！餐前引進大螢幕與趣味手腦尋寶遊戲，結合「全民灶咖一人一菜」青銀共煮共聚，打造溫暖跨世代共餐！",
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>`,
        hooks: [
            "傳統老人共餐常常「大家排隊領便當、坐著看電視、吃完就解散」，缺少真正的交流互動。共餐不該只是填飽肚子，更可以是鄰里情感的發酵所！<span class=\"hl-keyword\">我希望結合動腦遊戲與一人一菜</span>，讓長輩帶著笑容來、帶著朋友回家。"
        ],
        howToDo: [
            "【餐前動腦趣味尋寶】：導入大螢幕觸控與手腦健能遊戲，長輩邊吃邊動腦、打卡闖關，<span class=\"hl-keyword\">徹底告別枯燥甩手操與坐著看電視</span>。",
            "【全民灶咖一人一菜共聚】：開辦週末共享廚房，鼓勵年輕家庭與長輩<span class=\"hl-keyword\">「一人出一道拿手菜（Potluck）」</span>，促進青銀世代熱絡交流。",
            "【青年志工四大法定保障】：嚴格落實《志願服務法》，提供青年志工<span class=\"hl-keyword\">意外險、服務學習時數與誤餐補助</span>，建立制度化熱情服務團隊。"
        ],
        whyPossible: "我具備 <span class=\"hl-keyword\">30 年軟體研發經驗自製互動遊戲</span>，並有 <span class=\"hl-keyword\">8 年志工團隊帶領實務</span>；我熟悉社會局專案核銷規範，<span class=\"hl-keyword\">懂得在零公款負擔下把共餐辦得有尊嚴、有笑聲</span>。"
    },
    {
        id: 9,
        category: "governance",
        categoryName: "專業治理與精準服務",
        title: "管委會法律諮詢 ＋ 鄰里和諧溝通平台",
        subtitle: "10 年管委會主委實務，顧問律師公益諮詢，理性調解漏水、噪音與規約糾紛！",
        image: "images/policy_10_harmony.png",
        budgetSource: "競選顧問律師群 ＋ 調解志工公益支援",
        budgetSub: "<span class=\"hl-keyword\">完全不會用到</span>明德里 88 萬基層款",
        budgetDesc: "由競選團隊顧問律師與 10 年管委會實務志工公益服務，零公帑支出，以法理情守護居住權益。",
        highlight: "引進法律與社區調解志工，提供鄰里噪音、騎樓占用、管道漏水與社區規約之理性溝通諮詢窗口。",
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg>`,
        hooks: [
            "樓上深夜噪音、管道漏水求償無門，找里長只能「和稀泥」或勸你忍耐；遇到惡鄰濫訴或管委會糾紛，動輒數萬元的律師費讓善良住戶求助無門。明德里由 20 個大型社區組成，<span class=\"hl-keyword\">我們需要懂法規、有魄力的里長做公正靠山</span>！"
        ],
        howToDo: [
            "【管委會規約與相鄰關係諮詢】：定期設立法律諮詢窗口，<span class=\"hl-keyword\">協助住戶與管委會釐清《公寓大廈管理條例》</span>與漏水權責。",
            "【中立第三方調解平台】：針對噪音、停車位與公設爭議，<span class=\"hl-keyword\">依官方標準檢測途徑提供客觀調解</span>，避免鄰里對簿公堂。",
            "【防濫訴規約實務推廣】：分享主委任內推動<span class=\"hl-keyword\">「防濫訴規約獲法院勝訴確定」</span>之實戰經驗，以制度守護熱心幹部與善良鄰里。"
        ],
        whyPossible: "我擁有 <span class=\"hl-keyword\">10 年社區大廈管委會主委實戰經驗</span>，曾親自推動法治防禦規約並獲法院判決勝訴確定；<span class=\"hl-keyword\">身後有專業顧問律師群全力支持</span>，我有底氣以法、理、情替里民捍衛居住正義。"
    },
    {
        id: 10,
        category: "education",
        categoryName: "生活美學與未來教育",
        title: "明德斜槓導師 ＋ 鄰里達人展演舞台",
        subtitle: "釋放市民活動中心免租金場地，發掘故事媽媽、手作、AI剪輯與音樂達人開班開課！",
        image: "images/policy_12_mentor.png",
        budgetSource: "青年創育與社區互助人才培力專案",
        budgetSub: "<span class=\"hl-keyword\">完全不會用到</span>明德里 88 萬基層款",
        budgetDesc: "善用公有場地免租金機制，對接社造人才補助，以極低成本搭建展演舞台，形成鄰里互助生態。",
        highlight: "招募里內故事媽媽、EQ爸爸、手工皂、AI剪輯師、獨立樂手與熱舞導師，在活動中心開辦多元工作坊。",
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`,
        hooks: [
            "明德里臥虎藏龍，許多身懷絕技的故事媽媽、EQ志工、手工皂達人、AI剪輯師與獨立樂手，卻苦於沒有適當場地開班分享；而里民想學才藝，也往往找不到平價優質的管道。<span class=\"hl-keyword\">我主張打開公共空間</span>，讓鄰里的才華在社區發光！"
        ],
        howToDo: [
            "【建立明德斜槓人才資料庫】：公開徵選具備才藝與教學熱忱的里民，<span class=\"hl-keyword\">建立故事、手作、科技、音樂多元師資庫</span>。",
            "【活動中心免租金場地支持】：協調市民活動中心公有空間，<span class=\"hl-keyword\">提供免租金開課支援</span>，堅持公益平價與材料費透明原則。",
            "【社區成果展演舞台】：結合草地音樂節與社區節慶，<span class=\"hl-keyword\">為斜槓導師與學員舉辦公開成果發表會</span>，讓社區看見精彩才華。"
        ],
        whyPossible: "我擁有 <span class=\"hl-keyword\">20 年流行音樂產業經紀</span>與 <span class=\"hl-keyword\">8 年 EQ 志工培訓實務</span>，擅長發掘人才特質、策劃課程與大型展演；<span class=\"hl-keyword\">我懂得整合公共資源</span>，打造活力充沛的社區人才共學聚落。"
    },
    {
        id: 11,
        title: "長青傳統課程 ＋ 流行音樂共演升級",
        subtitle: "太鼓與舞蹈班100%安心延續，融入流行樂團改編節奏，祖孫同台公演讓全家搶著拍照錄影！",
        image: "images/policy_06_upgrade.png",
        budgetSource: "明德里基層工作經費 ＋ 流行音樂師資協作",
        budgetSub: "每年近百萬法定基層款依法支應（零額外自費）",
        budgetDesc: "善用既有場地與基層款常態維護，結合候選人音樂圈師資人脈協同教學，發揮最大綜效。",
        highlight: "既有課程（如太鼓班、舞蹈班）安心延續，並注入現代流行音樂與節奏元素，邀請年輕樂手與家人加入合練，舉辦跨世代公演。",
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>`,
        hooks: [
            "長輩在太鼓班、舞蹈班充滿活力揮灑汗水，但年輕兒孫卻常常覺得曲目單調而很少到場加油；傳統課程需要被珍惜，更可以被點亮！<span class=\"hl-keyword\">我堅持在完全不改動長輩習慣的前提下</span>，注入流行元素，讓長輩的表演成為全家人的驕傲。"
        ],
        howToDo: [
            "【經典課程100%安心延續】：原時段、原教練、原班底全數保留，<span class=\"hl-keyword\">長輩習慣的練習模式絕不受任何干擾</span>。",
            "【流行音樂改編跨世代共演】：在長輩自願前提下，<span class=\"hl-keyword\">融入流行音樂現代節奏與年輕樂手伴奏</span>，打造震撼人心的跨世代公演。",
            "【成果專區留下珍貴紀念】：為長輩建立<span class=\"hl-keyword\">專屬高畫質影音紀錄專區</span>，讓兒孫主動轉發分享、為阿公阿嬤喝采！"
        ],
        whyPossible: "我具備 <span class=\"hl-keyword\">20 年流行音樂產業深厚背景</span>，熟諳編曲製作與大型演出策劃；<span class=\"hl-keyword\">我能邀請業界優秀樂手協同交流</span>，在尊重傳統的基礎上，讓明德里的長輩站上最耀眼的舞台。"
    },
    {
        id: 12,
        category: "environment",
        categoryName: "綠色永續與環境治理",
        title: "食用廢油變黃金 ＋ 環保生活循環經濟",
        displayTitle: `食用廢油變黃金 ＋ <span class=\"policy-title-glow-green\">環保生活循環經濟</span>`,
        subtitle: "對接手工皂協會解決廚房廢油堵塞惡臭，剩油直接兌換熟成家事皂，守護下水道！",
        image: "images/policy_15_soap.png",
        budgetSource: "環保局低碳社區專案 ＋ 環保志工教育補助",
        budgetSub: "<span class=\"hl-keyword\">完全不會用到</span>明德里 88 萬基層款",
        budgetDesc: "每季開辦工作坊，全額由環保局低碳專案補助講師與耗材，把廢油變黃金，不排擠基層款。",
        highlight: "把堵塞水管的廚房廢油，化為全家通用的金黃家事皂。省下修繕費、呵護下水道，實踐科技與永續並重的綠色循環經濟！",
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path></svg>`,
        hooks: [
            "廚房炸油與過期食用油倒水槽會堵塞水管、滋生惡臭與蚊蟲，倒垃圾車又捨不得且污染環境。其實只要透過專業配方，廢油立刻能變成去油力最強的金黃家事皂！<span class=\"hl-keyword\">不用里民在家冒險碰強鹼</span>，我把現成好皂直接送到你手中。"
        ],
        howToDo: [
            "【家戶集油便利回收】：廚房炸油與過期油濾入寶特瓶送至活動中心專用回收桶，<span class=\"hl-keyword\">徹底根除下水管道堵塞與惡臭</span>。",
            "【專業師資安全工作坊】：每季攜手手工皂協會開辦體驗班，<span class=\"hl-keyword\">備妥完整安全防護配備現場指導</span>，里民安心體驗手作樂趣。",
            "【憑油直接兌換熟成家事皂】：里民憑回收廢油可<span class=\"hl-keyword\">直接兌換專業熟成之「明德里環保家事皂」</span>，洗碗去油不傷手，省下日常開銷。"
        ],
        whyPossible: "我具備企業專案管理長才，<span class=\"hl-keyword\">已成功對接「中華綠生活手工皂協會王若家理事長」專業團隊</span>（已在土城日新里活動中心常態開課驗證成功），<span class=\"hl-keyword\">以市府低碳專案全額補助</span>為明德里落實循環經濟！"
    },
    {
        id: 13,
        category: "culture",
        categoryName: "空間活化與美學生活",
        title: "市民活動中心活化 ＋ 全齡共享共學角",
        subtitle: "落實「增量不取代」，開放平日夜間與假日共享空間，自習、桌遊與文化交流新聚落！",
        image: "images/policy_09_lounge.png",
        budgetSource: "市民活動中心活化專案 ＋ 明德里基層款",
        budgetSub: "公有空間專案活化（零額外自費）",
        budgetDesc: "運用公有設施既有空間，以活化專案補助與里基層款常態支應，零負擔落實全齡共享。",
        highlight: "遵循增量不取代原則，開放活動中心夜間與假日空間成立全齡共學角，讓青年與長者獲得溫馨交流空間。",
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>`,
        hooks: [
            "活動中心白天長輩共餐熱熱鬧鬧，到了平日晚上和假日卻往往鐵捲門深鎖、漆黑一片。年輕人下班想看書、做專案或交流，只能花錢跑去擁擠的咖啡廳。<span class=\"hl-keyword\">公有場館是全體里民的資產</span>，我主張在完全不影響長輩的前提下，把空間溫暖點亮！"
        ],
        howToDo: [
            "【落實「增量不取代」全齡共享】：白天維持長輩共餐與既有課程，<span class=\"hl-keyword\">開放平日夜間與假日為溫馨「全齡共學角」</span>。",
            "【營造明亮友善自修環境】：優化內部照明與桌椅配置，<span class=\"hl-keyword\">規劃安靜閱讀區、青年筆電專區與家庭益智桌遊角落</span>。",
            "【青年志工輪值服務維護】：組織社區熱心青年志工輪值，<span class=\"hl-keyword\">維護公有器材安全與現場清潔管理</span>，培養社區自治互助精神。"
        ],
        whyPossible: "我擁有 <span class=\"hl-keyword\">10 年社區大廈管委會主委實務</span>，深諳公共設施規約制定、時段調配與門禁管理；<span class=\"hl-keyword\">我懂得如何兼顧長青與青年需求</span>，以極低成本為社區釋放最大公共價值。"
    },
    {
        id: 14,
        title: "樂利EQ志工扎根 ＋ 全齡家庭情緒共學",
        subtitle: "8 年國小志工組長帶領團隊，每季定期開辦情緒共學工作坊，陪伴跨世代家庭和諧溝通！",
        image: "images/policy_02_eq_1.png",
        budgetSource: "教育部家庭教育專案 ＋ 校里跨域合作",
        budgetSub: "<span class=\"hl-keyword\">完全不會用到</span>明德里 88 萬基層款",
        budgetDesc: "結合 8 年樂利國小 EQ 志工組長團隊師資，免費借用校園空間並對接教育部專案全額補助，零公帑開辦。",
        highlight: "每季定期開辦 1 期共學工作坊！涵蓋孩子、家長與長者都能參與的情緒管理課程，陪伴大家了解情緒、覺察委屈、避免遷怒、遠離霸凌。",
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a5 5 0 1 0 10 0v-2H12z"></path><path d="M12 10a8 8 0 1 0 8 8v-8H12z"></path><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line></svg>`,
        hooks: [
            "面對孩子情緒暴走、家長管教焦慮、長輩委屈遷怒，家人往往在無意間互相傷害。外面的專業心理成長課程動輒數千上萬元，許多家庭難以負擔。<span class=\"hl-keyword\">我在樂利國小推動情緒教育 8 年</span>，最深切的心願就是把這套溫暖的解方完整帶回我們明德里！"
        ],
        howToDo: [
            "【兒童與親子情緒共學班】：每季定期開辦 1 期，透過生動繪本與情境遊戲，<span class=\"hl-keyword\">引導孩子覺察情緒、學習同理合作、遠離校園霸凌</span>。",
            "【家長正向教養支持工作坊】：分享情緒覺察與非暴力溝通實務，<span class=\"hl-keyword\">協助爸爸媽媽化解教養焦慮與夫妻溝通摩擦</span>。",
            "【長者樂齡同理交流茶會】：為銀髮長輩開辦情緒調適與同理傾聽茶會，<span class=\"hl-keyword\">解開積壓心結，營造溫馨和睦的跨世代家庭氛圍</span>。"
        ],
        whyPossible: "我擔任 <span class=\"hl-keyword\">樂利國小 EQ 志工組長長達 8 年</span>，具備完整講師資格與 <span class=\"hl-keyword\">7 套專業情緒教育證照</span>，帶領過 50 餘名熱心志工團隊；<span class=\"hl-keyword\">我自備完整教材與師資庫</span>，對接教育專案補助，能為里民提供最溫暖扎實的支持。"
    },
    {
        id: 15,
        category: "culture",
        categoryName: "空間活化與美學生活",
        title: "明德公園寵物友善 ＋ 乾淨衛生雙贏共享",
        subtitle: "爭取設置寵物便攜袋補充站與友善繫留區，兼顧公園整潔衛生與毛小孩活動權益！",
        image: "images/policy_11_pet.png",
        budgetSource: "明德里基層工作經費 ＋ 動保處推廣專案",
        budgetSub: "每年近百萬法定基層款依法支應（每座僅千餘元）",
        budgetDesc: "便攜袋補充站由里基層款支應（經濟實惠），並結合動保處宣導品與志工維護，乾淨衛生。",
        highlight: "於明德公園周邊爭取規劃寵物撿便袋補充站與繫留設施，兼顧公園乾淨衛生與毛小孩活動權益。",
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="22"></line></svg>`,
        hooks: [
            "帶毛小孩到公園散步是許多里民每天最放鬆的時刻，但偶爾忘記帶便袋或缺乏洗手牽繩設施，常引來不養寵物鄰里的反感。<span class=\"hl-keyword\">愛護動物與環境清潔絕不衝突</span>！我們可以用很小的成本與貼心設計，讓所有里民都能在公園舒服共處。"
        ],
        howToDo: [
            "【增設便攜袋補充站與專用垃圾桶】：爭取於明德公園周邊動線<span class=\"hl-keyword\">設置「寵物便攜袋取用站」與專用清潔箱</span>，方便飼主隨手維護環境。",
            "【規劃友善牽繩繫留休憩角】：在休閒長椅旁<span class=\"hl-keyword\">加裝安全牽繩繫留環</span>，讓里民坐下休息或與鄰居聊天時，毛小孩能安全安穩陪伴。",
            "【社區飼主責任宣導與志工巡檢】：結合動保處資源宣導晶片與疫苗，<span class=\"hl-keyword\">組織熱心志工定期巡檢草地</span>，營造人寵和諧共享典範。"
        ],
        whyPossible: "我具備 <span class=\"hl-keyword\">10 年社區規約管理與空間協調實戰經驗</span>，最懂得如何兼顧非養寵物長輩對乾淨衛生的要求與飼主心聲；<span class=\"hl-keyword\">我善於用微小預算化解鄰里矛盾</span>，創造雙贏共享的友善社區。"
    }
];

// DOM Elements
const policyGrid = document.getElementById('policies-grid');
const drawerBackdrop = document.getElementById('drawer-backdrop');
const drawer = document.getElementById('drawer');
const drawerClose = document.getElementById('drawer-close');
const header = document.querySelector('header');

// State
let currentTheme = localStorage.getItem('theme') || 'dark';

// Initialize Theme
document.documentElement.setAttribute('data-theme', currentTheme);
updateThemeToggleIcon();

// Event Listeners
const themeToggleBtn = document.getElementById('theme-toggle');
if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', toggleTheme);
}
if (drawerClose) {
    drawerClose.addEventListener('click', closeDrawer);
}
if (drawerBackdrop) {
    drawerBackdrop.addEventListener('click', closeDrawer);
}

// Listen to escape key to close drawer
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && typeof closeDrawer === 'function') closeDrawer();
});

// Scroll Event for Header blur
window.addEventListener('scroll', () => {
    if (header) {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
});

// Theme Management
function toggleTheme() {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('theme', currentTheme);
    updateThemeToggleIcon();
}

function updateThemeToggleIcon() {
    const toggleBtn = document.getElementById('theme-toggle');
    if (currentTheme === 'light') {
        toggleBtn.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
        `; // Moon icon
    } else {
        toggleBtn.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
        `; // Sun icon
    }
}

// ==========================================================================
// 參與式政見「我想要」互動投票系統 (Base Votes + 1-Hour Cooldown + UUID + Survey)
// ==========================================================================

// 取得或生成匿名裝置唯一識別碼 (Device UUID)
function getVoterDeviceId() {
    let deviceId = localStorage.getItem('md2_voter_device_uuid');
    if (!deviceId) {
        deviceId = 'dev_' + Math.random().toString(36).substring(2, 10) + Date.now().toString(36);
        localStorage.setItem('md2_voter_device_uuid', deviceId);
    }
    return deviceId;
}

// 取得里民年齡性別資料
function getVoterProfile() {
    try {
        const raw = localStorage.getItem('md2_voter_profile');
        return raw ? JSON.parse(raw) : null;
    } catch (e) {
        return null;
    }
}

// 儲存里民年齡性別資料
function saveVoterProfile(age, gender) {
    const profile = { age, gender, updatedAt: Date.now() };
    localStorage.setItem('md2_voter_profile', JSON.stringify(profile));
    return profile;
}

// 取得特定計畫支持票數 (優先讀取 Google 試算表雲端同步總票數，次之讀取初調基底 + 本地真實累積)
function getPolicyVoteCount(policyId) {
    if (liveCloudPolicyVotes && liveCloudPolicyVotes[policyId] !== undefined) {
        return Number(liveCloudPolicyVotes[policyId]);
    }
    const base = POLICY_BASE_VOTES[policyId] || 50;
    const delta = parseInt(localStorage.getItem(`md2_policy_vote_delta_${policyId}`) || '0', 10);
    return base + delta;
}

// 判斷特定計畫是否在 1 小時冷卻期內
function isPolicyInCooldown(policyId) {
    const lastTime = parseInt(localStorage.getItem(`md2_policy_voted_at_${policyId}`) || '0', 10);
    return (Date.now() - lastTime) < VOTE_COOLDOWN_MS;
}

// 取得剩餘冷卻分鐘數
function getPolicyCooldownRemainingMin(policyId) {
    const lastTime = parseInt(localStorage.getItem(`md2_policy_voted_at_${policyId}`) || '0', 10);
    const diff = Date.now() - lastTime;
    if (diff >= VOTE_COOLDOWN_MS) return 0;
    return Math.ceil((VOTE_COOLDOWN_MS - diff) / 60000);
}

// 點擊「我想要」按鈕處理流程
function handleWantVoteClick(e, policyId) {
    if (e) {
        e.stopPropagation(); // 防止觸發卡片開啟抽屜事件
    }

    // 檢查 1 小時防刷冷卻期
    if (isPolicyInCooldown(policyId)) {
        const remMin = getPolicyCooldownRemainingMin(policyId);
        showToast(`❤️ 您在 1 小時內已表達過支持（約 ${remMin} 分鐘後可再次打卡投票）`);
        return;
    }

    const profile = getVoterProfile();
    if (!profile || !profile.age || !profile.gender) {
        // 尚未勾選年齡與性別 -> 彈出調查問卷 Modal
        pendingVotePolicyId = policyId;
        openVoteSurveyModal(policyId);
    } else {
        // 已有全域記憶身份 -> 直接秒投！
        executePolicyVote(policyId, profile.age, profile.gender);
    }
}

// 開啟問卷調查 Modal
function openVoteSurveyModal(policyId) {
    const modal = document.getElementById('vote-survey-modal');
    if (!modal) return;
    
    // 重設選取狀態
    const ageInputs = modal.querySelectorAll('input[name="survey-age"]');
    const genderInputs = modal.querySelectorAll('input[name="survey-gender"]');
    ageInputs.forEach(i => i.checked = false);
    genderInputs.forEach(i => i.checked = false);

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// 關閉問卷調查 Modal
function closeVoteSurveyModal() {
    const modal = document.getElementById('vote-survey-modal');
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// 選項變更處理：年齡與性別均已選中時，自動觸發投票！
function handleSurveyOptionChange() {
    const ageEl = document.querySelector('input[name="survey-age"]:checked');
    const genderEl = document.querySelector('input[name="survey-gender"]:checked');
    
    if (ageEl && genderEl) {
        const age = ageEl.value;
        const gender = genderEl.value;
        saveVoterProfile(age, gender);

        // 延遲 180ms 讓選民看到選取高光反饋，隨後流暢關窗並執行投票
        setTimeout(() => {
            closeVoteSurveyModal();
            if (pendingVotePolicyId) {
                executePolicyVote(pendingVotePolicyId, age, gender);
                pendingVotePolicyId = null;
            }
        }, 180);
    }
}

// 執行投票邏輯、動畫與後台同步
function executePolicyVote(policyId, age, gender) {
    const now = Date.now();
    localStorage.setItem(`md2_policy_voted_at_${policyId}`, now.toString());
    const curDelta = parseInt(localStorage.getItem(`md2_policy_vote_delta_${policyId}`) || '0', 10) + 1;
    localStorage.setItem(`md2_policy_vote_delta_${policyId}`, curDelta.toString());

    // 立即累加即時記憶票數並寫入快取
    const curTotal = getPolicyVoteCount(policyId);
    const newCount = curTotal + 1;
    liveCloudPolicyVotes[policyId] = newCount;
    try {
        localStorage.setItem('md2_cloud_policy_votes', JSON.stringify(liveCloudPolicyVotes));
    } catch (e) {}

    const deviceId = getVoterDeviceId();
    const policy = POLICIES_DATA.find(p => p.id === policyId);
    const policyTitle = policy ? policy.title : `政見 ${policyId}`;

    // 1. 更新卡片與抽屜 UI 狀態
    updatePolicyVoteUI(policyId, newCount, true);

    // 2. 即時更新下方「全里民意即時榜」長條圖與排行
    renderPolicyRankings();

    // 3. 觸發按鈕浮動 +1 微粒子特效
    createVotePlusOneParticle(policyId);

    // 4. 觸發全螢幕放大脈衝愛心微動畫
    showVoteSuccessAnimation(policyId, policyTitle);

    // 5. 同步拋送數據至 Google Apps Script 雲端試算表 (核心一：十五大政見民調庫)
    if (typeof GAS_POLICY_URL !== 'undefined' && GAS_POLICY_URL) {
        const ageLabelMap = {
            'under-20': '20歲以下',
            '20-40': '20-40歲',
            '40-60': '40-60歲',
            'over-60': '60歲以上'
        };
        const genderLabelMap = {
            'male': '男性',
            'female': '女性'
        };
        fetch(GAS_POLICY_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                action: 'policy_vote',
                deviceId: deviceId,
                policyId: `政見 ${policyId < 10 ? '0' + policyId : policyId}`,
                policyTitle: policyTitle,
                ageGroup: ageLabelMap[age] || age,
                gender: genderLabelMap[gender] || gender,
                voteCount: newCount,
                timestamp: new Date().toISOString()
            })
        }).catch(err => console.log('Policy vote sync error:', err));
    }
}

// 更新所有「我想要」按鈕 UI 狀態
function updatePolicyVoteUI(policyId, count, isVoted) {
    const btns = document.querySelectorAll(`.btn-want-vote[data-policy-id="${policyId}"]`);
    btns.forEach(btn => {
        const heart = btn.querySelector('.heart-icon');
        const finger = btn.querySelector('.finger-icon');
        const text = btn.querySelector('.want-text');
        const counter = btn.querySelector('.vote-counter');

        if (isVoted) {
            btn.classList.add('voted');
            if (heart) heart.textContent = '❤️';
            if (finger) finger.textContent = '✅';
            if (text) text.textContent = '已支持';
            if (counter) counter.textContent = `${count} 票`;
        } else {
            btn.classList.remove('voted');
            if (heart) heart.textContent = '🤍';
            if (finger) finger.textContent = '👆';
            if (text) text.textContent = '我想要';
            if (counter) counter.textContent = `${count} 票`;
        }
    });
}

// 產生 +1 浮動粒子動畫
function createVotePlusOneParticle(policyId) {
    const btns = document.querySelectorAll(`.btn-want-vote[data-policy-id="${policyId}"]`);
    btns.forEach(btn => {
        const plusOne = document.createElement('span');
        plusOne.className = 'vote-float-plus-one';
        plusOne.textContent = '+1';
        btn.appendChild(plusOne);
        setTimeout(() => plusOne.remove(), 1000);
    });
}

// 顯示脈衝愛心成功動畫 Overlay
function showVoteSuccessAnimation(policyId, policyTitle) {
    const overlay = document.getElementById('vote-success-animation-overlay');
    const msgEl = document.getElementById('vote-success-policy-name');
    if (!overlay) return;
    if (msgEl) {
        const pNum = policyId < 10 ? `0${policyId}` : policyId;
        msgEl.textContent = `已將您的支持列入「政見 ${pNum} ‧ ${policyTitle}」推動優先序！`;
    }
    overlay.style.display = 'flex';
    const timer = setTimeout(() => {
        overlay.style.display = 'none';
    }, 2200);
    overlay.onclick = () => {
        clearTimeout(timer);
        overlay.style.display = 'none';
    };
}

// ==========================================================================
// 全里民意即時榜 (Top 5 + 看全部排行) 動態長條圖系統
// ==========================================================================
let isRankingExpanded = false;
let hasRankingAnimated = false;

function renderPolicyRankings() {
    const container = document.getElementById('ranking-bars-container');
    if (!container) return;

    // 1. 取得所有 14 項政見及其當前票數
    const rankingData = POLICIES_DATA.map(p => ({
        id: p.id,
        title: p.title,
        votes: getPolicyVoteCount(p.id)
    }));

    // 2. 依照票數由高到低降冪排序
    rankingData.sort((a, b) => b.votes - a.votes || a.id - b.id);

    // 3. 找出最高票數作為百分比基準（最低保底 100 票）
    const maxVotes = Math.max(...rankingData.map(d => d.votes), 100);

    // 4. 動態生成長條 HTML
    let html = '';
    rankingData.forEach((item, index) => {
        const rank = index + 1;
        const isTop5 = rank <= 5;
        const percent = Math.min(100, Math.max(12, Math.round((item.votes / maxVotes) * 100)));
        const rankClass = rank === 1 ? 'rank-1' : rank === 2 ? 'rank-2' : rank === 3 ? 'rank-3' : 'rank-other';
        const itemExtraClass = isTop5 ? '' : `ranking-item-extra ${isRankingExpanded ? 'expanded' : ''}`;
        const itemRankClass = rank === 1 ? 'rank-item-1' : '';
        const hotBadgeHtml = rank <= 3 ? '<span class="ranking-hot-tag"><span class="crown-icon">👑</span> 里民最關注</span>' : '';

        html += `
            <div class="ranking-bar-item ${itemExtraClass} ${itemRankClass}" data-policy-id="${item.id}" onclick="openDrawer(${item.id})" title="點擊查看「政見 ${item.id < 10 ? '0' + item.id : item.id} ‧ ${item.title}」詳細規劃與經費解密">
                <div class="ranking-item-header">
                    <div class="ranking-item-left">
                        <span class="ranking-pos-badge ${rankClass}">第${rank}名</span>
                        <span class="ranking-item-title">政見 ${item.id < 10 ? '0' + item.id : item.id} ‧ ${item.title}</span>
                        ${hotBadgeHtml}
                    </div>
                    <div class="ranking-item-right">
                        <span class="ranking-item-votes">${item.votes} 票</span>
                        <span class="ranking-detail-hint">詳細 ▾</span>
                    </div>
                </div>
                <div class="ranking-track">
                    <div class="ranking-fill" data-percent="${percent}" style="width: ${hasRankingAnimated ? percent + '%' : '0%'};"></div>
                </div>
            </div>
        `;
    });

    container.innerHTML = html;

    // 如果已經進場過，直接觸發動畫寬度更新
    if (hasRankingAnimated) {
        requestAnimationFrame(() => {
            const fills = container.querySelectorAll('.ranking-fill');
            fills.forEach(fill => {
                const p = fill.getAttribute('data-percent');
                fill.style.width = `${p}%`;
            });
        });
    }
}

// 切換「看全部排行」與「收合至前五大」
function toggleRankingView() {
    isRankingExpanded = !isRankingExpanded;
    const extraItems = document.querySelectorAll('.ranking-item-extra');
    const toggleText = document.getElementById('ranking-toggle-text');
    const toggleBtn = document.getElementById('btn-ranking-toggle');

    if (isRankingExpanded) {
        extraItems.forEach(item => item.classList.add('expanded'));
        if (toggleText) toggleText.textContent = '收合至前五大 ▴';
        if (toggleBtn) toggleBtn.setAttribute('aria-expanded', 'true');
    } else {
        extraItems.forEach(item => item.classList.remove('expanded'));
        if (toggleText) toggleText.textContent = '看全部排行 ▾';
        if (toggleBtn) toggleBtn.setAttribute('aria-expanded', 'false');

        // 收合後平滑滾動對焦回按鈕位置
        setTimeout(() => {
            if (toggleBtn) {
                toggleBtn.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }, 60);
    }
}

// 監聽滾動進場動畫
function initRankingAnimationObserver() {
    const rankingSection = document.getElementById('policy-ranking-section');
    if (!rankingSection) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasRankingAnimated) {
                hasRankingAnimated = true;
                const fills = rankingSection.querySelectorAll('.ranking-fill');
                fills.forEach(fill => {
                    const p = fill.getAttribute('data-percent');
                    fill.style.width = `${p}%`;
                });
            }
        });
    }, { threshold: 0.15 });

    observer.observe(rankingSection);
}

// Generate Policy Cards
function renderPolicies() {
    if (!policyGrid) return;
    policyGrid.innerHTML = '';
    
    POLICIES_DATA.forEach((policy, index) => {
        const card = document.createElement('div');
        
        const isVoted = isPolicyInCooldown(policy.id);
        const count = getPolicyVoteCount(policy.id);

        let imageHtml = '';
        if (policy.id === 3) {
            imageHtml = `
                <div class="before-after-slider card-slider-3" onclick="event.stopPropagation()">
                    <div class="slider-image-before">
                        <img src="images/policy_04_safety_1_wide.jpg" alt="現況：人行道標線磨損補丁（實地現況）">
                    </div>
                    <div class="slider-image-after" id="card-slider-image-after-3">
                        <img src="images/policy_04_safety_2_wide.png" alt="願景：防滑平整友善人行步道 - 概念示意圖">
                    </div>
                    <input type="range" min="0" max="100" value="50" class="slider-range" id="card-slider-range-3" aria-label="Before/After 拖拽滑塊對比" onclick="event.stopPropagation()">
                    <div class="slider-line" id="card-slider-line-3"></div>
                    <div class="slider-button" id="card-slider-button-3"></div>
                    <span class="slider-label slider-label-before">改建願景</span>
                    <span class="slider-label slider-label-after">現況實景</span>
                </div>
            `;
        } else {
            imageHtml = `
                <img class="policy-card-image" src="${policy.image}" alt="${policy.title} - 概念示意圖" onerror="this.style.display='none'; if(this.nextElementSibling) this.nextElementSibling.style.display='none'; this.parentElement.querySelector('.policy-card-image-placeholder').style.display='flex';">
                <span class="vision-badge">概念示意圖</span>
                <div class="policy-card-image-placeholder" style="display: none;">
                    <div class="placeholder-icon">${policy.icon}</div>
                    <span class="placeholder-text">示意圖繪製中</span>
                </div>
            `;
        }

        card.className = 'policy-card glass';
        card.dataset.id = policy.id;
        card.dataset.index = index;
        card.innerHTML = `
            <div class="policy-card-header">
                <div style="display: flex; justify-content: space-between; align-items: center; width: 100%; margin-bottom: 0.4rem;">
                    <span class="policy-number">政見 ${policy.id < 10 ? '0' + policy.id : policy.id}</span>
                    <button class="btn-want-vote ${isVoted ? 'voted' : ''}" data-policy-id="${policy.id}" onclick="handleWantVoteClick(event, ${policy.id})" title="表達您的支持（參與式預算民意調查）">
                        <div class="vote-row-stats">
                            <span class="heart-icon">${isVoted ? '❤️' : '🤍'}</span>
                            <span class="vote-counter">${count} 票</span>
                        </div>
                        <div class="vote-row-action">
                            <span class="finger-icon">${isVoted ? '✅' : '👆'}</span>
                            <span class="want-text">${isVoted ? '已支持' : '我想要'}</span>
                        </div>
                    </button>
                </div>
                <h3>${policy.displayTitle || policy.title}</h3>
            </div>
            <div class="policy-card-image-wrapper">
                ${imageHtml}
            </div>
            <div class="policy-card-body">
                <p class="policy-punchline">${policy.subtitle}</p>
                <div class="policy-card-footer">
                    <button class="learn-more-btn">
                        為什麼能做到？經費從哪來
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                    </button>
                </div>
            </div>
        `;
        card.addEventListener('click', () => openDrawer(policy.id));
        policyGrid.appendChild(card);

        // 如果是計畫 03，初始化卡片上的滑塊事件
        if (policy.id === 3) {
            const cardRange = card.querySelector('#card-slider-range-3');
            const cardAfterImage = card.querySelector('#card-slider-image-after-3');
            const cardLine = card.querySelector('#card-slider-line-3');
            const cardButton = card.querySelector('#card-slider-button-3');

            if (cardRange && cardAfterImage && cardLine && cardButton) {
                const updateCardSlider = (e) => {
                    if (e) e.stopPropagation();
                    const value = cardRange.value;
                    cardAfterImage.style.clipPath = `polygon(0 0, ${value}% 0, ${value}% 100%, 0 100%)`;
                    cardLine.style.left = `${value}%`;
                    cardButton.style.left = `${value}%`;
                };
                cardRange.addEventListener('input', updateCardSlider);
                cardRange.addEventListener('change', updateCardSlider);
                cardRange.addEventListener('click', (e) => e.stopPropagation());
                cardRange.addEventListener('mousedown', (e) => e.stopPropagation());
                cardRange.addEventListener('touchstart', (e) => e.stopPropagation(), { passive: true });
                updateCardSlider();
            }
        }
    });

    // Re-initialize observer for dynamically rendered elements
    observeRevealElements();
}

// Drawer Functions
function openDrawer(policyId) {
    const policy = POLICIES_DATA.find(p => p.id === policyId);
    if (!policy) return;

    // Populate drawer elements
    const formattedNum = policy.id < 10 ? `0${policy.id}` : policy.id;
    const isVoted = isPolicyInCooldown(policy.id);
    const count = getPolicyVoteCount(policy.id);

    const badgeEl = document.getElementById('drawer-policy-badge');
    if (badgeEl) badgeEl.textContent = `政見 ${formattedNum}`;

    const voteSlot = document.getElementById('drawer-vote-slot');
    if (voteSlot) {
        voteSlot.innerHTML = `
            <button class="btn-want-vote btn-want-vote-drawer ${isVoted ? 'voted' : ''}" data-policy-id="${policy.id}" onclick="handleWantVoteClick(event, ${policy.id})" title="表達您的支持（參與式預算民意調查）">
                <div class="vote-row-stats">
                    <span class="heart-icon">${isVoted ? '❤️' : '🤍'}</span>
                    <span class="vote-counter">${count} 票</span>
                </div>
                <div class="vote-row-action">
                    <span class="finger-icon">${isVoted ? '✅' : '👆'}</span>
                    <span class="want-text">${isVoted ? '已支持' : '我想要'}</span>
                </div>
            </button>
        `;
    }
    const titleEl = document.getElementById('drawer-title');
    if (titleEl) titleEl.innerHTML = policy.displayTitle || escapeHTML(policy.title);

    // Populate drawer hook section (初衷 / 創新)
    const hookBoxEl = document.getElementById('drawer-hook-box');
    const hookContentEl = document.getElementById('drawer-hook-content');
    const hookTitleTextEl = document.getElementById('drawer-hook-title-text');
    if (hookTitleTextEl) {
        hookTitleTextEl.textContent = policy.hookTitle || '初衷';
    }
    if (hookBoxEl && hookContentEl) {
        hookContentEl.innerHTML = '';
        if (Array.isArray(policy.hooks) && policy.hooks.length > 0) {
            policy.hooks.forEach(h => {
                const card = document.createElement('div');
                card.className = 'hook-card';
                const qContent = (h.question || h);
                if (h.answer && h.answer.trim()) {
                    card.innerHTML = `
                        <div class="hook-card-title">❓ ${qContent}</div>
                        <p class="drawer-content-p">${h.answer}</p>
                    `;
                } else {
                    card.innerHTML = `
                        <p class="drawer-content-p">${qContent}</p>
                    `;
                }
                hookContentEl.appendChild(card);
            });
            hookBoxEl.style.display = 'block';
        } else {
            hookBoxEl.style.display = 'none';
        }
    }

    // Populate drawer budget section
    const budgetBadgeEl = document.getElementById('drawer-budget-badge');
    if (budgetBadgeEl) budgetBadgeEl.innerHTML = policy.budgetSource || '明德里基層工作經費';
    const budgetSubEl = document.getElementById('drawer-budget-sub');
    if (budgetSubEl) {
        let rawSub = policy.budgetSub || '';
        if (!rawSub.includes('<')) {
            rawSub = rawSub.replace(/^[（(]/, '').replace(/[）)]$/, '').trim();
        }
        budgetSubEl.innerHTML = rawSub;
    }
    const budgetTextEl = document.getElementById('drawer-budget-text');
    if (budgetTextEl) {
        if (policy.budgetDesc && policy.budgetDesc.trim()) {
            budgetTextEl.innerHTML = policy.budgetDesc;
            budgetTextEl.style.display = 'block';
        } else {
            budgetTextEl.style.display = 'none';
        }
    }

    // Dynamic Section Ordering (支援「創新」在先或「經費」在先)
    const budgetBoxEl = document.getElementById('drawer-budget-box');
    const howBoxEl = document.getElementById('drawer-how-box');
    const capabilityBoxEl = document.getElementById('drawer-capability-box');
    if (policy.sectionOrder === 'innovation-first') {
        if (hookBoxEl) hookBoxEl.style.order = '1';
        if (howBoxEl) howBoxEl.style.order = '2';
        if (capabilityBoxEl) capabilityBoxEl.style.order = '3';
        if (budgetBoxEl) budgetBoxEl.style.order = '4';
    } else {
        if (budgetBoxEl) budgetBoxEl.style.order = '1';
        if (hookBoxEl) hookBoxEl.style.order = '2';
        if (howBoxEl) howBoxEl.style.order = '3';
        if (capabilityBoxEl) capabilityBoxEl.style.order = '4';
    }

    // Populate drawer image

    // Populate drawer image
    const drawerImgWrapper = document.getElementById('drawer-image-wrapper');
    if (drawerImgWrapper) {
        // 如果是計畫 14 (EQ教育)，渲染三張圖
        if (policy.id === 14) {
            drawerImgWrapper.style.display = 'block';
            drawerImgWrapper.innerHTML = `
                <div style="position: relative; margin-bottom: 1.5rem; border-radius: 12px; overflow: hidden; border: 1px solid var(--card-border);">
                    <img class="drawer-image" src="images/policy_02_eq_3.png" alt="${policy.title} 概念示意圖 - 概念示意圖">
                    <span class="vision-badge">概念示意圖</span>
                </div>
                <div style="position: relative; margin-bottom: 1.5rem; border-radius: 12px; overflow: hidden; border: 1px solid var(--card-border);">
                    <img class="drawer-image" src="images/policy_02_eq_2.png" alt="${policy.title} 概念示意圖 - 概念示意圖">
                    <span class="vision-badge">概念示意圖</span>
                </div>
                <div style="position: relative; border-radius: 12px; overflow: hidden; border: 1px solid var(--card-border);">
                    <img class="drawer-image" src="images/policy_02_eq_1.png" alt="${policy.title} 概念示意圖 - 概念示意圖">
                    <span class="vision-badge">概念示意圖</span>
                </div>
            `;
        } else if (policy.id === 3) {
            // 如果是計畫 03 (友善步道)，渲染 Before/After 拖拽對比滑塊
            drawerImgWrapper.style.display = 'block';
            drawerImgWrapper.innerHTML = `
                <div class="before-after-slider">
                    <div class="slider-image-before">
                        <img src="images/policy_04_safety_1_wide.jpg" alt="現況：人行道標線磨損補丁（實地現況）">
                    </div>
                    <div class="slider-image-after" id="slider-image-after">
                        <img src="images/policy_04_safety_2_wide.png" alt="願景：防滑平整友善人行步道 - 概念示意圖">
                    </div>
                    <input type="range" min="0" max="100" value="50" class="slider-range" id="slider-range" aria-label="Before/After 拖拽滑塊對比">
                    <div class="slider-line" id="slider-line"></div>
                    <div class="slider-button" id="slider-button"></div>
                    <span class="slider-label slider-label-before">改建願景</span>
                    <span class="slider-label slider-label-after">現況實景</span>
                </div>
            `;
            // Add event listener to range input to handle clip-path and button/line position
            const range = document.getElementById('slider-range');
            const afterImage = document.getElementById('slider-image-after');
            const line = document.getElementById('slider-line');
            const button = document.getElementById('slider-button');
            
            if (range && afterImage && line && button) {
                const updateSlider = () => {
                    const value = range.value;
                    afterImage.style.clipPath = `polygon(0 0, ${value}% 0, ${value}% 100%, 0 100%)`;
                    line.style.left = `${value}%`;
                    button.style.left = `${value}%`;
                };
                
                range.addEventListener('input', updateSlider);
                range.addEventListener('change', updateSlider);
                updateSlider();
            }
        } else {
            // 其他一般計畫渲染單張圖
            drawerImgWrapper.innerHTML = `
                <div style="position: relative; border-radius: 16px; overflow: hidden; border: 1px solid var(--card-border);">
                    <img class="drawer-image" src="${policy.image}" alt="${policy.title} - 概念示意圖" onerror="this.closest('#drawer-image-wrapper').style.display='none';" onload="this.closest('#drawer-image-wrapper').style.display='block';">
                    <span class="vision-badge">概念示意圖</span>
                </div>
            `;
        }
    }

    // How to do list
    const howToDoList = document.getElementById('drawer-howtodo-list');
    if (howToDoList) {
        howToDoList.innerHTML = '';
        policy.howToDo.forEach(step => {
            const p = document.createElement('p');
            p.className = 'drawer-content-p';
            p.innerHTML = step;
            howToDoList.appendChild(p);
        });
    }

    // Why possible section
    const capText = document.getElementById('drawer-capability-text');
    if (capText) capText.innerHTML = policy.whyPossible;


    // Open drawer view
    if (drawerBackdrop && drawer) {
        drawerBackdrop.classList.add('active');
        drawer.classList.add('active');
        document.body.style.overflow = 'hidden'; // Lock main scroll
    }
}

function closeDrawer() {
    if (drawerBackdrop && drawer) {
        drawerBackdrop.classList.remove('active');
        drawer.classList.remove('active');
        document.body.style.overflow = ''; // Unlock main scroll
    }
}

function observeRevealElements() {
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-bottom, .reveal-top');
    revealElements.forEach(el => el.classList.add('active'));
}


// Header Scroll State Toggle
function initHeaderScroll() {
    const header = document.querySelector('header');
    if (!header) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 10) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }, { passive: true });
}

// ==========================================================================
// Google Apps Script (GAS) 雲端試算表 API 串接端點（三大核心微服務架構）
// ==========================================================================
// 核心一：十五大政見民調庫（總票數、民意即時榜、年齡性別投票紀錄）
const GAS_POLICY_URL = 'https://script.google.com/macros/s/AKfycbzoeRpmzNZW-_MJQKEl6cdzrnPbuItI1xfAU1gxQ9P31YNoZaiwMOCLekFd-k8iWmdR/exec';
// 核心二：里民共治有問必答資料庫（母提案 Master、附議 Detail、認同數）
const GAS_QA_URL = 'https://script.google.com/macros/s/AKfycbw3hCHGHygdyeHN0fR8kuh6j1Q2ss5GdsxB7VFhVzZKh3Ginm1Q2L2bJH6SwkDxv8jS/exec';
// 核心三：全里讚聲與官網流量庫（訪客計數、4選1讚聲名冊、跑馬燈輪播）
const GAS_STATS_URL = 'https://script.google.com/macros/s/AKfycbygcDG8u2JYMxq5Ro_W6_slTEqjQ4QhlQ1Pn8-zAXPM4ht-pMzy36ljb_PsNX9WDYaE/exec';

// 向下相容預設端點
const GOOGLE_SCRIPT_URL = GAS_QA_URL;

// ==========================================================================
// 里民共治・有問必答牆 (Participatory Q&A Data & Handlers)
// ==========================================================================
const DEFAULT_QA_DATA = [
    {
        "id": "qa-1",
        "category": "#跨世代共融與課程",
        "type": "policy",
        "statusText": "已納入競選政見白皮書",
        "statusClass": "status-policy",
        "agreeCount": 0,
        "subCount": 0,
        "author": "學府路 家長 吳先生",
        "date": "2026-08-27",
        "title": "看到文宣中有無人機與 AI 體驗課，請問小朋友幾歲可以參加？室內操作會不會有...",
        "question": "看到文宣中有無人機與 AI 體驗課，請問小朋友幾歲可以參加？室內操作會不會有安全顧慮？",
        "response": "【建議參與年齡】：\n安全小型的無人機，適合從幼兒園到老年人都非常適合。\n未來除了引進實體的無人機體驗外, 還會引進無人機的電腦模擬器, 讓比較擔心的小孩與長輩, 在正式體驗前, 也可透過電腦模擬器, 體驗操控的快感。\n【室內安全防線】：\n市民活動中心：擁有超大空曠的空間, 可以作為安全的體驗環境, 不受限室外飛航安全的限制。\n為什麼我做得到：我有多年的無人機操控與教學經驗, 更認識許多在地的學生校隊，我計畫用在地的學生指導在地有興趣的長輩與小孩, 學生得到成就感, 成為協槓青年, 長輩也有機會開心的與晚輩們互動"
    },
    {
        "id": "qa-2",
        "category": "#交通號誌與停車",
        "type": "city",
        "statusText": "市府權責・列為當選專案爭取",
        "statusClass": "status-city",
        "agreeCount": 0,
        "subCount": 0,
        "author": "立德路 駕駛里民",
        "date": "2026-08-27",
        "title": "我家有一位失智長輩, 我上有老, 下有小, 耐心常常會被消磨殆盡, 你的失智...",
        "question": "我家有一位失智長輩, 我上有老, 下有小, 耐心常常會被消磨殆盡, 你的失智App真的有用處嗎?我很懷疑?",
        "response": "【客觀釐清：App 是認知刺激工具，非醫療特效藥】：AI 腦力健能 App 的核心功能在於「初期認知活化、延緩退化與增加趣味互動」，絕不能取代正規醫療與中重度失智的專業長照。\r\n【三明治世代照顧者的 EQ 情緒後盾】：身為 8 年 EQ 情緒講師，我非常理解夾心世代長期照護的心理耗損。里辦公處將針對長照家庭開辦「照顧者情緒減壓與心理支持工作坊」，提供合法管道與同理傾聽，陪伴您走出情緒孤島。\r\n【轉介長照 2.0 喘息資源】：里辦公處將建立長照綠色窗口，主動協助家屬申請市府日間照顧中心、居家服務與喘息服務補助，實質分擔照顧重擔，讓您有喘息空間，不再一人苦撐。\r\n【促進跨世代破冰】：App 最大的實質幫助在於將枯燥的復健轉化為「祖孫趣味電競與記憶遊戲」，降低長輩抗拒感，讓孩子願意主動陪伴長輩。"
    },
    {
        "id": "qa-3",
        "category": "#跨世代共融與課程",
        "type": "policy",
        "statusText": "已納入競選政見白皮書",
        "statusClass": "status-policy",
        "agreeCount": 0,
        "subCount": 0,
        "author": "美麗宏國 社區長者",
        "date": "2026-08-27",
        "title": "常聽候選人提到 AI 健康管家可以幫忙記血壓和提醒吃藥，我們年紀大不會用複雜...",
        "question": "常聽候選人提到 AI 健康管家可以幫忙記血壓和提醒吃藥，我們年紀大不會用複雜的手機，號稱科技里長有辦法解決這個問題嗎？",
        "response": "【科技是為長輩服務，不是考驗長輩】：我們推動的不是繁瑣複雜的手機 App，而是經過篩選的極簡工具——長輩只要用「大字體語音說一句話」或「拍照辨識藥袋」即可完成紀錄，完全不需學習複雜打字與操作。\n【活動中心一對一手把手教學】：我會組織「銀髮智慧健康工作坊」，並培訓在地長輩志工與青年志工共同擔任一對一數位學習大使，幫長輩將手機字體調大、設定好專屬語音吃藥提醒與AI血壓紀錄。\n【家庭聯網守護】：長輩透過AI的協助，不僅能訓練手眼協調能力，除了可以減低晚輩的壓力，更可用科技拉近家人距離，減少與子孫的代溝，長輩無負擔，子女更安心。"
    },
    {
        "id": "qa-4",
        "category": "#交通號誌與停車",
        "type": "city",
        "statusText": "市府權責・列為當選專案爭取",
        "statusClass": "status-city",
        "agreeCount": 0,
        "subCount": 0,
        "author": "學府路通勤族 林先生",
        "date": "2026-08-27",
        "title": "聽說樂利國小的EQ課很有名，但為什麼我的小孩沒有上到EQ課呢？",
        "question": "聽說樂利國小的EQ課很有名，但為什麼我的小孩沒有上到EQ課呢？",
        "response": "【校園現況說明】：樂利國小的 EQ 情緒教育是由熱心志工團隊（多為樂利學生的家長經芯福里情緒教育協會受訓後擔任為主講）進班授課。雖然協會已經完整的1~6年級情緒教育課程，但很可惜受限於志工人力有限，雖無法6個年級全面入班，所幸樂利國小已經將四、五、六年級定為校定課程與特色課程，為土城地區課程最豐富的學校之一。\n【從學校走入社區（政見第 2 案）】：我目前在樂利國小任職EQ 志工組組長長達兩年之久，並具備 8 年以上EQ講師資歷。當選後將在明德市民活動中心常態開辦「全齡 EQ 教育工作坊」，打破學校班級與年齡限制，讓所有里內學童與家長都有機會參與。\n【擴大培訓在地師資（政見第 12 案）】：里辦公處將開辦「社區 EQ 志工培訓班」，由我將會邀請有興趣的家長擔任志工，擴大服務量能，讓情緒教育真正落實為每個家庭的日常後盾。"
    },
    {
        "id": "qa-5",
        "category": "#跨世代共融與課程",
        "type": "policy",
        "statusText": "已納入競選政見白皮書",
        "statusClass": "status-policy",
        "agreeCount": 0,
        "subCount": 0,
        "author": "明德活動中心 太鼓班學員",
        "date": "2026-08-27",
        "title": "我們在明德活動中心的太鼓班或太極班已經練習好幾年了，很擔心換了里長之後這些長...",
        "question": "我們在明德活動中心的太鼓班或太極班已經練習好幾年了，很擔心換了里長之後這些長輩喜歡的班別會不會被取消或改掉？",
        "response": "1. 【承諾百分之百延續】：既有深受好評的太鼓班、太極拳等課程，絕對完整保留、場地時段全力保障！\n2. 【潮流升級注入新活力】：將邀請青年樂手與太鼓班跨世代合體公演，同時也會引進更多元的課程活動！"
    },
    {
        "id": "qa-6",
        "category": "#交通號誌與停車",
        "type": "city",
        "statusText": "市府權責・列為當選專案爭取",
        "statusClass": "status-city",
        "agreeCount": 0,
        "subCount": 1,
        "author": "每天被塞車所苦的明德里通勤族",
        "date": "2026-08-27",
        "title": "每天上下班經過明德路二段真的快被氣死！學府路口那個行人專用時相開放時間短得可...",
        "question": "每天上下班經過明德路二段真的快被氣死！學府路口那個行人專用時相開放時間短得可憐，只要沒開放，轉彎車為了禮讓行人根本動彈不得，一個綠燈才過一兩台車就被第一輛卡死！更扯的是學士路口往金城路那段，前後兩個紅綠燈完全不同步，前一個剛綠燈、下一個馬上變紅燈，車子直接卡在路中間動彈不得連環大塞車！每天塞到懷疑人生，里長到底能不能幫忙找市府好好把這幾個紅綠燈連動處理一下？",
        "response": "1. 【感同身受！此案早已列為政見白皮書第 4 案】：\n感謝您的精準直擊！塞車之苦所有里民都感同身受，這也是我自己每天出門最深刻的痛點。我在 8 月初正式發布的「十二大新里政白皮書第 4 案」中，已將明德路二段動態綠波與學府路時相優化完整列入核心旗艦政見，里民的痛苦與我的治理方向完全一致！\n2. 【專業解析與學府路口解方】：\n• 「全向行人專用時相」：全路口車輛全紅燈，行人專屬安心過，人車 100% 徹底分流。\n• 「早開時相」的盲點：初衷是讓行人提早 5 秒起步提高能見度，原適用於人車稀少的路段；但在學府路口（新北高工旁）這種全日人車密集熱點，行人絡繹不絕，車輛綠燈轉彎時依然被斑馬線卡死，第一輛車動彈不得，整條路就跟著癱瘓！\n• 具體方案：當選後將在最短時間內向交通局爭取日間與尖峰全時段採用「全向行人專用時相」，讓轉彎車綠燈時零阻礙順暢通行；「早開時相」則回歸其初衷，僅保留於深夜車流稀少時段。\n3. 【明德路二段全廊道動態智慧綠波】：\n其實明德路二段中，從海山路口（台中銀行）、學府路口（新北高工）、學士路口到金城路口，這四個路口是「環環相扣的交通動態廊帶」！前後紅綠燈打架是號誌缺乏連鎖所致。我具備 30 年資工數據專長，將在會勘中調閱交通局交控中心時制數據，以專業大數據分析精準建言，爭取全廊道「綠波續進 (Green Wave)」，一路順暢不再原地苦等！"
    }
];

// Global State for Cloud Synced QA Data (Stale-While-Revalidate)
let liveCloudQAData = null;
try {
    const cachedCloud = localStorage.getItem('md2_cloud_qa_data');
    if (cachedCloud) {
        liveCloudQAData = JSON.parse(cachedCloud);
    }
} catch(e) {}

// 預設已審核採納之附議明細備援
const INITIAL_APPROVED_SUBS = [
    {
        subId: "sub-1",
        parentId: "qa-1",
        author: "學府路通勤機車族 趙小姐",
        content: "每天早上 07:45~08:30 在學府路一段往海山站方向，學府路口綠燈時轉彎車真的完全動不了，甚至有汽車直接違規切入斑馬線，希望能有義交或志工在尖峰時段協勤導引！",
        date: "2026-08-21",
        status: "🟢 已採納列管"
    },
    {
        subId: "sub-2",
        parentId: "qa-1",
        author: "金城路二段 居民 郭先生",
        content: "學士路口往金城路那段在傍晚 18:00 下班時間更嚴重，前後紅綠燈秒數差了快 10 秒，經常回堵整整兩個街區，希望里長當選後調閱交控中心秒數時制表進行會勘！",
        date: "2026-08-22",
        status: "🟢 已採納列管"
    },
    {
        subId: "sub-3",
        parentId: "qa-3",
        author: "明德路二段 捷運通勤族 孫先生",
        content: "捷運連通道附近人行道轉角常有違規機車斜插停放，造成輪椅與嬰兒推車必須繞走馬路，非常危險，建議除增設停車區外，路口轉角務必加裝防撞軟桿！",
        date: "2026-08-16",
        status: "🟢 已採納列管"
    }
];

let liveCloudSubProposals = null;
try {
    const cachedSubs = localStorage.getItem('md2_cloud_sub_proposals');
    if (cachedSubs) {
        liveCloudSubProposals = JSON.parse(cachedSubs);
    }
} catch(e) {}

function getApprovedSubProposals(parentId) {
    const allSubs = (liveCloudSubProposals && Array.isArray(liveCloudSubProposals) && liveCloudSubProposals.length > 0)
        ? liveCloudSubProposals
        : INITIAL_APPROVED_SUBS;

    return allSubs.filter(s => s.parentId === parentId && (
        !s.status || s.status.includes('已採納') || s.status.includes('已審核') || s.status.includes('已公開') || s.status === 'approved'
    ));
}

// Load QA Data (combining cloud-synced/default + user personal pending cards from localStorage)
function getQAData() {
    const baseData = (liveCloudQAData && Array.isArray(liveCloudQAData) && liveCloudQAData.length > 0)
        ? liveCloudQAData
        : DEFAULT_QA_DATA;

    // 後進先出 (LIFO)：最新追加的議案（序號最大、時間最新）永遠排在最上方
    const lifoData = [...baseData].reverse();

    try {
        const stored = localStorage.getItem('md2_user_qa_proposals');
        if (stored) {
            const userCards = JSON.parse(stored);
            return [...userCards, ...lifoData];
        }
    } catch(e) {}
    return lifoData;
}

let currentQAFilter = 'all';
let currentQAKeyword = '';

function toggleResponseDetail(cardId, event) {
    if (event) event.stopPropagation();
    const boxEl = document.getElementById(`resp-box-${cardId}`);
    const contentEl = document.getElementById(`resp-content-${cardId}`);
    const btnEl = document.getElementById(`sbtn-${cardId}`);
    if (!contentEl || !btnEl || !boxEl) return;

    const isOpen = boxEl.classList.contains('open');
    if (isOpen) {
        boxEl.classList.remove('open');
        contentEl.style.display = 'none';
        const textSpan = btnEl.querySelector('.pill-text');
        if (textSpan) textSpan.textContent = '看解方 ▾';
    } else {
        boxEl.classList.add('open');
        contentEl.style.display = 'block';
        const textSpan = btnEl.querySelector('.pill-text');
        if (textSpan) textSpan.textContent = '收起 ▴';
    }
}

function renderQACards() {
    const container = document.getElementById('qa-cards-container');
    if (!container) return;

    const isQAPage = document.body.getAttribute('data-page') === 'qa-page';
    const allData = getQAData();

    // 動態更新頁籤案件數量
    updateQATabCounts(allData);

    // Filter by category tab and search keyword
    let filtered = allData.filter(item => {
        const matchesCategory = (currentQAFilter === 'all') || (item.type === currentQAFilter);
        const matchesKeyword = !currentQAKeyword || 
            item.title.toLowerCase().includes(currentQAKeyword.toLowerCase()) || 
            item.question.toLowerCase().includes(currentQAKeyword.toLowerCase()) || 
            item.category.toLowerCase().includes(currentQAKeyword.toLowerCase()) || 
            item.response.toLowerCase().includes(currentQAKeyword.toLowerCase());
        return matchesCategory && matchesKeyword;
    });

    // If on homepage (not qa-page), only show top 3 cards
    if (!isQAPage) {
        filtered = filtered.slice(0, 3);
    }

    if (filtered.length === 0) {
        container.innerHTML = `<div class="qa-card" style="text-align:center; color:var(--text-muted); padding:3rem;">查無符合條件之里民提案</div>`;
        return;
    }

    container.innerHTML = filtered.map((item, index) => {
        // 提取各案真實唯一原始編號（如 qa-11 -> 問 11：）
        const rawNum = item.id.replace(/\D/g, '') || String(index + 1);
        const qNum = String(rawNum).padStart(2, '0');

        // Check user agree status from localStorage
        const isAgreed = localStorage.getItem(`md2_agreed_${item.id}`) === 'true';
        const dynamicAgrees = parseInt(localStorage.getItem(`md2_agree_count_${item.id}`) || (item.agreeCount || 0), 10);
        
        // 取得此母案已審核採納的在地補充
        const approvedSubs = getApprovedSubProposals(item.id);
        const dynamicSubs = Math.max(approvedSubs.length, parseInt(localStorage.getItem(`md2_sub_count_${item.id}`) || (item.subCount || 0), 10));

        // 折疊式在地補充氣泡
        let subAccordionHtml = '';
        if (approvedSubs.length > 0) {
            subAccordionHtml = `
            <div class="qa-sub-accordion-wrapper" id="sub-wrapper-${item.id}" onclick="event.stopPropagation();">
                <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem;">
                    <button type="button" class="qa-sub-toggle-pill" onclick="toggleSubAccordion('${item.id}', event)" id="sub-pill-${item.id}">
                        <span>📍 已彙整 ${approvedSubs.length} 則在地里民現況補充</span>
                        <span class="qa-sub-toggle-arrow">▼</span>
                    </button>
                    ${!isQAPage ? `<a href="qa.html#${item.id}" class="qa-sub-link-qa" title="前往獨立專頁檢視完整討論串"><span>查看專頁完整討論 ↗</span></a>` : ''}
                </div>
                <div class="qa-sub-list" id="sub-list-${item.id}">
                    ${approvedSubs.map(sub => `
                        <div class="qa-sub-bubble">
                            <div class="qa-sub-bubble-header">
                                <div style="display:flex; align-items:center; gap:0.5rem;">
                                    <span class="qa-sub-bubble-author">👤 ${escapeHTML(sub.author)}</span>
                                    <span class="qa-sub-bubble-badge">${escapeHTML(sub.status || '🟢 已採納列管')}</span>
                                </div>
                                <span class="qa-sub-bubble-date">🕒 ${escapeHTML(sub.date ? sub.date.split(' ')[0] : '')}</span>
                            </div>
                            <div class="qa-sub-bubble-content">${escapeHTML(sub.content)}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
            `;
        }

        return `
        <div class="qa-card collapsible-qa" id="${item.id}">
            <div class="qa-card-header" onclick="toggleQAItem('${item.id}')">
                <div class="qa-header-left">
                    <span class="qa-q-prefix">問 ${qNum}：</span>
                    <span class="qa-title-text" id="qtitle-${item.id}" data-short="${escapeHTML(item.title)}" data-full="${escapeHTML(item.question)}">${escapeHTML(item.title)}</span>
                </div>
                <div class="qa-header-right">
                    <button type="button" class="btn-qa-expand-pill" id="qbtn-${item.id}">
                        <span class="pill-text">看全文 ▾</span>
                    </button>
                </div>
            </div>
            <div class="qa-card-body" id="qbody-${item.id}" style="display: none;">
                <div class="qa-expanded-meta">
                    <span class="qa-category-pill">${escapeHTML(item.category)}</span>
                    <span class="qa-author-time">反映里民：${escapeHTML(item.author)} ‧ ${escapeHTML(item.date)}</span>
                </div>
                <div class="qa-response-box" id="resp-box-${item.id}">
                    <div class="qa-response-header" onclick="toggleResponseDetail('${item.id}', event)">
                        <div class="qa-response-title-group">
                            <span class="qa-a-prefix">答 ${qNum}：</span>
                            <span class="qa-response-title-text">陳新昱 官方具體解決方案</span>
                        </div>
                        <button type="button" class="btn-qa-solution-pill" id="sbtn-${item.id}">
                            <span class="pill-text">看解方 ▾</span>
                        </button>
                    </div>
                    <div class="qa-response-content" id="resp-content-${item.id}" style="display: none;">
                        ${escapeHTML(item.response)}
                    </div>
                </div>

                <!-- 參與式里政互動列 (認同 +1 ＆ 補充附議) -->
                <div class="qa-interaction-bar" onclick="event.stopPropagation();">
                    <button class="btn-qa-agree ${isAgreed ? 'active' : ''}" onclick="handleAgreeVote('${item.id}', this, event)" id="agree-btn-${item.id}">
                        <span class="agree-icon">👍</span>
                        <span class="agree-text">${isAgreed ? '已認同' : '我也認同'}</span>
                        <span class="agree-count" id="agree-count-${item.id}">${dynamicAgrees}</span>
                    </button>
                    <button class="btn-qa-sub" onclick="openSubProposalModal('${item.id}', '${escapeHTML(item.title).replace(/'/g, "\\'")}', event)">
                        <span class="sub-icon">📝</span>
                        <span class="sub-text">補充在地現況 (${dynamicSubs})</span>
                    </button>
                </div>
                ${subAccordionHtml}
            </div>
        </div>
        `;
    }).join('');
}

// 單一互斥手風琴切換機制（開此題自動關閉其他題，並平滑錨定視窗焦點）
function toggleQAItem(cardId) {
    const allCards = document.querySelectorAll('.collapsible-qa');
    const targetCard = document.getElementById(cardId);
    if (!targetCard) return;

    const targetBody = document.getElementById(`qbody-${cardId}`);
    const isCurrentlyOpen = targetCard.classList.contains('open');

    // 互斥收合其他所有卡片
    allCards.forEach(card => {
        card.classList.remove('open');
        const body = card.querySelector('.qa-card-body');
        if (body) body.style.display = 'none';
        const pillText = card.querySelector('.btn-qa-expand-pill .pill-text');
        if (pillText) pillText.textContent = '看全文 ▾';
        const titleSpan = card.querySelector('.qa-title-text');
        if (titleSpan && titleSpan.dataset.short) {
            titleSpan.textContent = titleSpan.dataset.short;
        }
    });

    // 若原先未開啟，則展開目標卡片
    if (!isCurrentlyOpen) {
        targetCard.classList.add('open');
        if (targetBody) targetBody.style.display = 'block';
        const targetBtnText = targetCard.querySelector('.btn-qa-expand-pill .pill-text');
        if (targetBtnText) targetBtnText.textContent = '收起 ▴';
        const targetTitleSpan = targetCard.querySelector('.qa-title-text');
        if (targetTitleSpan && targetTitleSpan.dataset.full) {
            targetTitleSpan.textContent = targetTitleSpan.dataset.full;
        }

        // 智慧視窗平滑追蹤錨定：收合舊題後重新計算精準視窗位置，平滑鎖定至當前題目標頭
        setTimeout(() => {
            const headerOffset = 90; // 預留頂部浮動導航列安全高度
            const cardTop = targetCard.getBoundingClientRect().top;
            const targetScrollTop = window.pageYOffset + cardTop - headerOffset;
            window.scrollTo({
                top: targetScrollTop,
                behavior: 'smooth'
            });
        }, 30);
    }
}

function toggleSubAccordion(cardId, event) {
    if (event) event.stopPropagation();
    const wrapper = document.getElementById(`sub-wrapper-${cardId}`);
    if (wrapper) {
        wrapper.classList.toggle('open');
    }
}

function updateQATabCounts(allData) {
    if (!allData || !Array.isArray(allData)) return;

    const countAll = allData.length;
    const countPolicy = allData.filter(d => d.type === 'policy').length;
    const countInspect = allData.filter(d => d.type === 'inspect').length;
    const countCity = allData.filter(d => d.type === 'city').length;
    const countLaw = allData.filter(d => d.type === 'law').length;

    const tabBtns = document.querySelectorAll('.qa-tab-btn');
    tabBtns.forEach(btn => {
        const filter = btn.getAttribute('data-filter');
        if (filter === 'all') btn.textContent = `全部提案 (${countAll})`;
        else if (filter === 'policy') btn.textContent = `已納入政見 (${countPolicy})`;
        else if (filter === 'inspect') btn.textContent = `重點會勘 (${countInspect})`;
        else if (filter === 'city') btn.textContent = `專案爭取 (${countCity})`;
        else if (filter === 'law') btn.textContent = `法規解答 (${countLaw})`;
    });
}

function initQATabs() {
    const tabBtns = document.querySelectorAll('.qa-tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentQAFilter = btn.getAttribute('data-filter');
            renderQACards();
        });
    });

    // Initialize Keyword Search if on qa-page
    const searchInput = document.getElementById('qa-keyword-search');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            currentQAKeyword = e.target.value.trim();
            renderQACards();
        });
    }
}

// User Proposal Submission Handler
function initQAForm() {
    const form = document.getElementById('qa-submit-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const nameInput = document.getElementById('qa-user-name');
        const categoryInput = document.getElementById('qa-category');
        const contentInput = document.getElementById('qa-content');

        const userName = nameInput && nameInput.value.trim() ? nameInput.value.trim() : '明德里熱心里民';
        const category = categoryInput ? categoryInput.value : '#其他生活建議';
        const content = contentInput ? contentInput.value.trim() : '';

        if (!content) return;

        const now = new Date();
        const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

        const newProposal = {
            id: `user-qa-${Date.now()}`,
            category: category,
            type: 'all',
            statusText: '受理中・競選小組研擬回覆中',
            statusClass: 'status-pending',
            author: userName,
            date: dateStr,
            title: content.length > 25 ? content.substring(0, 25) + '...' : content,
            question: content,
            response: '【系統即時受理回饋】：感謝您的寶貴提案！競選小組與法律/民政顧問已接收到您的案件，目前正進行法規與權責研擬，完成具體 SOP 解決路徑後將正式公開更新於本牆！'
        };

        // 1. 本地即時上牆
        try {
            const stored = localStorage.getItem('md2_user_qa_proposals');
            const userCards = stored ? JSON.parse(stored) : [];
            userCards.unshift(newProposal);
            localStorage.setItem('md2_user_qa_proposals', JSON.stringify(userCards));
        } catch(e) {}

        // 2. 同步傳送至 Google 試算表 (核心二：里民共治有問必答庫)
        if (typeof GAS_QA_URL !== 'undefined' && GAS_QA_URL) {
            const contactInput = document.getElementById('qa-contact');
            const contactVal = contactInput ? contactInput.value.trim() : '';
            fetch(GAS_QA_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    action: 'submit_proposal',
                    userName: userName,
                    category: category,
                    contact: contactVal,
                    content: content
                })
            }).catch(err => console.log('GAS_QA submit proposal error:', err));
        }

        form.reset();
        showToast('提案已成功送達！個人端已即時受理上牆並同步至競選總部資料庫');
        renderQACards();

        // Scroll to the newly added card
        const cardEl = document.getElementById(newProposal.id);
        if (cardEl) {
            cardEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    });
}

// ==========================================================================
// 參與式里政互動：👍 我也認同 (+1) ＆ 📝 補充在地現況 (附議子單據)
// ==========================================================================
function handleAgreeVote(cardId, btnEl, event) {
    if (event) event.stopPropagation();
    const agreeKey = `md2_agreed_${cardId}`;
    const countKey = `md2_agree_count_${cardId}`;

    if (localStorage.getItem(agreeKey) === 'true') {
        showToast('您已為此案讚聲認同過囉！感謝您的熱情支持！');
        return;
    }

    // Mark as agreed in localStorage
    localStorage.setItem(agreeKey, 'true');
    const allData = getQAData();
    const item = allData.find(p => p.id === cardId);
    let curCount = parseInt(localStorage.getItem(countKey) || (item ? item.agreeCount : 20) || '20', 10) + 1;
    localStorage.setItem(countKey, curCount.toString());

    // Update UI dynamically
    if (btnEl) {
        btnEl.classList.add('active');
        const textSpan = btnEl.querySelector('.agree-text');
        const countSpan = btnEl.querySelector('.agree-count');
        if (textSpan) textSpan.textContent = '已認同';
        if (countSpan) countSpan.textContent = curCount;
    }

    // Trigger toast
    showToast(`👍 感謝認同！此案民意熱度已累積至 ${curCount} 票！`);

    // Sync to Google Sheets (核心二：提案Master 認同數 +1)
    if (typeof GAS_QA_URL !== 'undefined' && GAS_QA_URL) {
        fetch(GAS_QA_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                action: 'vote_agree',
                id: cardId,
                timestamp: new Date().toISOString()
            })
        }).catch(err => console.log('Vote agree sync error:', err));
    }
}

let currentSubParentId = null;
let currentSubParentTitle = '';

function openSubProposalModal(cardId, parentTitle, event) {
    if (event) event.stopPropagation();
    currentSubParentId = cardId;
    currentSubParentTitle = parentTitle;

    const modal = document.getElementById('sub-proposal-modal');
    const targetBox = document.getElementById('sub-parent-display');
    if (targetBox) {
        targetBox.textContent = `📌 正在為【${cardId} ‧ ${parentTitle}】補充在地現況`;
    }

    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeSubProposalModal() {
    const modal = document.getElementById('sub-proposal-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function handleSubProposalSubmit(e) {
    e.preventDefault();
    const nameInput = document.getElementById('qa-sub-name');
    const contactInput = document.getElementById('qa-sub-contact');
    const contentInput = document.getElementById('qa-sub-content');

    const userName = nameInput && nameInput.value.trim() ? nameInput.value.trim() : '明德里熱心里民';
    const contact = contactInput ? contactInput.value.trim() : '';
    const content = contentInput ? contentInput.value.trim() : '';

    if (!content) {
        alert('請輸入您的在地現況補充說明！');
        return;
    }

    // Increment local subCount
    const subCountKey = `md2_sub_count_${currentSubParentId}`;
    let curSubCount = parseInt(localStorage.getItem(subCountKey) || '1', 10) + 1;
    localStorage.setItem(subCountKey, curSubCount.toString());

    // Sync to Google Sheets (核心二：附議Detail 寫入)
    if (typeof GAS_QA_URL !== 'undefined' && GAS_QA_URL) {
        fetch(GAS_QA_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                action: 'submit_sub_proposal',
                parentId: currentSubParentId,
                parentTitle: currentSubParentTitle,
                userName: userName,
                contact: contact,
                content: content,
                timestamp: new Date().toISOString()
            })
        }).catch(err => console.log('Sub proposal sync error:', err));
    }

    const form = document.getElementById('sub-proposal-form');
    if (form) form.reset();

    closeSubProposalModal();
    showToast('📝 補充意見已成功送達！感謝您參與明德里共治，團隊將儘速彙整入本案！');
    renderQACards();
}

// ==========================================================================
// 4 選 1 讚聲身份表態 Modal & LocalStorage 防刷
// ==========================================================================
let currentSupportOption = 1;

function openSupportModal() {
    const modal = document.getElementById('support-modal');
    if (!modal) return;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeSupportModal() {
    const modal = document.getElementById('support-modal');
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Close modal when clicking backdrop
window.addEventListener('click', (e) => {
    const modal = document.getElementById('support-modal');
    if (e.target === modal) {
        closeSupportModal();
    }
    const voteSurveyModal = document.getElementById('vote-survey-modal');
    if (e.target === voteSurveyModal) {
        closeVoteSurveyModal();
    }
});

function selectSupportOption(optionNum) {
    currentSupportOption = optionNum;
    const labels = document.querySelectorAll('.support-option-label');
    labels.forEach((label, idx) => {
        if (idx === optionNum - 1) {
            label.classList.add('selected');
            const radio = label.querySelector('input[type="radio"]');
            if (radio) radio.checked = true;
        } else {
            label.classList.remove('selected');
        }
    });

    const customInputBox = document.getElementById('support-custom-input-box');
    const inputLabel = document.getElementById('support-input-label');
    const nameInput = document.getElementById('support-name-input');
    const consentBox = document.getElementById('support-consent-box');

    if (optionNum === 1) {
        if (customInputBox) customInputBox.classList.remove('show');
        if (consentBox) consentBox.classList.remove('show');
    } else if (optionNum === 2) {
        if (customInputBox) customInputBox.classList.add('show');
        if (inputLabel) inputLabel.textContent = '請輸入稱謂（例：明德路 陳先生 / 孔雀王朝 樂利家長）：';
        if (nameInput) nameInput.placeholder = '例：明德路 陳先生';
        if (consentBox) consentBox.classList.remove('show');
    } else if (optionNum === 3) {
        if (customInputBox) customInputBox.classList.add('show');
        if (inputLabel) inputLabel.textContent = '請輸入去識別姓名（例：孔雀王朝・陳○昱）：';
        if (nameInput) nameInput.placeholder = '例：孔雀王朝・陳○昱';
        if (consentBox) consentBox.classList.remove('show');
    } else if (optionNum === 4) {
        if (customInputBox) customInputBox.classList.add('show');
        if (inputLabel) inputLabel.textContent = '請輸入全名與社區（例：孔雀王朝：陳新昱）：';
        if (nameInput) nameInput.placeholder = '例：孔雀王朝：陳新昱';
        if (consentBox) consentBox.classList.add('show');
    }
}

function handleSupportSubmit(e) {
    e.preventDefault();
    const now = Date.now();
    const lastLikeTime = localStorage.getItem('md2_last_like_timestamp');
    const ONE_HOUR = 60 * 60 * 1000;

    if (lastLikeTime && (now - parseInt(lastLikeTime, 10) < ONE_HOUR)) {
        showToast('感謝您的熱情支持！系統已記錄您的讚聲');
        closeSupportModal();
        return;
    }

    let supporterName = '';
    const nameInput = document.getElementById('support-name-input');
    const consentCheck = document.getElementById('support-consent-check');

    if (currentSupportOption === 2) {
        supporterName = nameInput && nameInput.value.trim() ? nameInput.value.trim() : '熱心里民';
    } else if (currentSupportOption === 3) {
        supporterName = nameInput && nameInput.value.trim() ? nameInput.value.trim() : '明德里・陳○先生';
    } else if (currentSupportOption === 4) {
        if (consentCheck && !consentCheck.checked) {
            alert('請勾選同意公開具名條款，以符合個資法規自主意願');
            return;
        }
        supporterName = nameInput && nameInput.value.trim() ? nameInput.value.trim() + '（具名力挺）' : '陳新昱 支持者（具名力挺）';
    }

    // Save timestamp & increment likes
    localStorage.setItem('md2_last_like_timestamp', now.toString());
    const curLikes = parseInt(localStorage.getItem('md2_likes_count') || '342', 10) + 1;
    localStorage.setItem('md2_likes_count', curLikes.toString());

    // 同步傳送至 Google 試算表 (核心三：全里讚聲與官網流量庫)
    if (typeof GAS_STATS_URL !== 'undefined' && GAS_STATS_URL) {
        fetch(GAS_STATS_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                action: 'submit_support',
                supportType: currentSupportOption === 1 ? 'quick' : (currentSupportOption === 2 ? 'title' : (currentSupportOption === 3 ? 'mask' : 'full')),
                displayName: supporterName || '熱心里民',
                consent: (currentSupportOption === 4)
            })
        }).catch(err => console.log('GAS_STATS sync error:', err));
    }

    // Update UI numbers
    const likesEl = document.getElementById('stat-likes-count');
    if (likesEl) likesEl.textContent = curLikes.toLocaleString();

    // Add to ticker if has name
    if (supporterName) {
        const track = document.getElementById('supporters-ticker-track');
        if (track) {
            const newSpan = document.createElement('span');
            newSpan.className = 'ticker-item';
            newSpan.style.borderColor = 'var(--accent-secondary)';
            newSpan.textContent = `${supporterName} 👍`;
            track.insertBefore(newSpan, track.firstChild);
        }
    }

    closeSupportModal();
    showToast('讚聲成功！感謝您為科技里長陳新昱加油！');
}

// Toast helper
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

// Helper escape
function escapeHTML(str) {
    if (!str) return '';
    return str.replace(/[&<>'"]/g, tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
    }[tag] || tag));
}

// ==========================================================================
// Google 試算表三大核心即時雲端同步 (Live Cloud Sync for Stats, QA & Policies)
// ==========================================================================
function syncCloudData() {
    // 1. 同步核心三：全里讚聲與官網流量庫 (GAS_STATS_URL)
    if (typeof GAS_STATS_URL !== 'undefined' && GAS_STATS_URL) {
        fetch(GAS_STATS_URL)
            .then(res => res.json())
            .then(data => {
                if (!data || data.status !== 'success') return;
                if (data.views) {
                    localStorage.setItem('md2_views_count', data.views.toString());
                    const viewsEl = document.getElementById('stat-views-count');
                    if (viewsEl) viewsEl.textContent = Number(data.views).toLocaleString();
                }
                if (data.likes) {
                    localStorage.setItem('md2_likes_count', data.likes.toString());
                    const likesEl = document.getElementById('stat-likes-count');
                    if (likesEl) likesEl.textContent = Number(data.likes).toLocaleString();
                }
                if (Array.isArray(data.recentSupporters) && data.recentSupporters.length > 0) {
                    const track = document.getElementById('supporters-ticker-track');
                    if (track) {
                        track.innerHTML = '';
                        data.recentSupporters.forEach(name => {
                            const span = document.createElement('span');
                            span.className = 'ticker-item';
                            span.textContent = `${name} 👍`;
                            track.appendChild(span);
                        });
                    }
                }
            })
            .catch(err => console.log('GAS_STATS fetch error:', err));
    }

    // 2. 同步核心二：里民共治有問必答資料庫 (GAS_QA_URL)
    if (typeof GAS_QA_URL !== 'undefined' && GAS_QA_URL) {
        fetch(GAS_QA_URL)
            .then(res => res.json())
            .then(data => {
                if (!data || data.status !== 'success') return;

                if (Array.isArray(data.proposals) && data.proposals.length > 0) {
                    const approved = data.proposals.filter(p => p.status === '已審核公開' || p.status === 'approved' || !p.status);
                    if (approved.length > 0) {
                        const formatted = approved.map(item => {
                            const category = item.category || '#其他生活建議';
                            
                            let type = 'policy';
                            if (category.includes('會勘') || category.includes('環境') || category.includes('衛生') || category.includes('清淤')) {
                                type = 'inspect';
                            } else if (category.includes('交通') || category.includes('停車') || category.includes('號誌')) {
                                type = 'city';
                            } else if (category.includes('法規') || category.includes('大樓') || category.includes('補助') || category.includes('管委會')) {
                                type = 'law';
                            }

                            let statusText = '已納入競選政見白皮書';
                            let statusClass = 'status-policy';
                            if (type === 'inspect') {
                                statusText = '列為當選後優先重點會勘';
                                statusClass = 'status-inspect';
                            } else if (type === 'city') {
                                statusText = '市府權責・列為當選專案爭取';
                                statusClass = 'status-city';
                            } else if (type === 'law') {
                                statusText = '法規說明與行政程序解答';
                                statusClass = 'status-law';
                            }

                            let title = item.title;
                            if (!title && item.question) {
                                const qClean = item.question.trim().replace(/^問[：:]\s*|^【[^】]+】\s*/, '');
                                const firstLine = qClean.split('\n')[0].trim();
                                title = firstLine.length > 38 ? firstLine.substring(0, 38) + '...' : firstLine;
                            }

                            let dateStr = '2026-08-27';
                            if (item.date) {
                                if (item.date.includes('GMT') || item.date.includes('T')) {
                                    const parsedDate = new Date(item.date);
                                    if (!isNaN(parsedDate.getTime())) {
                                        dateStr = `${parsedDate.getFullYear()}-${String(parsedDate.getMonth() + 1).padStart(2, '0')}-${String(parsedDate.getDate()).padStart(2, '0')}`;
                                    }
                                } else {
                                    dateStr = item.date.split(' ')[0];
                                }
                            }

                            return {
                                id: item.id,
                                category: category,
                                type: type,
                                statusText: statusText,
                                statusClass: statusClass,
                                agreeCount: Number(item.agreeCount || 0),
                                subCount: Number(item.subCount || 0),
                                author: item.author || '明德里熱心里民',
                                date: dateStr,
                                title: title || '里民生活建議與提案',
                                question: item.question,
                                response: item.response
                            };
                        });

                        liveCloudQAData = formatted;
                        try {
                            localStorage.setItem('md2_cloud_qa_data', JSON.stringify(formatted));
                        } catch(e) {}
                    }
                }

                if (Array.isArray(data.subProposals) && data.subProposals.length > 0) {
                    liveCloudSubProposals = data.subProposals;
                    try {
                        localStorage.setItem('md2_cloud_sub_proposals', JSON.stringify(data.subProposals));
                    } catch(e) {}
                }

                renderQACards();
            })
            .catch(err => console.log('GAS_QA fetch error:', err));
    }

    // 3. 同步核心一：十五大政見民調庫 (GAS_POLICY_URL)
    if (typeof GAS_POLICY_URL !== 'undefined' && GAS_POLICY_URL) {
        fetch(GAS_POLICY_URL)
            .then(res => res.json())
            .then(data => {
                if (!data || data.status !== 'success') return;
                if (Array.isArray(data.policies) && data.policies.length > 0) {
                    const votesMap = {};
                    data.policies.forEach(p => {
                        votesMap[p.id] = Number(p.votes || p.base || 0);
                    });
                    liveCloudPolicyVotes = votesMap;
                    try {
                        localStorage.setItem('md2_cloud_policy_votes', JSON.stringify(votesMap));
                    } catch(e) {}

                    if (Array.isArray(POLICIES_DATA)) {
                        POLICIES_DATA.forEach(p => {
                            const isVoted = isPolicyInCooldown(p.id);
                            updatePolicyVoteUI(p.id, getPolicyVoteCount(p.id), isVoted);
                        });
                    }
                    renderPolicyRankings();
                }
            })
            .catch(err => console.log('GAS_POLICY fetch error:', err));
    }
}


// ==========================================================================
// 人氣數據指標儀表板 (Stats Count-Up & Dynamic Metric Bars)
// ==========================================================================
function initStatsDashboard() {
    const curViews = parseInt(localStorage.getItem('md2_views_count') || '1280', 10);
    const viewsEl = document.getElementById('stat-views-count');
    if (viewsEl) viewsEl.textContent = curViews.toLocaleString();

    const curLikes = parseInt(localStorage.getItem('md2_likes_count') || '342', 10);
    const likesEl = document.getElementById('stat-likes-count');
    if (likesEl) likesEl.textContent = curLikes.toLocaleString();

    // Trigger progress bars and count-up on scroll
    const statsSection = document.getElementById('stats-dashboard');
    if (!statsSection) return;

    let animated = false;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                animated = true;
                const barViews = document.getElementById('bar-views');
                const barLikes = document.getElementById('bar-likes');
                const barReply = document.getElementById('bar-reply');

                if (barViews) barViews.style.width = '78%';
                if (barLikes) barLikes.style.width = '85%';
                if (barReply) barReply.style.width = '100%';

                animateValue(viewsEl, Math.max(0, curViews - 40), curViews, 1200);
                animateValue(likesEl, Math.max(0, curLikes - 30), curLikes, 1200);
            }
        });
    }, { threshold: 0.2 });

    observer.observe(statsSection);
}

function animateValue(obj, start, end, duration) {
    if (!obj) return;
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const current = Math.floor(progress * (end - start) + start);
        obj.textContent = current.toLocaleString();
        if (progress < 1) {
            window.requestAnimationFrame(step);
        } else {
            obj.textContent = end.toLocaleString();
        }
    };
    window.requestAnimationFrame(step);
}

// LINE 內嵌瀏覽器導引彈窗展示 (若仍在 iOS LINE 內部)
function initLineGuideModal() {
    try {
        const ua = (navigator.userAgent || '').toLowerCase();
        if (ua.indexOf('line') > -1) {
            const lineModal = document.getElementById('lineGuideModal');
            if (lineModal) {
                lineModal.style.display = 'flex';
                lineModal.classList.remove('hidden');
            }
        }
    } catch(e) {}
}

// 預算大解密漸進式揭露切換（第 1 層展開與底部收起）
function openBudgetDetails() {
    const toggleWrap = document.getElementById('budget-toggle-wrapper');
    const content = document.getElementById('budget-collapsible-content');
    if (toggleWrap) toggleWrap.style.display = 'none';
    if (content) content.classList.add('active');
}

function closeBudgetDetails() {
    const toggleWrap = document.getElementById('budget-toggle-wrapper');
    const content = document.getElementById('budget-collapsible-content');
    const banner = document.getElementById('budget-banner');

    if (content) {
        content.classList.remove('active');
        const items = content.querySelectorAll('.budget-acc-item');
        items.forEach(it => it.classList.remove('open'));
    }
    if (toggleWrap) toggleWrap.style.display = 'flex';

    if (banner) {
        banner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

// 治理四大原則漸進式揭露切換
function openGovernanceDetails() {
    const toggleWrap = document.getElementById('governance-toggle-wrapper');
    const content = document.getElementById('governance-collapsible-content');
    if (toggleWrap) toggleWrap.style.display = 'none';
    if (content) content.classList.add('active');
}

function closeGovernanceDetails() {
    const toggleWrap = document.getElementById('governance-toggle-wrapper');
    const content = document.getElementById('governance-collapsible-content');
    const banner = document.getElementById('governance-banner');

    if (content) {
        content.classList.remove('active');
        const items = content.querySelectorAll('.budget-acc-item');
        items.forEach(it => it.classList.remove('open'));
    }
    if (toggleWrap) toggleWrap.style.display = 'flex';

    if (banner) {
        banner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

// 共同承諾漸進式揭露切換
function openPromisesDetails() {
    const toggleWrap = document.getElementById('promises-toggle-wrapper');
    const content = document.getElementById('promises-collapsible-content');
    if (toggleWrap) toggleWrap.style.display = 'none';
    if (content) content.classList.add('active');
}

function closePromisesDetails() {
    const toggleWrap = document.getElementById('promises-toggle-wrapper');
    const content = document.getElementById('promises-collapsible-content');
    const banner = document.getElementById('promises-banner');

    if (content) {
        content.classList.remove('active');
        const items = content.querySelectorAll('.budget-acc-item');
        items.forEach(it => it.classList.remove('open'));
    }
    if (toggleWrap) toggleWrap.style.display = 'flex';

    if (banner) {
        banner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

// 有問必答牆雙分流切換（看牆壁 vs 寫牆壁）
function openQAViewWall() {
    const toggleWrap = document.getElementById('qa-toggle-wrapper');
    const content = document.getElementById('qa-collapsible-content');
    if (toggleWrap) toggleWrap.style.display = 'none';
    if (content) content.classList.add('active');
    switchQAMode('view');
}

function openQAWriteWall() {
    const toggleWrap = document.getElementById('qa-toggle-wrapper');
    const content = document.getElementById('qa-collapsible-content');
    if (toggleWrap) toggleWrap.style.display = 'none';
    if (content) content.classList.add('active');
    switchQAMode('write');
}

function switchQAMode(mode) {
    const viewPane = document.getElementById('qa-view-pane');
    const writePane = document.getElementById('qa-write-pane');
    const tabBtnView = document.getElementById('tab-btn-view');
    const tabBtnWrite = document.getElementById('tab-btn-write');

    if (mode === 'write') {
        if (viewPane) viewPane.style.display = 'none';
        if (writePane) writePane.style.display = 'block';
        if (tabBtnView) tabBtnView.classList.remove('active');
        if (tabBtnWrite) tabBtnWrite.classList.add('active');

        // 平滑滾動至表單區塊並自動聚焦輸入框
        const form = document.getElementById('qa-submit-form');
        if (form) {
            form.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            setTimeout(() => {
                const input = document.getElementById('qa-user-name') || document.getElementById('qa-content');
                if (input) input.focus();
            }, 350);
        }
    } else {
        if (viewPane) viewPane.style.display = 'block';
        if (writePane) writePane.style.display = 'none';
        if (tabBtnView) tabBtnView.classList.add('active');
        if (tabBtnWrite) tabBtnWrite.classList.remove('active');
    }
}

function closeQADetails() {
    const toggleWrap = document.getElementById('qa-toggle-wrapper');
    const content = document.getElementById('qa-collapsible-content');
    const banner = document.getElementById('qa-banner');

    if (content) {
        content.classList.remove('active');
    }
    if (toggleWrap) toggleWrap.style.display = 'flex';

    if (banner) {
        banner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

// 我的經歷漸進式揭露切換
function openExperienceDetails() {
    const toggleWrap = document.getElementById('experience-toggle-wrapper');
    const content = document.getElementById('experience-collapsible-content');
    if (toggleWrap) toggleWrap.style.display = 'none';
    if (content) content.classList.add('active');
}

function closeExperienceDetails() {
    const toggleWrap = document.getElementById('experience-toggle-wrapper');
    const content = document.getElementById('experience-collapsible-content');
    const banner = document.getElementById('experience-banner');

    if (content) {
        content.classList.remove('active');
        const items = content.querySelectorAll('.budget-acc-item');
        items.forEach(it => it.classList.remove('open'));
    }
    if (toggleWrap) toggleWrap.style.display = 'flex';

    if (banner) {
        banner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

// 我要提案 / 諮詢表單折疊切換
function toggleQAForm() {
    const formContent = document.getElementById('qa-form-collapsible-content');
    const btn = document.getElementById('btn-qa-form-toggle');
    if (!formContent) return;

    if (formContent.style.display === 'none' || formContent.style.display === '') {
        formContent.style.display = 'block';
        if (btn) btn.innerHTML = '<span>📝 收合提案 / 諮詢表單 ▴</span>';
    } else {
        formContent.style.display = 'none';
        if (btn) btn.innerHTML = '<span>📝 我要提案 / 諮詢里政 ▾</span>';
    }
}

// Initialize Collapsible Accordions (Governance Principles, Promises, Experience, Budget with Mutex Single-Open Behavior)
function initCollapsibles() {
    // 預算解密、治理原則、共同承諾手風琴 (依個別容器分組互斥單開)
    const accordionContainers = document.querySelectorAll('.budget-accordion-list');
    accordionContainers.forEach(container => {
        const items = container.querySelectorAll('.budget-acc-item.collapsible');
        items.forEach(item => {
            item.addEventListener('click', () => {
                const wasOpen = item.classList.contains('open');
                items.forEach(b => b.classList.remove('open'));
                if (!wasOpen) {
                    item.classList.add('open');
                }
            });
        });
    });

    // 專業經歷手風琴 (互斥單開)
    const expCards = document.querySelectorAll('.experience-card.collapsible');
    expCards.forEach(card => {
        card.addEventListener('click', () => {
            const wasOpen = card.classList.contains('open');
            expCards.forEach(c => c.classList.remove('open'));
            if (!wasOpen) {
                card.classList.add('open');
            }
        });
    });
}

// 錨點導航與自動展開
function initHashAnchorNavigation() {
    const hash = window.location.hash;
    if (hash && hash.startsWith('#qa-')) {
        setTimeout(() => {
            const targetCard = document.querySelector(hash);
            if (targetCard) {
                targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
                const qaId = hash.replace('#', '');
                toggleQAItem(qaId);
                const subWrapper = document.getElementById(`sub-wrapper-${qaId}`);
                if (subWrapper) {
                    subWrapper.classList.add('open');
                }
            }
        }, 400);
    }
}

// Initial Render and setup
renderPolicies();
renderPolicyRankings();
initRankingAnimationObserver();
renderQACards();
initQATabs();
initQAForm();
initCollapsibles();
initStatsDashboard();
syncCloudData(); // 非同步雙軌即時拉取最新 Google 試算表 Q&A、附議與人氣數據
initHashAnchorNavigation();
initLineGuideModal();
initSmartSnap();

// Smart Scroll Alignment
function initSmartSnap() {
    let isScrollingTimer = null;
    let isUserInteracting = false;

    // Track user touch interactions
    window.addEventListener('touchstart', () => { isUserInteracting = true; }, { passive: true });
    window.addEventListener('touchend', () => { isUserInteracting = false; }, { passive: true });

    window.addEventListener('scroll', () => {
        clearTimeout(isScrollingTimer);

        isScrollingTimer = setTimeout(() => {
            // Don't snap if user is actively touching/dragging
            if (isUserInteracting) return;

            const policiesSection = document.getElementById('policies-section');
            if (!policiesSection) return;

            const sectionRect = policiesSection.getBoundingClientRect();
            const headerOffset = 95;

            // Only trigger snap if the user is inside the policies section area
            // If user scrolled up above the section, do nothing (allows smooth scrolling to Hero)
            if (sectionRect.top > headerOffset || sectionRect.bottom < 200) {
                return;
            }

            const cards = Array.from(document.querySelectorAll('.policy-card'));
            if (cards.length === 0) return;

            // Find the closest card to the header alignment point
            let closestCard = null;
            let minDistance = Infinity;

            cards.forEach(card => {
                const rect = card.getBoundingClientRect();
                const distance = Math.abs(rect.top - headerOffset);
                if (distance < minDistance) {
                    minDistance = distance;
                    closestCard = card;
                }
            });

            // Only snap if we are within a 140px threshold of the target card top
            if (closestCard && minDistance > 15 && minDistance < 150) {
                const cardTargetTop = window.scrollY + closestCard.getBoundingClientRect().top - headerOffset;
                window.scrollTo({
                    top: cardTargetTop,
                    behavior: 'smooth'
                });
            }
        }, 180); // 180ms debounce for natural feel
    }, { passive: true });
}

// ==========================================

// ESC 鍵關閉所有彈窗與抽屜
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' || e.key === 'Esc') {
        closeDrawer();
        if (typeof closeSupportModal === 'function') closeSupportModal();
        if (typeof closeVoteSurveyModal === 'function') closeVoteSurveyModal();
        if (typeof closeSubProposalModal === 'function') closeSubProposalModal();
    }
});

// 切換展開/收合首頁「新昱的應徵信」
function toggleHeroLetter() {
    const panel = document.getElementById('hero-letter-panel');
    const btn = document.getElementById('btn-read-letter');
    const arrow = document.getElementById('letter-btn-arrow');
    const action = document.getElementById('letter-btn-action');
    if (!panel) return;

    const isHidden = panel.style.display === 'none';
    if (isHidden) {
        panel.style.display = 'block';
        if (btn) btn.setAttribute('aria-expanded', 'true');
        if (action) action.textContent = '收起';
        if (arrow) arrow.textContent = '▴';
        panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } else {
        panel.style.display = 'none';
        if (btn) btn.setAttribute('aria-expanded', 'false');
        if (action) action.textContent = '點選';
        if (arrow) arrow.textContent = '▾';
        // 平滑滾動至頁面頂部（Hero 完整呈現），徹底解決收起後第一行「我想向各位里民」被頂部導航列截斷遮蔽的問題
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// ==========================================================================
// 8. PWA 桌面 App 安裝與「複製網址」快捷機制
// ==========================================================================

// PWA 狀態檢查與安裝按鈕自適應隱藏 (已安裝或由獨立 App 模式開啟時自動隱藏)
function updatePWAInstallVisibility() {
    const isPWA = (window.matchMedia && (
                    window.matchMedia('(display-mode: standalone)').matches ||
                    window.matchMedia('(display-mode: fullscreen)').matches ||
                    window.matchMedia('(display-mode: minimal-ui)').matches
                )) ||
                window.navigator.standalone === true ||
                window.location.search.indexOf('source=pwa') !== -1 ||
                (document.referrer && document.referrer.indexOf('android-app://') === 0) ||
                localStorage.getItem('md2_pwa_installed') === 'true';

    const btnInstall = document.getElementById('btn-footer-install');
    if (isPWA) {
        document.documentElement.classList.add('is-pwa-standalone');
        if (btnInstall) btnInstall.style.display = 'none';
    }
}

// 捕獲瀏覽器原生 beforeinstallprompt 事件
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    window.deferredPrompt = e;
    if (!window.matchMedia('(display-mode: standalone)').matches && !window.navigator.standalone) {
        localStorage.removeItem('md2_pwa_installed');
        document.documentElement.classList.remove('is-pwa-standalone');
        const btnInstall = document.getElementById('btn-footer-install');
        if (btnInstall) btnInstall.style.display = 'inline-flex';
    }
});

// 觸發 PWA 安裝程序
window.triggerPWAInstall = function triggerPWAInstall() {
    const ua = (navigator.userAgent || '').toLowerCase();
    const isIOS = /ipad|iphone|ipod/.test(ua) && !window.MSStream;

    // 1. 若瀏覽器已捕獲原生 PWA 安裝事件 (Chrome / Edge / Android)
    if (window.deferredPrompt) {
        window.deferredPrompt.prompt();
        window.deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult && choiceResult.outcome === 'accepted') {
                localStorage.setItem('md2_pwa_installed', 'true');
                document.documentElement.classList.add('is-pwa-standalone');
                const btnInstall = document.getElementById('btn-footer-install');
                if (btnInstall) btnInstall.style.display = 'none';
                showToast('📲 感謝您將明德里 2.0 專屬 App 加到桌面！');
            }
            window.deferredPrompt = null;
        });
        return;
    }

    // 2. 若為 iOS 裝置 (Safari 分享引導)
    if (isIOS) {
        const iosModal = document.getElementById('iosInstallModal');
        if (iosModal) {
            iosModal.classList.remove('hidden');
            iosModal.style.display = 'flex';
        }
        return;
    }

    // 3. Android / Chrome 備援引導
    const androidModal = document.getElementById('androidInstallGuideModal');
    if (androidModal) {
        androidModal.classList.remove('hidden');
        androidModal.style.display = 'flex';
    } else {
        alert('📲 請點擊瀏覽器右上角「⋮」➜ 選擇「安裝應用程式」或「加到主畫面」即可安裝到桌面！');
    }
};

// 監聽成功安裝完成事件
window.addEventListener('appinstalled', () => {
    localStorage.setItem('md2_pwa_installed', 'true');
    document.documentElement.classList.add('is-pwa-standalone');
    const btnInstall = document.getElementById('btn-footer-install');
    if (btnInstall) btnInstall.style.display = 'none';
    window.deferredPrompt = null;
    showToast('📲 明德里 2.0 App 已成功加到您的桌面！');
});

// 複製官網網址分享功能
window.copyWebsiteUrl = function copyWebsiteUrl() {
    const url = 'https://a0987183520.github.io/web/';
    const btn = document.getElementById('btn-footer-copy-url');
    const originalContent = btn ? btn.innerHTML : '';

    function handleSuccess() {
        showToast('📋 官網網址已成功複製！歡迎分享至 LINE 或社群！');
        if (btn) {
            btn.innerHTML = '<span class="btn-icon">✅</span><span class="btn-text">已複製網址</span>';
            setTimeout(() => {
                if (btn) btn.innerHTML = originalContent;
            }, 2500);
        }
    }

    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(handleSuccess).catch(() => {
            fallbackCopyUrl(url, handleSuccess);
        });
    } else {
        fallbackCopyUrl(url, handleSuccess);
    }
};

function fallbackCopyUrl(text, cb) {
    try {
        const input = document.createElement('input');
        input.setAttribute('value', text);
        input.style.position = 'fixed';
        input.style.left = '-9999px';
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);
        if (cb) cb();
    } catch (e) {
        prompt('請長按複製下方官網網址：', text);
    }
}

// 註冊 Service Worker 支援離線快取與 PWA 安裝
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js?v=23.01')
            .catch(() => {});
    });
}

// 初始化 PWA 狀態檢查
updatePWAInstallVisibility();
window.addEventListener('DOMContentLoaded', updatePWAInstallVisibility);


