import Table from './table.js';
import NodeModificator from './NodeModificator.js';

Date.prototype.monthNames = [
    "January", "February", "March",
    "April", "May", "June",
    "July", "August", "September",
    "October", "November", "December"
];

Date.prototype.getMonthName = function() {
    return this.monthNames[this.getMonth()];
};
Date.prototype.getShortMonthName = function () {
    return this.getMonthName().substr(0, 3);
};

/**
 * 
 * @param {int} year 
 * @param {int} month 
 */

function refreshCalendar(year, month) {
    const today = new Date();
    year = year || today.getFullYear();
    month = month || today.getMonth();

    const days = getArrayOfDays(year, month);
    const table = generateTable(days, year, month);

    let calendar = document.getElementById('cal');
    if (calendar) {
        calendar.replaceWith(table);
    } else {
        document.body.append(table);
    }
}

/**
 * Generate HTML table
 * 
 * @param {array[string]} days to be generated in table or empty
 */
function generateTable(days, year, month) {
    const table = new Table();

    // Generate header
    const headers = table.createHeader();
    const weekDay = ["Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota", "Niedziela"];
    for (const i in weekDay) {
        headers.addHeader(weekDay[i]);
    }

    let index = 0;
    while(index < days.length) {
        const row = table.createRow();

        for (let j = 0; j < 7; j++) {
            row.addColumn(days[index] ? new Date(year, month, days[index]) : undefined);
            index++;
        }
    }

    return table.build();
}

function getArrayOfDays(year, month) {
    let array = [];

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    for (let i = firstDay.getDay(); i > 0; i--) {
        array.push('');
    }

    for(let i = 1; i < lastDay.getDate() + 1; i++) {
        array.push(`${i}`);
    }

    return array;
}

function update(date) {
    const yearPlaceholder = document.getElementById("year");
    const monthPlaceholder = document.getElementById("month");

    new NodeModificator(yearPlaceholder).setText(date.getFullYear());
    new NodeModificator(monthPlaceholder).setText(date.getMonthName());
}

function init() {
    const today = new Date();
    update(today);

    refreshCalendar(today.getFullYear(), today.getMonth());

    document.getElementById("previous_month").onclick = function() {
        today.setMonth(today.getMonth() - 1);
        update(today);
        refreshCalendar(today.getFullYear(), today.getMonth());
    }.bind(today);

    document.getElementById("next_month").onclick = function() {
        today.setMonth(today.getMonth() + 1);
        update(today);
        refreshCalendar(today.getFullYear(), today.getMonth());
    }.bind(today);

    document.getElementById("action_add").onclick = function() {
        const person = document.querySelector("input[type='radio'][name='person']:checked").value;
        const time = document.querySelector("input[type='radio'][name='time']:checked").value;

        const cal = document.getElementById('cal');
        cal.childNodes.forEach((node, key, parent) => {
            node.childNodes.forEach((node, key, parent) => {
                const modificator = new NodeModificator(node);
                if (modificator.isSelected()) {
                    console.log(node.internal)
                    node.internal.add(person, ...time.split('-'));
                }
            });
        });

        cleaarSelect();
    }


    document.getElementById("action_remove").onclick = function() {
        console.log("remove");
    }


    document.getElementById("action_clear").onclick = cleaarSelect;
}

function cleaarSelect() {
    const cal = document.getElementById('cal');
    cal.childNodes.forEach((node, key, parent) => {
        node.childNodes.forEach((node, key, parent) => {
            const modificator = new NodeModificator(node);
            if (modificator.isSelected()) {
                modificator.unselect();
            }
        });
    });
}

init();