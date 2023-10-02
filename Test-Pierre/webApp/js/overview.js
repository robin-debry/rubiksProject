fetch('../../convert/myJsonFile.json')
    .then(response => response.json())
    .then(data => {
        const container = document.querySelector('.global-container');

        // Group the Rubik's cubes by id_Y
        const groupedData = {};
        for (const key in data) {
            const item = data[key];
            if (!groupedData[item.id_Y]) {
                groupedData[item.id_Y] = [];
            }
            groupedData[item.id_Y].push(item);
        }

        // Create a row div for each group
        for (const id_Y in groupedData) {
            const rowDiv = document.createElement('div');
            rowDiv.className = 'row';
            rowDiv.id = `Y-${id_Y}`;

            // Iterate through Rubik's cubes in the group
            groupedData[id_Y].forEach(item => {
                const rubikLink = document.createElement('a');
                rubikLink.href = `http://localhost:5500/Test-Pierre/WebApp/html/index.html?alg=${item.algorithm}`;
                rubikLink.className = 'not-finished';

                const rubikCtnDiv = document.createElement('div');
                rubikCtnDiv.className = 'rubik-ctn';
                rubikCtnDiv.setAttribute('alg', item.algorithm);

                const topRowDiv = document.createElement('div');
                topRowDiv.className = 'top-row';

                const midRowDiv = document.createElement('div');
                midRowDiv.className = 'mid-row';

                const botRowDiv = document.createElement('div');
                botRowDiv.className = 'bot-row';

                const colors = item.colors.split(', ');
                colors.forEach(color => {
                    const faceDiv = document.createElement('div');
                    faceDiv.className = `face ${color}`;

                    if (topRowDiv.childElementCount < 3) {
                        topRowDiv.appendChild(faceDiv);
                    } else if (midRowDiv.childElementCount < 3) {
                        midRowDiv.appendChild(faceDiv);
                    } else {
                        botRowDiv.appendChild(faceDiv);
                    }
                });

                rubikCtnDiv.appendChild(topRowDiv);
                rubikCtnDiv.appendChild(midRowDiv);
                rubikCtnDiv.appendChild(botRowDiv);

                rubikLink.appendChild(rubikCtnDiv);

                rowDiv.appendChild(rubikLink);
            });

            container.appendChild(rowDiv);
        }
    })
    .catch(error => console.error('Error loading JSON data:', error));


    // rubikCtnDiv = document.querySelectorAll('.rubik-ctn');

    // document.querySelector('.global-container').addEventListener('click', function() {
    //     rubikCtnDiv.forEach(element => {
    //         element.addEventListener('click', function() {
    //             window.location.href = "http://localhost:5500/index.html?alg=" + element.getAttribute('alg');
    //         });
    //     });
    // });