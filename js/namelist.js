let names = [];
let groups = [];

function grabnames() {
    const resultsDiv = document.getElementById('results');
    if (resultsDiv) resultsDiv.remove();

    const numGroups = parseInt(document.getElementById("amountofgroups").value);
    if (isNaN(numGroups) || numGroups < 1) {
        alert('Please enter a valid number of groups');
        return;
    }

    const nameInput = document.getElementById("nameList").value.trim();
    if (!nameInput) {
        alert('Please enter some names');
        return;
    }

    names = nameInput.split('\n').filter(name => name.trim() !== '');

    if (names.length === 0) {
        alert('Please enter at least one name');
        return;
    }

    shuffleArray(names);

    groups = Array(numGroups).fill().map(() => []);

    for (let i = 0; i < names.length; i++) {
        const groupIndex = i % numGroups;
        groups[groupIndex].push(names[i]);
    }

    displayResults(groups);
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function displayResults(groups) {
    const container = document.createElement('div');
    container.id = 'results';
    container.style.marginTop = '20px';

    groups.forEach((group, index) => {
        const groupDiv = document.createElement('div');
        groupDiv.className = 'group';
        groupDiv.innerHTML = `<h3>Group ${index + 1} (${group.length} members)</h3>` +
            `<ul><li>${group.join('</li><li>')}</li></ul>`;
        container.appendChild(groupDiv);
    });

    document.body.appendChild(container);
}