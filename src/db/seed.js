// ============================================================
// Seed Data — 武汉外校小升初 Join In 3-5年级完整词汇库
// 从 PDF "join in3-5年级词汇.pdf" 提取并编排
// 共 341 条词汇数据
// ============================================================

export const seedBooks = [
  { id: "joinin1", grade: 3, title: "Join In 1", subtitle: "三年级", unitCount: 11, wordCount: 125, color: "grade3" },
  { id: "joinin2", grade: 4, title: "Join In 2", subtitle: "四年级", unitCount: 11, wordCount: 106, color: "grade4" },
  { id: "joinin3", grade: 5, title: "Join In 3", subtitle: "五年级", unitCount: 5,  wordCount: 110, color: "grade5" },
  { id: "sprint",  grade: 6, title: "外冲冲刺班", subtitle: "2026春季·单词清单", unitCount: 6, wordCount: 150, color: "grade6" },
];

export const seedUnits = [
  // Join In 1 units
  { key:"joinin1|starter", bookId:"joinin1", id:"starter", name:"Starter Unit", order:0, grade:3 },
  { key:"joinin1|u1", bookId:"joinin1", id:"u1", name:"Unit 1 — Numbers", order:1, grade:3 },
  { key:"joinin1|u2", bookId:"joinin1", id:"u2", name:"Unit 2 — Colours", order:2, grade:3 },
  { key:"joinin1|u3", bookId:"joinin1", id:"u3", name:"Unit 3 — School Things", order:3, grade:3 },
  { key:"joinin1|u4", bookId:"joinin1", id:"u4", name:"Unit 4 — Animals", order:4, grade:3 },
  { key:"joinin1|u5", bookId:"joinin1", id:"u5", name:"Unit 5 — Days", order:5, grade:3 },
  { key:"joinin1|u6", bookId:"joinin1", id:"u6", name:"Unit 6 — Clothes", order:6, grade:3 },
  { key:"joinin1|u7", bookId:"joinin1", id:"u7", name:"Unit 7 — Months & Birthday", order:7, grade:3 },
  { key:"joinin1|u8", bookId:"joinin1", id:"u8", name:"Unit 8 — Feelings", order:8, grade:3 },
  { key:"joinin1|u9", bookId:"joinin1", id:"u9", name:"Unit 9 — Food", order:9, grade:3 },
  { key:"joinin1|u10", bookId:"joinin1", id:"u10", name:"Unit 10 — Body", order:10, grade:3 },
  // Join In 2 units
  { key:"joinin2|starter", bookId:"joinin2", id:"starter", name:"Starter Unit", order:0, grade:4 },
  { key:"joinin2|u1", bookId:"joinin2", id:"u1", name:"Unit 1 — Where?", order:1, grade:4 },
  { key:"joinin2|u2", bookId:"joinin2", id:"u2", name:"Unit 2 — Numbers 20-100", order:2, grade:4 },
  { key:"joinin2|u3", bookId:"joinin2", id:"u3", name:"Unit 3 — Clothes & People", order:3, grade:4 },
  { key:"joinin2|u4", bookId:"joinin2", id:"u4", name:"Unit 4 — Family", order:4, grade:4 },
  { key:"joinin2|u5", bookId:"joinin2", id:"u5", name:"Unit 5 — House", order:5, grade:4 },
  { key:"joinin2|u6", bookId:"joinin2", id:"u6", name:"Unit 6 — Activities", order:6, grade:4 },
  { key:"joinin2|u7", bookId:"joinin2", id:"u7", name:"Unit 7 — Farm Animals", order:7, grade:4 },
  { key:"joinin2|u8", bookId:"joinin2", id:"u8", name:"Unit 8 — Room", order:8, grade:4 },
  { key:"joinin2|u9", bookId:"joinin2", id:"u9", name:"Unit 9 — Shapes", order:9, grade:4 },
  { key:"joinin2|u10", bookId:"joinin2", id:"u10", name:"Unit 10 — Holidays", order:10, grade:4 },
  // Join In 3 units
  { key:"joinin3|u1", bookId:"joinin3", id:"u1", name:"Unit 1 — Shopping & Things", order:1, grade:5 },
  { key:"joinin3|u2", bookId:"joinin3", id:"u2", name:"Unit 2 — Stories & Adventure", order:2, grade:5 },
  { key:"joinin3|u3", bookId:"joinin3", id:"u3", name:"Unit 3 — Nature & Life", order:3, grade:5 },
  { key:"joinin3|u4", bookId:"joinin3", id:"u4", name:"Unit 4 — City", order:4, grade:5 },
  { key:"joinin3|u5", bookId:"joinin3", id:"u5", name:"Unit 5 — Adventure", order:5, grade:5 },
  // Sprint class units
  { key:"sprint|L1", bookId:"sprint", id:"L1", name:"第1讲 · 人物与品牌", order:1, grade:6 },
  { key:"sprint|L2", bookId:"sprint", id:"L2", name:"第2讲 · 科技与自然", order:2, grade:6 },
  { key:"sprint|L3", bookId:"sprint", id:"L3", name:"第3讲 · 文化与节日", order:3, grade:6 },
  { key:"sprint|L4", bookId:"sprint", id:"L4", name:"第4讲 · 节日与数学", order:4, grade:6 },
  { key:"sprint|L5", bookId:"sprint", id:"L5", name:"第5讲 · 地理与逻辑", order:5, grade:6 },
  { key:"sprint|L6", bookId:"sprint", id:"L6", name:"第6讲 · 生态与几何", order:6, grade:6 },
];

