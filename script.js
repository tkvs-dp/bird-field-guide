const birds = [
  {
    id: "taiwan-blue-magpie",
    name: "臺灣藍鵲",
    latin: "Urocissa caerulea",
    habitat: "森林與丘陵",
    location: "臺灣中低海拔",
    image: "assets/taiwan-blue-magpie.svg",
    summary: "拖著一條像藍色緞帶般的長尾，在樹林間成群移動，是臺灣非常醒目的特有種鳥類。",
    text: "臺灣藍鵲常以家族群體活動。牠們會在樹冠與林緣間尋找昆蟲、果實與小型動物。觀察時可以留意牠們彼此呼叫、警戒與合作的行為。",
    keywords: ["特有種", "藍色", "長尾", "群居"],
    gallery: "assets/台灣藍鵲_01.jpg",
    video: "",
    htmlWork: "works/blue-magpie-observation.html",
    slides: "slides/blue-magpie-slides.html"
  },
  {
    id: "crested-serpent-eagle",
    name: "大冠鷲",
    latin: "Spilornis cheela",
    habitat: "山區與林緣",
    location: "臺灣低至中海拔",
    image: "assets/crested-serpent-eagle.svg",
    summary: "晴天時經常乘著上升氣流盤旋，響亮而悠長的鳴聲，是臺灣山區很有辨識度的天空聲音。",
    text: "大冠鷲是常見的猛禽。牠們擅長利用熱氣流滑翔，以節省飛行所需的能量。觀察牠時可以從翼形、盤旋高度與鳴叫聲開始辨識。",
    keywords: ["猛禽", "盤旋", "鳴叫", "山區"],
    video: "",
    htmlWork: "",
    slides: ""
  },
  {
    id: "light-vented-bulbul",
    name: "白頭翁",
    latin: "Pycnonotus sinensis",
    habitat: "公園與城市綠地",
    location: "校園、公園、住家周邊",
    image: "assets/light-vented-bulbul.svg",
    summary: "牠可能就在教室窗外。白頭翁適應人類環境的能力很強，是最適合從校園開始練習觀察的鳥類之一。",
    text: "白頭翁常出現在樹木、電線與草地附近，會取食果實、花蜜與昆蟲。因為容易遇見，非常適合作為第一次鳥類紀錄的對象。",
    keywords: ["校園", "常見", "城市", "入門觀察"],
    video: "",
    htmlWork: "",
    slides: ""
  }
];

const grid = document.querySelector("#birdGrid");
const template = document.querySelector("#birdCardTemplate");
const searchInput = document.querySelector("#searchInput");
const habitatFilter = document.querySelector("#habitatFilter");
const emptyState = document.querySelector("#emptyState");

function linkItem(label, icon, href) {
  const disabled = !href;
  return `
    <a class="media-link ${disabled ? "disabled" : ""}"
       href="${href || "#"}"
       ${href ? 'target="_blank" rel="noopener"' : 'aria-disabled="true"'}>
      <span>${icon} ${label}</span>
      <span>${disabled ? "待加入" : "開啟 ↗"}</span>
    </a>
  `;
}

function renderBirds(list) {
  grid.innerHTML = "";

  list.forEach((bird) => {
    const card = template.content.firstElementChild.cloneNode(true);
    const button = card.querySelector(".card-main");
    const details = card.querySelector(".card-details");

    card.dataset.id = bird.id;
    card.querySelector(".bird-image").src = bird.image;
    card.querySelector(".bird-image").alt = `${bird.name}示意插圖`;
    card.querySelector(".habitat-chip").textContent = bird.habitat;
    card.querySelector(".latin-name").textContent = bird.latin;
    card.querySelector(".bird-name").textContent = bird.name;
    card.querySelector(".summary").textContent = bird.summary;
    card.querySelector(".location").textContent = `⌖ ${bird.location}`;

    details.innerHTML = `
      <section class="detail-section">
        <h4>觀察筆記</h4>
        <p>${bird.text}</p>
      </section>
      <section class="detail-section">
        <h4>關鍵字</h4>
        <p>${bird.keywords.map((tag) => `#${tag}`).join("　")}</p>
      </section>
      <section class="detail-section">
        <h4>作品與媒體</h4>
        <div class="media-links">
          ${linkItem("影片", "▶", bird.video)}
          ${linkItem("HTML 作品", "⌘", bird.htmlWork)}
          ${linkItem("簡報", "▤", bird.slides)}
          ${linkItem("更多圖片", "▧", bird.gallery)}
        </div>
      </section>
    `;

    button.addEventListener("click", () => {
      const expanded = button.getAttribute("aria-expanded") === "true";
      button.setAttribute("aria-expanded", String(!expanded));
      details.hidden = expanded;
      card.querySelector(".toggle-label").textContent = expanded ? "展開條目 ＋" : "收合條目 −";
    });

    grid.appendChild(card);
  });

  emptyState.hidden = list.length > 0;
}

function applyFilters() {
  const query = searchInput.value.trim().toLowerCase();
  const habitat = habitatFilter.value;

  const filtered = birds.filter((bird) => {
    const searchable = [
      bird.name,
      bird.latin,
      bird.habitat,
      bird.location,
      bird.summary,
      bird.text,
      ...bird.keywords
    ].join(" ").toLowerCase();

    const queryMatch = searchable.includes(query);
    const habitatMatch = habitat === "all" || bird.habitat === habitat;
    return queryMatch && habitatMatch;
  });

  renderBirds(filtered);
}

function setupHabitatFilter() {
  const habitats = [...new Set(birds.map((bird) => bird.habitat))];
  habitats.forEach((habitat) => {
    const option = document.createElement("option");
    option.value = habitat;
    option.textContent = habitat;
    habitatFilter.appendChild(option);
  });
}

setupHabitatFilter();
renderBirds(birds);

searchInput.addEventListener("input", applyFilters);
habitatFilter.addEventListener("change", applyFilters);
