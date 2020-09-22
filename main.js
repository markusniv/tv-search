const searchBar = document.querySelector('#searchBar');
const searchBtn = document.querySelector('#searchBtn');
const api = 'http://api.tvmaze.com/search/shows?q=';
const searchResults = document.querySelector('#searchResults');

searchBtn.addEventListener('click', e => {
    // If search bar isn't empty, execute search
    if (searchBar.value != '') {
        fetch(api + searchBar.value)
            .then(function (answer) {
                return answer.json();
            }).then(function (json) {
            showShows(json);
        }).catch(function (error) {
            console.log(error);
        });
    } else {
        // If search bar is empty and button is pressed, empty search results
        emptyShowList();
    }
})
searchBar.addEventListener('keyup', e => {
    if (e.keyCode === 13) {
        e.preventDefault();
        searchBtn.click();
    }
})
function showShows(shows)  {
    searchResults.innerHTML = '';
    for (let i = 0; i < shows.length; i++) {
        const name = shows[i].show.name;
        let url;
        if (shows[i].show.officialSite != null) {
            url = `<a href=${shows[i].show.officialSite}>${shows[i].show.officialSite}</a>`
        } else {
            url = 'no homepage available';
        }
        let medium;
        if (shows[i].show.image != null) {
            medium = `<img src = ${shows[i].show.image.medium}>`;
        } else {
            medium = `<img src="blank_img.png">`;
        }

        let summary;
        if (shows[i].show.summary != null) {
            summary = shows[i].show.summary;
        } else {
            summary = `<p>no summary available</p>`
        }

        let genres = '';
        for (let p = 0; p < shows[i].show.genres.length; p++) {
            if (p < shows[i].show.genres.length -1) {
                genres += shows[i].show.genres[p] + ', ';
            } else {
                genres += shows[i].show.genres[p];
            }

        }
        console.log(shows[i].show.name + '\n' + shows[i].show.officialSite + '\n' + genres  + '\n' + medium + '\n' + shows[i].show.summary);
        searchResults.innerHTML += `<div class="shows">Show name: ${name}<br>Homepage: ${url}<br>Genres: ${genres}<br>Summary: ${summary}<br>${medium}</div><br>`
    }
}

function emptyShowList() {
    searchResults.innerHTML = `<div class="shows"><p>Try searching for a show!</p></div>`
}