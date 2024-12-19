// This file is the main JavaScript entry point for the application.
// It initializes the app, sets up event listeners, and manages the state of the groceries tracker.

document.addEventListener('DOMContentLoaded', () => {
    const groceries = JSON.parse(localStorage.getItem('groceries')) || [];
    const groceryInput = document.getElementById('grocery-input');
    const groceryList = document.getElementById('grocery-list');
    const addButton = document.getElementById('add-button');
    const costInput = document.getElementById('cost-input');
    const totalOwed = document.getElementById('total-owed');

    function renderGroceries() {
        groceryList.innerHTML = '';
        let totalCost = 0;
        groceries.forEach((grocery, index) => {
            const li = document.createElement('li');
            li.textContent = `${grocery.name} - $${grocery.cost.toFixed(2)}`;
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.onclick = () => {
                removeGrocery(index);
            };
            li.appendChild(removeButton);
            groceryList.appendChild(li);
            totalCost += grocery.cost;
        });
        totalOwed.textContent = (totalCost / 2).toFixed(2);
        localStorage.setItem('groceries', JSON.stringify(groceries));
    }

    function addGrocery() {
        const groceryName = groceryInput.value.trim();
        const groceryCost = parseFloat(costInput.value.trim());
        if (groceryName && !isNaN(groceryCost)) {
            groceries.push({ name: groceryName, cost: groceryCost });
            groceryInput.value = '';
            costInput.value = '';
            renderGroceries();
        }
    }

    function removeGrocery(index) {
        groceries.splice(index, 1);
        renderGroceries();
    }

    addButton.addEventListener('click', addGrocery);

    // Initial render
    renderGroceries();
});