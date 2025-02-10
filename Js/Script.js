let intervalId; // بۆ هەڵگرتنی IDی ئینتەرڤاڵەکە

function calculateAge() {
    const birthdateInput = document.getElementById("birthdate");
    const birthdateValue = birthdateInput.value;

    if (!birthdateValue) {
        alert("تکایە ڕۆژی لەدایکبوون هەڵبژێرە.");
        return;
    }

    const birthdate = new Date(birthdateValue);
    const now = new Date();

    if (isNaN(birthdate.getTime())) {
        alert("ڕۆژی لەدایکبوون دروست نییە.");
        return;
    }

    if (birthdate > now) {
        alert("ڕۆژی لەدایکبوون ناتوانێت لە داهاتوودا بێت!");
        return;
    }

    let years = now.getFullYear() - birthdate.getFullYear();
    let months = now.getMonth() - birthdate.getMonth();
    let days = now.getDate() - birthdate.getDate();
    let hours = now.getHours() - birthdate.getHours();
    let minutes = now.getMinutes() - birthdate.getMinutes();
    let seconds = now.getSeconds() - birthdate.getSeconds();

    // ڕێکخستن بۆ بەها نەرێنییەکان
    if (seconds < 0) {
        seconds += 60;
        minutes--;
    }
    if (minutes < 0) {
        minutes += 60;
        hours--;
    }
    if (hours < 0) {
        hours += 24;
        days--;
    }
    if (days < 0) {
        const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
        days += lastDayOfMonth;
        months--;
    }
    if (months < 0) {
        months += 12;
        years--;
    }

    return { years, months, days, hours, minutes, seconds };
}

function updateAge() {
    const age = calculateAge();

    // نوێکردنەوەی بەهاکان
    document.getElementById("years").textContent = age.years;
    document.getElementById("months").textContent = age.months;
    document.getElementById("days").textContent = age.days;
    document.getElementById("hours").textContent = age.hours;
    document.getElementById("minutes").textContent = age.minutes;
    document.getElementById("seconds").textContent = age.seconds;
}

function startCalculation() {
    const loading = document.getElementById("loading");
    const results = document.getElementById("results");
    const blessing = document.getElementById("blessing");
    
    // دەرخستنی لۆدینگ
    loading.style.display = "block";
    results.style.display = "none";
    blessing.style.display = "none";
    blessing.classList.remove('active');
    results.classList.remove('active');

    setTimeout(() => {
        loading.style.display = "none";
        results.style.display = "block";
        results.classList.add('active');
        blessing.style.display = "block";
        setTimeout(() => {
            blessing.classList.add('active');
        }, 300);

        updateAge(); // یەکسەر تەمەنەکە نوێ بکەرەوە
        if (intervalId) {
            clearInterval(intervalId); // ئەگەر ئینتەرڤاڵ هەبوو، ڕایبگرە
        }
        intervalId = setInterval(updateAge, 1000); // هەموو چرکەیەک تەمەنەکە نوێ بکەرەوە
    }, 1500); // ماوەی لۆدینگ
}