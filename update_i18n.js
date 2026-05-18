const fs = require('fs');
const path = require('path');

const loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

const baseValues = {
  badge: "Portfolio",
  title: "Selected Works",
  version: "VERSION:",
  prev: "Previous",
  next: "Next",
  projectDetails: "PROJECT DETAILS",
  videos: {
    chainsaw_man: { title: "Chainsaw Man", desc: loremIpsum, tag1: "Genre: Anime", tag2: "Role: Voice Over" },
    tf1: { title: "TF1", desc: loremIpsum, tag1: "Genre: Commercial", tag2: "Role: Narrator" },
    dare_devil: { title: "Dare Devil", desc: loremIpsum, tag1: "Genre: TV Series", tag2: "Role: Dubbing" }
  }
};

const files = {
  'en.json': baseValues,
  'pl.json': {
    ...baseValues,
    badge: "PORTFOLIO",
    title: "Wybrane realizacje",
    version: "WERSJA:",
    prev: "Poprzednie",
    next: "Następne",
    projectDetails: "SZCZEGÓŁY PROJEKTU",
    videos: {
      chainsaw_man: { title: "Chainsaw Man", desc: loremIpsum, tag1: "Gatunek: Anime", tag2: "Rola: Lektor" },
      tf1: { title: "TF1", desc: loremIpsum, tag1: "Gatunek: Reklama", tag2: "Rola: Narrator" },
      dare_devil: { title: "Dare Devil", desc: loremIpsum, tag1: "Gatunek: Serial", tag2: "Rola: Dubbing" }
    }
  },
  'tr.json': {
    ...baseValues,
    badge: "PORTFÖY",
    title: "Seçilmiş Çalışmalar",
    version: "SÜRÜM:",
    prev: "Önceki",
    next: "Sonraki",
    projectDetails: "PROJE DETAYLARI",
    videos: {
      chainsaw_man: { title: "Chainsaw Man", desc: loremIpsum, tag1: "Tür: Anime", tag2: "Rol: Seslendirme" },
      tf1: { title: "TF1", desc: loremIpsum, tag1: "Tür: Reklam", tag2: "Rol: Anlatıcı" },
      dare_devil: { title: "Dare Devil", desc: loremIpsum, tag1: "Tür: Dizi", tag2: "Rol: Dublaj" }
    }
  },
  'de.json': {
    ...baseValues,
    badge: "PORTFOLIO",
    title: "Ausgewählte Werke",
    version: "VERSION:",
    prev: "Zurück",
    next: "Weiter",
    projectDetails: "PROJEKTDETAILS",
    videos: {
      chainsaw_man: { title: "Chainsaw Man", desc: loremIpsum, tag1: "Genre: Anime", tag2: "Rolle: Synchronsprecher" },
      tf1: { title: "TF1", desc: loremIpsum, tag1: "Genre: Werbung", tag2: "Rolle: Sprecher" },
      dare_devil: { title: "Dare Devil", desc: loremIpsum, tag1: "Genre: Serie", tag2: "Rolle: Synchronsprecher" }
    }
  },
  'ja.json': {
    ...baseValues,
    badge: "ポートフォリオ",
    title: "厳選された作品",
    version: "バージョン:",
    prev: "前へ",
    next: "次へ",
    projectDetails: "プロジェクト詳細",
    videos: {
      chainsaw_man: { title: "Chainsaw Man", desc: loremIpsum, tag1: "ジャンル: アニメ", tag2: "役割: 声優" },
      tf1: { title: "TF1", desc: loremIpsum, tag1: "ジャンル: CM", tag2: "役割: ナレーター" },
      dare_devil: { title: "Dare Devil", desc: loremIpsum, tag1: "ジャンル: ドラマ", tag2: "役割: 吹き替え" }
    }
  },
  'ru.json': {
    ...baseValues,
    badge: "ПОРТФОЛИО",
    title: "Избранные работы",
    version: "ВЕРСИЯ:",
    prev: "Предыдущий",
    next: "Следующий",
    projectDetails: "ДЕТАЛИ ПРОЕКТА",
    videos: {
      chainsaw_man: { title: "Chainsaw Man", desc: loremIpsum, tag1: "Жанр: Аниме", tag2: "Роль: Озвучка" },
      tf1: { title: "TF1", desc: loremIpsum, tag1: "Жанр: Реклама", tag2: "Роль: Диктор" },
      dare_devil: { title: "Dare Devil", desc: loremIpsum, tag1: "Жанр: Сериал", tag2: "Роль: Дубляж" }
    }
  },
  'zh.json': {
    ...baseValues,
    badge: "作品集",
    title: "精选作品",
    version: "版本:",
    prev: "上一个",
    next: "下一个",
    projectDetails: "项目详情",
    videos: {
      chainsaw_man: { title: "Chainsaw Man", desc: loremIpsum, tag1: "类型: 动漫", tag2: "角色: 配音" },
      tf1: { title: "TF1", desc: loremIpsum, tag1: "类型: 广告", tag2: "角色: 旁白" },
      dare_devil: { title: "Dare Devil", desc: loremIpsum, tag1: "类型: 电视剧", tag2: "角色: 配音" }
    }
  }
};

const messagesDir = path.join(__dirname, 'messages');
const jsonFiles = fs.readdirSync(messagesDir).filter(f => f.endsWith('.json'));

for (const file of jsonFiles) {
  const filePath = path.join(messagesDir, file);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  
  const newData = files[file] || baseValues;
  
  data.Portfolio = { ...data.Portfolio, ...newData };
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  console.log(`Updated ${file} to Lorem Ipsum`);
}