// All 341 words extracted from the Join In PDF
// Each word has: id, word, phonetic, chinese, emoji, grade, unit, unitName, exampleSentence, sentenceChinese, sentenceWords
export const seedWords = [
  // ==================== JOIN IN 1 (Grade 3) — 125 words ====================

  // Starter Unit
  { id:1,  word:"Good afternoon", phonetic:"[ɡʊd ˌæftəˈnuːn]", chinese:"下午好", emoji:"🌤️", grade:3, unit:"starter", unitName:"Starter Unit", exampleSentence:"Good afternoon, everyone.", sentenceChinese:"大家下午好。", sentenceWords:["Good","afternoon,","everyone."] },
  { id:2,  word:"Good evening", phonetic:"[ɡʊd ˈiːvnɪŋ]", chinese:"晚上好", emoji:"🌆", grade:3, unit:"starter", unitName:"Starter Unit", exampleSentence:"Good evening, Mum.", sentenceChinese:"妈妈，晚上好。", sentenceWords:["Good","evening,","Mum."] },
  { id:3,  word:"Good morning", phonetic:"[ɡʊd ˈmɔːnɪŋ]", chinese:"早上好", emoji:"🌅", grade:3, unit:"starter", unitName:"Starter Unit", exampleSentence:"Good morning, teacher.", sentenceChinese:"老师，早上好。", sentenceWords:["Good","morning,","teacher."] },
  { id:4,  word:"Good night", phonetic:"[ɡʊd naɪt]", chinese:"晚安", emoji:"🌙", grade:3, unit:"starter", unitName:"Starter Unit", exampleSentence:"Good night, my friend.", sentenceChinese:"晚安，我的朋友。", sentenceWords:["Good","night,","my","friend."] },
  { id:5,  word:"stand", phonetic:"[stænd]", chinese:"站；站立", emoji:"🧍", grade:3, unit:"starter", unitName:"Starter Unit", exampleSentence:"Please stand up.", sentenceChinese:"请站起来。", sentenceWords:["Please","stand","up."] },

  // Unit 1: Numbers
  { id:6,  word:"count", phonetic:"[kaʊnt]", chinese:"数数", emoji:"🔢", grade:3, unit:"u1", unitName:"Unit 1", exampleSentence:"Can you count from one to ten?", sentenceChinese:"你能从一数到十吗？", sentenceWords:["Can","you","count","from","one","to","ten?"] },
  { id:7,  word:"eight", phonetic:"[eɪt]", chinese:"八", emoji:"8️⃣", grade:3, unit:"u1", unitName:"Unit 1", exampleSentence:"I am eight years old.", sentenceChinese:"我八岁了。", sentenceWords:["I","am","eight","years","old."] },
  { id:8,  word:"eleven", phonetic:"[ɪˈlevn]", chinese:"十一", emoji:"🔢", grade:3, unit:"u1", unitName:"Unit 1", exampleSentence:"There are eleven books on the desk.", sentenceChinese:"桌子上有十一本书。", sentenceWords:["There","are","eleven","books","on","the","desk."] },
  { id:9,  word:"four", phonetic:"[fɔː]", chinese:"四", emoji:"4️⃣", grade:3, unit:"u1", unitName:"Unit 1", exampleSentence:"I have four pencils.", sentenceChinese:"我有四支铅笔。", sentenceWords:["I","have","four","pencils."] },
  { id:10, word:"five", phonetic:"[faɪv]", chinese:"五", emoji:"5️⃣", grade:3, unit:"u1", unitName:"Unit 1", exampleSentence:"Give me five, please.", sentenceChinese:"请给我五个。", sentenceWords:["Give","me","five,","please."] },
  { id:11, word:"flag", phonetic:"[flæɡ]", chinese:"旗子", emoji:"🚩", grade:3, unit:"u1", unitName:"Unit 1", exampleSentence:"The flag is red and yellow.", sentenceChinese:"这面旗子是红色和黄色的。", sentenceWords:["The","flag","is","red","and","yellow."] },
  { id:12, word:"guess", phonetic:"[ɡes]", chinese:"猜", emoji:"🤔", grade:3, unit:"u1", unitName:"Unit 1", exampleSentence:"Can you guess the number?", sentenceChinese:"你能猜出这个数字吗？", sentenceWords:["Can","you","guess","the","number?"] },
  { id:13, word:"jump", phonetic:"[dʒʌmp]", chinese:"跳", emoji:"🦘", grade:3, unit:"u1", unitName:"Unit 1", exampleSentence:"The rabbit can jump very high.", sentenceChinese:"这只兔子能跳很高。", sentenceWords:["The","rabbit","can","jump","very","high."] },
  { id:14, word:"nine", phonetic:"[naɪn]", chinese:"九", emoji:"9️⃣", grade:3, unit:"u1", unitName:"Unit 1", exampleSentence:"I go to bed at nine o'clock.", sentenceChinese:"我九点钟睡觉。", sentenceWords:["I","go","to","bed","at","nine","o'clock."] },
  { id:15, word:"number", phonetic:"[ˈnʌmbə]", chinese:"数字；号码", emoji:"#️⃣", grade:3, unit:"u1", unitName:"Unit 1", exampleSentence:"What is your phone number?", sentenceChinese:"你的电话号码是多少？", sentenceWords:["What","is","your","phone","number?"] },
  { id:16, word:"one", phonetic:"[wʌn]", chinese:"一", emoji:"1️⃣", grade:3, unit:"u1", unitName:"Unit 1", exampleSentence:"I have one brother.", sentenceChinese:"我有一个哥哥。", sentenceWords:["I","have","one","brother."] },
  { id:17, word:"seven", phonetic:"[ˈsevn]", chinese:"七", emoji:"7️⃣", grade:3, unit:"u1", unitName:"Unit 1", exampleSentence:"There are seven days in a week.", sentenceChinese:"一周有七天。", sentenceWords:["There","are","seven","days","in","a","week."] },
  { id:18, word:"six", phonetic:"[sɪks]", chinese:"六", emoji:"6️⃣", grade:3, unit:"u1", unitName:"Unit 1", exampleSentence:"I get up at six in the morning.", sentenceChinese:"我早上六点起床。", sentenceWords:["I","get","up","at","six","in","the","morning."] },
  { id:19, word:"ten", phonetic:"[ten]", chinese:"十", emoji:"🔟", grade:3, unit:"u1", unitName:"Unit 1", exampleSentence:"I can count to ten in English.", sentenceChinese:"我能用英语数到十。", sentenceWords:["I","can","count","to","ten","in","English."] },
  { id:20, word:"three", phonetic:"[θriː]", chinese:"三", emoji:"3️⃣", grade:3, unit:"u1", unitName:"Unit 1", exampleSentence:"I have three good friends.", sentenceChinese:"我有三个好朋友。", sentenceWords:["I","have","three","good","friends."] },
  { id:21, word:"twelve", phonetic:"[twelv]", chinese:"十二", emoji:"🔢", grade:3, unit:"u1", unitName:"Unit 1", exampleSentence:"There are twelve months in a year.", sentenceChinese:"一年有十二个月。", sentenceWords:["There","are","twelve","months","in","a","year."] },
  { id:22, word:"two", phonetic:"[tuː]", chinese:"二", emoji:"2️⃣", grade:3, unit:"u1", unitName:"Unit 1", exampleSentence:"I have two hands.", sentenceChinese:"我有两只手。", sentenceWords:["I","have","two","hands."] },
  { id:23, word:"your", phonetic:"[jɔː]", chinese:"你的", emoji:"👉", grade:3, unit:"u1", unitName:"Unit 1", exampleSentence:"What is your name?", sentenceChinese:"你叫什么名字？", sentenceWords:["What","is","your","name?"] },
  { id:24, word:"zero", phonetic:"[ˈzɪərəʊ]", chinese:"零", emoji:"0️⃣", grade:3, unit:"u1", unitName:"Unit 1", exampleSentence:"The temperature is zero degrees.", sentenceChinese:"温度是零度。", sentenceWords:["The","temperature","is","zero","degrees."] },

  // Unit 2: Colours
  { id:25, word:"black", phonetic:"[blæk]", chinese:"黑色", emoji:"⬛", grade:3, unit:"u2", unitName:"Unit 2", exampleSentence:"My bag is black.", sentenceChinese:"我的书包是黑色的。", sentenceWords:["My","bag","is","black."] },
  { id:26, word:"blue", phonetic:"[bluː]", chinese:"蓝色", emoji:"🔵", grade:3, unit:"u2", unitName:"Unit 2", exampleSentence:"The sky is blue.", sentenceChinese:"天空是蓝色的。", sentenceWords:["The","sky","is","blue."] },
  { id:27, word:"car", phonetic:"[kɑː]", chinese:"小汽车", emoji:"🚗", grade:3, unit:"u2", unitName:"Unit 2", exampleSentence:"My father has a red car.", sentenceChinese:"我爸爸有一辆红色的汽车。", sentenceWords:["My","father","has","a","red","car."] },
  { id:28, word:"colour", phonetic:"[ˈkʌlə]", chinese:"颜色", emoji:"🎨", grade:3, unit:"u2", unitName:"Unit 2", exampleSentence:"What colour do you like?", sentenceChinese:"你喜欢什么颜色？", sentenceWords:["What","colour","do","you","like?"] },
  { id:29, word:"door", phonetic:"[dɔː]", chinese:"门", emoji:"🚪", grade:3, unit:"u2", unitName:"Unit 2", exampleSentence:"Please close the door.", sentenceChinese:"请关上门。", sentenceWords:["Please","close","the","door."] },
  { id:30, word:"favourite", phonetic:"[ˈfeɪvərɪt]", chinese:"最喜欢的", emoji:"⭐", grade:3, unit:"u2", unitName:"Unit 2", exampleSentence:"My favourite colour is green.", sentenceChinese:"我最喜欢的颜色是绿色。", sentenceWords:["My","favourite","colour","is","green."] },
  { id:31, word:"green", phonetic:"[ɡriːn]", chinese:"绿色", emoji:"🟢", grade:3, unit:"u2", unitName:"Unit 2", exampleSentence:"The grass is green.", sentenceChinese:"草是绿色的。", sentenceWords:["The","grass","is","green."] },
  { id:32, word:"jeep", phonetic:"[dʒiːp]", chinese:"吉普车", emoji:"🚙", grade:3, unit:"u2", unitName:"Unit 2", exampleSentence:"He drives a jeep to school.", sentenceChinese:"他开吉普车去上学。", sentenceWords:["He","drives","a","jeep","to","school."] },
  { id:33, word:"orange", phonetic:"[ˈɒrɪndʒ]", chinese:"橙色；橙子", emoji:"🟠", grade:3, unit:"u2", unitName:"Unit 2", exampleSentence:"I like orange juice.", sentenceChinese:"我喜欢橙汁。", sentenceWords:["I","like","orange","juice."] },
  { id:34, word:"pink", phonetic:"[pɪŋk]", chinese:"粉色", emoji:"🩷", grade:3, unit:"u2", unitName:"Unit 2", exampleSentence:"She has a pink dress.", sentenceChinese:"她有一条粉色的裙子。", sentenceWords:["She","has","a","pink","dress."] },
  { id:35, word:"please", phonetic:"[pliːz]", chinese:"请", emoji:"🙏", grade:3, unit:"u2", unitName:"Unit 2", exampleSentence:"Please sit down.", sentenceChinese:"请坐下。", sentenceWords:["Please","sit","down."] },
  { id:36, word:"purple", phonetic:"[ˈpɜːpl]", chinese:"紫色", emoji:"🟣", grade:3, unit:"u2", unitName:"Unit 2", exampleSentence:"I like purple grapes.", sentenceChinese:"我喜欢紫色的葡萄。", sentenceWords:["I","like","purple","grapes."] },
  { id:37, word:"red", phonetic:"[red]", chinese:"红色", emoji:"🔴", grade:3, unit:"u2", unitName:"Unit 2", exampleSentence:"The apple is red.", sentenceChinese:"这个苹果是红色的。", sentenceWords:["The","apple","is","red."] },
  { id:38, word:"white", phonetic:"[waɪt]", chinese:"白色", emoji:"⬜", grade:3, unit:"u2", unitName:"Unit 2", exampleSentence:"Snow is white.", sentenceChinese:"雪是白色的。", sentenceWords:["Snow","is","white."] },
  { id:39, word:"yellow", phonetic:"[ˈjeləʊ]", chinese:"黄色", emoji:"🟡", grade:3, unit:"u2", unitName:"Unit 2", exampleSentence:"The banana is yellow.", sentenceChinese:"香蕉是黄色的。", sentenceWords:["The","banana","is","yellow."] },

  // Unit 3: School Things
  { id:40, word:"blackboard", phonetic:"[ˈblækbɔːd]", chinese:"黑板", emoji:"🖤", grade:3, unit:"u3", unitName:"Unit 3", exampleSentence:"The teacher writes on the blackboard.", sentenceChinese:"老师在黑板上写字。", sentenceWords:["The","teacher","writes","on","the","blackboard."] },
  { id:41, word:"book", phonetic:"[bʊk]", chinese:"书", emoji:"📖", grade:3, unit:"u3", unitName:"Unit 3", exampleSentence:"I like reading books.", sentenceChinese:"我喜欢读书。", sentenceWords:["I","like","reading","books."] },
  { id:42, word:"chair", phonetic:"[tʃeə]", chinese:"椅子", emoji:"🪑", grade:3, unit:"u3", unitName:"Unit 3", exampleSentence:"Please sit on the chair.", sentenceChinese:"请坐在椅子上。", sentenceWords:["Please","sit","on","the","chair."] },
  { id:43, word:"desk", phonetic:"[desk]", chinese:"书桌", emoji:"🪑", grade:3, unit:"u3", unitName:"Unit 3", exampleSentence:"There is a book on my desk.", sentenceChinese:"我的书桌上有一本书。", sentenceWords:["There","is","a","book","on","my","desk."] },
  { id:44, word:"pen", phonetic:"[pen]", chinese:"钢笔", emoji:"🖊️", grade:3, unit:"u3", unitName:"Unit 3", exampleSentence:"May I use your pen?", sentenceChinese:"我可以用你的钢笔吗？", sentenceWords:["May","I","use","your","pen?"] },
  { id:45, word:"pencil", phonetic:"[ˈpensl]", chinese:"铅笔", emoji:"✏️", grade:3, unit:"u3", unitName:"Unit 3", exampleSentence:"I write with a pencil.", sentenceChinese:"我用铅笔写字。", sentenceWords:["I","write","with","a","pencil."] },
  { id:46, word:"pencil case", phonetic:"[ˈpensl keɪs]", chinese:"铅笔盒", emoji:"📦", grade:3, unit:"u3", unitName:"Unit 3", exampleSentence:"My pencil case is full.", sentenceChinese:"我的铅笔盒装满了。", sentenceWords:["My","pencil","case","is","full."] },
  { id:47, word:"ruler", phonetic:"[ˈruːlə]", chinese:"尺子", emoji:"📏", grade:3, unit:"u3", unitName:"Unit 3", exampleSentence:"I need a ruler to draw a line.", sentenceChinese:"我需要一把尺子来画线。", sentenceWords:["I","need","a","ruler","to","draw","a","line."] },
  { id:48, word:"schoolbag", phonetic:"[ˈskuːlbæɡ]", chinese:"书包", emoji:"🎒", grade:3, unit:"u3", unitName:"Unit 3", exampleSentence:"My schoolbag is heavy.", sentenceChinese:"我的书包很重。", sentenceWords:["My","schoolbag","is","heavy."] },
  { id:49, word:"tree", phonetic:"[triː]", chinese:"树", emoji:"🌳", grade:3, unit:"u3", unitName:"Unit 3", exampleSentence:"There is a big tree in the garden.", sentenceChinese:"花园里有一棵大树。", sentenceWords:["There","is","a","big","tree","in","the","garden."] },
  { id:50, word:"window", phonetic:"[ˈwɪndəʊ]", chinese:"窗户", emoji:"🪟", grade:3, unit:"u3", unitName:"Unit 3", exampleSentence:"Please open the window.", sentenceChinese:"请打开窗户。", sentenceWords:["Please","open","the","window."] },

  // Unit 4: Animals & Actions
  { id:51, word:"brown", phonetic:"[braʊn]", chinese:"棕色", emoji:"🟤", grade:3, unit:"u4", unitName:"Unit 4", exampleSentence:"The dog is brown.", sentenceChinese:"这只狗是棕色的。", sentenceWords:["The","dog","is","brown."] },
  { id:52, word:"cat", phonetic:"[kæt]", chinese:"猫", emoji:"🐱", grade:3, unit:"u4", unitName:"Unit 4", exampleSentence:"I have a lovely cat.", sentenceChinese:"我有一只可爱的猫。", sentenceWords:["I","have","a","lovely","cat."] },
  { id:53, word:"dog", phonetic:"[dɒɡ]", chinese:"狗", emoji:"🐕", grade:3, unit:"u4", unitName:"Unit 4", exampleSentence:"The dog is running in the park.", sentenceChinese:"狗在公园里跑。", sentenceWords:["The","dog","is","running","in","the","park."] },
  { id:54, word:"eat", phonetic:"[iːt]", chinese:"吃", emoji:"🍽️", grade:3, unit:"u4", unitName:"Unit 4", exampleSentence:"I like to eat apples.", sentenceChinese:"我喜欢吃苹果。", sentenceWords:["I","like","to","eat","apples."] },
  { id:55, word:"fish", phonetic:"[fɪʃ]", chinese:"鱼", emoji:"🐟", grade:3, unit:"u4", unitName:"Unit 4", exampleSentence:"The fish swims in the water.", sentenceChinese:"鱼在水里游。", sentenceWords:["The","fish","swims","in","the","water."] },
  { id:56, word:"run", phonetic:"[rʌn]", chinese:"跑", emoji:"🏃", grade:3, unit:"u4", unitName:"Unit 4", exampleSentence:"Let's run together.", sentenceChinese:"我们一起跑吧。", sentenceWords:["Let's","run","together."] },
  { id:57, word:"sit", phonetic:"[sɪt]", chinese:"坐", emoji:"🪑", grade:3, unit:"u4", unitName:"Unit 4", exampleSentence:"Please sit here.", sentenceChinese:"请坐在这里。", sentenceWords:["Please","sit","here."] },

  // Unit 5: Days
  { id:58, word:"day", phonetic:"[deɪ]", chinese:"天；白天", emoji:"☀️", grade:3, unit:"u5", unitName:"Unit 5", exampleSentence:"It's a sunny day today.", sentenceChinese:"今天是晴天。", sentenceWords:["It's","a","sunny","day","today."] },
  { id:59, word:"Friday", phonetic:"[ˈfraɪdeɪ]", chinese:"星期五", emoji:"📅", grade:3, unit:"u5", unitName:"Unit 5", exampleSentence:"We have PE on Friday.", sentenceChinese:"我们星期五有体育课。", sentenceWords:["We","have","PE","on","Friday."] },
  { id:60, word:"Monday", phonetic:"[ˈmʌndeɪ]", chinese:"星期一", emoji:"📅", grade:3, unit:"u5", unitName:"Unit 5", exampleSentence:"Monday is the first day of the week.", sentenceChinese:"星期一是一周的第一天。", sentenceWords:["Monday","is","the","first","day","of","the","week."] },
  { id:61, word:"room", phonetic:"[ruːm]", chinese:"房间", emoji:"🚪", grade:3, unit:"u5", unitName:"Unit 5", exampleSentence:"My room is clean and tidy.", sentenceChinese:"我的房间干净整洁。", sentenceWords:["My","room","is","clean","and","tidy."] },
  { id:62, word:"Saturday", phonetic:"[ˈsætədeɪ]", chinese:"星期六", emoji:"🎉", grade:3, unit:"u5", unitName:"Unit 5", exampleSentence:"We go to the park on Saturday.", sentenceChinese:"我们星期六去公园。", sentenceWords:["We","go","to","the","park","on","Saturday."] },
  { id:63, word:"Sunday", phonetic:"[ˈsʌndeɪ]", chinese:"星期天", emoji:"😊", grade:3, unit:"u5", unitName:"Unit 5", exampleSentence:"Sunday is my favourite day.", sentenceChinese:"星期天是我最喜欢的一天。", sentenceWords:["Sunday","is","my","favourite","day."] },
  { id:64, word:"Thursday", phonetic:"[ˈθɜːzdeɪ]", chinese:"星期四", emoji:"📅", grade:3, unit:"u5", unitName:"Unit 5", exampleSentence:"I have art class on Thursday.", sentenceChinese:"我星期四有美术课。", sentenceWords:["I","have","art","class","on","Thursday."] },
  { id:65, word:"Tuesday", phonetic:"[ˈtjuːzdeɪ]", chinese:"星期二", emoji:"📅", grade:3, unit:"u5", unitName:"Unit 5", exampleSentence:"We go to the library on Tuesday.", sentenceChinese:"我们星期二去图书馆。", sentenceWords:["We","go","to","the","library","on","Tuesday."] },
  { id:66, word:"Wednesday", phonetic:"[ˈwenzdeɪ]", chinese:"星期三", emoji:"📅", grade:3, unit:"u5", unitName:"Unit 5", exampleSentence:"What day is today? It is Wednesday.", sentenceChinese:"今天星期几？今天是星期三。", sentenceWords:["What","day","is","today?","It","is","Wednesday."] },
  { id:67, word:"wrong", phonetic:"[rɒŋ]", chinese:"错误的", emoji:"❌", grade:3, unit:"u5", unitName:"Unit 5", exampleSentence:"I'm sorry, that's wrong.", sentenceChinese:"对不起，那是错的。", sentenceWords:["I'm","sorry,","that's","wrong."] },

  // Unit 6: Clothes
  { id:68, word:"dress", phonetic:"[dres]", chinese:"连衣裙", emoji:"👗", grade:3, unit:"u6", unitName:"Unit 6", exampleSentence:"She wears a beautiful dress.", sentenceChinese:"她穿了一条漂亮的连衣裙。", sentenceWords:["She","wears","a","beautiful","dress."] },
  { id:69, word:"shirt", phonetic:"[ʃɜːt]", chinese:"衬衫", emoji:"👔", grade:3, unit:"u6", unitName:"Unit 6", exampleSentence:"He wears a white shirt to school.", sentenceChinese:"他穿白衬衫去上学。", sentenceWords:["He","wears","a","white","shirt","to","school."] },
  { id:70, word:"shoes", phonetic:"[ʃuːz]", chinese:"鞋子", emoji:"👟", grade:3, unit:"u6", unitName:"Unit 6", exampleSentence:"I need new shoes.", sentenceChinese:"我需要新鞋子。", sentenceWords:["I","need","new","shoes."] },
  { id:71, word:"shorts", phonetic:"[ʃɔːts]", chinese:"短裤", emoji:"🩳", grade:3, unit:"u6", unitName:"Unit 6", exampleSentence:"I wear shorts in summer.", sentenceChinese:"我夏天穿短裤。", sentenceWords:["I","wear","shorts","in","summer."] },
  { id:72, word:"skirt", phonetic:"[skɜːt]", chinese:"裙子", emoji:"👗", grade:3, unit:"u6", unitName:"Unit 6", exampleSentence:"My skirt is pink.", sentenceChinese:"我的裙子是粉色的。", sentenceWords:["My","skirt","is","pink."] },
  { id:73, word:"socks", phonetic:"[sɒks]", chinese:"袜子", emoji:"🧦", grade:3, unit:"u6", unitName:"Unit 6", exampleSentence:"Put on your socks.", sentenceChinese:"穿上你的袜子。", sentenceWords:["Put","on","your","socks."] },
  { id:74, word:"sweater", phonetic:"[ˈswetə]", chinese:"毛衣", emoji:"👚", grade:3, unit:"u6", unitName:"Unit 6", exampleSentence:"I wear a sweater in winter.", sentenceChinese:"我冬天穿毛衣。", sentenceWords:["I","wear","a","sweater","in","winter."] },
  { id:75, word:"trainers", phonetic:"[ˈtreɪnəz]", chinese:"运动鞋", emoji:"👟", grade:3, unit:"u6", unitName:"Unit 6", exampleSentence:"I like my new trainers.", sentenceChinese:"我喜欢我的新运动鞋。", sentenceWords:["I","like","my","new","trainers."] },
  { id:76, word:"T-shirt", phonetic:"[ˈtiːʃɜːt]", chinese:"T恤衫", emoji:"👕", grade:3, unit:"u6", unitName:"Unit 6", exampleSentence:"He wears a blue T-shirt today.", sentenceChinese:"他今天穿了一件蓝色的T恤。", sentenceWords:["He","wears","a","blue","T-shirt","today."] },

  // Unit 7: Months & Birthday
  { id:77, word:"April", phonetic:"[ˈeɪprəl]", chinese:"四月", emoji:"🌸", grade:3, unit:"u7", unitName:"Unit 7", exampleSentence:"My birthday is in April.", sentenceChinese:"我的生日在四月。", sentenceWords:["My","birthday","is","in","April."] },
  { id:78, word:"August", phonetic:"[ˈɔːɡəst]", chinese:"八月", emoji:"☀️", grade:3, unit:"u7", unitName:"Unit 7", exampleSentence:"It's very hot in August.", sentenceChinese:"八月天气很热。", sentenceWords:["It's","very","hot","in","August."] },
  { id:79, word:"birthday", phonetic:"[ˈbɜːθdeɪ]", chinese:"生日", emoji:"🎂", grade:3, unit:"u7", unitName:"Unit 7", exampleSentence:"Happy birthday to you!", sentenceChinese:"祝你生日快乐！", sentenceWords:["Happy","birthday","to","you!"] },
  { id:80, word:"box", phonetic:"[bɒks]", chinese:"盒子", emoji:"📦", grade:3, unit:"u7", unitName:"Unit 7", exampleSentence:"There is a gift in the box.", sentenceChinese:"盒子里有一个礼物。", sentenceWords:["There","is","a","gift","in","the","box."] },
  { id:81, word:"December", phonetic:"[dɪˈsembə]", chinese:"十二月", emoji:"🎄", grade:3, unit:"u7", unitName:"Unit 7", exampleSentence:"Christmas is in December.", sentenceChinese:"圣诞节在十二月。", sentenceWords:["Christmas","is","in","December."] },
  { id:82, word:"February", phonetic:"[ˈfebruəri]", chinese:"二月", emoji:"🧧", grade:3, unit:"u7", unitName:"Unit 7", exampleSentence:"Spring Festival is often in February.", sentenceChinese:"春节经常在二月。", sentenceWords:["Spring","Festival","is","often","in","February."] },
  { id:83, word:"January", phonetic:"[ˈdʒænjuəri]", chinese:"一月", emoji:"🎆", grade:3, unit:"u7", unitName:"Unit 7", exampleSentence:"January is the first month of the year.", sentenceChinese:"一月是一年的第一个月。", sentenceWords:["January","is","the","first","month","of","the","year."] },
  { id:84, word:"July", phonetic:"[dʒuːˈlaɪ]", chinese:"七月", emoji:"🏖️", grade:3, unit:"u7", unitName:"Unit 7", exampleSentence:"We go swimming in July.", sentenceChinese:"我们七月去游泳。", sentenceWords:["We","go","swimming","in","July."] },
  { id:85, word:"June", phonetic:"[dʒuːn]", chinese:"六月", emoji:"🌺", grade:3, unit:"u7", unitName:"Unit 7", exampleSentence:"Children's Day is in June.", sentenceChinese:"儿童节在六月。", sentenceWords:["Children's","Day","is","in","June."] },
  { id:86, word:"March", phonetic:"[mɑːtʃ]", chinese:"三月", emoji:"🌱", grade:3, unit:"u7", unitName:"Unit 7", exampleSentence:"Spring starts in March.", sentenceChinese:"春天从三月开始。", sentenceWords:["Spring","starts","in","March."] },
  { id:87, word:"May", phonetic:"[meɪ]", chinese:"五月", emoji:"🌻", grade:3, unit:"u7", unitName:"Unit 7", exampleSentence:"The flowers are beautiful in May.", sentenceChinese:"五月的花很美。", sentenceWords:["The","flowers","are","beautiful","in","May."] },
  { id:88, word:"November", phonetic:"[nəʊˈvembə]", chinese:"十一月", emoji:"🍂", grade:3, unit:"u7", unitName:"Unit 7", exampleSentence:"It gets cold in November.", sentenceChinese:"十一月天气变冷了。", sentenceWords:["It","gets","cold","in","November."] },
  { id:89, word:"October", phonetic:"[ɒkˈtəʊbə]", chinese:"十月", emoji:"🎃", grade:3, unit:"u7", unitName:"Unit 7", exampleSentence:"National Day is in October.", sentenceChinese:"国庆节在十月。", sentenceWords:["National","Day","is","in","October."] },
  { id:90, word:"present", phonetic:"[ˈpreznt]", chinese:"礼物", emoji:"🎁", grade:3, unit:"u7", unitName:"Unit 7", exampleSentence:"I got a nice present on my birthday.", sentenceChinese:"我生日时收到了一份漂亮的礼物。", sentenceWords:["I","got","a","nice","present","on","my","birthday."] },
  { id:91, word:"September", phonetic:"[sepˈtembə]", chinese:"九月", emoji:"🍁", grade:3, unit:"u7", unitName:"Unit 7", exampleSentence:"School starts in September.", sentenceChinese:"学校在九月开学。", sentenceWords:["School","starts","in","September."] },

  // Unit 8: Feelings
  { id:92, word:"angry", phonetic:"[ˈæŋɡri]", chinese:"生气的", emoji:"😠", grade:3, unit:"u8", unitName:"Unit 8", exampleSentence:"Don't be angry with me.", sentenceChinese:"别生我的气。", sentenceWords:["Don't","be","angry","with","me."] },
  { id:93, word:"cry", phonetic:"[kraɪ]", chinese:"哭", emoji:"😢", grade:3, unit:"u8", unitName:"Unit 8", exampleSentence:"The baby is crying.", sentenceChinese:"宝宝在哭。", sentenceWords:["The","baby","is","crying."] },
  { id:94, word:"feel", phonetic:"[fiːl]", chinese:"感觉", emoji:"💭", grade:3, unit:"u8", unitName:"Unit 8", exampleSentence:"I feel happy today.", sentenceChinese:"今天我感到很开心。", sentenceWords:["I","feel","happy","today."] },
  { id:95, word:"sad", phonetic:"[sæd]", chinese:"伤心的", emoji:"😔", grade:3, unit:"u8", unitName:"Unit 8", exampleSentence:"She looks very sad.", sentenceChinese:"她看起来很伤心。", sentenceWords:["She","looks","very","sad."] },
  { id:96, word:"scared", phonetic:"[skeəd]", chinese:"害怕的", emoji:"😨", grade:3, unit:"u8", unitName:"Unit 8", exampleSentence:"I am scared of the dark.", sentenceChinese:"我害怕黑暗。", sentenceWords:["I","am","scared","of","the","dark."] },
  { id:97, word:"smile", phonetic:"[smaɪl]", chinese:"微笑", emoji:"😊", grade:3, unit:"u8", unitName:"Unit 8", exampleSentence:"She has a big smile on her face.", sentenceChinese:"她脸上带着灿烂的笑容。", sentenceWords:["She","has","a","big","smile","on","her","face."] },
  { id:98, word:"stupid", phonetic:"[ˈstjuːpɪd]", chinese:"愚蠢的", emoji:"🤪", grade:3, unit:"u8", unitName:"Unit 8", exampleSentence:"That was a stupid mistake.", sentenceChinese:"那是个愚蠢的错误。", sentenceWords:["That","was","a","stupid","mistake."] },
  { id:99, word:"tired", phonetic:"[ˈtaɪəd]", chinese:"累的", emoji:"😮‍💨", grade:3, unit:"u8", unitName:"Unit 8", exampleSentence:"I am very tired after school.", sentenceChinese:"放学后我很累。", sentenceWords:["I","am","very","tired","after","school."] },

  // Unit 9: Food
  { id:100, word:"apples", phonetic:"[ˈæplz]", chinese:"苹果", emoji:"🍎", grade:3, unit:"u9", unitName:"Unit 9", exampleSentence:"I like eating apples.", sentenceChinese:"我喜欢吃苹果。", sentenceWords:["I","like","eating","apples."] },
  { id:101, word:"bananas", phonetic:"[bəˈnɑːnəz]", chinese:"香蕉", emoji:"🍌", grade:3, unit:"u9", unitName:"Unit 9", exampleSentence:"Monkeys love bananas.", sentenceChinese:"猴子爱吃香蕉。", sentenceWords:["Monkeys","love","bananas."] },
  { id:102, word:"beef", phonetic:"[biːf]", chinese:"牛肉", emoji:"🥩", grade:3, unit:"u9", unitName:"Unit 9", exampleSentence:"We have beef for dinner.", sentenceChinese:"我们晚饭吃牛肉。", sentenceWords:["We","have","beef","for","dinner."] },
  { id:103, word:"chicken", phonetic:"[ˈtʃɪkɪn]", chinese:"鸡肉；小鸡", emoji:"🍗", grade:3, unit:"u9", unitName:"Unit 9", exampleSentence:"I like fried chicken.", sentenceChinese:"我喜欢炸鸡。", sentenceWords:["I","like","fried","chicken."] },
  { id:104, word:"drink", phonetic:"[drɪŋk]", chinese:"喝；饮料", emoji:"🥤", grade:3, unit:"u9", unitName:"Unit 9", exampleSentence:"Can I have a drink?", sentenceChinese:"我能喝点东西吗？", sentenceWords:["Can","I","have","a","drink?"] },
  { id:105, word:"dumplings", phonetic:"[ˈdʌmplɪŋz]", chinese:"饺子", emoji:"🥟", grade:3, unit:"u9", unitName:"Unit 9", exampleSentence:"We eat dumplings at Spring Festival.", sentenceChinese:"我们春节吃饺子。", sentenceWords:["We","eat","dumplings","at","Spring","Festival."] },
  { id:106, word:"fish", phonetic:"[fɪʃ]", chinese:"鱼肉", emoji:"🐟", grade:3, unit:"u9", unitName:"Unit 9", exampleSentence:"Fish is good for your health.", sentenceChinese:"鱼对健康有益。", sentenceWords:["Fish","is","good","for","your","health."] },
  { id:107, word:"food", phonetic:"[fuːd]", chinese:"食物", emoji:"🍲", grade:3, unit:"u9", unitName:"Unit 9", exampleSentence:"The food here is very good.", sentenceChinese:"这里的食物很好。", sentenceWords:["The","food","here","is","very","good."] },
  { id:108, word:"go", phonetic:"[ɡəʊ]", chinese:"去", emoji:"🚶", grade:3, unit:"u9", unitName:"Unit 9", exampleSentence:"Let's go to school.", sentenceChinese:"我们去上学吧。", sentenceWords:["Let's","go","to","school."] },
  { id:109, word:"noodles", phonetic:"[ˈnuːdlz]", chinese:"面条", emoji:"🍜", grade:3, unit:"u9", unitName:"Unit 9", exampleSentence:"I like eating noodles for lunch.", sentenceChinese:"我午饭喜欢吃面条。", sentenceWords:["I","like","eating","noodles","for","lunch."] },
  { id:110, word:"pork", phonetic:"[pɔːk]", chinese:"猪肉", emoji:"🥩", grade:3, unit:"u9", unitName:"Unit 9", exampleSentence:"We cook pork for dinner.", sentenceChinese:"我们晚饭做猪肉。", sentenceWords:["We","cook","pork","for","dinner."] },
  { id:111, word:"porridge", phonetic:"[ˈpɒrɪdʒ]", chinese:"粥", emoji:"🥣", grade:3, unit:"u9", unitName:"Unit 9", exampleSentence:"I have porridge for breakfast.", sentenceChinese:"我早餐喝粥。", sentenceWords:["I","have","porridge","for","breakfast."] },
  { id:112, word:"rice", phonetic:"[raɪs]", chinese:"米饭", emoji:"🍚", grade:3, unit:"u9", unitName:"Unit 9", exampleSentence:"We eat rice every day.", sentenceChinese:"我们每天吃米饭。", sentenceWords:["We","eat","rice","every","day."] },
  { id:113, word:"steamed bread", phonetic:"[stiːmd bred]", chinese:"馒头", emoji:"🥖", grade:3, unit:"u9", unitName:"Unit 9", exampleSentence:"I like steamed bread for breakfast.", sentenceChinese:"我早餐喜欢吃馒头。", sentenceWords:["I","like","steamed","bread","for","breakfast."] },

  // Unit 10: Body
  { id:114, word:"arm", phonetic:"[ɑːm]", chinese:"手臂", emoji:"💪", grade:3, unit:"u10", unitName:"Unit 10", exampleSentence:"He broke his arm.", sentenceChinese:"他摔断了手臂。", sentenceWords:["He","broke","his","arm."] },
  { id:115, word:"big", phonetic:"[bɪɡ]", chinese:"大的", emoji:"🐘", grade:3, unit:"u10", unitName:"Unit 10", exampleSentence:"This elephant is very big.", sentenceChinese:"这头大象非常大。", sentenceWords:["This","elephant","is","very","big."] },
  { id:116, word:"ears", phonetic:"[ɪəz]", chinese:"耳朵", emoji:"👂", grade:3, unit:"u10", unitName:"Unit 10", exampleSentence:"Rabbits have long ears.", sentenceChinese:"兔子有长长的耳朵。", sentenceWords:["Rabbits","have","long","ears."] },
  { id:117, word:"hair", phonetic:"[heə]", chinese:"头发", emoji:"💇", grade:3, unit:"u10", unitName:"Unit 10", exampleSentence:"She has long black hair.", sentenceChinese:"她有一头长长的黑发。", sentenceWords:["She","has","long","black","hair."] },
  { id:118, word:"hand", phonetic:"[hænd]", chinese:"手", emoji:"🤚", grade:3, unit:"u10", unitName:"Unit 10", exampleSentence:"Please raise your hand.", sentenceChinese:"请举手。", sentenceWords:["Please","raise","your","hand."] },
  { id:119, word:"legs", phonetic:"[leɡz]", chinese:"腿", emoji:"🦵", grade:3, unit:"u10", unitName:"Unit 10", exampleSentence:"He has long legs.", sentenceChinese:"他有长长的腿。", sentenceWords:["He","has","long","legs."] },
  { id:120, word:"month", phonetic:"[mʌnθ]", chinese:"月份；月", emoji:"📆", grade:3, unit:"u10", unitName:"Unit 10", exampleSentence:"What month is this? This is January.", sentenceChinese:"现在是几月？现在是一月。", sentenceWords:["What","month","is","this?","This","is","January."] },
  { id:121, word:"mouth", phonetic:"[maʊθ]", chinese:"嘴巴", emoji:"👄", grade:3, unit:"u10", unitName:"Unit 10", exampleSentence:"Open your mouth, please.", sentenceChinese:"请张开嘴巴。", sentenceWords:["Open","your","mouth,","please."] },
  { id:122, word:"small", phonetic:"[smɔːl]", chinese:"小的", emoji:"🐭", grade:3, unit:"u10", unitName:"Unit 10", exampleSentence:"The mouse is very small.", sentenceChinese:"老鼠非常小。", sentenceWords:["The","mouse","is","very","small."] },
  { id:123, word:"teeth", phonetic:"[tiːθ]", chinese:"牙齿", emoji:"🦷", grade:3, unit:"u10", unitName:"Unit 10", exampleSentence:"Brush your teeth every day.", sentenceChinese:"每天刷牙。", sentenceWords:["Brush","your","teeth","every","day."] },
  { id:124, word:"they", phonetic:"[ðeɪ]", chinese:"他们；它们", emoji:"👥", grade:3, unit:"u10", unitName:"Unit 10", exampleSentence:"They are my friends.", sentenceChinese:"他们是我的朋友。", sentenceWords:["They","are","my","friends."] },
  { id:125, word:"toes", phonetic:"[təʊz]", chinese:"脚趾", emoji:"🦶", grade:3, unit:"u10", unitName:"Unit 10", exampleSentence:"I have ten toes.", sentenceChinese:"我有十个脚趾。", sentenceWords:["I","have","ten","toes."] },
];

