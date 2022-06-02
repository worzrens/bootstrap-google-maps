function generateButton(idx, title) {
    let container = document.getElementById('generated-buttons-container');

    let buttonContainer = document.createElement('div');
    buttonContainer.setAttribute('id', `generated-container-${idx}`);
    buttonContainer.style.display = 'flex';
    buttonContainer.style.flexDirection = 'row';
    buttonContainer.style.margin = '5px';

    let addBtn = document.createElement('button');
    addBtn.setAttribute('id', `add-btn-${idx}`);
    addBtn.textContent = `P${title}`;
    buttonContainer.appendChild(addBtn);

    let removeBtn = document.createElement('button');
    removeBtn.setAttribute('id', `remove-btn-${idx}`);
    removeBtn.textContent = `Remove P${title}`;
    buttonContainer.appendChild(removeBtn);

    container.appendChild(buttonContainer);
}