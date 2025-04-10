    var globaldata;

    async function fetchUniversities() {
      const country = document.getElementById('country').value;
      const name = document.getElementById('name').value;
      const loading = document.getElementById('loading');
      const universitiesList = document.getElementById('universities');

      universitiesList.innerHTML = '';
      loading.style.display = 'block';


      if (!country && !name) {
        universitiesList.innerHTML = '<li>Please select a country or enter a university name.</li>';
        loading.style.display = 'none';
        searchButton.disabled = false;
        return;
      }
        console.log("lol");
      try {
        const url = (`https://api.allorigins.win/get?url=${encodeURIComponent(`http://universities.hipolabs.com/search?country=${country}&name=${name}`)}`);
  fetch(url)
    .then(res => res.json())
    .then(data => {

        const univer = JSON.parse(data.contents);
        univer.sort((a, b) => a.name.localeCompare(b.name));

        if (univer.length === 0) {
          universitiesList.innerHTML = '<li>No universities found.</li>';
        } else {
          univer.forEach(university => {
            const li = document.createElement('li');
            li.innerHTML = `<strong>${university.name}</strong> (${university.country}) - <a href="${university.web_pages[0]}" target="_blank">Website</a>`;
            universitiesList.appendChild(li);
          });
        }
    });
      } catch (error) {
        console.error('Error fetching data:', error);
        universitiesList.innerHTML = '<li>Error loading data. Please try again later.</li>';
      } finally {
        loading.style.display = 'none';
      }
    }