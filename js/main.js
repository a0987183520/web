const POLICIES_DATA = [
    {
        id: 1,
        category: "education",
        categoryName: "生活美學與未來教育",
        title: "草地音樂節",
        subtitle: "讓公園成為跨世代的生活舞台",
        highlight: "善用明德市民活動中心旁的公園草地，透過專業策展、資源整合與居民參與，逐步打造散步就能抵達的草地音樂活動。",
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
        category: "education",
        categoryName: "生活美學與未來教育",
        title: "全齡 EQ 成長課程",
        subtitle: "讓情緒教育成為家庭的日常支持",
        highlight: "提供涵蓋孩子、家長、青壯年與長者都能參與的情緒管理與同理溝通課程，以生活化情緒教育提升家庭和諧。",
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
        category: "education",
        categoryName: "生活美學與未來教育",
        title: "無人機與 AI 未來體驗營",
        subtitle: "讓科技變成孩子看得見的可能",
        highlight: "為里內家庭提供安全的無人機飛行體驗、AI 影像與寫作創作坊，協助家長用 AI 輔助孩子提升自主學習力。",
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
        category: "governance",
        categoryName: "專業治理與精準服務",
        title: "明德活動中心 2.0",
        subtitle: "打造跨世代全齡生活基地",
        highlight: "活化活動中心空間，公開租借與課表以消弭落差，增設「社區音樂共學角」與跨世代桌遊交流，提供全齡共學空間。",
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>`,
        description: "在不排擠既有銀髮共餐與健康促進服務的前提下，我們希望透過更合理的空間與時間規劃，讓活動中心在平日晚上與假日成為年輕人、上班族與親子家庭也熱愛走入的「全齡社區生活基地」。",
        howToDo: [
            "建置公開透明的活動中心課表與租借預約網頁，讓所有里民均享有公平的使用權利，降低資訊落差。",
            "依里民需求，增設平日夜間與假日的多元課程，如親子繪本閱讀、跨世代桌遊、音樂欣賞、實用數位技能等。",
            "設置「社區音樂共學角」，提供由熱心里民與候選人捐贈的樂器（如數位鋼琴、木吉他、烏克麗麗），並建立樂器保管與借用守則，引導有興趣者入門。",
            "定期統計各時段使用人次與反饋，動態優化空間規劃，並確保場地負荷與清潔管理。"
        ],
        whyPossible: "候選人擁有 10 年社區公寓大廈管委會主委與委員經驗，深諳公共空間使用規約的制定與人際協調。同時，能提供個人出版的合法授權流行音樂琴譜與部分樂器資源，以最低公帑成本，充實活動中心的軟硬體內容。",
        principles: "空間活化遵循「增量不取代」原則，絕不排擠原有的銀髮族福利。各項夜間與假日活動將嚴格遵守市府活動中心管理辦法、音量與安寧規範，尊重場地管理權權責。"
    },
    {
        id: 5,
        category: "governance",
        categoryName: "專業治理與精準服務",
        title: "數位里政與健康導航",
        subtitle: "讓里民需求被看見、把資源接上",
        highlight: "建立整合公告、報修、常見問題與意見回饋的數位入口，引進 AI 助理輔助分類常見問答，並提供易懂的社福資源指引。",
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>`,
        description: "里政服務不該只靠里民親自跑里長辦公室或打電話。我們希望建立一個對白天上班族友善的數位里政資訊站，同時為家中長輩設計精準、直觀的社會福利資源導航，省去在複雜政府網站中迷路的時間。",
        howToDo: [
            "建置一站式里政網站與通訊軟體入口，整合里政公告、社區活動、路燈／道路報修與常見問題解答。",
            "分階段試辦 AI 智能客服小幫手，協助自動歸類與即時回覆常見里政庶務問答；重大或複雜陳情案件則一律由人工專案追蹤。",
            "整理並製作圖文並茂的「長照 2.0 與社會福利資源導引地圖」，包含長照申請資格、補助原則、里內醫療院所與交通接送轉介資訊。",
            "保留傳統電話、親自面談與紙本公告，確保不擅長操作智慧型手機的長輩權益不受損，消弭數位落差。"
        ],
        whyPossible: "候選人具備 30 年資工技術背景，能自主完成網站架構與 AI 助理的底層搭建及優化，不需要編列昂貴的系統外包預算。同時能以邏輯清晰的專案管理手法，將政府龐雜的長照政策精簡為人人看得懂的「導航地圖」。",
        principles: "所有數位系統均不會蒐集、儲存與里政無關之個人私密隱私資料。AI 客服小幫手定位為「輔助資訊導引」，絕不對醫療診斷、法律諮詢或突發緊急救難事件給予最終處置判斷，緊急事件一律轉接法定專線（110/119/1999）。"
    },
    {
        id: 6,
        category: "democracy",
        categoryName: "空間活化與生活民主",
        title: "智慧安全與友善步行",
        subtitle: "用資料追蹤真正的社區風險點",
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
        id: 7,
        category: "democracy",
        categoryName: "空間活化與生活民主",
        title: "參與式公共治理",
        subtitle: "讓白天上班族也能參與社區大小事",
        highlight: "公開公部門會勘紀錄，建立線上與實體並行的意見搜集與回饋管道，讓無法出席實體會勘的上班族也能表達意見。",
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>`,
        description: "社區內的交通號誌調整、停車格畫設、公園遊具更新等重要會勘，往往都在平日的上班時間舉行，導致多數青壯年與上班族的聲音被忽略。我們將建立一套結合線上與線下的參與式機制，讓不能請假到現場的里民，權益同樣受到保障。",
        howToDo: [
            "會勘前 5 天，以圖文、地圖、QR Code 與看板提前公告會勘議題，提供線上與現場回報入口收集里民想法。",
            "會勘後 3 天內，在不涉及公務與個人隱私前提下，公開整理「會勘重點摘要」，包括出席單位、各方意見、初步結論與下一步時程。",
            "在規劃形成前，保留 3 到 5 天的第二輪線上回饋期，讓更多里民能確認初步方案，並公開採納或未採納之考量原因。",
            "針對公園改造、重大空間活化等軟性議題，舉辦親子或跨世代工作坊與問卷調查，廣納新舊里民意見。"
        ],
        whyPossible: "候選人擁有 10 年社區管理實務，擅長溝通協調與程序公開，同時具備 30 年軟體工程背景，能利用數位看板、行動網頁等低門檻工具，迅速為里民架設意見整合平台，不需編列公帑即可達成社區民主升級。",
        principles: "參與式公共治理的目的在於「擴大意見徵詢、提升過程透明度」，它絕非「民調決定一切」，不能取代現行的法定行政程序、土地所有權規範、安全專業評估及公部門最終裁量權。"
    }
];

// DOM Elements
const policyGrid = document.getElementById('policies-grid');
const filterContainer = document.getElementById('filter-controls');
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
function renderPolicies(filterCategory = 'all') {
    policyGrid.innerHTML = '';
    
    const filteredPolicies = filterCategory === 'all' 
        ? POLICIES_DATA 
        : POLICIES_DATA.filter(p => p.category === filterCategory);
        
    filteredPolicies.forEach(policy => {
        const card = document.createElement('div');
        card.className = 'policy-card glass reveal'; // Added 'reveal' to trigger scroll animation
        card.dataset.id = policy.id;
        card.innerHTML = `
            <span class="policy-number">計畫 0${policy.id}</span>
            <div class="value-icon">${policy.icon}</div>
            <h3>${policy.title}</h3>
            <p class="policy-highlight">${policy.highlight}</p>
            <div class="policy-card-footer">
                <span class="policy-category">${policy.categoryName}</span>
                <button class="learn-more-btn">
                    深入瞭解
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                </button>
            </div>
        `;
        card.addEventListener('click', () => openDrawer(policy.id));
        policyGrid.appendChild(card);
    });

    // Re-initialize observer for dynamically rendered elements
    observeRevealElements();
}

// Filter Event Delegation
filterContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('filter-btn')) {
        // Toggle active button
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        
        // Render
        const category = e.target.dataset.filter;
        renderPolicies(category);
    }
});

// Drawer Functions
function openDrawer(policyId) {
    const policy = POLICIES_DATA.find(p => p.id === policyId);
    if (!policy) return;

    // Populate drawer elements
    document.getElementById('drawer-number').textContent = `計畫 0${policy.id} ✕ ${policy.categoryName}`;
    document.getElementById('drawer-title').textContent = policy.title;
    document.getElementById('drawer-description').textContent = policy.description;

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

// IntersectionObserver Logic for Scroll Fade-in & Fade-out Reveal Animations
let revealObserver;

function observeRevealElements() {
    // Collect all elements with reveal classes
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    
    // Disconnect old observer if exists
    if (revealObserver) {
        revealObserver.disconnect();
    }
    
    // Define options
    const observerOptions = {
        root: null,
        threshold: 0.08, // Trigger when 8% is visible
        rootMargin: "-10px 0px -10px 0px" // Slight buffer area to prevent instant triggers near boundary
    };
    
    // Instantiate observer
    revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            } else {
                // Dynamically remove active class to allow fade-out when scrolling away (both up and down)
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

// Initial Render and setup
renderPolicies();
observeRevealElements();
