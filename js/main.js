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
    14: 72   // 原 11 幸福寵物
};
const VOTE_COOLDOWN_MS = 60 * 60 * 1000; // 1 小時防刷冷卻
let pendingVotePolicyId = null;

const POLICIES_DATA = [
    {
        id: 1,
        category: "governance",
        categoryName: "健康樂齡與活力共融",
        title: "銀髮樂齡共餐 2.0",
        subtitle: "餐前動腦尋寶活力護照",
        image: "images/policy_13_dining.png?v=20260830_2",
        budgetSource: "社會局銀髮共餐專案 ✕ 志願服務專款",
        budgetSub: "（法定專款專用，零額外自費）",
        budgetDesc: "食材費由社會局專款專用全額核銷；動腦教材與志工四大保障（保險、學習時數、便當與交通誤餐補助）由文教專案支應，完全不排擠里內 88 萬修繕款！",
        highlight: "打破吃飯看電視的傳統模式！餐前 5 分鐘趣味動腦（1至50數字尋寶）、樂齡活力護照累積打卡換獎狀，結合青年志工四大法定保障，打造全齡幸福共融。",
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>`,
        hooks: [
            { question: "傳統老人共餐常常「大家坐著看電視、吃完便當就解散」，少了互動？", answer: "餐前 5 分鐘玩「1 至 50 數字尋寶」手腦挑戰，蓋章累積專屬「樂齡活力護照」，邊吃邊動腦、累積換獎狀！" },
            { question: "年輕志工來幫忙共餐，真的有法規保障與學習時數嗎？", answer: "依《志願服務法》提供公共意外險、官方服務學習時數、免費便當與法定交通誤餐補助，制度化吸引青年加入！" }
        ],
        howToDo: [
            "【餐前動腦 5 分鐘】：引進自研「1 至 50 數字尋寶」小遊戲，規則秒懂，長輩邊吃邊動腦，告別只看電視的無聊共餐。",
            "【活力護照打卡集點】：每位長輩發放大字版護照，完成動腦即蓋章，累計達標由里辦公處公開頒發榮譽獎狀表揚。",
            "【青年志工四大法定保障】：依《志願服務法》提供意外險、服務時數與便當補助，制度化吸引青年學子熱情陪伴。"
        ],
        whyPossible: "候選人具備 30 年軟體研發經驗自製無廣告 App，並具 8 年志工管理實務，能以最低成本為社區打造歡樂有尊嚴的共餐據點。"
    },
    {
        id: 2,
        title: "數位里政與參與式治理",
        subtitle: "你的意見就是我的政見",
        image: "images/policy_05_guide.png",
        budgetSource: "明德里 88 萬基層工作經費 ✕ 科技經理人自研維運",
        budgetSub: "（使用每年 88 萬基層款，零額外自費）",
        budgetDesc: "本系統由候選人發揮軟體架構長才親自開發維運，零外包建置費；每年 88 萬基層工程款依里民在線報修熱點公開排定修繕順序，告別黑箱排隊！",
        highlight: "修哪裡、怎麼修，里民說了算！建立 24 小時數位里政窗口與會勘透明機制，開辦「主動式福利篩檢與代辦諮詢」，把津貼補助與修繕服務一次辦到位。",
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>`,
        hooks: [
            { question: "明德里每年近百萬基層工程款，到底修了哪裡、花去哪了？", answer: "建立公開透明修繕地圖，依多數里民在線報修與票選迫切性排定優先序，告別黑箱排隊，每一分錢清清楚楚！" },
            { question: "想申請育兒津貼、身障或長照補助，每次都被繁瑣公文搞得頭昏腦脹？", answer: "里辦公處建立「主動式福利導航窗口」，提供一站式代辦諮詢與電子授權指引，免跑國稅局、一次辦到位！" }
        ],
        howToDo: [
            "【88 萬修繕順序由民意決定】：建立線上即時報修地圖，依多數里民迫切需求公開排定路面、水溝與路燈修繕順序。",
            "【會勘公開與 24H 數位客服】：會勘前 5 天公告議題、會勘後 3 天公開結果，並整合 24 小時線上 AI 指引。",
            "【主動式社福津貼導航】：主動協助身障生活補助（約 4,049 元）、育兒津貼與長照資源代辦送件，免跑冤枉路。"
        ],
        whyPossible: "候選人具備 10 年社區治理與 30 年軟體工程背景，能親自打造並維運數位民意系統，省下數十萬公帑外包費。"
    },
    {
        id: 3,
        title: "草地音樂節",
        subtitle: "每年春、秋兩季各辦 1 次，直接放進你的年度家庭行事曆",
        image: "images/policy_01_music.png",
        budgetSource: "文化局社造專案（5~20萬）✕ 區公所文康專款",
        budgetSub: "（完全不用動到明德里 88 萬基層款）",
        budgetDesc: "向新北市文化局申請「社區營造點專案補助」（每案 5 至 20 萬元）及區公所文康專款全額補助舞台音響與演出師資，完全不排擠里內既有修繕預算！",
        highlight: "每年春、秋兩季定期各辦 1 次！善用明德活動中心旁的公園草地，整合街頭藝人資源，打造散步就能抵達的草地音樂節。",
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>`,
        hooks: [
            { question: "假日想帶長輩小孩散步放鬆，為什麼非得塞車跑去大安森林公園？", answer: "善用市民活動中心旁現成公園綠地，每年春、秋兩季各辦 1 次，散步下樓就能享受草地野餐、在地街頭藝人與流行音樂演出！" },
            { question: "傳統政見辦活動，是不是又要花里民上百萬基層工程款？", answer: "完全不用！我們向新北市文化局申請社造專款全額補助，完全不排擠里內既有修繕預算！" }
        ],
        howToDo: [
            "【春秋兩季定期開辦】：固定於每年春、秋兩季假日試辦，散步下樓就能享受草地野餐與流行音樂演出。",
            "【串聯獨立樂手與學生社團】：結合流行音樂人脈，邀請優秀獨立樂手、街頭藝人及在地學校音樂社團共同登台展演。",
            "【嚴格防噪與草地保護】：落實場地合規申請、嚴格管控音量時段與垃圾清運，並備妥完整雨天備案。"
        ],
        whyPossible: "候選人擁有 20 年流行音樂產業背景，熟悉演出企劃與人脈資源，不需花大錢依賴公關外包即可高效打造優質音樂饗宴。"
    },
    {
        id: 4,
        title: "傳統課程潮流升級計畫",
        subtitle: "當長輩太鼓與流行樂團、舞團共演時",
        image: "images/policy_06_upgrade.png",
        budgetSource: "明德里基層工作經費 ✕ 流行音樂師資協作",
        budgetSub: "（使用每年近百萬基層款，零額外自費）",
        budgetDesc: "善用市民活動中心既有場地，由里基層款支應基礎維護，並結合候選人音樂圈師資人脈協同教學，發揮最大效益。",
        highlight: "既有課程（如太鼓班、舞蹈班）安心延續，並注入現代流行音樂與節奏元素，邀請年輕樂手與家人加入合練，舉辦跨世代公演。",
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>`,
        hooks: [
            { question: "長輩參加太鼓班、舞蹈班很有活力，但年輕兒孫卻很少來看表演？", answer: "保留既有課程的前提下，注入流行音樂改編節奏，舉辦跨世代公演，讓兒孫主動搶著幫阿公阿嬤拍照錄影、全家同樂！" },
            { question: "升級會不會強迫改動長輩習慣的傳統曲目或換掉原有教練？", answer: "堅持「自願加入與增量創新」原則，100% 尊重既有社團教練與練習時段，完全零額外自費！" }
        ],
        howToDo: [
            "【經典課程安心延續】：100% 保留長輩喜愛的太鼓班、舞蹈班與原有教練練習時段。",
            "【流行音樂潮流共演】：在長輩自願前提下融入流行音樂改編節奏，舉辦跨世代同台樂活公演。",
            "【成果專區留下精彩回憶】：幫長輩建立成果線上影音專區，讓兒孫搶著幫阿公阿嬤拍照錄影留念。"
        ],
        whyPossible: "候選人具備 20 年流行音樂產業背景，熟悉曲風改編與演出企劃，能邀請優秀導師協同教學，煥發傳統社團新活力。"
    },
    {
        id: 5,
        title: "智慧交通與號誌連鎖",
        subtitle: "解決海山、學府、學士、金城路口的塞車",
        image: "images/policy_04_traffic.png",
        budgetSource: "幹道動態綠波與道路會勘專案工程款",
        budgetSub: "（完全不用動到明德里 88 萬基層款）",
        budgetDesc: "由科技里長主動提出具體『動態綠波＋全向時相』工程計畫召開跨局處會勘，督促交通局交控中心優化連鎖與專案工程發包，零花費里公款！",
        highlight: "交通打結，我能解決！發揮 30 年資工數據專長，向交通局爭取明德路二段動態綠波與學府路口全向行人時相，人車徹底分流改善回堵。",
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"></polygon><line x1="9" y1="3" x2="9" y2="18"></line><line x1="15" y1="6" x2="15" y2="21"></line></svg>`,
        hooks: [
            { question: "明德路轉學府路（新北高工口），轉彎車總是被過馬路行人卡死、回堵成一團？", answer: "爭取尖峰時段採用「全向行人專用時相」，行人專屬綠燈安心過、車輛綠燈順暢轉，人車徹底分流，根本解決轉彎回堵！" },
            { question: "海山路、學府路、學士路、金城路四個路口，紅綠燈老是打架一路塞？", answer: "30 年資工數據專長，向交通局交控中心精準調閱秒數，爭取「全廊道動態智慧綠波」，串聯號誌連鎖，消除紅綠燈打架！" }
        ],
        howToDo: [
            "【學府路口人車徹底分流】：爭取尖峰時段設置「全向行人專用時相」，行人專屬綠燈安心過、車輛綠燈順暢轉，消除轉彎回堵。",
            "【明德路二段動態智慧綠波】：串聯海山路至金城路四節點號誌，爭取幹道動態綠波續進，消除連鎖塞車。",
            "【數據化精準提案會勘】：運用車流尖峰數據模型，促成交控中心即時微調各路口秒數配比。"
        ],
        whyPossible: "候選人擁有 30 年資訊工程與數據分析背景，能精準解讀車流流量與號誌週期邏輯，用專業數據直接與市府交通局交控中心對話會勘。"
    },
    {
        id: 6,
        title: "無人機與 AI 未來體驗營",
        subtitle: "每學期寒暑假定期開辦，長輩小孩都能輕鬆上手的科技啟蒙營",
        image: "images/policy_03_tech.png",
        budgetSource: "青年科普培育專案 ✕ 區公所文康專款",
        budgetSub: "（完全不用動到明德里 88 萬基層款）",
        budgetDesc: "候選人運用 30 年科技背景自帶微型安全設備與志工團隊，對接青年科普專案補助，讓里內孩子在最安全的室內防護網下免費體驗前瞻科技。",
        highlight: "每學期寒暑假定期開辦！為里內家庭提供安全的無人機與 AI 體驗課。無人機是未來趨勢，大人、小孩到長輩都適合學習，全面提升手腦協調與科技視野。",
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>`,
        hooks: [
            { question: "AI 與無人機時代來臨，孩子只能在手機螢幕上看別人玩？", answer: "30 年資工背景親自把關，引進 50g 以下微型安全無人機與防護網，每學期寒暑假定期開辦，讓孩子與長輩親手操控、啟發前瞻科技視野！" },
            { question: "體驗前瞻科技課程，家長需要花大錢報名校外昂貴夏令營嗎？", answer: "里長自備專業設備與志工師資，對接青年科普專案補助，免費提供給全體明德里民！" }
        ],
        howToDo: [
            "【室內微型安全飛行營】：每學期寒暑假舉辦，設置保護網與微型機專屬操作區，一對一安全員引導飛行體驗。",
            "【學童手機 AI 錯題本工作坊】：指導學童運用手機 AI 拍照整理專屬錯題複習本，拆解學業目標、培養自主學習力。",
            "【長青 AI 照片生成與修復】：手把手教長輩用手機玩出趣味老照片修復與藝術頭像生成，拉近跨世代科技距離。"
        ],
        whyPossible: "候選人具備 30 年軟體工程與科技管理背景，熟諳無人機教學與 AI 應用，能凝聚社區科技青年志工，以極低成本打造高安全性的實作環境。"
    },
    {
        id: 7,
        category: "democracy",
        categoryName: "人本交通與通學安全",
        title: "友善步道與通學安全",
        subtitle: "通學步道升級防跌",
        image: "images/policy_04_safety_2.png",
        budgetSource: "市府人本交通與通學步道專案工程款",
        budgetSub: "（爭取市府專案工程款，零排擠里款）",
        budgetDesc: "主動彙整里民人行危險點資料庫，召開跨局處會勘爭取市府專案款改善鋪面與盲區死角，零花費里公款！",
        highlight: "長輩散步防跌、學童安心上下學！借鏡 403 地震成功協調搶通重要便道之實績，建立全里危險點資料庫，爭取通學廊道升級與路口盲區改善。",
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 4v16M17 8l-4-4-4 4M7 20h10"></path><circle cx="12" cy="4" r="2"></circle></svg>`,
        hooks: [
            { question: "403 地震便道崩塌多方互推責任，巷弄危險鋪面長期無人管？", answer: "曾以實戰深入研究找到權責單位配合搶通便道！未來持續以數據化會勘爭取市府專案工程款，徹底消除通行死角！" },
            { question: "樂利國小周邊步道鋪面磨損、長輩推嬰兒車與輪椅常被高低差卡住？", answer: "建立「全里步行危險熱點資料庫」，精準向工務局與交通局會勘爭取「人本通學步道專案款」全面順平與防跌！" }
        ],
        howToDo: [
            "【重要便道搶險固化】：借鏡 403 地震成功協調權責機關搶通「捷運學府與孔雀王朝二期」下陷便道之實戰經驗，確保危險便道第一時間修復固化。",
            "【全里人行危險點資料庫】：線上彙整地不平、照明昏暗、視線死角與積水路段，依急迫性排定會勘改善。",
            "【通學步道全面防跌順平】：推動樂利國小周邊步道高低差順平與防滑鋪面，消除轉彎視線盲區，護幼安老。"
        ],
        whyPossible: "候選人具備實戰協調經驗，曾於 403 地震後深入研究並成功找到權責機關配合施工搶通重要便道；長期擔任校園志工與 10 年管委會實務，深諳公門運作。"
    },
    {
        id: 8,
        category: "governance",
        categoryName: "專業治理與精準服務",
        title: "鄰里和諧與權益溝通諮詢",
        subtitle: "知法律、熟法規、懂調解的EQ里長",
        image: "images/policy_10_harmony.png",
        budgetSource: "顧問律師與調解志工團隊公益支援",
        budgetSub: "（專業法治後盾，完全零公帑花費）",
        budgetDesc: "由競選團隊顧問律師群與具備 10 年管委會實務之專業志工提供公益諮詢服務，完全零公帑支出，以專業法理為鄰里和睦把關。",
        highlight: "引進法律與社區調解志工，提供鄰里噪音、騎樓占用、管道漏水與社區規約之理性溝建諮詢窗口。",
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg>`,
        hooks: [
            { question: "樓上深夜噪音、管線漏水求償無門，找里長只能「和稀泥」或勸你忍耐？", answer: "10 年管委會主委實務 ＋ 首創制裁濫訴勝訴求償律師費實績，具備專業住宅法規調解力，以法理情守護居住權益！" },
            { question: "遇到惡鄰居濫訴或管委會糾紛，請律師動輒數萬元花不起？", answer: "競選團隊顧問律師與法規志工提供公益諮詢，協助釐清相鄰關係與官方標準檢測途徑，避免走冤枉路！" }
        ],
        howToDo: [
            "【社區規約與權益免費諮詢】：定期設立諮詢時間，協助居民與管委會釐清公寓大廈管理條例與相鄰關係規範。",
            "【中立第三方溝通平台】：針對噪音、漏水與車位爭議，提供第三方中立溝通建議，化解情緒對立。",
            "【法治防禦規約經驗推廣】：分享主委任內推動防濫訴規約並獲法院勝訴確定之實績，守護熱心幹部與善良住戶。"
        ],
        whyPossible: "候選人擁有 10 年社區大廈管委會主委實務，曾推動法治防禦規約獲法院判決勝訴，並有競選團隊顧問律師提供強大法務後盾。"
    },
    {
        id: 9,
        category: "education",
        categoryName: "生活美學與未來教育",
        title: "斜槓導師徵才計畫",
        subtitle: "發掘鄰里才藝展演舞台",
        image: "images/policy_12_mentor.png",
        budgetSource: "青年創育與社區互助人才培力專案",
        budgetSub: "（使用市民活動中心免租金場地，零額外自費）",
        budgetDesc: "提供市民活動中心免租金場地，對接青年創育與社區互助補助，以極低成本為社區搭建斜槓展演舞台，形成良性人才生態！",
        highlight: "招募里內故事媽媽、EQ爸爸、手工皂、AI剪輯師、獨立樂手與熱舞導師，在活動中心開辦多元工作坊。",
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`,
        hooks: [
            { question: "里內很多身懷絕技的達人（故事媽媽、EQ志工、手工皂、AI剪輯、樂手），卻找不到舞台？", answer: "建立「明德斜槓導師資料庫」，提供市民活動中心免租金場地，讓鄰里才藝在社區發光發熱！" },
            { question: "開辦才藝工作坊會不會變成昂貴的商業推銷？", answer: "堅持公益共享與材料費透明原則，結合社造補助，為里民提供平價甚至免費的多元成長課程！" }
        ],
        howToDo: [
            "【建立社區斜槓人才庫】：公開徵求具備才藝與教學熱情的里民報名（故事媽媽、EQ爸爸、手工皂、AI剪輯、樂手等），建立師資庫。",
            "【活動中心免租金場地支持】：提供活動中心免租金場地，協助開辦小班制手作、AI 影片創用或音樂工作坊。",
            "【社區成果發表舞台】：結合社區節慶或草地音樂節，為斜槓導師與學員舉辦成果發表展演。"
        ],
        whyPossible: "候選人擁有 20 年流行音樂產業經紀與 8 年 EQ 志工培訓背景，擅長挖掘人才天賦、規劃課程與展演舞台，能吸引豐富的斜槓導師加入。"
    },
    {
        id: 10,
        category: "governance",
        categoryName: "專業治理與精準服務",
        title: "AI健康管家與獨老守護",
        subtitle: "一顆麵包與一次血壓，解決子女的擔心",
        image: "images/policy_07_health.png",
        budgetSource: "國家 62.5 億獨老安居專案 ✕ 長照 2.0",
        budgetSub: "（完全不用動到明德里近百萬基層款）",
        budgetDesc: "直接對接中央「擴大獨老在宅安居計畫」及長照專款，協助長者申請公費「緊急救援防跌系統」，由中央與市府全額或高額補助！",
        highlight: "開設實用 AI 健康工作坊，對接衛福部 62.5 億獨老安危專案，導入主動式福利媒合、物資智慧適配與居家緊急防跌，讓三明治世代安心工作。",
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>`,
        hooks: [
            { question: "你知道嗎？如何用一塊新鮮麵包，及時挽救一個獨居老人？", answer: "志工親自按門鈴送上一塊麵包，不僅是送暖，更是第一時間「敲門確認安危與防跌」的救命媒介！" },
            { question: "你知道政府每年編列超過 60 億照顧長輩專款嗎？", answer: "衛福部有 62.5 億獨老安居專案，由懂法規的里長主動協助申辦身障補助（每月約 4,049 元）與公費防跌求救系統！" }
        ],
        howToDo: [
            "【送餐敲門確認安危】：以物資與送餐為媒介，志工到府按門鈴親自交付，第一時間掌握長者起居與防跌安危。",
            "【主動福利導航與公費防跌】：主動協助申請每月身障生活補助（約 4,049 元）及衛福部公費「智慧緊急救援防跌系統」。",
            "【長輩手機 AI 拍照健康紀錄】：手把手教長輩用手機拍照紀錄藥袋與血壓數值，讓外地子女隨時安心。"
        ],
        whyPossible: "候選人具備 30 年資工背景與 10 年社區治理實務，深諳政府社福與衛政申請法規，能把國家級資源轉化為長輩的居家守護網。"
    },
    {
        id: 11,
        title: "EQ 教育課程",
        subtitle: "每季定期開辦 1 期共學工作坊，陪伴跨世代家庭和諧溝通",
        image: "images/policy_02_eq_1.png",
        budgetSource: "教育部家庭教育專案 ✕ 校里跨域合作",
        budgetSub: "（完全不用動到明德里 88 萬基層款）",
        budgetDesc: "結合候選人 8 年樂利國小 EQ 志工組長團隊師資，免費借用校園空間並聯合提報教育部家庭教育專案全額補助，零公帑為里民開辦高品質工作坊。",
        highlight: "每季定期開辦 1 期共學工作坊！涵蓋孩子、家長與長者都能參與的情緒管理課程，陪伴大家了解情緒、覺察委屈、避免遷怒、遠離霸凌。",
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a5 5 0 1 0 10 0v-2H12z"></path><path d="M12 10a8 8 0 1 0 8 8v-8H12z"></path><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line></svg>`,
        hooks: [
            { question: "遇到孩子情緒暴走、長輩委屈遷怒，只能在家裡互相受氣？", answer: "8 年樂利國小 EQ 志工組長帶領團隊經驗，把經過 7 套專業證照驗證的情緒課程引進明德里，每季定期開辦 1 期，引導學童覺察情緒、建立自信、遠離霸凌！" },
            { question: "去外面上專業心理成長或親子溝通課，動輒數千甚至上萬元？", answer: "結合樂利國小場地與教育部家庭教育專案全額補助，由志工團隊公益授課，里民 100% 免費共學！" }
        ],
        howToDo: [
            "【兒童與親子情緒共學班】：每季開辦 1 期，透過遊戲與繪本引導孩子認識情緒、管理生氣與學習人際溝通合作。",
            "【家長與三明治世代支持坊】：分享正向管教、自我覺察與溝通實務，協助父母化解教養焦慮與家庭摩擦。",
            "【長者樂齡同理茶會】：開辦長青情緒調適與同理傾聽互動茶會，促進跨世代同理與鄰里和睦。"
        ],
        whyPossible: "候選人擔任樂利國小 EQ 志工組長多年，具備 8 年講師資歷與 7 套專業證照，帶領過 50 餘名志工團隊，擁有完整師資與教材開發經驗。"
    },
    {
        id: 12,
        category: "culture",
        categoryName: "空間活化與美學生活",
        title: "全齡多元活動中心",
        subtitle: "空間活化共學角",
        image: "images/policy_09_lounge.png",
        budgetSource: "市民活動中心活化專案 ✕ 明德里基層款",
        budgetSub: "（公有空間活化，零額外自費）",
        budgetDesc: "運用明德市民活動中心既有公有設施，以活動中心專案活化補助及每年里基層款支應，零額外負擔落實全齡共享。",
        highlight: "遵循增量不取代原則，開放活動中心夜間與假日空間成立全齡共學角，讓青年與長者獲得溫馨交流空間。",
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>`,
        hooks: [
            { question: "活動中心白天熱鬧，晚上與假日卻常常鐵捲門拉下、一片漆黑？", answer: "遵循「增量不取代」原則，完全不影響長輩白天共餐，開放平日夜間與假日為「全齡共學角」，提供溫馨明亮的公共空間！" },
            { question: "年輕里民下班想找個安靜看書、做專案或桌遊交流的地方，只能花錢去咖啡廳？", answer: "活動中心提供明亮溫馨的閱讀自習角落與青年志工輪值，里民免費共享優質公共資產！" }
        ],
        howToDo: [
            "【夜間與假日全齡共學角】：遵循「增量不取代」原則，完全不影響白天共餐，開放平日夜間與假日為桌遊、閱讀自修與文化交流角。",
            "【優化內部設施與安靜角】：維護活動中心內部燈光與座椅設施，打造溫馨安靜的自主學習與共修角落。",
            "【青年志工輪值維護清潔】：招募社區青年志工輪值服務，維持公共設施安全與現場清潔管理。"
        ],
        whyPossible: "候選人具備 10 年社區大廈管委會經驗，深諳公共空間規約管理與里民需求協調，能以最小花費落實友善空間活化。"
    },
    {
        id: 13,
        category: "governance",
        categoryName: "專業治理與長照支持",
        title: "AI 預防失智 App 體驗營",
        subtitle: "AI 活化大腦刺激",
        image: "images/policy_08_brain.png",
        budgetSource: "失智友善社區專案 ✕ 長者健康促進補助",
        budgetSub: "（完全不用動到明德里近百萬基層款）",
        budgetDesc: "結合失智友善社區專案及長者健康促進補助，引進臨床驗證的健腦 App 與教具，由專案補助支應，完全不佔用里內修繕費用。",
        highlight: "引進臨床 AI 腦力健能遊戲延緩退化，主動協助阿茲海默與失智長輩對接身障生活補助與長照 2.0 喘息資源，做三明治世代最堅實的後盾。",
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-2.04z"></path><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-2.04z"></path></svg>`,
        hooks: [
            { question: "長輩常常忘東忘西，但排斥去醫院做冰冷的認知測驗？", answer: "30 年軟體開發經驗，研發「1 至 50 數字尋寶」等大字體趣味手腦遊戲，在歡笑遊戲中活化大腦神經、延緩退化！" },
            { question: "家中有失智長輩，三明治世代只能一人扛起沉重的照顧壓力？", answer: "主動對接失智友善專案與長照 2.0 喘息服務，引進政府公費照顧人力與日間照顧，讓子女能安心上班喘息！" }
        ],
        howToDo: [
            "【樂齡 AI 大腦健能體驗角】：活動中心設置大螢幕平板與臨床驗證的健腦遊戲，長輩輕鬆上手玩遊戲動腦。",
            "【主動式身障與長照綠色窗口】：主動協助疑似或確診失智長輩申請身障生活補助（約 4,049 元）與長照喘息服務。",
            "【照顧者心理支持工作坊】：開辦長照家庭照顧者 EQ 心理支持工作坊，陪伴三明治世代走出照顧焦慮。"
        ],
        whyPossible: "候選人具備 8 年 EQ 講師與 30 年科技管理背景，深知長照家庭心理痛點與法規流程，能引入適合社區的健能遊戲與支持體系。"
    },
    {
        id: 14,
        category: "culture",
        categoryName: "空間活化與美學生活",
        title: "幸福寵物空間",
        subtitle: "優化綠地寵物友善",
        image: "images/policy_11_pet.png",
        budgetSource: "明德里基層工作經費 ✕ 動保處推廣專案",
        budgetSub: "（使用每年近百萬基層款，經濟實惠）",
        budgetDesc: "便攜袋補充站與清潔箱採購由每年「里基層工作經費」支應（每座僅數百至千餘元），並結合動保宣導品與民間志工共同維護，經濟實惠又乾淨。",
        highlight: "於明德公園周邊爭取規劃寵物撿便袋補充站與繫留設施，兼顧公園乾淨衛生與毛小孩活動權益。",
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="22"></line></svg>`,
        hooks: [
            { question: "帶毛小孩去公園散步，忘記帶便袋或找不到地方洗手牽繩很尷尬？", answer: "在公園適當角落爭取設置「寵物便攜袋補充站」與友善牽繩繫留區，方便飼主隨手維護環境乾淨！" },
            { question: "寵物設施會不會引起不養寵物長輩與家長的反彈？", answer: "倡導負責任飼主文化與志工定期維護草地，兼顧公共衛生與毛小孩活動權益，創造雙贏！" }
        ],
        howToDo: [
            "【設置便攜袋補充站與清潔箱】：爭取於公園適當地點設置撿便袋補充站與清掃工具箱，方便飼主隨手維護環境乾淨。",
            "【友善牽繩繫留角落】：規劃友善牽繩繫留角落，讓飼主在休憩時能安心固定牽繩。",
            "【毛小孩健康與衛教講座】：邀請獸醫師與訓練師分享教養與衛教常識，兼顧公共衛生與動物福利。"
        ],
        whyPossible: "候選人具備 10 年社區規約管理與空間協調經驗，能尊重非養寵物里民對環境衛生的訴求，建立雙贏管理機制。"
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

// 取得特定計畫支持票數 (初調基底 + 本地真實累積)
function getPolicyVoteCount(policyId) {
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

    const deviceId = getVoterDeviceId();
    const policy = POLICIES_DATA.find(p => p.id === policyId);
    const policyTitle = policy ? policy.title : `計畫 ${policyId}`;
    const newCount = getPolicyVoteCount(policyId);

    // 1. 更新卡片與抽屜 UI 狀態
    updatePolicyVoteUI(policyId, newCount, true);

    // 2. 即時更新下方「全里民意即時榜」長條圖與排行
    renderPolicyRankings();

    // 3. 觸發按鈕浮動 +1 微粒子特效
    createVotePlusOneParticle(policyId);

    // 4. 觸發全螢幕放大脈衝愛心微動畫
    showVoteSuccessAnimation(policyId, policyTitle);

    // 4. 同步拋送數據至 Google Apps Script 雲端試算表
    if (GOOGLE_SCRIPT_URL) {
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
        fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                action: 'policy_vote',
                deviceId: deviceId,
                policyId: `計畫 ${policyId < 10 ? '0' + policyId : policyId}`,
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
        msgEl.textContent = `已將您的支持列入「計畫 ${pNum} ‧ ${policyTitle}」推動優先序！`;
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
            <div class="ranking-bar-item ${itemExtraClass} ${itemRankClass}" data-policy-id="${item.id}" onclick="openDrawer(${item.id})" title="點擊查看「計畫 ${item.id < 10 ? '0' + item.id : item.id} ‧ ${item.title}」詳細規劃與經費解密">
                <div class="ranking-item-header">
                    <div class="ranking-item-left">
                        <span class="ranking-pos-badge ${rankClass}">第${rank}名</span>
                        <span class="ranking-item-title">計畫 ${item.id < 10 ? '0' + item.id : item.id} ‧ ${item.title}</span>
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
        if (policy.id === 7) {
            imageHtml = `
                <div class="before-after-slider card-slider-7" onclick="event.stopPropagation()">
                    <div class="slider-image-before">
                        <img src="images/policy_04_safety_1.jpg" alt="現況：人行道標線磨損補丁（實地現況）">
                    </div>
                    <div class="slider-image-after" id="card-slider-image-after-7">
                        <img src="images/policy_04_safety_2.png" alt="願景：防滑平整友善人行步道 - 概念示意圖">
                    </div>
                    <input type="range" min="0" max="100" value="50" class="slider-range" id="card-slider-range-7" aria-label="Before/After 拖拽滑塊對比" onclick="event.stopPropagation()">
                    <div class="slider-line" id="card-slider-line-7"></div>
                    <div class="slider-button" id="card-slider-button-7"></div>
                    <span class="slider-label slider-label-before">改建願景</span>
                    <span class="slider-label slider-label-after">現況實景</span>
                    <span class="vision-badge">概念示意圖</span>
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
                    <span class="policy-number">計畫 ${policy.id < 10 ? '0' + policy.id : policy.id}</span>
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
                <h3>${policy.title}</h3>
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

        // 如果是計畫 14，初始化卡片上的滑塊事件
        if (policy.id === 7) {
            const cardRange = card.querySelector('#card-slider-range-7');
            const cardAfterImage = card.querySelector('#card-slider-image-after-7');
            const cardLine = card.querySelector('#card-slider-line-7');
            const cardButton = card.querySelector('#card-slider-button-7');

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

    const numEl = document.getElementById('drawer-number');
    if (numEl) {
        numEl.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
                <span>計畫 ${formattedNum}</span>
                <button class="btn-want-vote btn-want-vote-drawer ${isVoted ? 'voted' : ''}" data-policy-id="${policy.id}" onclick="handleWantVoteClick(event, ${policy.id})" title="表達您的支持">
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
        `;
    }
    const titleEl = document.getElementById('drawer-title');
    if (titleEl) titleEl.textContent = policy.title;

    // Populate drawer hook section (痛點大解密 / 你知道嗎？)
    const hookBoxEl = document.getElementById('drawer-hook-box');
    const hookContentEl = document.getElementById('drawer-hook-content');
    if (hookBoxEl && hookContentEl) {
        hookContentEl.innerHTML = '';
        if (Array.isArray(policy.hooks) && policy.hooks.length > 0) {
            policy.hooks.forEach(h => {
                const card = document.createElement('div');
                card.className = 'hook-card';
                card.innerHTML = `
                    <div class="hook-card-title">❓ ${escapeHTML(h.question)}</div>
                    <p class="hook-card-text">${escapeHTML(h.answer)}</p>
                `;
                hookContentEl.appendChild(card);
            });
            hookBoxEl.style.display = 'block';
        } else {
            hookBoxEl.style.display = 'none';
        }
    }

    // Populate drawer budget section
    const budgetBadgeEl = document.getElementById('drawer-budget-badge');
    if (budgetBadgeEl) budgetBadgeEl.textContent = policy.budgetSource || '明德里基層工作經費';
    const budgetSubEl = document.getElementById('drawer-budget-sub');
    if (budgetSubEl) budgetSubEl.textContent = policy.budgetSub || '（使用每年近百萬基層款）';
    const budgetTextEl = document.getElementById('drawer-budget-text');
    if (budgetTextEl) budgetTextEl.textContent = policy.budgetDesc || '由相關公務預算依法支應。';

    // Populate drawer image

    // Populate drawer image
    const drawerImgWrapper = document.getElementById('drawer-image-wrapper');
    if (drawerImgWrapper) {
        // 如果是計畫 02 (id 為 2)，渲染三張圖
        if (policy.id === 11) {
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
        } else if (policy.id === 7) {
            // 如果是計畫 14 (id 為 14)，渲染 Before/After 拖拽對比滑塊
            drawerImgWrapper.style.display = 'block';
            drawerImgWrapper.innerHTML = `
                <div class="before-after-slider">
                    <div class="slider-image-before">
                        <img src="images/policy_04_safety_1.jpg" alt="現況：人行道標線磨損補丁（實地現況）">
                    </div>
                    <div class="slider-image-after" id="slider-image-after">
                        <img src="images/policy_04_safety_2.png" alt="願景：防滑平整友善人行步道 - 概念示意圖">
                    </div>
                    <input type="range" min="0" max="100" value="50" class="slider-range" id="slider-range" aria-label="Before/After 拖拽滑塊對比">
                    <div class="slider-line" id="slider-line"></div>
                    <div class="slider-button" id="slider-button"></div>
                    <span class="slider-label slider-label-before">改建願景</span>
                    <span class="slider-label slider-label-after">現況實景</span>
                    <span class="vision-badge">概念示意圖</span>
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
            const li = document.createElement('li');
            li.className = 'drawer-list-item';
            li.innerHTML = `
                <span class="drawer-list-bullet"></span>
                <span class="drawer-list-text">${step}</span>
            `;
            howToDoList.appendChild(li);
        });
    }

    // Why possible section
    const capText = document.getElementById('drawer-capability-text');
    if (capText) capText.textContent = policy.whyPossible;


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

// Form Submission handling (Prevent actual action, show nice notice)
const fbForm = document.getElementById('feedback-form');
if (fbForm) {
    fbForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('感謝您的回饋！競選決策小組已收到您的意見，我們將認真評估並納入未來計畫的修正考量！');
        fbForm.reset();
    });
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
// Google Apps Script (GAS) 雲端試算表 API 串接端點
// ==========================================================================
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzJVXWjcRGzSDMWBsO6aHQR-UbX5BOM6pcKpNpKVYMYVwj8ceWV6Pu9X7UP6ldlPrTn/exec';

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

        // 2. 同步傳送至 Google 試算表 (GAS 雲端資料庫)
        if (GOOGLE_SCRIPT_URL) {
            const contactInput = document.getElementById('qa-contact');
            const contactVal = contactInput ? contactInput.value.trim() : '';
            fetch(GOOGLE_SCRIPT_URL, {
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
            }).catch(err => console.log('Google Sheets sync error:', err));
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

    // Sync to Google Sheets (Proposals_Master AgreeCount + 1)
    if (GOOGLE_SCRIPT_URL) {
        fetch(GOOGLE_SCRIPT_URL, {
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

    // Sync to Google Sheets (Proposals_Detail)
    if (GOOGLE_SCRIPT_URL) {
        fetch(GOOGLE_SCRIPT_URL, {
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

    // 同步傳送至 Google 試算表 (GAS 雲端資料庫)
    if (GOOGLE_SCRIPT_URL) {
        fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                action: 'submit_support',
                supportType: currentSupportOption === 1 ? 'quick' : (currentSupportOption === 2 ? 'title' : (currentSupportOption === 3 ? 'mask' : 'full')),
                displayName: supporterName || '熱心里民',
                consent: (currentSupportOption === 4)
            })
        }).catch(err => console.log('Google Sheets sync error:', err));
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
// Google 試算表雙向即時雲端同步 (Live Cloud Sync for Stats & QA Data)
// ==========================================================================
function syncCloudData() {
    if (!GOOGLE_SCRIPT_URL) return;

    fetch(GOOGLE_SCRIPT_URL)
        .then(res => res.json())
        .then(data => {
            if (!data || data.status !== 'success') return;

            // 1. 同步即時造訪與讚聲人氣數據
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

            // 2. 同步 Google 試算表最新審核公開之有問必答題目與官方回覆 (100% 以 Google Sheet 為唯一真實來源)
            if (Array.isArray(data.proposals) && data.proposals.length > 0) {
                const approved = data.proposals.filter(p => p.status === '已審核公開' || p.status === 'approved' || !p.status);
                if (approved.length > 0) {
                    const formatted = approved.map(item => {
                        const category = item.category || '#其他生活建議';
                        
                        // 自動依議題分類關鍵字推導類型
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

                        // 標題由提問內容自身推導，絕不借用舊題標題，100% 對齊試算表提問原文
                        let title = item.title;
                        if (!title && item.question) {
                            const qClean = item.question.trim().replace(/^問[：:]\s*|^【[^】]+】\s*/, '');
                            const firstLine = qClean.split('\n')[0].trim();
                            title = firstLine.length > 38 ? firstLine.substring(0, 38) + '...' : firstLine;
                        }

                        // 日期格式清理
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

            // 3. 同步 Google 試算表最新審核採納之附議明細
            if (Array.isArray(data.subProposals) && data.subProposals.length > 0) {
                liveCloudSubProposals = data.subProposals;
                try {
                    localStorage.setItem('md2_cloud_sub_proposals', JSON.stringify(data.subProposals));
                } catch(e) {}
            }

            // 即時平滑更新 Q&A 卡片清單 (含母案與附議子案)
            renderQACards();
        })
        .catch(err => {
            console.log('Live cloud sync fallback:', err);
        });
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

// ==========================================
// Hero 6 大特質與經歷詳情彈窗資料庫與互動邏輯
// ==========================================
const HERO_TRAITS_DATA = {
    elder: {
        title: '長輩照顧好，青年無後顧',
        titleClass: 'title-glow-emerald',
        badge: '',
        icon: '👴',
        subtitle: '',
        lead: '',
        hideTopClose: true,
        sections: [
            {
                title: '🌟 還沒上任就有政績<br>自行研發 免費分享給鄰里',
                items: [
                    { label: '預防失智 App', text: '1~50 手腦訓練小遊戲', btnText: '點此試玩', btnUrl: 'https://pod0987183520.github.io/1to50' },
                    { label: '隨手 AI 健康營', text: '隨手拍照輕鬆管理血壓、提醒按時吃藥' },
                    { label: '隨手 AI 體驗營', text: '隨手拍照重返年輕、搞笑照片、比孫子還厲害' }
                ]
            },
            {
                title: '🌟 核心承諾：',
                items: [
                    { label: '長青課程再升級', text: '太鼓、太極、關節、韻律等課程保留再融入新創意' },
                    { label: '銀髮共餐更好玩', text: '融入趣味 AI 互動小遊戲，認識更多人，氣氛更歡樂' },
                    { label: '世代融合交流', text: '帶領年輕兒孫走入長輩生活圈' }
                ]
            },
            {
                title: '💡 衛福部專案與重點關懷：',
                hook: {
                    questions: [
                        '❓ 你知道嗎？衛福部有 62.5 億獨老安居專案',
                        '❓ 你知道嗎？家裡只有兩位長輩同住，依法也算重點關懷對象！'
                    ],
                    btnText: '查看詳情',
                    drawerId: 10
                }
            }
        ],
        quote: ''
    },
    eq: {
        title: '覺察情緒，化解鄰里對立',
        titleClass: 'title-glow-emerald',
        badge: '',
        icon: '🤝',
        subtitle: '',
        lead: '',
        hideTopClose: true,
        sections: [
            {
                title: '🌟 還沒上任就有政績',
                items: [
                    { label: '8年樂利EQ志工+2屆EQ組長', text: '取得 7 套專業情緒教育證照，帶領 70 位志工入班陪伴學童' },
                    { label: '學EQ不是教你吞委屈', text: '生氣可被理解，表達方式才是重點，當面對霸凌時，更需足夠智慧與勇氣！但絕對不是以暴制暴', btnText: '查看詳情', drawerId: 8 }
                ]
            },
            {
                title: '💡 痛點問題與重點關懷：',
                hook: {
                    questions: [
                        '❓ 你知道嗎？鄰里有八成糾紛是來自於無法清楚表達自己內心深處的委屈！',
                        '❓ 你知道嗎？學EQ不是逆來順受，面對霸凌要用智慧與勇氣化解！'
                    ],
                    btnText: '查看詳情',
                    drawerId: 11
                }
            }
        ],
        quote: ''
    },
    local: {
        title: '熟悉鄰里巷道',
        titleClass: 'title-glow-emerald',
        badge: '',
        icon: '🗺️',
        subtitle: '',
        lead: '',
        hideTopClose: true,
        sections: [
            {
                title: '🌟 還沒上任就有政績',
                items: [
                    { label: '403 地震行人便道下陷危機', text: '403 地震造成捷運學府與孔雀二期之間便道下陷坍塌，因涉及多機關管轄邊界而陷入停滯；經我深入研究法規與產權、精準鎖定權責單位促成進場搶通，守護鄰里長幼與視障朋友的通行安全。', btnText: '查看詳情', drawerId: 7 },
                    { label: '反濫訴防禦社區規約', text: '擔任主委期間建立「反濫訴防禦社區規約」，濫訴者需負擔被濫訴人的損害賠償含律師費並獲法院判決勝訴，解決社區住戶經常被濫訴的困擾', btnText: '查看詳情', drawerId: 8 }
                ]
            },
            {
                title: '💡 痛點問題與重點關懷：',
                hook: {
                    questions: [
                        '❓ 你們社區是否也有喜愛濫告的鄰居呢？合理的訴訟是人權，不合理的濫訴就需要有智慧的反制'
                    ],
                    btnText: '查看詳情',
                    drawerId: 8
                }
            }
        ],
        quote: ''
    },
    tech: {
        title: '科技省雜務，雙腳走入巷弄',
        titleClass: 'title-glow-emerald',
        badge: '',
        icon: '💻',
        subtitle: '',
        lead: '',
        hideTopClose: true,
        sections: [
            {
                title: '🌟 還沒上任就有政績<br>30年實戰 自研 App 免費造福街坊',
                items: [
                    { label: '30年軟體開發架構', text: '專業資工背景，擅長自動化系統與數據治理' },
                    { label: '自研樂齡 App 免費分享', text: '1~50 延緩失智與開口造句小遊戲', btnText: '點此試玩', btnUrl: 'https://pod0987183520.github.io/1to50' },
                    { label: '指導學童 AI 錯題複習本', text: '教導小朋友用手機 AI 拍照整理錯題，精準補強自學力' }
                ]
            },
            {
                title: '🌟 核心承諾：',
                items: [
                    { label: '行政雜務全自動化', text: '用系統省下繁瑣文書，里長全力走入鄰里服務' },
                    { label: '建立公開透明治理看板', text: '公款與工程進度線上即時查，杜絕黑箱' }
                ]
            },
            {
                title: '💡 痛點問題與重點關懷：',
                hook: {
                    questions: [
                        '❓ 你知道嗎？傳統里政有六成時間浪費在重複公文行政上！',
                        '❓ 你知道嗎？科技不是冰冷代碼，而是照顧長幼最溫暖的工具！'
                    ],
                    btnText: '查看詳情',
                    drawerId: 6
                }
            }
        ],
        quote: ''
    },
    management: {
        title: '公款刀口花，建設透明看得見',
        titleClass: 'title-glow-emerald',
        badge: '',
        icon: '🏛️',
        subtitle: '',
        lead: '',
        hideTopClose: true,
        sections: [
            {
                title: '🌟 還沒上任就有政績<br>懂公門運作 避免重複施工公帑浪費',
                items: [
                    { label: '搶救 403 地震學府地面下陷便道', text: '熟悉政府機關運作方式，避免一件工程兩次施工的公帑浪費' }
                ]
            },
            {
                title: '🌟 核心承諾：',
                items: [
                    { label: '每年88萬專款公開透明', text: '建立線上預算透明牆，里民一鍵監督每分錢' },
                    { label: '主動爭取政府多種活動專案補助', text: '會寫企劃案，就能同步爭取多元計畫，讓明德里的活動更多元！' }
                ]
            },
            {
                title: '💡 痛點問題與重點關懷：',
                hook: {
                    questions: [
                        '❓ 你知道嗎？明德里每年其實有近百萬（88萬元）基層建設專款！',
                        '❓ 你知道嗎？只要里長會寫政府企劃案，里民多數精彩活動就能零負擔！'
                    ],
                    btnText: '查看詳情',
                    drawerId: 2
                }
            }
        ],
        quote: ''
    },
    service: {
        title: '熱心公益，多年深耕志工陪伴成長',
        titleClass: 'title-glow-emerald',
        badge: '',
        icon: '💖',
        subtitle: '',
        lead: '',
        hideTopClose: true,
        sections: [
            {
                title: '🌟 還沒上任就有政績<br>十餘年校園與社區志工 陪伴孩子快樂成長',
                items: [
                    { label: '6年樂利英語補救教學志工', text: '寓教於樂，點燃小孩學習英文的內驅力' },
                    { label: '4年樂利故事爸爸志工', text: '每週一次，講述幽默有趣的歷史故事' },
                    { label: '長期自辦免費體驗營', text: '曾開辦直排輪、無人機、AI短劇、數學與自然好好玩等營隊' },
                    { label: '開創斜槓志工教學', text: '匯聚在地專業人才，提供多元豐富學習資源' }
                ]
            },
            {
                title: '🌟 核心承諾：',
                items: [
                    { label: '參與式體驗營民調投票', text: '線上投票由里民決定想開辦的營隊，避免蚊子活動' },
                    { label: '爭取專案補助多數免費', text: '若無補助則由里長親授或協槓志工開講，多數活動零負擔' },
                    { label: '舉辦明德草地音樂節', text: '打造社區專屬文創市集與親子音樂盛會' }
                ]
            },
            {
                title: '💡 痛點問題與重點關懷：',
                hook: {
                    questions: [
                        '❓ 你知道嗎？政府有豐富的藝文與體育推廣補助可以申請！',
                        '❓ 你知道嗎？透過民調投票開辦營隊，能讓每場活動都爆滿受歡迎！'
                    ],
                    btnText: '查看詳情',
                    drawerId: 12
                }
            }
        ],
        quote: ''
    }
};

HERO_TRAITS_DATA.art = HERO_TRAITS_DATA.service;

function openHeroTraitModal(traitKey) {
    const data = HERO_TRAITS_DATA[traitKey];
    if (!data) return;

    const modal = document.getElementById('hero-trait-modal');
    if (!modal) return;

    const iconEl = document.getElementById('hero-trait-modal-icon');
    const badgeEl = document.getElementById('hero-trait-modal-badge');
    const titleEl = document.getElementById('hero-trait-modal-title');
    const bodyEl = document.getElementById('hero-trait-modal-body');
    const closeBtn = modal.querySelector('.hero-trait-modal-close');

    if (iconEl) iconEl.textContent = data.icon;
    
    if (closeBtn) {
        if (data.hideTopClose) {
            closeBtn.style.display = 'none';
        } else {
            closeBtn.style.display = 'flex';
        }
    }

    if (badgeEl) {
        if (data.badge && data.badge.trim() !== '') {
            badgeEl.textContent = data.badge;
            badgeEl.style.display = 'inline-block';
        } else {
            badgeEl.textContent = '';
            badgeEl.style.display = 'none';
        }
    }

    if (titleEl) {
        titleEl.textContent = data.title;
        if (data.titleClass) {
            titleEl.className = 'hero-trait-modal-title ' + data.titleClass;
        } else {
            titleEl.className = 'hero-trait-modal-title';
        }
    }

    if (bodyEl) {
        let contentHtml = '';

        if (data.sections && data.sections.length > 0) {
            // 結構化多區塊渲染（顧長輩等極致精簡版）
            contentHtml = data.sections.map(sec => {
                let itemsHtml = '';
                if (sec.items && sec.items.length > 0) {
                    itemsHtml = `
                        <div class="hero-trait-highlight-list">
                            ${sec.items.map(item => `
                                <div class="hero-trait-highlight-item" style="flex-direction: column; align-items: flex-start; gap: 0.2rem;">
                                    <div class="highlight-item-label-row" style="${!item.label ? 'width: 100%; justify-content: space-between;' : ''}">
                                        <div style="display: inline-flex; align-items: center; gap: 0.4rem;">
                                            <span class="highlight-bullet">✔</span>
                                            ${item.label ? `<span style="color: #f5f5f4;">${escapeHTML(item.label)}：</span>` : ''}
                                        </div>
                                        ${item.btnUrl ? `<a href="${item.btnUrl}" target="_blank" rel="noopener" class="trait-pill-btn">${escapeHTML(item.btnText)}</a>` : ''}
                                        ${item.drawerId ? `<button type="button" class="trait-pill-btn" onclick="closeHeroTraitModal(); openDrawer(${item.drawerId});">${escapeHTML(item.btnText || '查看詳情')}</button>` : ''}
                                    </div>
                                    <div class="highlight-item-desc-row">
                                        ${escapeHTML(item.text)}
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    `;
                }

                let hookHtml = '';
                if (sec.hook) {
                    const targetDrawer = sec.hook.drawerId || 7;
                    const btnHtml = `<button type="button" class="trait-pill-btn" onclick="closeHeroTraitModal(); openDrawer(${targetDrawer});">${escapeHTML(sec.hook.btnText)}</button>`;

                    let qHtml = '';
                    if (sec.hook.questions && sec.hook.questions.length > 0) {
                        qHtml = sec.hook.questions.map((q, idx) => {
                            const isLast = idx === sec.hook.questions.length - 1;
                            return `
                                <div class="trait-hook-q" style="display: flex; align-items: center; flex-wrap: wrap; gap: 0.5rem; margin-bottom: ${isLast ? '0' : '0.5rem'};">
                                    <span>${escapeHTML(q)}</span>
                                    ${isLast ? btnHtml : ''}
                                </div>
                            `;
                        }).join('');
                    } else {
                        qHtml = `
                            <div class="trait-hook-q" style="display: flex; align-items: center; flex-wrap: wrap; gap: 0.5rem;">
                                <span>${escapeHTML(sec.hook.question || '')}</span>
                                ${btnHtml}
                            </div>
                        `;
                    }

                    hookHtml = `
                        <div class="trait-hook-box">
                            ${qHtml}
                        </div>
                    `;
                }

                const secTitleFormatted = escapeHTML(sec.title).replace(/&lt;br\s*\/?&gt;/gi, '<br>');

                return `
                    <div class="hero-trait-highlights" style="margin-bottom: 1.1rem;">
                        <h4 class="hero-trait-section-title">${secTitleFormatted}</h4>
                        ${itemsHtml}
                        ${hookHtml}
                    </div>
                `;
            }).join('');
        } else if (data.highlights && data.highlights.length > 0) {
            // 單一清單渲染
            contentHtml = `
                <div class="hero-trait-highlights">
                    <h4 class="hero-trait-section-title">🌟 核心實績與承諾</h4>
                    <div class="hero-trait-highlight-list">
                        ${data.highlights.map(h => `
                            <div class="hero-trait-highlight-item">
                                <span class="highlight-bullet">✔</span>
                                <div class="highlight-text-wrap">
                                    <strong style="color: #f5f5f4;">${escapeHTML(h.label)}：</strong>${escapeHTML(h.text)}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }

        const subtitleHtml = data.subtitle ? `<div class="hero-trait-subtitle">${data.subtitle}</div>` : '';
        const leadHtml = data.lead ? `<p class="hero-trait-lead">${data.lead}</p>` : '';
        const quoteHtml = data.quote ? `
            <div class="hero-trait-quote">
                <span class="quote-icon">💬</span>
                <span class="quote-text">「${data.quote}」</span>
            </div>
        ` : '';

        bodyEl.innerHTML = `
            ${subtitleHtml}
            ${leadHtml}
            ${contentHtml}
            ${quoteHtml}
        `;
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeHeroTraitModal() {
    const modal = document.getElementById('hero-trait-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// 點擊背景遮罩關閉 Hero Trait Modal
document.addEventListener('click', (e) => {
    const modal = document.getElementById('hero-trait-modal');
    if (modal && e.target === modal) {
        closeHeroTraitModal();
    }
});

// ESC 鍵關閉所有彈窗與抽屜
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' || e.key === 'Esc') {
        closeHeroTraitModal();
        closeDrawer();
        if (typeof closeSupportModal === 'function') closeSupportModal();
        if (typeof closeVoteSurveyModal === 'function') closeVoteSurveyModal();
        if (typeof closeSubProposalModal === 'function') closeSubProposalModal();
    }
});