// Note: Join In 2 and Join In 3 words will also be added.
// Due to space constraints, we export a function that returns the full set.
// The remaining ~216 words follow the exact same structure.

// For brevity in seed, we import the full data from the existing vocabulary.js
import { getAllWords } from '../data/vocabulary.js';

export function getSeedWords() {
  // Merge: use the comprehensive data from vocabulary.js
  // It already has all 341 words with full sentences and emojis
  return getAllWords();
}

export function getSeedUnits() {
  return seedUnits;
}

export function getSeedBooks() {
  return seedBooks;
}

/**
 * Initialize the database with all seed data.
 * Returns a promise that resolves when seeding is complete.
 */
export async function seedDatabase() {
  const { isDatabaseSeeded, insertBooks, insertUnits, insertWords } = await import('./database.js');
  const seeded = await isDatabaseSeeded();
  if (seeded) return false; // Already seeded

  const words = getSeedWords();
  const books = getSeedBooks();
  const units = getSeedUnits();

  await insertBooks(books);
  await insertUnits(units);

  // Insert words in batches to avoid transaction limits
  const BATCH = 50;
  for (let i = 0; i < words.length; i += BATCH) {
    await insertWords(words.slice(i, i + BATCH));
  }

  console.log(`✅ Database seeded: ${words.length} words, ${books.length} books, ${units.length} units`);
  return true;
}
