document.getElementById('btn').addEventListener('click', (event) => {
    event.preventDefault();
    const list = document.getElementById('menu');
    try {
        if (list.value === 'selected') {
            document.querySelector('#mdoalContent').innerHTML = `Please select a City.`
            $('#citySelectModal').modal('show');

        } else {
            fetch(`https://api.openweathermap.org/data/2.5/weather?id=${list.value}&appid=9f162c4a7576a32569f4374bd5fdff7b`)
                .then(response => response.json())
                .then(data => displayWeather(data))
                .catch(error => {
                    document.querySelector('#mdoalContent').innerHTML = `Error in loading weather, please check your network.`;
                    $('#citySelectModal').modal('show');
                })
        }
    } catch (error) {
        document.querySelector('#mdoalContent').innerHTML = `Error in loading weather, please check your network.`;
        $('#citySelectModal').modal('show');
    }

});

const displayWeather = weatherObject => {

    let table = document.getElementById('mainTable');
    table.innerHTML = ''
    table.innerHTML =
        `<tr>
            <th> City Name </th>
            <td> ${weatherObject.name} </td> 
        </tr>
        <tr>
            <th> Temperature </th>
            <td> ${(Math.floor(weatherObject.main.temp)) - 273} &#176;C</td> 
        </tr> 
            <th> Humidity </th>
            <td>${weatherObject.main.humidity}% </td> 
        <tr>
        <th> Maximum Temp </th>
        <td>  ${Math.ceil(weatherObject.main.temp_max - 273)} &#176;C</td>  
        </tr>
        <tr>
            <th> Minimum Temp </th>
            <td> ${Math.floor(weatherObject.main.temp_min - 273)} &#176;C </td> 
        <tr>
            <th> Weather </th>
            <td> ${weatherObject.weather['0'].description}</td> 
        </tr> `
}