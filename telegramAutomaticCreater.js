function changeJson() {
    const selectedJson = document.getElementById('jsonSelect').value;
    fetch(`./JSON/${selectedJson}.json`)
        .then(response => response.json())
        .then(data => generateForm(data))
        .catch(error => console.error('Error fetching JSON:', error));
}

function generateForm(data) {
    const formContainer = document.getElementById('formContainer');
    formContainer.innerHTML = ''; // Clear previous form

    data.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('input-group');

        const label = document.createElement('label');
        label.textContent = item.name;
        div.appendChild(label);

        const input = document.createElement('input');
        input.type = item.dataType === 'text' ? 'text' : 'number';
        input.maxLength = item.maxLength;
        if (item.decimalPoint !== null) {
            input.step = `0.${'1'.padStart(item.decimalPoint, '0')}`;
        }
        input.id = item.name.toLowerCase();
        div.appendChild(input);

        formContainer.appendChild(div);
    });
}

function cutMessage() {
    const inputs = document.querySelectorAll('#formContainer input');
    const message = document.getElementById('messageInput').value;
    let index = 0;

    inputs.forEach(input => {
        const maxLength = input.maxLength;
        input.value = message.slice(index, index + maxLength);
        index += maxLength;
    });
}

function generateMessage() {
    const inputs = document.querySelectorAll('#formContainer input');
    const output = document.getElementById('messageOutput');
    output.value = ''; // Clear previous output

    inputs.forEach(input => {
        const maxLength = input.maxLength;
        let value = input.value;

        // Pad based on data type
        if (input.type === 'number') {
            value = value.padStart(maxLength, '0');
            if(input.step !== 1){
                value = value * 1000;
            }
        } else if (input.type === 'text') {
            value = value.padEnd(maxLength, ' ');
        }

        output.value += value; // Append the adjusted value to the output
    });
}