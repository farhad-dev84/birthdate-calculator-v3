// ==============================
// انتخاب عناصر صفحه
// ==============================
const form = document.getElementById('birthdate-form');
const birthdateInput = document.getElementById('birthdate');
const resultsDiv = document.getElementById('results');
const ageP = document.getElementById('age');
const dayOfWeekP = document.getElementById('day-of-week');
const nextBirthdayP = document.getElementById('next-birthday');
const toggleThemeBtn = document.getElementById('toggle-theme');

// ==============================
// تابع محاسبه سن و اطلاعات تولد
// ==============================
function calculateBirthdateInfo(birthdate) {
    const today = new Date(); // تاریخ امروز
    const birthDateObj = new Date(birthdate); // تبدیل رشته تاریخ به آبجکت Date

    // ----- محاسبه سن دقیق -----
    let ageYears = today.getFullYear() - birthDateObj.getFullYear();
    let ageMonths = today.getMonth() - birthDateObj.getMonth();
    let ageDays = today.getDate() - birthDateObj.getDate();

    // اگر روز یا ماه منفی شد، سن را اصلاح می‌کنیم
    if (ageDays < 0) {
        ageMonths -= 1;
        const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        ageDays += lastMonth.getDate(); // تعداد روزهای ماه قبل
    }

    if (ageMonths < 0) {
        ageYears -= 1;
        ageMonths += 12;
    }

    // ----- پیدا کردن روز هفته تولد -----
    const daysOfWeek = ["یکشنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنج‌شنبه", "جمعه", "شنبه"];
    const birthDayName = daysOfWeek[birthDateObj.getDay()];

    // ----- محاسبه روز باقی‌مانده تا تولد بعدی -----
    let nextBirthday = new Date(today.getFullYear(), birthDateObj.getMonth(), birthDateObj.getDate());
    if (nextBirthday < today) {
        nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
    }

    const diffTime = nextBirthday - today; // تفاوت بر حسب میلی‌ثانیه
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // تبدیل به روز

    // ----- بازگشت اطلاعات -----
    return {
        ageYears,
        ageMonths,
        ageDays,
        birthDayName,
        diffDays
    };
}

// ==============================
// رویداد فرم
// ==============================
form.addEventListener('submit', function(e) {
    e.preventDefault(); // جلوگیری از رفرش صفحه

    const birthdate = birthdateInput.value;
    if (!birthdate) return; // اگر چیزی وارد نشده باشد

    const info = calculateBirthdateInfo(birthdate);

    // نمایش نتایج
    ageP.textContent = `سن شما: ${info.ageYears} سال، ${info.ageMonths} ماه، ${info.ageDays} روز`;
    dayOfWeekP.textContent = `روز هفته تولد: ${info.birthDayName}`;
    nextBirthdayP.textContent = `تا تولد بعدی: ${info.diffDays} روز مانده است`;

    resultsDiv.classList.remove('d-none'); // نمایش نتایج
});

// ==============================
// تغییر تم روشن/تاریک
// ==============================
toggleThemeBtn.addEventListener('click', function() {
    document.body.classList.toggle('dark-theme');
});
