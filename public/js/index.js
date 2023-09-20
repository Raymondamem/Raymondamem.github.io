let prediction;

function getPrediction() {
    if (localStorage.getItem('prediction') === null) {
        prediction = [];
    } else {
        prediction = JSON.parse(localStorage.getItem('prediction'));
    }
    return prediction;
}

function addPrediction(predictionval) {
    const prediction = getPrediction();

    prediction.push(predictionval);

    localStorage.setItem('prediction', JSON.stringify(prediction));
}

function removePrediction(predictionval_arr) {
    const prediction = getPrediction();

    prediction.forEach(function (prediction_arr_delete, index) {
        if (predictionval_arr === prediction_arr_delete) {
            prediction.splice(index, 1);
        }
    });

    localStorage.setItem('prediction', JSON.stringify(prediction));
}
// /////////////////////////////////////model///////////////////////////////////////////////////
function handle_model() {
    const modal = document.querySelector("#weatherModel");
    const btn = document.querySelector("#weather");
    const span = document.querySelector("#closeButton");

    btn.onclick = function () {
        modal.classList.toggle('isActiveModel');
    }

    span.onclick = function () {
        modal.classList.toggle('isActiveModel');
    }

    window.onclick = function (e) {
        if (e.target == modal) {
            modal.classList.toggle('isActiveModel');
        }
    }
}
// //////////////////////////weather API mechnics////////////////////////////////////////
function handle_weather() {
    const is_day = document.querySelector('#is_day');
    const time = document.querySelector('#time');
    const windspeed = document.querySelector('#windspeed');
    const winddirection = document.querySelector('#winddirection');
    const weathercode = document.querySelector('#weathercode');
    const temp_result = document.querySelector('#temp_result');

    const form = document.querySelector('#getWeather');
    const city = document.querySelector('.city');
    const _delay = 500;
    let location = null;
    // debounce
    function debounce(func, wait) {
        let timeout;
        return function (event) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, arguments), wait);
        };
    }
    // keyup event
    const handleKeyUp = debounce(event => {
        event.preventDefault();
        console.log(city.value);
        fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city.value}&count=1&language=en&format=json`).then(res => res.json()).then(data => {
            location = data.results[0];
            console.log(location.latitude, location.longitude);
            const loc = `"https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m"`

            fetch(`https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current_weather=true&hourly=temperature_2m,rain,soil_temperature_0cm`).then(res => res.json()).then(weather => {

                console.log("current_weather", weather.current_weather);
                // console.log("hourly", weather.hourly);
                is_day.innerHTML = `${weather.current_weather["is_day"] == 0 ? 'It is Day Time' : 'It is night Time'}`
                time.innerHTML = `${weather.current_weather["time"]}`
                windspeed.innerHTML = `${weather.current_weather["windspeed"]} m`
                winddirection.innerHTML = `${weather.current_weather["winddirection"]} degree`
                weathercode.innerHTML = `${weather.current_weather["weathercode"]}`
                temp_result.innerHTML = `${weather.current_weather["temperature"]} degree Celcious`

            }).catch(err => console.log(err));
        }).catch(err => console.log(`Error occured ${err}`));
    }, _delay);

    city.addEventListener('keyup', handleKeyUp);
}

function prediction_func(city, ph, npk, temprature) {
    const predict = document.querySelector('div[data-pridiction="pridiction"]');
    const mssg = document.querySelector('#mssg');

    if ((ph >= 6.0 && ph <= 6.7) && (temprature >= 20 && temprature <= 27) && (npk == "B") && (city.toUpperCase() == "BAUCHI" || city.toUpperCase() == "TARABA" || city.toUpperCase() == "BENUE" || city.toUpperCase() == "PLATEAU" || city == "")) {
        predict.innerHTML = `<img src="./public/img/Rice.jpg" alt="..."
                    class="active w-full h-full rounded-2xl">`;
        mssg.innerHTML = `This soil is good for the cultivation of Rice\nSoil Type most suitable for Rice is Clayey Loam`;
    }

    if ((ph >= 6.0 && ph <= 6.8) && (temprature >= 20 && temprature <= 27) && (npk == "B") && (city.toUpperCase() == "BAUCHI" || city.toUpperCase() == "PLATEAU" || city.toUpperCase() == "TARABA" || city.toUpperCase() == "BENUE" || city == "")) {
        predict.innerHTML = `<img src="./public/img/Beans.jpg" alt="..."
                    class="active w-full h-full rounded-2xl">`;
        mssg.innerHTML = `This soil is good for the cultivation of Beans\nSoil Type most suitable for Beans is Loamy/S&&y Loam`;
    }

    if ((ph >= 5.5 && ph <= 8.0) && (temprature >= 26 && temprature <= 30) && (npk == "F") && (city.toUpperCase() == "BAUCHI" || city.toUpperCase() == "PLATEAU" || city.toUpperCase() == "TARABA" || city.toUpperCase() == "BENUE")) {
        predict.innerHTML = `<img src="./public/img/groundnut.jpg" alt="..."
                    class="active w-full h-full rounded-2xl">`;
        mssg.innerHTML = `This soil is good for the cultivation of Groundnut\nSoil Type most suitable for Groundnut is S&&y Loam/Clay Loam`;
    }

    if ((ph >= 6.0 && ph <= 7.5) && (temprature >= 24 && temprature <= 29.98) && (npk == "A") && (city.toUpperCase() == "BAUCHI" || city.toUpperCase() == "PLATEAU" || city.toUpperCase() == "TARABA" || city.toUpperCase() == "BENUE")) {
        predict.innerHTML = `<img src="./public/img/Soybeans.jpg" alt="..."
                    class="active w-full h-full rounded-2xl">`;
        mssg.innerHTML = `This soil is good for the cultivation of Soybeans\nSoil Type most suitable for Soybeans is Well-drained Loam`;
    }

    if ((ph >= 5.5 && ph <= 7) && (temprature >= 25 && temprature <= 30) && (npk == "B") && (city.toUpperCase() == "TARABA" || city.toUpperCase() == "BENUE")) {
        predict.innerHTML = `<img src="./public/img/Yam.jpg" alt="..."
                    class="active w-full h-full rounded-2xl">`;
        mssg.innerHTML = `This soil is good for the cultivation of Yam\nSoil Type most suitable for Yam is Loamy Soil`;
    }

    if ((ph >= 5.5 && ph <= 7.3) && (temprature >= 21 && temprature <= 27) && (npk == "C")) {
        predict.innerHTML = `<img src="./public/img/Maize.jpg" alt="..."
                    class="active w-full h-full rounded-2xl">`;
        mssg.innerHTML = `This soil is good for the cultivation of Maize\nSoil Type most suitable for Maize is Loamy Soil/Clay Loam`;
    }

    if ((ph >= 4.5 && ph <= 6.5) && (temprature >= 25 && temprature <= 29) && (npk == "D") && (city.toUpperCase() == "TARABA" || city.toUpperCase() == "BENUE")) {
        predict.innerHTML = `<img src="./public/img/Cassava.jpg" alt="..."
                    class="active w-full h-full rounded-2xl">`;
        mssg.innerHTML = `This soil is good for the cultivation of Cassava\nSoil Type most suitable for Cassava is S&&y or Loamy soil`;
    }

    if ((ph >= 6.0 && ph <= 7.0) && (temprature >= 20 && temprature <= 25) && (npk == "A")) {
        predict.innerHTML = `<img src="./public/img/Onion.jpg" alt="..."
                    class="active w-full h-full rounded-2xl">`;
        mssg.innerHTML = `This soil is good for the cultivation of Onion\nSoil Type most suitable for Onion is Loamy Soil`;
    }

    if ((ph >= 6.5 && ph <= 7.0) && (temprature > 4) && (npk == "E")) {
        predict.innerHTML = `<img src="./public/img/lemon.jpg" alt="..."
                    class="active w-full h-full rounded-2xl">`;
        mssg.innerHTML = `This soil is good for the cultivation of Lemon Grass\nSoil Type most suitable for Lemon Grass is Loamy Soil`;
    }

    if ((ph >= 5.0 && ph <= 6.5) && (temprature >= 21 && temprature <= 26) && (npk == "B") && (city.toUpperCase() == "TARABA" || city.toUpperCase() == "BENUE" || city.toUpperCase() == "PLATEAU")) {
        predict.innerHTML = `<img src="./public/img/irish.jpg" alt="..."
                    class="active w-full h-full rounded-2xl">`;
        mssg.innerHTML = `This soil is good for the cultivation of Irish Potatoes\nSoil Type most suitable for Irish Potatoes is Loamy/S&&y Loam Soil`;
    }

    if ((ph >= 5.5 && ph <= 8.0) && (temprature >= 26 && temprature <= 30) && (npk == "G")) {
        predict.innerHTML = `<img src="./public/img/sesame.jpg" alt="..."
                    class="active w-full h-full rounded-2xl">`;
        mssg.innerHTML = `This soil is good for the cultivation of Sesame\nSoil Type most suitable for Sesame is Loamy Soil`;
    }

    if ((ph >= 4.5 && ph <= 6.5) && (temprature >= 23 && temprature <= 27) && (npk == "G")) {
        predict.innerHTML = `<img src="./public/img/cashew.jpg" alt="..."
                    class="active w-full h-full rounded-2xl">`;
        mssg.innerHTML = `This soil is good for the cultivation of Cashew\nSoil Type most suitable for Cashew is S&&y Loam Soil`;
    }

    if ((ph >= 5.0 && ph <= 8.0) && (temprature >= 15 && temprature <= 32) && (npk == "I")) {
        predict.innerHTML = `<img src="./public/img/tomato.jpg" alt="..."
                    class="active w-full h-full rounded-2xl">`;
        mssg.innerHTML = `This soil is good for the cultivation of Tomato\nSoil Type most suitable for Tomato is Loamy/S&&y Loam Soil`;
    }

    if ((ph >= 6.5 && ph <= 7.5) && (temprature >= 13 && temprature <= 24) && (npk == "G")) {
        predict.innerHTML = `<img src="./public/img/cabbage.jpg" alt="..."
                    class="active w-full h-full rounded-2xl">`;
        mssg.innerHTML = `This soil is good for the cultivation of Cabbage\nSoil Type most suitable for Cabbage is Loamy Soil`;
    }

    if ((ph >= 6.0 && ph <= 7.0) && (temprature >= 21 && temprature <= 24) && (npk == "C")) {
        predict.innerHTML = `<img src="./public/img/wheat.jpg" alt="..."
                    class="active w-full h-full rounded-2xl">`;
        mssg.innerHTML = `This soil is good for the cultivation of Wheat\nSoil Type most suitable for Wheat is Clay Loam/Loam Soil`;
    }

    if ((ph >= 5.0 && ph <= 8.0) && (temprature >= 22 && temprature <= 35) && (npk == "A")) {
        predict.innerHTML = `<img src="./public/img/okra.jpg" alt="..."
                    class="active w-full h-full rounded-2xl">`;
        mssg.innerHTML = `This soil is good for the cultivation of Okra\nSoil Type most suitable for Okra is Loamy&S&&y Loam Soil`;
    }

    if ((ph >= 6.0 && ph <= 6.5) && (temprature >= 21 && temprature <= 35) && (npk == "J")) {
        predict.innerHTML = `<img src="./public/img/pumpkin.jpg" alt="..."
                    class="active w-full h-full rounded-2xl">`;
        mssg.innerHTML = `This soil is good for the cultivation of Pumpkin\nSoil Type most suitable for Pumpkin is S&&y Soil`;
    }

    if ((ph >= 6.0 && ph <= 6.5) && (temprature >= 18 && temprature <= 24) && (npk == "G")) {
        predict.innerHTML = `<img src="./public/img/melon.jpg" alt="..."
                    class="active w-full h-full rounded-2xl">`;
        mssg.innerHTML = `This soil is good for the cultivation of Melon\nSoil Type most suitable for Melon is S&&y Loam Soil`;
    }

    if ((ph >= 6.0 && ph <= 6.5) && (temprature >= 25 && temprature <= 30) && (npk == "H")) {
        predict.innerHTML = `<img src="./public/img/ginger.jpg" alt="..."
                    class="active w-full h-full rounded-2xl">`;
        mssg.innerHTML = `This soil is good for the cultivation of Ginger\nSoil Type most suitable for Ginger is Loamy Soil`;
    }

    if ((ph >= 5.5 && ph <= 7.0) && (temprature >= 21 && temprature <= 32) && (npk == "H")) {
        predict.innerHTML = `<img src="./public/img/chili.jpg" alt="..."
                    class="active w-full h-full rounded-2xl">`;
        mssg.innerHTML = `This soil is good for the cultivation of Chili\nSoil Type most suitable for Chili is Loamy Soil`;
    }

    if ((ph >= 6.0 && ph <= 7.5) && (temprature >= 15 && temprature <= 20) && (npk == "H")) {
        predict.innerHTML = `<img src="./public/img/cherry.jpg" alt="..."
                    class="active w-full h-full rounded-2xl">`;
        mssg.innerHTML = `This soil is good for the cultivation of Cherry\nSoil Type most suitable for Cherry is Loamy/S&&y Soil`;
    }

    if ((ph >= 5.0 && ph <= 6.5) && (temprature >= 2 && temprature <= 13) && (npk == "B")) {
        predict.innerHTML = `<img src="./public/img/orange.jpg" alt="..."
                    class="active w-full h-full rounded-2xl">`;
        mssg.innerHTML = `This soil is good for the cultivation of Orange\nSoil Type most suitable for Orange is Loamy Soil`;
    }

    if ((ph >= 6.0 && ph <= 7.0) && (temprature >= 0 && temprature <= 10) && (npk == "G")) {
        predict.innerHTML = `<img src="./public/img/garlic.jpg" alt="..."
                    class="active w-full h-full rounded-2xl">`;
        mssg.innerHTML = `This soil is good for the cultivation of Garlic\nSoil Type most suitable for Garlic is S&&y Soil`;
    }

    if ((ph >= 5.8 && ph <= 7.0) && (temprature >= 21 && temprature <= 24) && (npk == "B") && city == "PLATEAU") {
        predict.innerHTML = `<img src="./public/img/apple.jpg" alt="..."
                    class="active w-full h-full rounded-2xl">`;
        mssg.innerHTML = `This soil is good for the cultivation of Apple\nSoil Type most suitable for Apple is S&&y Soil`;
    }

    if ((ph >= 6.0 && ph <= 7.0) && (temprature >= 21 && temprature <= 38) && (npk == "K")) {
        predict.innerHTML = `<img src="./public/img/lemon.jpg" alt="..."
                    class="active w-full h-full rounded-2xl">`;
        mssg.innerHTML = `This soil is good for the cultivation of Lemon\nSoil Type most suitable for Lemon is S&&y Loam/Loamy Soil`;
    }

    if ((ph >= 4.0 && ph <= 8.5) && (temprature >= 25 && temprature <= 32) && (npk == "G") && city == "PLATEAU") {
        predict.innerHTML = `<img src="./public/img/grape.jpg" alt="..."
                    class="active w-full h-full rounded-2xl">`;
        mssg.innerHTML = `This soil is good for the cultivation of Grape\nSoil Type most suitable for Grape is Loamy Soil`;
    }

    if ((ph >= 5.5 && ph <= 6.5) && (temprature >= 16 && temprature <= 27) && (npk == "G") && city == "PLATEAU") {
        predict.innerHTML = `<img src="./public/img/strawberry.jpg" alt="..."
                    class="active w-full h-full rounded-2xl">`;
        mssg.innerHTML = `This soil is good for the cultivation of Strawberry\nSoil Type most suitable for Strawberry is Loamy Soil`;
    }

    if ((ph >= 5.5 && ph <= 6.5) && (temprature >= 19 && temprature <= 35) && (npk == "L")) {
        predict.innerHTML = `<img src="./public/img/cucumber.jpg" alt="..."
                    class="active w-full h-full rounded-2xl">`;
        mssg.innerHTML = `This soil is good for the cultivation of Cucumber\nSoil Type most suitable for Cucumber is S&&y Soil`;
    }

    if ((ph >= 6.2 && ph <= 6.8) && (temprature >= 7 && temprature <= 30) && (npk == "J")) {
        predict.innerHTML = `<img src="./public/img/carrot.jpg" alt="..."
                    class="active w-full h-full rounded-2xl">`;
        mssg.innerHTML = `This soil is good for the cultivation of Carrot\nSoil Type most suitable for Carrot is Sandy or Sandy Loam Soil`;
    }
}
// localStorage.clear()
function handle_prediction() {
    let intervalID = null;
    const anim = (el) => {
        const images = ["./public/img/anim/Garden.jpg", "./public/img/anim/fav.jpg"];
        let currentSlide = 0;

        images.forEach(image => {
            const img = document.createElement('img');
            img.src = image;
            el.appendChild(img);
        });

        const slides = el.querySelectorAll('img');
        slides[0].classList.add('active');

        intervalID = setInterval(() => {
            slides[currentSlide].classList.remove('active');

            currentSlide++;
            if (currentSlide >= slides.length) {
                currentSlide = 0;
            }

            slides[currentSlide].classList.add('active');
        }, 3000);
    }

    const clearErr = (el, arr) => {
        arr = [];
        el.classList.remove('active');
        return;
    }

    const error_handller = (el, isTrue, [...arr]) => {
        if (arr.length === 0)
            return;
        if (isTrue)
            el.classList.add('active');
        else
            clearErr(el, arr);
        el.innerHTML = '';
        arr.forEach(err => {
            const span = document.createElement('span');
            span.textContent = err;
            el.appendChild(span);
        });
        return 'e';
    }

    const confirm_state = state => {
        const states = [
            'ABIA',
            'ADAMAWA',
            'AKWA IBOM',
            'ANAMBRA',
            'BAUCHI',
            'BAYELSA',
            'BENUE',
            'BORNO',
            'CROSS RIVER',
            'DELTA',
            'EBONYI',
            'EDO',
            'EKITI',
            'ENUGU',
            'GOMBE',
            'IMO',
            'JIGAWA',
            'KADUNA',
            'KANO',
            'KATSINA',
            'KEBBI',
            'KOGI',
            'KWARA',
            'LAGOS',
            'NASARAWA',
            'NIGER',
            'OGUN',
            'ONDO',
            'OSUN',
            'OYO',
            'PLATEAU',
            'RIVERS',
            'SOKOTO',
            'TARABA',
            'YOBE',
            'ZAMFARA']
        return states.includes(state);
    }

    const confirm_npk = npk => {
        const _npk = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'];
        return _npk.includes(npk);
    }

    anim(document.querySelector('div[data-pridiction="pridiction"]'));

    document.querySelector('#btn').addEventListener('click', function (e) {
        e.preventDefault();
        let errMssg = [];
        let city = document.querySelector('input[name="city"]').value.toUpperCase();
        let _ph = document.querySelector('input[name="ph"]').value;
        let npk = document.querySelector('input[name="npk"]').value.toUpperCase();
        let _temprature = document.querySelector('input[name="temprature"]').value;
        let ph = parseFloat(_ph);
        let temprature = parseFloat(_temprature);

        if (city == "") {
            errMssg.push(`City : Error, Empty value!`);
        } else if (city != "") {
            if (!confirm_state(city))
                errMssg.push(`No such City in nigeria!`);
        }
        if (npk == "") {
            errMssg.push(`NPK : Error, Empty value!`);
        } else if (npk != "") {
            if (!confirm_npk(npk))
                errMssg.push("Invalid NPK!");
        }
        if (isNaN(ph))
            errMssg.push(`Error, PH is not a number! ${_ph}`);
        if (isNaN(temprature))
            errMssg.push(`Error, Temperature is not a number! ${_temprature}`);
        if (error_handller(document.querySelector('.errModel'), true, errMssg) == 'e') {
            setTimeout(function () {
                error_handller(document.querySelector('.errModel'), false, errMssg);
            }, 3000);
            return;
        } else if (error_handller(document.querySelector('.errModel'), true, errMssg) != 'e') {
            let arr = [];
            let arr_str = getPrediction().toString();
            arr.push(city);
            arr.push(ph);
            arr.push(npk);
            arr.push(temprature);
            const arr_to_str = arr.toString();

            if (arr_str.includes(arr_to_str)) {
                //call predict!
                prediction_func(city, ph, npk, temprature);
                // // arr = arr_str.split(',');
                // const [city_got, ph_got, npk_got, temprature_got] = arr;
                clearInterval(intervalID);
                return;
            } else {
                //store prediction values! and predict!
                addPrediction(arr_to_str);
                prediction_func(city, ph, npk, temprature);
                clearInterval(intervalID);
            }

            // // console.log(`city_got ${typeof city_got}, ph_got ${typeof ph_got}, npk_got ${typeof npk_got}, temprature_got ${typeof temprature_got}`);
            // // console.log(`city_got ${city_got}, ph_got ${ph_got}, npk_got ${npk_got}, temperature ${temprature_got}`);

            // prediction_func(city, ph, npk, temprature);
            // clearInterval(intervalID);
        }
    });
}

handle_prediction();
handle_model();
handle_weather();