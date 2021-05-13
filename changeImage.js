urlForRandom = 'https://api.unsplash.com/photos/random?query=nature&orientation=landscape&count=1&client_id=X1YP-3ME6aCgpcphPUxA05J6wmqzwSzQBD4mYOoTBW4';

let url = urlForRandom;
if (localStorage.getItem('pictureId') !== null){
    url = 'https://api.unsplash.com/photos/' + localStorage.getItem("pictureId")
        + '/?client_id=X1YP-3ME6aCgpcphPUxA05J6wmqzwSzQBD4mYOoTBW4';
}
fetch(url)
    .then(function (resp) {
        return resp.json()
    }) // Convert data to json
    .then(function (data) {
        document.body.style.backgroundImage = 'url(' + data["urls"]["regular"] + ')';
        document.body.style.backgroundPosition = '0 0';
        document.body.style.backgroundRepeat = 'no-repeat';
        document.body.style.backgroundSize = '100%';
        document.body.style.transition ='2s ease-in-out';
        localStorage.setItem("pictureId", data["id"]);
    })
    .catch(function (err) {
        console.log(err);
        alert('Не получилось загрузить картинку.. :(');
    });




function changeImage() {
    fetch(urlForRandom)
        .then(function (resp) {
            return resp.json()
        }) // Convert data to json
        .then(function (data) {
            document.body.style.backgroundImage = 'url(' + data[0]["urls"]["regular"] + ')';
            document.body.style.backgroundPosition = '0 0';
            document.body.style.backgroundRepeat = 'no-repeat';
            document.body.style.backgroundSize = '100%';
            document.body.style.transition ='2s ease-in-out';
            localStorage.setItem("pictureId", data[0]["id"]);
        })
        .catch(function (err) {
            console.log(err);
            alert('Не получилось загрузить картинку.. :(');
        });
}
