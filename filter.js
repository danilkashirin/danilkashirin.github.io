document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById('filterForm');
    const resultsContainer = document.getElementById('filteredResults');

    const wines = [
        {name: "Шато Марго", rating: 9.5, country: "Франция", type: "Красное"},
        {name: "Бароло", rating: 8.5, country: "Италия", type: "Красное"},
        {name: "Риоха", rating: 7.0, country: "Испания", type: "Красное"},
        {name: "Шардоне", rating: 6.5, country: "США", type: "Белое"},
        {name: "Порто", rating: 9.0, country: "Португалия", type: "Портвейн"},
        {name: "Каберне Совиньон", rating: 8.7, country: "Австралия", type: "Красное"},
        {name: "Мальбек", rating: 8.2, country: "Аргентина", type: "Красное"},
        {name: "Зинфандель", rating: 7.8, country: "США", type: "Красное"},
        {name: "Пино Гриджио", rating: 7.9, country: "Италия", type: "Белое"},
        {name: "Совиньон Блан", rating: 8.0, country: "Новая Зеландия", type: "Белое"},
        {name: "Шираз", rating: 8.6, country: "ЮАР", type: "Красное"},
        {name: "Гевюрцтраминер", rating: 7.4, country: "Германия", type: "Белое"},
        {name: "Рислинг", rating: 8.2, country: "Франция", type: "Белое"},
        {name: "Мерло", rating: 8.1, country: "Чили", type: "Красное"},
        {name: "Божоле", rating: 7.5, country: "Франция", type: "Красное"},
        {name: "Кьянти", rating: 8.3, country: "Италия", type: "Красное"},
        {name: "Просекко", rating: 7.6, country: "Италия", type: "Игристое"},
        {name: "Кава", rating: 7.7, country: "Испания", type: "Игристое"},
        {name: "Гаме", rating: 7.8, country: "Франция", type: "Красное"},
        {name: "Сира", rating: 8.4, country: "Франция", type: "Красное"},
        {name: "Пино Нуар", rating: 8.5, country: "США", type: "Красное"},
        {name: "Гренаш", rating: 7.1, country: "Испания", type: "Красное"},
        {name: "Токай", rating: 8.9, country: "Венгрия", type: "Десертное"},
        {name: "Мускат", rating: 8.0, country: "Италия", type: "Десертное"},
        {name: "Темпранильо", rating: 7.4, country: "Испания", type: "Красное"},
        {name: "Цинандали", rating: 8.1, country: "Грузия", type: "Белое"},
        {name: "Алебарро", rating: 7.3, country: "Испания", type: "Белое"},
        {name: "Виньо Верде", rating: 7.2, country: "Португалия", type: "Белое"},
        {name: "Фетяска Нягрэ", rating: 6.9, country: "Румыния", type: "Красное"},
        {name: "Торронтес", rating: 7.5, country: "Аргентина", type: "Белое"},
        {name: "Санджовезе", rating: 8.0, country: "Италия", type: "Красное"},
        {name: "Мальвазия", rating: 6.8, country: "Италия", type: "Белое"},
        {name: "Гарнача", rating: 7.6, country: "Испания", type: "Красное"},
        {name: "Ченин Блан", rating: 7.3, country: "ЮАР", type: "Белое"},
        {name: "Рэкцина", rating: 6.5, country: "Греция", type: "Белое"},
        {name: "Барбареско", rating: 8.6, country: "Италия", type: "Красное"},
        {name: "Вердехо", rating: 7.0, country: "Испания", type: "Белое"},
        {name: "Аглианико", rating: 8.4, country: "Италия", type: "Красное"},
        {name: "Бобаль", rating: 7.2, country: "Испания", type: "Красное"},
        {name: "Тринкадейра", rating: 6.7, country: "Португалия", type: "Красное"},
        {name: "Каринья", rating: 7.9, country: "Испания", type: "Красное"},
        {name: "Неро д’Авола", rating: 8.3, country: "Италия", type: "Красное"},
        {name: "Траминер", rating: 7.1, country: "Германия", type: "Белое"},
        {name: "Бонарда", rating: 7.7, country: "Аргентина", type: "Красное"},
        {name: "Фурминт", rating: 8.0, country: "Венгрия", type: "Белое"},
        {name: "Мансанилья", rating: 7.8, country: "Испания", type: "Шерри"},
        {name: "Пинотаж", rating: 7.6, country: "ЮАР", type: "Красное"},
        {name: "Корвина", rating: 7.4, country: "Италия", type: "Красное"},
        {name: "Виоинье", rating: 8.1, country: "Франция", type: "Белое"},
        {name: "Гаме", rating: 7.2, country: "Франция", type: "Красное"},
        {name: "Государь", rating: 8.8, country: "Россия", type: "Красное"},
        {name: "Ламбрусско", rating: 7.7, country: "Италия", type: "Игристое"},
        {name: "Албариньо", rating: 8.0, country: "Испания", type: "Белое"},
        {name: "Гриджо", rating: 8.2, country: "Италия", type: "Белое"},
    ];


    loadFiltersFromStorage();

    form.addEventListener('submit', function (event) {
        event.preventDefault();


        saveFiltersToStorage();

        const filteredWines = applyFilters();

        constructWineTable(filteredWines);
    });

    document.getElementById('resetFilters').addEventListener('click', function () {
        form.reset();
        resultsContainer.innerHTML = '';
        localStorage.removeItem('wineFilters'); // Удалить сохраненные фильтры
    });

    document.getElementById('saveOrder').addEventListener('click', function () {
        const filteredWines = applyFilters();
        saveOrderToStorage(filteredWines);
    });

    document.getElementById('loadOrder').addEventListener('click', function () {
        loadOrderFromStorage();
    });

    function applyFilters() {
        const ratingMin = parseFloat(document.getElementById('ratingMin').value);
        const ratingMax = parseFloat(document.getElementById('ratingMax').value);

        const selectedCountries = Array.from(form.elements['country'])
            .filter(input => input.checked)
            .map(input => input.value);

        const selectedTypes = Array.from(form.elements['type'])
            .filter(input => input.checked)
            .map(input => input.value);

        return wines.filter(wine => {
            return wine.rating >= ratingMin &&
                wine.rating <= ratingMax &&
                (selectedCountries.length === 0 || selectedCountries.includes(wine.country)) &&
                (selectedTypes.length === 0 || selectedTypes.includes(wine.type));
        });
    }

    function constructWineTable(wineList) {
        if (wineList.length === 0) {
            resultsContainer.innerHTML = '<p>Вина не найдены по заданным критериям.</p>';
            return;
        }

        const table = document.createElement('table');
        table.classList.add('wine-table');

        const thead = table.createTHead();
        const headerRow = thead.insertRow();
        ['Название', 'Рейтинг', 'Страна', 'Тип'].forEach(text => {
            const th = document.createElement('th');
            th.textContent = text;
            headerRow.appendChild(th);
        });

        const tbody = table.createTBody();
        wineList.forEach(wine => {
            const row = tbody.insertRow();
            Object.values(wine).forEach(value => {
                const cell = row.insertCell();
                cell.textContent = value;
            });
        });

        resultsContainer.innerHTML = '';
        resultsContainer.appendChild(table);
    }

    function saveFiltersToStorage() {
        const ratingMin = document.getElementById('ratingMin').value;
        const ratingMax = document.getElementById('ratingMax').value;

        const selectedCountries = Array.from(form.elements['country'])
            .filter(input => input.checked)
            .map(input => input.value);

        const selectedTypes = Array.from(form.elements['type'])
            .filter(input => input.checked)
            .map(input => input.value);

        const filters = {
            ratingMin: ratingMin,
            ratingMax: ratingMax,
            countries: selectedCountries,
            types: selectedTypes
        };

        localStorage.setItem('wineFilters', JSON.stringify(filters));
    }

    function loadFiltersFromStorage() {
        const filters = JSON.parse(localStorage.getItem('wineFilters'));

        if (!filters) return;

        document.getElementById('ratingMin').value = filters.ratingMin;
        document.getElementById('ratingMax').value = filters.ratingMax;

        form.elements['country'].forEach(input => {
            input.checked = filters.countries.includes(input.value);
        });

        form.elements['type'].forEach(input => {
            input.checked = filters.types.includes(input.value);
        });
    }

    function saveOrderToStorage(wineList) {
        localStorage.setItem('wineOrder', JSON.stringify(wineList));
        alert('Заказ сохранен!');
    }

    function loadOrderFromStorage() {
        const order = JSON.parse(localStorage.getItem('wineOrder'));

        if (!order || order.length === 0) {
            alert('Заказ не найден!');
            return;
        }

        constructWineTable(order);
    }
});
