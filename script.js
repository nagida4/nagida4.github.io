const suggestions = [
    "JavaScript",
    "Java",
    "Python",
    "PHP",
    "C++",
    "Ruby",
    "HTML",
    "CSS",
    "React",
    "Node.js"
];

document.getElementById('search-input').addEventListener('input', function() {
    const input = this.value.toLowerCase();
    const suggestionBox = document.getElementById('suggestions');
    suggestionBox.innerHTML = '';

    if (input) {
        const filteredSuggestions = suggestions.filter(suggestion => 
            suggestion.toLowerCase().startsWith(input)
        );

        filteredSuggestions.forEach(suggestion => {
            const div = document.createElement('div');
            div.textContent = suggestion;
            div.onclick = () => {
                document.getElementById('search-input').value = suggestion;
                suggestionBox.innerHTML = '';
            };
            suggestionBox.appendChild(div);
        });
    }
});

function search() {
    const query = document.getElementById('search-input').value.trim();
    if (query) {
        window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, '_blank');
    } else {
        alert('検索ワードを入力してください。');
    }
}

function generateCalendar() {
    const calendarElement = document.getElementById('calendar');
    const monthYearElement = document.getElementById('month-year');
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const today = date.getDate();

    // 月の初日を取得
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();

    // 月と年を表示
    monthYearElement.textContent = `${year}年 ${month + 1}月`;

    // カレンダーを初期化
    calendarElement.innerHTML = '';

    // 空白の日付を追加
    for (let i = 0; i < firstDay.getDay(); i++) {
        const emptyCell = document.createElement('div');
        calendarElement.appendChild(emptyCell);
    }

    // 実際の日付を追加
    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'day';
        dayElement.textContent = day;

        // 今日の日付を強調表示
        if (day === today) {
            dayElement.classList.add('today');
        }

        calendarElement.appendChild(dayElement);
    }
}

// モードを自動で判断して切り替え
function setThemeBasedOnSystem() {
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    if (darkModeMediaQuery.matches) {
        document.body.classList.add('dark-mode');
    }
document.getElementById('toggle-mode').addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    document.querySelector('.container').classList.toggle('dark-mode');
    document.getElementById('search-input').classList.toggle('dark-mode');
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.classList.toggle('dark-mode');
    });
    const suggestions = document.querySelectorAll('.suggestions div');
    suggestions.forEach(suggestion => {
        suggestion.classList.toggle('dark-mode');
    });
    const days = document.querySelectorAll('.day');
    days.forEach(day => {
        day.classList.toggle('dark-mode');
    });
});
}

// デジタル時計と曜日を表示する関数
function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    // 曜日を取得
    const days = ['日', '月', '火', '水', '木', '金', '土'];
    const dayOfWeek = days[now.getDay()];

    // 時計と曜日を表示
    document.getElementById('clock').textContent = `${hours}:${minutes}:${seconds}`;
    document.getElementById('day').textContent = `${dayOfWeek}曜日`;
}

// 1秒ごとに時計を更新
setInterval(updateClock, 1000);

// 初期化時にテーマを設定
setThemeBasedOnSystem();

// カレンダーを生成
generateCalendar();

// 初期化
updateClock();
generateCalendar();