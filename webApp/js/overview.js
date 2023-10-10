fetch('../../convert/myJsonFile.json')
    .then(response => response.json())
    .then(data => {
        const container = document.querySelector('.global-container');

        // Group the Rubik's cubes by id_Y
        const grouped_data = {};
        for (const key in data) {
            const item = data[key];
            if (!grouped_data[item.id_Y]) {
                grouped_data[item.id_Y] = [];
            }
            grouped_data[item.id_Y].push(item);
        }

        // Create a row div for each group
        for (const id_Y in grouped_data) {
            const row_div = document.createElement('div');
            row_div.className = 'row';
            row_div.id = `Y-${id_Y}`;

            // Iterate through Rubik's cubes in the group
            grouped_data[id_Y].forEach(item => {
                const rubik_link = document.createElement('a');
                rubik_link.href = `rubiks.html?alg=${item.algorithm}`;
                rubik_link.className = 'not-finished';

                const rubik_ctn_div = document.createElement('div');
                rubik_ctn_div.className = 'rubik-ctn';
                rubik_ctn_div.setAttribute('alg', item.algorithm);

                const top_row_div = document.createElement('div');
                top_row_div.className = 'top-row';

                const mid_row_div = document.createElement('div');
                mid_row_div.className = 'mid-row';

                const bot_row_div = document.createElement('div');
                bot_row_div.className = 'bot-row';

                const colors = item.colors.split(', ');
                colors.forEach(color => {
                    const face_div = document.createElement('div');
                    face_div.className = `face ${color}`;

                    if (top_row_div.childElementCount < 3) {
                        top_row_div.appendChild(face_div);
                    } else if (mid_row_div.childElementCount < 3) {
                        mid_row_div.appendChild(face_div);
                    } else {
                        bot_row_div.appendChild(face_div);
                    }
                });

                rubik_ctn_div.appendChild(top_row_div);
                rubik_ctn_div.appendChild(mid_row_div);
                rubik_ctn_div.appendChild(bot_row_div);

                rubik_link.appendChild(rubik_ctn_div);

                row_div.appendChild(rubik_link);
            });

            container.appendChild(row_div);
        }
    })
    .catch(error => console.error('Error loading JSON data:', error));