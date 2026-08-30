// ==========================================================================
// 參與式政見「我想要」基底票數與投票狀態
// ==========================================================================
const POLICY_BASE_VOTES = {
    1: 92,
    2: 78,
    3: 85,
    4: 88,
    5: 64,
    6: 52,
    7: 95,
    8: 68,
    9: 45,
    10: 56,
    11: 72,
    12: 38,
    13: 82,
    14: 76
};
const VOTE_COOLDOWN_MS = 60 * 60 * 1000; // 1 小時防刷冷卻
let pendingVotePolicyId = null;

const POLICIES_DATA = [
    {
        id: 1,
        title: "草地音樂節",
        subtitle: "每年春天與秋天，放下3C野餐去",
        image: "images/policy_01_music.png",
        budgetSource: "文化局社造專案（5~20萬）✕ 區公所文康專款",
        budgetSub: "（完全不用動到明德里 88 萬基層款）",
        budgetDesc: "本活動依法向新北市文化局申請「社區營造點專案補助」（每案 5 至 20 萬元）及區公所文康研習專款，由藝文專款補助舞台音響與演出師資，完全不排擠里內既有的 88 萬基層工程款！",
        highlight: "善用明德活動中心旁的公園草地，透過專業策展經驗整合街頭藝人資源，打造散步就能抵達的草地音樂節。",
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>`,
        description: "我們希望善用明德市民活動中心旁的公園綠地，在春秋兩季的假日，規劃結合音樂、休閒與社區互動的草地音樂節。這不是耗資百萬的政客宣傳秀，而是串接在地資源、讓孩子奔跑、家長放鬆、長者同樂的常態性美學角落。",
        howToDo: [
            "以春秋假日的小型試辦開始，再依居民對音量、交通與整潔的反饋逐步調整規模。",
            "結合候選人本人的流行音樂產業背景與街頭藝人與獨立樂手人脈，邀請優秀樂手、學校音樂社團與在地團體共同展演。",
            "落實場地合規申請，嚴格管控音量時段，做好防噪、垃圾清運、草地保護與完善的雨備方案。",
            "依法爭取文化局社造專案與終身學習外部資源補助，所有經費使用公開透明、可受檢驗。"
        ],
        whyPossible: "候選人擁有 20 年音樂產業實務經驗，熟悉唱片出版與演藝經紀，並擁有充沛的街頭藝人與獨立音樂人社群資源。我們不需依賴昂貴的外包公關公司，就能以更有效率、更有質感的企劃完成表演與音響軟硬體資源串聯。",
        principles: "本活動之辦理與規模，均須經過場地、預算、居民意見與環評程序評估。宣傳之 AI 影音與示意圖均為未來藍圖概念，絕不將尚未開辦的規劃描述為既成事實。"
    },
    {
        id: 2,
        title: "EQ 教育課程",
        subtitle: "你跟孩子有代溝嗎？透過遊戲，重拾親子關係",
        image: "images/policy_02_eq_1.png",
        budgetSource: "教育部家庭教育專案 ✕ 校里跨域合作",
        budgetSub: "（完全不用動到明德里 88 萬基層款）",
        budgetDesc: "結合候選人 8 年樂利國小 EQ 志工組長團隊師資，由樂利國小/家長會與里辦公處跨域合作，免費借用校園空間並聯合提報教育部/局家庭教育與 SEL 專案全額補助，零公帑為里民開辦高品質工作坊。",
        highlight: "提供涵蓋孩子、家長與長者都能參與的情緒管理課程，陪伴大家了解情緒、覺察委屈、避免遷怒、遠離霸凌。",
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a5 5 0 1 0 10 0v-2H12z"></path><path d="M12 10a8 8 0 1 0 8 8v-8H12z"></path><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line></svg>`,
        description: "情緒管理、親子溝通與人際互動是人生的終身課題。我們希望以輕鬆、實用且系統化的 EQ 成長課程，在社區活動中心搭建情緒共學平台，增進家庭與鄰里的跨世代同理與和諧。",
        howToDo: [
            "開設兒童與親子共學主題課程，學習認識情緒、管理生氣、衝突處理與合作溝通。",
            "舉辦家長情緒支持工作坊，分享正向管教、自我覺察與家庭溝通實務。",
            "開辦適合長者與青壯年的情緒調適、同理聆聽及人際共融互動茶會。",
            "建立課後滾動式評估機制，視里民參與反饋持續微調課程主題、師資與時段。"
        ],
        whyPossible: "候選人擔任樂利國小 EQ 志工組長多年，具備 8 年以上的情緒教育講師資歷，親自培訓過數十名志工並指導過無數次學童，擁有完整的師資、教材設計經驗及專業協會之人脈資源，能快速將情緒教育在地化推廣。",
        principles: "情緒教育成長課程屬於學習與心理支持性質，不具有醫療或心理諮商行為。任何涉及病理性心理治療、醫療診斷或校園輔導體系之事項，均須轉介予專業醫療或心理諮商機構處理。"
    },
    {
        id: 3,
        title: "無人機與 AI 未來體驗營",
        subtitle: "操作簡單不易壞，長輩小孩都能輕鬆上手",
        image: "images/policy_03_tech.png",
        budgetSource: "青年科普培育專案 ✕ 區公所文康專款",
        budgetSub: "（完全不用動到明德里 88 萬基層款）",
        budgetDesc: "候選人運用 30 年科技背景自帶微型安全設備與志工團隊，結合區公所文康研習專款及青年科普專案補助，讓里內孩子在最安全的室內防護網下免費體驗前瞻科技。",
        highlight: "為里內家庭提供安全的無人機與 AI 體驗課。無人機是未來趨勢，大人、小孩到長輩都適合學習，全面提升手腦協調與科技視野。",
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>`,
        description: "科技發展日新月異，我們不希望里內的孩子只能透過網路螢幕被動觀看。透過建立高安全性、有人引導的科技實作體驗，讓明德里的孩子在日常中就能啟發科學探索的興趣，掌握未來 AI 世代的必備工具。",
        howToDo: [
            "定期在活動中心舉辦「室內科技體驗日」，設置地面靜態展示、模擬飛行體驗、微型無人機固定操作體驗區，以及 AI 繪圖創作體驗。",
            "規劃小班制科技探索課程，循序漸進講授基礎飛行概念、科技倫理、AI 基本提問技巧與數位影像敘事。",
            "開辦「家長 AI 學習力工作坊」，教導家長如何運用 AI 工具引導孩子拆解學業目標、設計練習題與進行資訊真偽查核。",
            "未來與區內國中小創客社團、科技企業合作，探索利用無人機進行簡易社區安全空拍、環境紀錄等參與式任務。"
        ],
        whyPossible: "候選人具備 30 年資工科技背景，擁有無人機教學與軟硬體調校經驗，長期關注人工智慧應用，並與區內中學創客社團教師保持專業互動。能凝聚多位科技志工、社區青年工程師，用極低預算搭建出寓教於樂的實作環境。",
        principles: "安全是唯一底線。室內無人機飛行限用 50g 以下微型機種，必須配備螺旋槳保護罩、規劃防護網固定操作區，且實施「一次一人操作，旁有安全員隨行」之規定。戶外任務須依法取得禁航區許可、保險並由合格證照人員帶領。"
    },
    {
        id: 4,
        category: "democracy",
        categoryName: "智慧治理與順暢交通",
        title: "智慧交通與號誌連鎖",
        subtitle: "解決海山、學府、學士、金城路口的塞車",
        image: "images/policy_04_traffic.png",
        budgetSource: "幹道動態綠波與道路會勘專案工程款",
        budgetSub: "（完全不用動到明德里 88 萬基層款）",
        budgetDesc: "本案屬於政府交通與工務單位之法定道路維護權責。由科技里長主動提出具體『動態綠波＋全向時相』工程計畫召開跨局處會勘，督促交通局交控中心優化連鎖與專案工程發包，零花費里公款！",
        highlight: "交通打結，我能解決！發揮 30 年資工數據專長，向交通局爭取明德路二段動態綠波與學府路口全向行人時相，人車徹底分流改善回堵。",
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"></polygon><line x1="9" y1="3" x2="9" y2="18"></line><line x1="15" y1="6" x2="15" y2="21"></line></svg>`,
        description: "明德里的交通痛點不能只靠口號！明德路二段從海山路口（台中銀行）、學府路口（新北高工）、學士路口到金城路口，是全里車流進出的主要動脈，四大路口號誌環環相扣。從學府路轉彎車被停讓行人卡死、學士路往金城路號誌不同步的連環回堵，我們運用 30 年資工大數據思維，向市府交通局精準建言，落實人車分流與全廊道號誌連鎖！",
        howToDo: [
            "【學府路口（新北高工）人車徹底分流】：向交通局爭取日間與尖峰全時段採用「全向行人專用時相」，行人專屬安心過，綠燈轉彎車零阻礙順暢通行；「早開時相」則保留於深夜車流稀少時段。",
            "【明德路二段全廊道動態智慧綠波】：針對海山路口至金城路口四節點，調閱交控中心時制秒數，爭取幹道「動態綠波續進 (Green Wave)」，串聯號誌連鎖，消除紅綠燈打架回堵。",
            "【跨路口動態聯動時制優化】：運用數據分析建立車流尖峰模型，促成交通局交控中心即時微調各路口秒數配比，根治連環塞車病灶。"
        ],
        whyPossible: "候選人擁有 30 年資訊工程與數據分析背景，能精準解讀車流流量與號誌週期邏輯，用專業數據直接與市府交通局交控中心對話，爭取實質改善工程。",
        principles: "里長並非交通主管機關，無權單方面變更號誌秒數或道路規劃。本政見之定位在於「利用專業數據向市府精準提案、會勘並持續追蹤落實」，不作不合法的空頭承諾。"
    },
    {
        id: 5,
        category: "democracy",
        categoryName: "空間活化與民生活主",
        title: "數位里政與參與式治理",
        subtitle: "你的意見就是我的政見",
        image: "images/policy_05_guide.png",
        budgetSource: "明德里 88 萬基層工作經費 ✕ 科技經理人自研維運",
        budgetSub: "（使用每年 88 萬基層款，零額外自費）",
        budgetDesc: "本系統由候選人發揮軟體架構長才自研維運，零外包建置費；全里每年 88 萬元「里基層工作經費」，依里民在線報修熱點與多數迫切性透明排定修繕順序，告別黑箱排隊！",
        highlight: "修哪裡、怎麼修，里民說了算！建立 24 小時數位里政窗口與會勘透明機制，開辦「主動式福利篩檢與代辦諮詢」，把津貼補助與修繕服務一次辦到位。",
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>`,
        description: "里政不該等里民受挫才被動回應！我們結合 30 年科技管理經驗，打造透明參與式里政；更在里辦公處建立「主動式福利篩檢與代辦諮詢窗口」，協助里民釐清複雜法規，把身障生活補助、育兒津貼與長照資源一站式辦到位。",
        howToDo: [
            "【88 萬修繕優先權由民意決定】：建立線上報修即時彙整地圖，依多數里民迫切需求公開排定巷道路面、水溝與路燈修繕順序，每一分錢透明可查。",
            "會勘前 5 天以圖文地圖公告議題、會勘後 3 天公開摘要，落實上班族線上參與。",
            "建立「主動式社福與津貼篩檢機制」：里辦公處主動提供身障生活補助（每月約4,049元）、中低收及長照資源申請指引與代辦諮詢。",
            "24 小時線上 AI 里政客服快速指引：整合報修、會勘進度與常見福利申辦 SOP，讓上班族下班隨時查。",
            "免除繁瑣公文摸索：協助里民簽署電子財稅查調授權，免跑國稅局、免備複雜財產證明，全程協助送件公所。"
        ],
        whyPossible: "候選人擁有 10 年社區管理實務，擅長溝通協調與程序公開，同時具備 30 年軟體工程背景，能利用數位工具為里民建立精準的福利導航平台。",
        principles: "參與式治理擴大意見徵詢；福利代辦定位為「行政程序輔導與資訊轉介」，最終補助資格仍由市府與區公所依法審定。"
    },
    {
        id: 6,
        category: "culture",
        categoryName: "跨世代共融與美學生活",
        title: "傳統課程潮流升級計畫",
        subtitle: "當長輩太鼓與流行樂團、舞團共演時",
        image: "images/policy_06_upgrade.png",
        budgetSource: "明德里基層工作經費 ✕ 流行音樂師資協作",
        budgetSub: "（使用每年近百萬基層款，零額外自費）",
        budgetDesc: "本計畫善用明德市民活動中心既有場地，由「里基層工作經費」支應基礎樂器維護與茶水，並結合候選人音樂圈師資人脈協同教學，發揮最大效益。",
        highlight: "既有課程（如太鼓班、舞蹈班）安心延續，並注入現代流行音樂與節奏元素，邀請年輕樂手與家人加入合練，舉辦跨世代公演。",
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>`,
        description: "社區傳統課程（如太鼓班、土風舞班）是許多長輩的退休活力來源，但過往較難吸引年輕家人參與。我們希望在尊重並完整保留既有課程的前提下，注入現代流行音樂元素，邀請兒孫世代樂手加入演出，打造跨世代熱血合體公演。",
        howToDo: [
            "尊重既有班別意願，在不影響原有練習時間的前提下，試辦「流行音樂潮融入工作坊」。",
            "邀請流行音樂導師改編經典鼓譜，加入膾炙人口的當代流行樂曲節奏，創造新鮮感。",
            "舉辦「跨世代同台樂活公演」，鼓勵長輩與青年家人同台表演太鼓與現代樂器合奏。",
            "建立成果發表線上影音專區，幫長輩留存精彩舞台紀錄，深化家庭情感與世代共鳴。"
        ],
        whyPossible: "候選人擁有 20 年流行音樂產業實務背景，熟悉跨界音樂企劃與流行曲風改編，能邀請優秀的流行樂導師與音響團隊協助課程升級，讓傳統社團煥發新活力。",
        principles: "課程升級採「自願加入與增量創新」原則，絕對尊重傳統社團既有運作模式與教練導師，不強迫改動既有曲目。"
    },
    {
        id: 7,
        category: "governance",
        categoryName: "專業治理與精準服務",
        title: "AI健康管家與獨老守護",
        subtitle: "一顆麵包與一次血壓，解決子女的擔心",
        image: "images/policy_07_health.png",
        budgetSource: "國家 62.5 億獨老安居專案 ✕ 長照 2.0",
        budgetSub: "（完全不用動到明德里近百萬基層款）",
        budgetDesc: "本案直接對接中央「擴大獨老在宅安居計畫」及長照專款，協助長者申請公費「緊急救援防跌系統」，由中央與市府全額或高額補助！",
        highlight: "開設實用 AI 健康工作坊，對接衛福部 62.5 億獨老安危專案，導入主動式福利媒合、物資智慧適配與居家緊急防跌，讓三明治世代安心工作。",
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>`,
        description: "里政關懷不只送暖，更要主動把福利辦到位與確認安危！我們結合 30 年資工數據專長，對接衛福部擴大獨老安居照護專案，建立主動式福利篩檢（協助長者申辦身障生活補助、長照送餐與居服），並引進 AI 智慧物資適配與公費居家緊急救援防跌系統，讓外地三明治世代無後顧之憂。",
        howToDo: [
            "落實「主動式長照與身障福利導航」：針對領有身障證明、高齡或慢性病長輩，主動提醒並協助申辦每月身障生活補助（約4,049元）、送餐補助與長照居服。",
            "落實獨老「敲門確認安危」機制：以送餐與物資為媒介，志工到府按門鈴親自交付，第一時間掌握長者起居與防跌安危。",
            "引進 AI 物資影像辨識：自動比對長輩慢性病史（如低糖、低鈉、腎臟病禁忌），杜絕愛心物資反而增加長者身體負擔。",
            "專業對接衛福部 62.5 億長照與獨老資源：協助符合資格家庭申請免費「智慧緊急救援系統（跌倒偵測/GPS定位/求救鈴）」。",
            "建立子女遠距安心機制：志工訪視紀錄與日常生理數據自動彙整，讓在外打拼的三明治世代透過手機即時知曉父母平安。",
            "開設小班制「銀髮 AI 智慧健康工作坊」，教導長輩使用大字體手持裝置進行飲食紀錄與血壓追蹤。"
        ],
        whyPossible: "候選人具備 30 年資工技術背景與長照資源對接經驗，深諳政府社福與衛政申請法規，能結合社區發展協會合法請領中央補助，把國家級資源轉化為長輩的居家守護網。",
        principles: "AI 健康工具與志工到府敲門服務定位為「生活照護、飲食輔助與安危通報」，絕不涉及醫療行為或取代專業醫療診斷；長者病史紀錄嚴格遵守個資法自願登錄原則。"
    },
    {
        id: 8,
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
        description: "很多人不知道，阿茲海默與失智長輩可能早已符合身心障礙與長照 2.0 的法定補助標準！國家有龐大的照顧人力、喘息服務與生活補助，本該是三明治世代最堅實的後盾；但若沒有懂法規的里長主動引路，往往只能一人苦撐。我們引進 AI 認知健能遊戲延緩退化，更主動協助家庭對接身障生活補助與長照喘息資源，不讓權益與政府的貼心悄悄溜走！",
        howToDo: [
            "在活動中心設置「樂齡 AI 大腦健能體驗角落」，提供大螢幕平板與臨床驗證的趣味認知遊戲器具。",
            "主動式身障與長照綠色窗口：主動協助疑似或確診失智長輩家庭申請身心障礙鑑定、每月生活補助（約 4,049 元）與日間照顧／喘息服務。",
            "舉辦「祖孫 AI 腦力電競趣味賽」，讓子孫陪伴爺爺奶奶一起破關，增進家庭歡笑與跨世代互動。",
            "開辦「長照家庭照顧者 EQ 心理支持工作坊」，提供同理傾聽與喘息管道，陪伴三明治世代走出照顧焦慮。"
        ],
        whyPossible: "候選人具備 8 年 EQ 講師與 30 年科技管理背景，深知長照家庭心理痛點與法規流程，能對接長照與身障資源，引入適合社區的健能遊戲與支持體系。",
        principles: "腦力健能 App 屬於認知活化與休閒輔助，若長輩出現急性失智症狀或病理性退化，仍須依正規醫療程序至神經內科或身心科門診就診；身障與長照資格由專業團隊依法評定。"
    },
    {
        id: 9,
        category: "culture",
        categoryName: "空間活化與美學生活",
        title: "全齡多元活動中心",
        subtitle: "空間活化共學角",
        image: "images/policy_09_lounge.png",
        budgetSource: "市民活動中心活化專案 ✕ 明德里基層款",
        budgetSub: "（公有空間活化，零額外自費）",
        budgetDesc: "本案運用明德市民活動中心既有公有設施，以活動中心專案活化補助及每年「里基層工作經費」水電補助支應，零額外負擔落實全齡共享。",
        highlight: "遵循增量不取代原則，開放活動中心夜間與假日空間成立全齡共學角，讓青年與長者獲得溫馨交流空間。",
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>`,
        description: "公共空間活化遵循「增量不取代」原則！活動中心在不排擠既有銀髮共餐的前提下，開放平日晚上與假日全齡共學角，提供閱讀、桌遊交流與講座場地，讓里內青壯年與學童也有舒適的公共休閒空間。",
        howToDo: [
            "建置公開透明的活動中心夜間與假日共學課表，提供桌遊、閱讀與音樂交流。",
            "維護活動中心內部燈光與座椅設施，打造溫馨安靜的自主學習角落。",
            "招募社區青年志工輪值服務，維持公共設施安全與現場清潔管理。"
        ],
        whyPossible: "候選人具備 10 年社區公寓大廈管委會經驗，深諳公共空間規約管理與里民需求協調，能以最小花費落實友善空間活化。",
        principles: "活動中心活化採「增量與時段分流」原則，絕不強迫改動或排擠長輩既有的銀髮共餐與日間據點活動。"
    },
    {
        id: 10,
        category: "governance",
        categoryName: "專業治理與精準服務",
        title: "鄰里和諧與權益溝通諮詢",
        subtitle: "知法律、熟法規、懂調解的EQ里長",
        image: "images/policy_10_harmony.png",
        budgetSource: "顧問律師與調解志工團隊公益支援",
        budgetSub: "（專業法治後盾，完全零公帑花費）",
        budgetDesc: "由競選團隊顧問律師群與具備 10 年管委會實務之專業志工提供公益諮詢服務，完全零公帑支出，以專業法理為鄰里和睦把關。",
        highlight: "引進法律與社區調解志工，提供鄰里噪音、騎樓占用、管道漏水與社區規約之理性溝通諮詢窗口。",
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg>`,
        description: "鄰里間的噪音、管道漏水、騎樓停車與社區規約糾紛，常因溝通不順而傷了鄰里和氣。我們結合社區管理經驗與律師專業志工，建立「理性溝通諮詢窗口」，輔導居民透過合情合法的途徑化解爭議。",
        howToDo: [
            "設立定期「鄰里權益與社區規約免費諮詢時間」，協助居民釐清公寓大廈管理條例與相鄰關係規範。",
            "針對噪音與漏水爭議，提供第三方中立溝通平台與標準檢測建議，避免情緒化衝突升級。",
            "彙整常見鄰里紛爭處理案例與法律常識手冊，提升里民的法治觀念與權益保障。",
            "若涉及複雜法律訴訟，協助轉介市府法律扶助或區公所調解委員會進行正式調解。"
        ],
        whyPossible: "候選人擁有 10 年社區大廈管委會主委與委員溝通調解實務，熟悉住宅規約與相鄰關係協調，並有競選團隊顧問律師提供專業法律見解後盾。",
        principles: "本服務定位為「私權糾紛之中立溝通輔導與法律常識諮詢」，里辦公處不具行政處罰或司法裁判權，重大糾紛仍須經由法定調解或司法途徑處理。"
    {
        id: 11,
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
        description: "明德里有許多喜愛毛小孩的寵物家庭。我們希望在公園綠地周邊爭取設立「便攜撿便袋補充站」與友善牽繩繫留區，並倡導負責任的飼主文化，讓毛小孩與長輩、孩童都能在安全的公園綠地和諧共處。",
        howToDo: [
            "爭取於里內公園適當地點設置「寵物便攜袋補充站」與清掃工具箱，方便飼主隨手維護環境。",
            "規劃友善牽繩繫留角落，讓飼主在休憩時能安心固定牽繩。",
            "舉辦「毛小孩健康與行為學講座」，邀請獸醫師與訓練師分享教養與衛教常識。",
            "結合志工維護社區公園草地清潔，兼顧公共衛生與寵物活動權益。"
        ],
        whyPossible: "候選人具備 10 年社區規約管理與空間協調經驗，能尊重非養寵物里民對環境衛生的訴求，建立雙贏管理機制。",
        principles: "寵物友善設施以「環境清潔衛生與不影響他人安全」為第一原則，犬隻於公共區域活動均須依法繫繩。"
    },
    {
        id: 12,
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
        description: "明德里臥虎藏龍，有許多具備專業才藝與熱情的斜槓人才！從說故事的故事媽媽、EQ志工爸爸、手工皂與園藝達人，到擅長 AI 影音剪輯、音樂演奏與熱舞街舞的青年導師。我們將搭建「鄰里斜槓導師庫」，讓才藝在社區發光發熱。",
        howToDo: [
            "建立「社區斜槓導師人才資料庫」，公開徵求具備才藝與教學熱情的里民報名。",
            "提供活動中心免租金場地支持，協助斜槓導師試辦小班制手作、AI 影片創用或舞蹈工作坊。",
            "結合社區節慶或草地音樂節，為斜槓導師與學生團隊舉辦跨世代成果發表展演。",
            "建立雙向回饋評鑑機制，協助優秀社區導師對接區公所或社會局之多元才藝獎助資源。"
        ],
        whyPossible: "候選人擁有 20 年流行音樂產業經紀與 8 年 EQ 志工培訓背景，擅長挖掘人才天賦、規劃課程與展演舞台，能吸引豐富的斜槓導師加入。",
        principles: "斜槓導師徵才採「自願報名與公益共享」原則，課程收費與材料費均須公開透明，絕不進行強迫推銷或商業詐騙。"
    },
    {
        id: 13,
        category: "governance",
        categoryName: "健康樂齡與活力共融",
        title: "銀髮樂齡共餐 2.0",
        subtitle: "餐前動腦尋寶活力護照",
        image: "images/policy_13_dining.png?v=20260830_2",
        budgetSource: "社會局銀髮共餐專案 ✕ 志願服務法定專款",
        budgetSub: "（法定專款專用，零額外自費）",
        budgetDesc: "共餐食材費嚴格依社會局專款專用規定核銷；益智動腦教材與志工四大法定保障（服務學習時數、保險、免費便當、法定交通誤餐補助）由社區志願服務與文教活動專案合法支應，完全不佔用里內基層工程款！",
        highlight: "打破吃飯看電視的傳統模式！餐前 5 分鐘趣味動腦（1至50數字尋寶）、樂齡活力護照累積打卡換獎狀，結合青年志工四大法定保障，打造全齡幸福共融。",
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>`,
        description: "打破傳統銀髮共餐「只有吃飯看電視」的被動模式，將「大腦認知活化」與「手眼協調運動」自然融入每次聚餐。每次共餐開動前 5 分鐘，長輩在青年志工陪伴下，完成一局簡單好上手的「1 至 50 數字尋寶」手腦協調益智小遊戲，並在專屬「樂齡活力護照」打卡蓋章，達成「餐前動動腦、手眼不退化、累積換榮譽」。\n\n【里民與年輕晚輩試玩】：https://pod0987183520.github.io/1to50",
        howToDo: [
            "【餐前 5 分鐘手腦協調挑戰】：以「1 至 50 數字尋寶」為核心，規則極簡、秒懂好上手，長輩自主點擊、同桌加油，徹底消除挫折感。",
            "【樂齡活力護照歷史累計制】：每位長輩領取專屬大字版護照，完成餐前動腦即蓋章，累計達標由里辦公處公開頒發榮譽獎狀與樂齡榮譽榜表揚，請假看診不歸零。",
            "【雙人單雙號默契接力】：同桌兩人搭檔（一人找單數、一人找雙數），手眼協同完成 50 個數字，促進鄰里深厚情誼。",
            "【青年志工四大法定制度化保障】：依《志願服務法》第 16 條，核發官方服務學習時數、投保公共意外險、提供免費共餐午餐與法定交通誤餐補助，吸引青年熱情加入。",
            "【科技里長專屬研發承諾】：未來陸續自主研發「規則極簡、特大字體、零商業廣告、不傷眼」的手腦小遊戲庫，讓長輩每次來都有新鮮感。"
        ],
        whyPossible: "候選人具備 30 年資工技術研發背景與 8 年 EQ 志工陪伴經驗，親自自研零廣告 1 至 50 樂齡動腦網頁，並熟諳志願服務法規與青年志工組織，能以最低成本為社區長輩打造永續的活躍老化生活基地。",
        principles: "動腦活動定位為日常健康促進與社交互動，不作醫療診斷宣稱；志工四大保障均依志願服務法與公部門標準核發，完全零選罷法期約賄選疑慮。"
    },
    {
        id: 14,
        category: "democracy",
        categoryName: "人本交通與通學安全",
        title: "友善步道與通學安全",
        subtitle: "通學步道升級防跌",
        image: "images/policy_04_safety_2.png",
        budgetSource: "市府人本交通與通學步道專案工程款",
        budgetSub: "（爭取市府專案工程款，零排擠里款）",
        budgetDesc: "本案屬於新北市交通局與工務局「校園周邊暨行人安全改善專案」權責。由科技里長主動彙整里民人行危險點資料庫，召開跨局處會勘爭取市府專案款改善鋪面與盲區死角，零花費里公款！",
        highlight: "長輩散步防跌、學童安心上下學！建立全里人行危險點資料庫，爭取樂利國小周邊通學廊道安全升級、路口盲區改善與騎樓無障礙順平。",
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 4v16M17 8l-4-4-4 4M7 20h10"></path><circle cx="12" cy="4" r="2"></circle></svg>`,
        description: "明德里內長者散步、學童上下學的步行環境需要實質升級！我們運用 30 年數據管理思維，建立「全里步行危險熱點資料庫」，精準針對樂利國小通學路段、學府路巷弄及長輩常走步道，向市府交通局與工務局爭取專案改善，消除轉角視線盲區、修補破損與改善騎樓高低差，打造全齡友善的安心步行空間。",
        howToDo: [
            "【樂利國小周邊通學步道安全升級】：會勘爭取通學廊道標線清晰化、防跌抗滑鋪面維護與學童優先動線，確保上下學安全。",
            "【全里人行危險點大數據資料庫】：線上彙整里民通報之地不平、照明昏暗、視線死角與易積水路段，依急迫性排定會勘改善。",
            "【騎樓高低差與無障礙順平】：協調相關管委會與工務局，推動騎樓順平工程與防滑修繕，保障輪椅族、推嬰兒車家長與銀髮長輩平穩通行。",
            "【路口轉角清空與視線優化】：爭取重要巷口劃設紅黃線禁停或調整標線，消除轉彎視線盲區，杜絕人車爭道死角。"
        ],
        whyPossible: "候選人長期擔任樂利國小志工，深知學童上下學與周邊家長接送痛點；同時具備 10 年社區管理與工程會勘實務，擅長運用客觀數據向工務局與交通局精準爭取專案改善預算。",
        principles: "人行道工程與號誌劃設均須經市府交通局、工務局及里民會勘合法程序審查；本政見定位為「數據化專業提案與持續追蹤落實」，不作未經評估的空頭承諾。"
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
    const policy = POLICIES_DATA.find(p => p.id === policyId);
    const titleEl = document.getElementById('vote-survey-title');
    if (titleEl) {
        titleEl.textContent = `我想要【${policy ? policy.title : '這項計畫'}】`;
    }
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

// 提交問卷並執行投票
function submitVoteSurvey(e) {
    e.preventDefault();
    const ageEl = document.querySelector('input[name="survey-age"]:checked');
    const genderEl = document.querySelector('input[name="survey-gender"]:checked');
    if (!ageEl || !genderEl) {
        alert('請選取您的年齡區間與性別，謝謝！');
        return;
    }

    const age = ageEl.value;
    const gender = genderEl.value;
    saveVoterProfile(age, gender);
    closeVoteSurveyModal();

    if (pendingVotePolicyId) {
        executePolicyVote(pendingVotePolicyId, age, gender);
        pendingVotePolicyId = null;
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

    // 2. 觸發按鈕浮動 +1 微粒子特效
    createVotePlusOneParticle(policyId);

    // 3. 觸發全螢幕放大脈衝愛心微動畫
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
        if (isVoted) {
            btn.classList.add('voted');
            const heart = btn.querySelector('.heart-icon');
            const text = btn.querySelector('.want-text');
            const counter = btn.querySelector('.vote-counter');
            if (heart) heart.textContent = '❤️';
            if (text) text.textContent = '已支持';
            if (counter) counter.textContent = count;
        } else {
            btn.classList.remove('voted');
            const heart = btn.querySelector('.heart-icon');
            const text = btn.querySelector('.want-text');
            const counter = btn.querySelector('.vote-counter');
            if (heart) heart.textContent = '🤍';
            if (text) text.textContent = '我想要';
            if (counter) counter.textContent = count;
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

// Generate Policy Cards
function renderPolicies() {
    if (!policyGrid) return;
    policyGrid.innerHTML = '';
    
    POLICIES_DATA.forEach((policy, index) => {
        const card = document.createElement('div');
        
        // Dynamically compute layout-aware reveal animation direction
        const isMobile = window.innerWidth <= 768;
        let animationClass = 'reveal-left';
        if (isMobile) {
            // Mobile single column: alternating left & right
            animationClass = (index % 2 === 0) ? 'reveal-left' : 'reveal-right';
        } else {
            // Desktop 3-column grid layout
            const col = index % 3;
            if (col === 0) {
                animationClass = 'reveal-left';
            } else if (col === 1) {
                animationClass = 'reveal-bottom';
            } else {
                animationClass = 'reveal-right';
            }
        }

        const isVoted = isPolicyInCooldown(policy.id);
        const count = getPolicyVoteCount(policy.id);

        card.className = `policy-card glass ${animationClass}`;
        card.dataset.id = policy.id;
        card.dataset.index = index;
        card.innerHTML = `
            <div class="policy-card-header">
                <div style="display: flex; justify-content: space-between; align-items: center; width: 100%; margin-bottom: 0.4rem;">
                    <span class="policy-number">計畫 ${policy.id < 10 ? '0' + policy.id : policy.id}</span>
                    <button class="btn-want-vote ${isVoted ? 'voted' : ''}" data-policy-id="${policy.id}" onclick="handleWantVoteClick(event, ${policy.id})" title="表達您的支持（參與式預算民意調查）">
                        <span class="heart-icon">${isVoted ? '❤️' : '🤍'}</span>
                        <span class="want-text">${isVoted ? '已支持' : '我想要'}</span>
                        <span class="vote-counter">${count}</span>
                    </button>
                </div>
                <h3>${policy.title}</h3>
            </div>
            <div class="policy-card-image-wrapper">
                <img class="policy-card-image" src="${policy.image}" alt="${policy.title} - 概念示意圖" onerror="this.style.display='none'; if(this.nextElementSibling) this.nextElementSibling.style.display='none'; this.parentElement.querySelector('.policy-card-image-placeholder').style.display='flex';">
                <span class="vision-badge">概念示意圖</span>
                <div class="policy-card-image-placeholder" style="display: none;">
                    <div class="placeholder-icon">${policy.icon}</div>
                    <span class="placeholder-text">示意圖繪製中</span>
                </div>
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
                    <span class="heart-icon">${isVoted ? '❤️' : '🤍'}</span>
                    <span class="want-text">${isVoted ? '已支持' : '我想要'}</span>
                    <span class="vote-counter">${count}</span>
                </button>
            </div>
        `;
    }
    const titleEl = document.getElementById('drawer-title');
    if (titleEl) titleEl.textContent = policy.title;
    const descEl = document.getElementById('drawer-description');
    if (descEl) descEl.textContent = policy.description;

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
        if (policy.id === 2) {
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
        } else if (policy.id === 14) {
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

    // Principles section
    const prinText = document.getElementById('drawer-principles-text');
    if (prinText) prinText.textContent = policy.principles;

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

// Bi-directional Scroll Observer with Scroll Direction Awareness
let revealObserver;
let lastScrollY = window.scrollY;

function observeRevealElements() {
    // Collect all elements with reveal classes
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-bottom, .reveal-top');
    
    // Disconnect old observer if exists
    if (revealObserver) {
        revealObserver.disconnect();
    }
    
    // Define options
    const observerOptions = {
        root: null,
        threshold: 0.08, // Trigger when 8% is visible
        rootMargin: "-10px 0px -10px 0px" // Buffer area for smooth triggering
    };
    
    // Instantiate observer
    revealObserver = new IntersectionObserver((entries) => {
        const currentScrollY = window.scrollY;
        const isScrollingUp = currentScrollY < lastScrollY;
        lastScrollY = currentScrollY;

        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            } else {
                // Dynamically remove active class to allow smooth re-trigger when scrolling back
                entry.target.classList.remove('active');
            }
        });
    }, observerOptions);
    
    // Observe
    revealElements.forEach(el => revealObserver.observe(el));
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

    container.innerHTML = filtered.map(item => {
        // Extract ~25 chars summary for response preview
        const cleanResp = item.response.replace(/\n/g, ' ');
        const shortResp = cleanResp.length > 25 ? cleanResp.substring(0, 25) + '...' : cleanResp;

        // Check user agree status from localStorage
        const isAgreed = localStorage.getItem(`md2_agreed_${item.id}`) === 'true';
        const dynamicAgrees = parseInt(localStorage.getItem(`md2_agree_count_${item.id}`) || (item.agreeCount || 0), 10);
        
        // 取得此母案已審核採納的在地補充
        const approvedSubs = getApprovedSubProposals(item.id);
        const dynamicSubs = Math.max(approvedSubs.length, parseInt(localStorage.getItem(`md2_sub_count_${item.id}`) || (item.subCount || 0), 10));

        const hotBadge = dynamicAgrees >= 10 
            ? `<span class="badge-hot-topic">🔥 全里高度關注 (${dynamicAgrees}人認同)</span>` 
            : '';

        // 方案 A ＋ 方案 C：折疊式在地補充氣泡 ＋ 直達獨立專頁
        let subAccordionHtml = '';
        if (approvedSubs.length > 0) {
            subAccordionHtml = `
            <div class="qa-sub-accordion-wrapper" id="sub-wrapper-${item.id}">
                <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem;">
                    <button type="button" class="qa-sub-toggle-pill" onclick="toggleSubAccordion('${item.id}')" id="sub-pill-${item.id}">
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
        <div class="qa-card" id="${item.id}">
            <div class="qa-card-meta">
                <div class="qa-tag-group">
                    <span class="qa-status-badge ${item.statusClass}">${escapeHTML(item.statusText)}</span>
                    ${hotBadge}
                </div>
            </div>
            <div class="qa-question-box">
                <h4 class="qa-question-title">${escapeHTML(item.title)}</h4>
                <p class="qa-question-text collapsed" id="qtext-${item.id}">${escapeHTML(item.question)}</p>
                <div class="qa-expanded-meta" id="qmeta-${item.id}" style="display:none;">
                    <span class="qa-category-pill">${escapeHTML(item.category)}</span>
                    <span class="qa-author-time">反映里民：${escapeHTML(item.author)} ‧ ${escapeHTML(item.date)}</span>
                </div>
                <button class="btn-toggle-expand" onclick="toggleQAExpand('${item.id}')" id="qbtn-${item.id}">
                    <span>展開完整原文</span>
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </button>
            </div>
            <div class="qa-response-box">
                <div class="qa-response-header">
                    <div class="qa-response-avatar">昱</div>
                    <span class="qa-response-name">陳新昱 官方具體解決路徑回覆</span>
                </div>
                <div class="qa-response-summary" id="rsum-${item.id}">${escapeHTML(shortResp)}</div>
                <div class="qa-response-content" id="resp-${item.id}" style="display:none;">${escapeHTML(item.response)}</div>
                <button class="btn-toggle-response-expand" onclick="toggleQAResponseExpand('${item.id}')" id="rbtn-${item.id}">
                    <span>展開完整 SOP 解決路徑 ▼</span>
                </button>
            </div>
            
            ${subAccordionHtml}

            <!-- 參與式里政互動列 (認同 +1 ＆ 補充附議) -->
            <div class="qa-interaction-bar">
                <button class="btn-qa-agree ${isAgreed ? 'active' : ''}" onclick="handleAgreeVote('${item.id}', this)" id="agree-btn-${item.id}">
                    <span class="agree-icon">👍</span>
                    <span class="agree-text">${isAgreed ? '已認同' : '我也認同'}</span>
                    <span class="agree-count" id="agree-count-${item.id}">${dynamicAgrees}</span>
                </button>
                <button class="btn-qa-sub" onclick="openSubProposalModal('${item.id}', '${escapeHTML(item.title).replace(/'/g, "\\'")}')">
                    <span class="sub-icon">📝</span>
                    <span class="sub-text">補充在地現況 (${dynamicSubs})</span>
                </button>
            </div>
        </div>
        `;
    }).join('');
}

function toggleSubAccordion(cardId) {
    const wrapper = document.getElementById(`sub-wrapper-${cardId}`);
    if (wrapper) {
        wrapper.classList.toggle('open');
    }
}

function toggleQAExpand(cardId) {
    const textEl = document.getElementById(`qtext-${cardId}`);
    const metaEl = document.getElementById(`qmeta-${cardId}`);
    const btnEl = document.getElementById(`qbtn-${cardId}`);
    if (!textEl || !btnEl) return;

    if (textEl.classList.contains('collapsed')) {
        textEl.classList.remove('collapsed');
        if (metaEl) metaEl.style.display = 'flex';
        btnEl.innerHTML = `<span>收合原文</span><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>`;
    } else {
        textEl.classList.add('collapsed');
        if (metaEl) metaEl.style.display = 'none';
        btnEl.innerHTML = `<span>展開完整原文</span><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>`;
    }
}

function toggleQAResponseExpand(cardId) {
    const sumEl = document.getElementById(`rsum-${cardId}`);
    const fullEl = document.getElementById(`resp-${cardId}`);
    const btnEl = document.getElementById(`rbtn-${cardId}`);
    if (!fullEl || !btnEl) return;

    if (fullEl.style.display === 'none') {
        if (sumEl) sumEl.style.display = 'none';
        fullEl.style.display = 'block';
        btnEl.innerHTML = `<span>收合解決路徑 ▲</span>`;
    } else {
        if (sumEl) sumEl.style.display = 'block';
        fullEl.style.display = 'none';
        btnEl.innerHTML = `<span>展開完整 SOP 解決路徑 ▼</span>`;
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
function handleAgreeVote(cardId, btnEl) {
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

    // Re-render Q&A cards to update hot badge if reached >= 10
    setTimeout(() => {
        renderQACards();
    }, 400);
}

let currentSubParentId = null;
let currentSubParentTitle = '';

function openSubProposalModal(cardId, parentTitle) {
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

// Initialize Collapsible Accordions (Governance Principles & Promises with Mutex Single-Open Behavior)
function initCollapsibles() {
    // 四大治理原則手風琴 (互斥單開)
    const valueCards = document.querySelectorAll('.value-card.collapsible');
    valueCards.forEach(card => {
        card.addEventListener('click', () => {
            const wasOpen = card.classList.contains('open');
            valueCards.forEach(c => c.classList.remove('open'));
            if (!wasOpen) {
                card.classList.add('open');
            }
        });
    });

    // 共同承諾手風琴 (互斥單開)
    const promiseItems = document.querySelectorAll('.promise-item.collapsible');
    promiseItems.forEach(item => {
        item.addEventListener('click', () => {
            const wasOpen = item.classList.contains('open');
            promiseItems.forEach(p => p.classList.remove('open'));
            if (!wasOpen) {
                item.classList.add('open');
            }
        });
    });
}

// 錨點導航與自動展開 (方案 C 專頁聯動)
function initHashAnchorNavigation() {
    const hash = window.location.hash;
    if (hash && hash.startsWith('#qa-')) {
        setTimeout(() => {
            const targetCard = document.querySelector(hash);
            if (targetCard) {
                targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
                const qaId = hash.replace('#', '');
                const fullEl = document.getElementById(`resp-${qaId}`);
                const sumEl = document.getElementById(`rsum-${qaId}`);
                const rbtnEl = document.getElementById(`rbtn-${qaId}`);
                if (fullEl && fullEl.style.display === 'none') {
                    if (sumEl) sumEl.style.display = 'none';
                    fullEl.style.display = 'block';
                    if (rbtnEl) rbtnEl.innerHTML = `<span>收合解決路徑 ▲</span>`;
                }
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

