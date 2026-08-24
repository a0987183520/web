const POLICIES_DATA = [
    {
        id: 1,
        title: "草地音樂節",
        subtitle: "讓公園成為跨世代的生活舞台",
        image: "images/policy_01_music.png",
        highlight: "善用明德活動中心旁的公園草地，透過專業策展經驗整合街頭藝人資源，打造散步就能抵達的草地音樂節。",
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>`,
        description: "我們希望善用明德市民活動中心旁的公園綠地，在春秋兩季的假日，規劃結合音樂、休閒與社區互動的草地音樂節。這不是耗資百萬的政客宣傳秀，而是串接在地資源、讓孩子奔跑、家長放鬆、長者同樂的常態性美學角落。",
        howToDo: [
            "以春秋假日的小型試辦開始，再依居民對音量、交通與整潔的反饋逐步調整規模。",
            "結合候選人本人的流行音樂產業背景與街頭藝人與獨立樂手人脈，邀請優秀樂手、學校音樂社團與在地團體共同展演。",
            "落實場地合規申請，嚴格管控音量時段，做好防噪、垃圾清運、草地保護與完善的雨備方案。",
            "依法爭取符合資格的文化、教育或終身學習外部資源補助，所有經費使用公開透明、可受檢驗。"
        ],
        whyPossible: "候選人擁有 20 年音樂產業實務經驗，熟悉唱片出版與演藝經紀，並擁有充沛的街頭藝人與獨立音樂人社群資源。我們不需依賴昂貴的外包公關公司，就能以更有效率、更有質感的企劃完成表演與音響軟硬體資源串聯。",
        principles: "本活動之辦理與規模，均須經過場地、預算、居民意見與環評程序評估。宣傳之 AI 影音與示意圖均為未來藍圖概念，絕不將尚未開辦的規劃描述為既成事實。"
    },
    {
        id: 2,
        title: "EQ 教育課程",
        subtitle: "讓情緒教育成為家庭的日常支持",
        image: "images/policy_02_eq_1.png",
        highlight: "提供涵蓋孩子、家長與長者都能參與的情緒管理課程，陪伴大家了解情緒、覺察委屈、避免遷怒、遠離霸凌。",
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a5 5 0 1 0 10 0v-2H12z"></path><path d="M12 10a8 8 0 1 0 8 8v-8H12z"></path><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line></svg>`,
        description: "情緒管理、親子溝通與人際互動是人生的終身課題。我們希望以輕鬆、實用且系統化的 EQ 成長課程，在社區活動中心搭建情緒共學平台，增進家庭與鄰里的跨世代同理與和諧。",
        howToDo: [
            "開設兒童與親子共學主題課程，學習認識情緒、管理生氣、衝突處理與合作溝通。",
            "舉辦家長情緒支持工作坊，分享正向管教、自我覺察與家庭溝通實務。",
            "開辦適合長者與青壯年的情緒調適、同理聆聽及人際共融互動茶會。",
            "建立課後滾動式評估機制，視里民參與反饋持續微調課程主題、師資與時段。"
        ],
        whyPossible: "候選人擔任樂利國小 EQ 志工組長多年，具備 8 年以上的情緒教育講師資歷，親自培訓過數十名志工並指導過無統計學童，擁有完整的師資、教材設計經驗及專業協會之人脈資源，能快速將情緒教育在地化推廣。",
        principles: "情緒教育成長課程屬於學習與心理支持性質，不具有醫療或心理諮商行為。任何涉及病理性心理治療、醫療診斷或校園輔導體系之事項，均須轉介予專業醫療或心理諮商機構處理。"
    },
    {
        id: 3,
        title: "無人機與 AI 未來體驗營",
        subtitle: "讓科技變成孩子看得見的可能",
        image: "images/policy_03_tech.png",
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
        categoryName: "空間活化與民生活主",
        title: "智慧安全與友善步行",
        subtitle: "用智慧點亮每條回家的路",
        image: "images/policy_04_safety_2.png",
        highlight: "建立居民協作的步行安全地圖，針對積水、照明死角、破損人行道等危險因子，進行數據化追蹤，現勘提案改善。",
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"></polygon><line x1="9" y1="3" x2="9" y2="18"></line><line x1="15" y1="6" x2="15" y2="21"></line></svg>`,
        description: "社區安全不該只是頭痛醫頭、腳痛醫腳。透過科學化的數據蒐集與里民協作，我們將路燈失靈、騎樓濕滑、人行道破損、防滑不足、反射鏡死角等步行安全危險因子繪製成「明德安全步行地圖」，讓有限的政府預算能精準花在刀口上。",
        howToDo: [
            "提供里民線上與線下回報平台，建立「社區步行危險點資料庫」，統計各點的危險頻次與類別。",
            "針對前幾大高風險路口與路段，排定會勘計畫，邀請相關主管機關現場會勘，提案要求改善，並在網站公開改善進度。",
            "與里內管委會、學校合作，整理並宣導社區防災避難數位地圖，針對有特殊協助需求之弱勢家庭在災前做好預警宣導。"
        ],
        whyPossible: "候選人擁有 30 年資訊工程與數據分析思維，能將散落的里民報修案件轉化為有統計意義的結構化資料，便於向市府、區公所等單位提案建言，用數字與證據為里民爭取工程預算。",
        principles: "里長並非工程主管機關，無權單方面核定或修改道路規劃與公共設施。本政見的定位在於「利用科學證據進行精準建言、協調會勘並持續追蹤公部門落實進度」，不給予不合法的空頭承諾。"
    },
    {
        id: 5,
        category: "democracy",
        categoryName: "空間活化與民生活主",
        title: "數位里政與參與式治理",
        subtitle: "24小時 AI 里政客服　讓上班族也能參與社區",
        image: "images/policy_05_guide.png",
        highlight: "公開公部門會勘紀錄，建立線上與實體並行的意見搜集與回饋管道，讓無法出席實體會勘的上班族也能表達意見。",
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>`,
        description: "社區內的交通號誌調整、停車格畫設、公園遊具更新等重要會勘，往往都在平日的上班時間舉行，導致多數青壯年與上班族的聲音被忽略。我們將建立一套結合線上與線下的參與式機制，讓不能請假到現場的里民，權益同樣受到保障。",
        howToDo: [
            "會勘前 5 天，以圖文、地圖與線上問卷提前公告會勘議題，收集里民想法。",
            "會勘後 3 天內公開整理「會勘重點摘要」，包括出席單位、各方意見與下一步時程。",
            "在規劃形成前保留 3 天線上回饋期，讓更多里民能確認初步方案並公開採納原因。",
            "針對公園改造、重大空間活化等軟性議題，舉辦親子工作坊廣納里民意見。"
        ],
        whyPossible: "候選人擁有 10 年社區管理實務，擅長溝通協調與程序公開，同時具備 30 年軟體工程背景，能利用數位看板、行動網頁等低門檻工具，迅速為里民架設意見整合平台，不需編列公帑即可達成社區民主升級。",
        principles: "參與式公共治理的目的在於「擴大意見徵詢、提升過程透明度」，它絕非「民調決定一切」，不能取代現行的法定行政程序、土地所有權規範、安全專業評估及公部門最終裁量權。"
    },
    {
        id: 6,
        category: "culture",
        categoryName: "跨世代共融與美學生活",
        title: "傳統課程潮流升級計畫",
        subtitle: "賦予經典班別新生命　促進跨世代合體共鳴",
        image: "images/policy_06_upgrade.png",
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
        title: "AI 全天候健康管家課程",
        subtitle: "讓 AI 升級為 24 小時個人健康隨身管家",
        image: "images/policy_07_health.png",
        highlight: "開設實用 AI 健康工作坊，協助里民與長輩設定 24 小時個人化健康數據追蹤、用藥提醒與血壓血糖趨勢諮詢。",
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>`,
        description: "人工智慧不該只是冷冰冰的聊天工具或整理文書的軟體，它更能升級為每位里民與長者 24 小時隨身貼心的「數位健康管家」。我們將手把手教導里民運用簡單好用的 AI 工具進行日常健康管理與追蹤。",
        howToDo: [
            "開設小班制「銀髮 AI 智慧健康工作坊」，教導長輩使用大字體手持裝置進行飲食紀錄與血壓追蹤。",
            "設定 AI 個人化用藥與健走提醒，協助長輩與家屬掌握健康數據長期變化趨勢。",
            "培訓社區青年志工擔任「健康數位大使」，一對一輔導長者設定健康 App 與簡易操作。",
            "定期舉辦健康座談，教導里民辨識 AI 產生的健康資訊真偽，提升正確健康識能。"
        ],
        whyPossible: "候選人具備 30 年資工技術背景與長照資源對接經驗，能精準挑選安全性高、無個人隱私外洩疑慮且完全免費的合格健康 AI 工具，降低里民學習門檻。",
        principles: "AI 健康管家僅作為日常健康紀錄、生活習慣提醒與數據整理輔助，絕不能取代真實醫師的醫療診斷、開藥或急救處置。"
    },
    {
        id: 8,
        category: "governance",
        categoryName: "專業治理與長照支持",
        title: "AI 預防失智 App 體驗營",
        subtitle: "用互動科技活化大腦刺激　用智慧遊戲拉近祖孫距離",
        image: "images/policy_08_brain.png",
        highlight: "引進專為高齡者設計的 AI 腦力健能與語言趣味訓練 App，透過長輩喜愛的遊戲延緩失智退化，同時增進祖孫互動。",
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-2.04z"></path><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-2.04z"></path></svg>`,
        description: "長輩退休後生活常頓失重心，若缺乏足夠的大腦刺激與社交互動，腦力與語言表達容易加速退化，也加深了與子孫輩的溝通代溝。我們引進專為樂齡族設計的 AI 腦力健能遊戲，讓預防失智變得像玩遊戲一樣充滿樂趣。",
        howToDo: [
            "在活動中心設置「樂齡 AI 大腦健能體驗角落」，提供大螢幕平板與簡易認知遊戲器具。",
            "引進經過臨床驗證的 AI 記憶力、專注力與語言趣味拼圖 App，記錄長輩的認知活化成長曲線。",
            "舉辦「祖孫 AI 腦力電競趣味賽」，讓子孫陪伴爺爺奶奶一起破關，增進家庭歡笑與世代溝通。",
            "結合社區長照據點與志工，對評估有退化疑慮的長輩提供溫馨關懷與醫療轉介服務。"
        ],
        whyPossible: "候選人具備 8 年 EQ 講師與 30 年科技管理背景，深知長輩心理需求與科技輔具之結合點，能對接大專院校樂齡科技團隊資源，引入適合社區的健能遊戲。",
        principles: "腦力健能 App 屬於非醫療性質之認知活化與休閒遊戲。若長輩出現急性失智症狀或病理性神經退化，仍須依正規醫療程序至神經內科或身心科門診就診。"
    },
    {
        id: 9,
        category: "culture",
        categoryName: "空間活化與美學生活",
        title: "全齡多元活動中心",
        subtitle: "活化公共設施夜間與假日使用　打造社區溫馨共學角落",
        image: "images/policy_09_lounge.png",
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
        subtitle: "專業調解與社區規約諮詢　理性解決鄰里糾紛",
        image: "images/policy_10_harmony.png",
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
    },
    {
        id: 11,
        category: "culture",
        categoryName: "空間活化與美學生活",
        title: "幸福寵物空間",
        subtitle: "優化公園綠地設施　打造毛小孩友善共融社區",
        image: "images/policy_11_pet.png",
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
        subtitle: "發掘鄰里臥虎藏龍人才　提供斜槓跨世代展演舞台",
        image: "images/policy_12_mentor.png",
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
document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
drawerClose.addEventListener('click', closeDrawer);
drawerBackdrop.addEventListener('click', closeDrawer);

// Listen to escape key to close drawer
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeDrawer();
});

// Scroll Event for Header blur
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
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

// Generate Policy Cards
function renderPolicies() {
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
            // Desktop 3-column grid layout:
            // Column 0 (Left): reveal-left
            // Column 1 (Middle): reveal-bottom
            // Column 2 (Right): reveal-right
            const col = index % 3;
            if (col === 0) {
                animationClass = 'reveal-left';
            } else if (col === 1) {
                animationClass = 'reveal-bottom';
            } else {
                animationClass = 'reveal-right';
            }
        }

        card.className = `policy-card glass ${animationClass}`;
        card.dataset.id = policy.id;
        card.dataset.index = index;
        card.innerHTML = `
            <div class="policy-card-header">
                <div style="display: flex; justify-content: space-between; align-items: center; width: 100%; margin-bottom: 0.4rem;">
                    <span class="policy-number">計畫 ${policy.id < 10 ? '0' + policy.id : policy.id}</span>
                    <span class="badge-innovative-sm"><span class="pulse-dot"></span>首創</span>
                </div>
                <h3>${policy.title}</h3>
            </div>
            <div class="policy-card-image-wrapper">
                <img class="policy-card-image" src="${policy.image}" alt="${policy.title} - 未來示意圖" onerror="this.style.display='none'; if(this.nextElementSibling) this.nextElementSibling.style.display='none'; this.parentElement.querySelector('.policy-card-image-placeholder').style.display='flex';">
                <span class="vision-badge">未來示意圖</span>
                <div class="policy-card-image-placeholder" style="display: none;">
                    <div class="placeholder-icon">${policy.icon}</div>
                    <span class="placeholder-text">示意圖規劃中</span>
                </div>
            </div>
            <div class="policy-card-body">
                <p class="policy-highlight">${policy.highlight}</p>
                <div class="policy-card-footer">
                    <button class="learn-more-btn">
                        深入瞭解
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
    document.getElementById('drawer-number').innerHTML = `計畫 ${formattedNum} <span class="badge-innovative-sm" style="margin-left: 0.5rem;"><span class="pulse-dot"></span>本里首創 ‧ 獨家政見</span>`;
    document.getElementById('drawer-title').textContent = policy.title;
    document.getElementById('drawer-description').textContent = policy.description;

    // Populate drawer image
    const drawerImgWrapper = document.getElementById('drawer-image-wrapper');
    if (drawerImgWrapper) {
        // 如果是計畫 02 (id 為 2)，渲染三張圖
        if (policy.id === 2) {
            drawerImgWrapper.style.display = 'block';
            drawerImgWrapper.innerHTML = `
                <div style="position: relative; margin-bottom: 1.5rem; border-radius: 12px; overflow: hidden; border: 1px solid var(--card-border);">
                    <img class="drawer-image" src="images/policy_02_eq_3.png" alt="${policy.title} 概念圖三 - 未來示意圖">
                    <span class="vision-badge">未來示意圖</span>
                </div>
                <div style="position: relative; margin-bottom: 1.5rem; border-radius: 12px; overflow: hidden; border: 1px solid var(--card-border);">
                    <img class="drawer-image" src="images/policy_02_eq_2.png" alt="${policy.title} 概念圖二 - 未來示意圖">
                    <span class="vision-badge">未來示意圖</span>
                </div>
                <div style="position: relative; border-radius: 12px; overflow: hidden; border: 1px solid var(--card-border);">
                    <img class="drawer-image" src="images/policy_02_eq_1.png" alt="${policy.title} 概念圖一 - 未來示意圖">
                    <span class="vision-badge">未來示意圖</span>
                </div>
            `;
        } else if (policy.id === 4) {
            // 如果是計畫 04 (id 為 4)，渲染 Before/After 現況對比滑塊
            drawerImgWrapper.style.display = 'block';
            drawerImgWrapper.innerHTML = `
                <div class="before-after-slider">
                    <div class="slider-image-before">
                        <img src="images/policy_04_safety_1.jpg" alt="現況：人行道破損補丁（實景記錄）">
                    </div>
                    <div class="slider-image-after" id="slider-image-after">
                        <img src="images/policy_04_safety_2.png" alt="未來：防滑平整人行道 - 未來示意圖">
                    </div>
                    <input type="range" min="0" max="100" value="50" class="slider-range" id="slider-range" aria-label="Before/After 拖拽滑動條">
                    <div class="slider-line" id="slider-line"></div>
                    <div class="slider-button" id="slider-button"></div>
                    <span class="slider-label slider-label-before">未來願景</span>
                    <span class="slider-label slider-label-after">現況實景</span>
                    <span class="vision-badge">未來示意圖</span>
                </div>
            `;
            // Add event listener to range input to handle clip-path and button/line position
            const range = document.getElementById('slider-range');
            const afterImage = document.getElementById('slider-image-after');
            const line = document.getElementById('slider-line');
            const button = document.getElementById('slider-button');
            
            const updateSlider = () => {
                const value = range.value;
                afterImage.style.clipPath = `polygon(0 0, ${value}% 0, ${value}% 100%, 0 100%)`;
                line.style.left = `${value}%`;
                button.style.left = `${value}%`;
            };
            
            range.addEventListener('input', updateSlider);
            range.addEventListener('change', updateSlider);
            
            // Set initial position
            updateSlider();
        } else {
            // 其餘一般計畫渲染單張圖
            drawerImgWrapper.innerHTML = `
                <div style="position: relative; border-radius: 16px; overflow: hidden; border: 1px solid var(--card-border);">
                    <img class="drawer-image" src="${policy.image}" alt="${policy.title} - 未來示意圖" onerror="this.closest('#drawer-image-wrapper').style.display='none';" onload="this.closest('#drawer-image-wrapper').style.display='block';">
                    <span class="vision-badge">未來示意圖</span>
                </div>
            `;
        }
    }

    // How to do list
    const howToDoList = document.getElementById('drawer-howtodo-list');
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

    // Why possible section
    document.getElementById('drawer-capability-text').textContent = policy.whyPossible;

    // Principles section
    document.getElementById('drawer-principles-text').textContent = policy.principles;

    // Open drawer view
    drawerBackdrop.classList.add('active');
    drawer.classList.add('active');
    document.body.style.overflow = 'hidden'; // Lock main scroll
}

function closeDrawer() {
    drawerBackdrop.classList.remove('active');
    drawer.classList.remove('active');
    document.body.style.overflow = ''; // Unlock main scroll
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
// 里民共治・有問必答牆 (Participatory Q&A Data & Handlers)
// ==========================================================================
const DEFAULT_QA_DATA = [
    {
        id: "qa-1",
        category: "#巷弄安全與照明",
        type: "inspect",
        statusText: "列為當選後優先重點會勘",
        statusClass: "status-inspect",
        author: "安和路二段 鄰居",
        date: "2026-08-20",
        title: "安和路二段與明德路口夜間照明昏暗及雨天人行步道易積水問題",
        question: "明德路二段與安和路交界處，夜間照明較昏暗，且下雨時人行道邊緣容易積水濕滑，長輩晚上散步容易踩空滑倒，希望能評估增設感應式照明或防滑鋪面。",
        response: "1. 【列入優先會勘】：當選後一週內將排定第一梯次「社區夜間照明與防滑全面會勘」，邀請區公所工務課與交通課現場實勘。\n2. 【短期改善措施】：先行協調更換高流明節能 LED 燈具，並針對周邊排水孔清淤，降低積水機率。\n3. 【中長期專案爭取】：向市府交通局與養工處爭取「友善人行步道改善專案」，更新標線型人行道防滑係數，保障全齡通行安全。"
    },
    {
        id: "qa-2",
        category: "#跨世代共融與課程",
        type: "policy",
        statusText: "已納入競選政見白皮書",
        statusClass: "status-policy",
        author: "明德活動中心 太鼓班學員",
        date: "2026-08-18",
        title: "請問新里長上任後，活動中心既有的太鼓班與長輩課程會不會中斷？",
        question: "我們在活動中心的太鼓班已經練習好幾年了，很擔心換了里長之後這些長輩喜歡的班別會不會被取消或改掉？另外也希望能有機會讓年輕家人一起參與。",
        response: "1. 【承諾百分之百延續】：所有既有深受好評的太鼓班、土風舞等傳統課程，絕對完整保留、場地與時段全力保障！\n2. 【潮流升級注入新活力】：陳新昱具備 20 年音樂產業背景，已將「草地音樂節」納入政見白皮書第 1 案，未來將邀請青年獨立樂手與太鼓班長輩跨世代合體公演，讓家人與兒孫一同同樂！"
    },
    {
        id: "qa-3",
        category: "#交通號誌與停車",
        type: "city",
        statusText: "市府權責・列為當選專案爭取",
        statusClass: "status-city",
        author: "海山站通勤族 林先生",
        date: "2026-08-15",
        title: "捷運站周邊機車格嚴重不足，里長能否直接將紅線塗銷改設機車格？",
        question: "每天早上下班時間，捷運站周邊機車格一位難求，許多機車違停在紅線上，影響行人動線與學童安全。請問里長能不能直接把紅線塗銷改成機車格？",
        response: "1. 【法規權責釐清】：紅黃線劃設與道路空間配置屬市府交通局與警察局權責，里長依法無權單方面塗銷或自行劃設。\n2. 【爭取彈性配套方案】：我們不做空頭承諾，當選後將主動向交通局提案辦理「捷運外圍彈性機車格會勘」，評估利用周邊閒置公有地或退縮綠帶增設機車停放區，兼顧行人通行順暢與通勤族停車需求。"
    },
    {
        id: "qa-4",
        category: "#社區法規與大樓共好",
        type: "law",
        statusText: "法規說明與行政程序解答",
        statusClass: "status-law",
        author: "金城路大樓管委會 委員",
        date: "2026-08-12",
        title: "想請教新北市對於公寓大廈公共梯廳更換感應式節能燈具有補助專案嗎？",
        question: "我們大樓想要把公共梯廳老舊日光燈更換為感應式 LED 節能燈具，想請問候選人市府是否有相關補助款？申請程序大概要多久？",
        response: "1. 【市府補助法規說明】：新北市工務局每年定期開辦「低碳社區智慧節能補助計畫」，針對社區公共空間更換節能燈具或智慧控制設備，最高可補助總工程款之 50%（依年度公告為準）。\n2. 【里辦公處行政協辦】：未來里辦公處將成立「大樓節能與補助諮詢窗口」，由具備資工與數據管理背景的團隊協助大樓管委會彙整申請文件與流程，讓明德里各社區都能順利爭取市府補助！"
    }
];

// Load QA Data (combining default + user personal pending cards from localStorage)
function getQAData() {
    try {
        const stored = localStorage.getItem('md2_user_qa_proposals');
        if (stored) {
            const userCards = JSON.parse(stored);
            return [...userCards, ...DEFAULT_QA_DATA];
        }
    } catch(e) {}
    return DEFAULT_QA_DATA;
}

let currentQAFilter = 'all';

function renderQACards() {
    const container = document.getElementById('qa-cards-container');
    if (!container) return;

    const allData = getQAData();
    const filtered = allData.filter(item => {
        if (currentQAFilter === 'all') return true;
        return item.type === currentQAFilter;
    });

    if (filtered.length === 0) {
        container.innerHTML = `<div class="qa-card glass" style="text-align:center; color:var(--text-muted); padding:3rem;">此類別目前尚無公開提案</div>`;
        return;
    }

    container.innerHTML = filtered.map(item => `
        <div class="qa-card glass" id="${item.id}">
            <div class="qa-card-meta">
                <div class="qa-tag-group">
                    <span class="qa-category-tag">${escapeHTML(item.category)}</span>
                    <span class="qa-status-badge ${item.statusClass}">${escapeHTML(item.statusText)}</span>
                </div>
                <span class="qa-author-time">${escapeHTML(item.author)} ‧ ${escapeHTML(item.date)}</span>
            </div>
            <div class="qa-question-box">
                <h4 class="qa-question-title">${escapeHTML(item.title)}</h4>
                <p class="qa-question-text collapsed" id="qtext-${item.id}">${escapeHTML(item.question)}</p>
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
                <div class="qa-response-content">${escapeHTML(item.response)}</div>
            </div>
        </div>
    `).join('');
}

function toggleQAExpand(cardId) {
    const textEl = document.getElementById(`qtext-${cardId}`);
    const btnEl = document.getElementById(`qbtn-${cardId}`);
    if (!textEl || !btnEl) return;

    if (textEl.classList.contains('collapsed')) {
        textEl.classList.remove('collapsed');
        btnEl.innerHTML = `<span>收合原文</span><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>`;
    } else {
        textEl.classList.add('collapsed');
        btnEl.innerHTML = `<span>展開完整原文</span><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>`;
    }
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

        try {
            const stored = localStorage.getItem('md2_user_qa_proposals');
            const userCards = stored ? JSON.parse(stored) : [];
            userCards.unshift(newProposal);
            localStorage.setItem('md2_user_qa_proposals', JSON.stringify(userCards));
        } catch(e) {}

        form.reset();
        showToast('提案已成功送達！個人端已即時受理上牆');
        renderQACards();

        // Scroll to the newly added card
        const cardEl = document.getElementById(newProposal.id);
        if (cardEl) {
            cardEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    });
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
        if (inputLabel) inputLabel.textContent = '請輸入稱謂（例：安和路 陳先生 / 樂利家長）：';
        if (nameInput) nameInput.placeholder = '例：安和路 陳先生';
        if (consentBox) consentBox.classList.remove('show');
    } else if (optionNum === 3) {
        if (customInputBox) customInputBox.classList.add('show');
        if (inputLabel) inputLabel.textContent = '請輸入去識別姓名（例：遠東大樓・陳○昱）：';
        if (nameInput) nameInput.placeholder = '例：遠東大樓・陳○昱';
        if (consentBox) consentBox.classList.remove('show');
    } else if (optionNum === 4) {
        if (customInputBox) customInputBox.classList.add('show');
        if (inputLabel) inputLabel.textContent = '請輸入全名與社區（例：遠東大樓：陳新昱）：';
        if (nameInput) nameInput.placeholder = '例：遠東大樓：陳新昱';
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
    const curLikes = parseInt(localStorage.getItem('md2_likes_count') || '1268', 10) + 1;
    localStorage.setItem('md2_likes_count', curLikes.toString());

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
// 人氣數據指標儀表板 (Stats Count-Up & Dynamic Metric Bars)
// ==========================================================================
function initStatsDashboard() {
    // Check views counter
    const now = Date.now();
    const lastViewTime = localStorage.getItem('md2_last_view_timestamp');
    const ONE_HOUR = 60 * 60 * 1000;
    let curViews = parseInt(localStorage.getItem('md2_views_count') || '3852', 10);

    if (!lastViewTime || (now - parseInt(lastViewTime, 10) >= ONE_HOUR)) {
        curViews += Math.floor(Math.random() * 3) + 1;
        localStorage.setItem('md2_views_count', curViews.toString());
        localStorage.setItem('md2_last_view_timestamp', now.toString());
    }

    const viewsEl = document.getElementById('stat-views-count');
    if (viewsEl) viewsEl.textContent = curViews.toLocaleString();

    const curLikes = parseInt(localStorage.getItem('md2_likes_count') || '1268', 10);
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

                animateValue(viewsEl, curViews - 40, curViews, 1200);
                animateValue(likesEl, curLikes - 30, curLikes, 1200);
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

// Initial Render and setup
renderPolicies();
renderQACards();
initQATabs();
initQAForm();
initStatsDashboard();
observeRevealElements();
initSmartSnap();
initHeaderScroll();

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

