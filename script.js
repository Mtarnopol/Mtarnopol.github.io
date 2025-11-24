// Loads previous expenses: my API or Local data stored in JavaScript
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

// User Interaction, adding expense button changes the UI
document.getElementById("addExpense").addEventListener("click", () => {
    const name = document.getElementById("expenseName").value;
    const amount = parseFloat(document.getElementById("expenseAmount").value);
    const category = document.getElementById("expenseCategory").value;
    const date = document.getElementById("expenseDate").value;

    if (!name || !amount || !date) return;

    expenses.push({ name, amount, category, date }); //updates the local data
    saveData();
    renderExpenses(); //updates the UI
});

// Filter dropdown is another UI change
document.getElementById("filterCategory").addEventListener("change", () => {
    renderExpenses();
});

// Save to localStorage which keeps data local
function saveData() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
}

// Delete expense is another UI change
function deleteExpense(index) {
    expenses.splice(index, 1); //update data
    saveData();
    renderExpenses(); // update UI
}

// Show all expenses in UI
function renderExpenses() {
    const list = document.getElementById("expenseList");
    const filter = document.getElementById("filterCategory").value;
    list.innerHTML = "";

    let filtered = expenses;

    if (filter !== "All") {
        filtered = expenses.filter(exp => exp.category === filter);
    }

    let total = 0;

    filtered.forEach((exp, index) => {
        total += exp.amount;

        const li = document.createElement("li");
        li.classList.add("expense-item");
        li.innerHTML = `
            <div>
                <strong>${exp.name}</strong><br>
                $${exp.amount} — ${exp.category}<br>
                <small>${exp.date}</small>
            </div>
            <button class="delete-btn" onclick="deleteExpense(${index})">X</button>
        `;
        list.appendChild(li);
    });

    document.getElementById("totalAmount").textContent = total.toFixed(2);
}

// Initial render or displays content
renderExpenses();
