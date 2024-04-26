import NodeModificator from './NodeModificator.js';

class InternalPerson {
    constructor(person, start, end, color) {
        this.person = person;
        this.start = start;
        this.end = end;
        this.color = color;
    }
}

class InternalCell {
    constructor(node) {
        this.date = undefined;
        this.node = node
        node.onclick = this.onClick.bind(this);

        this.dateNode = document.createElement('div');
        this.dateNode.classList.add('cell-date');
        this.node.appendChild(this.dateNode);

        this.tagNode = document.createElement('div');
        this.tagNode.classList.add('cell-tag-container');
        this.node.appendChild(this.tagNode);
    }

    onClick() {
        console.log("Selected node", this.date);

        const node = new NodeModificator(this.node);

        if (node.hasText())
            node.isSelected() ? node.unselect() : node.select();
    }

    setDate(date) {
        this.date = date;

        if (!this.date) {
            return;
        }

        this.dateNode.innerText = this.date.getDate();
    }

    add(person, start, end) {
        const element = document.createElement('div');
        element.classList.add('cell-tag');
        element.innerText = `${person} ${start.trim()}-${end.trim()}`;

        this.tagNode.appendChild(element);
    }
}

class Header {
    constructor() {
        this.header = document.createElement('tr');
    }

    addHeader(text) {
        let el = document.createElement('th');
        el.innerText = text;
        this.header.appendChild(el);

        return this;
    }

    build() {
        return this.header;
    }
};

class Row {
    constructor() {
        this.columns = [];
    }

    addColumn(date) {
        const col = document.createElement('td');

        col.internal = new InternalCell(col);
        col.internal.setDate(date);

        this.columns.push(col);

        return this;
    }

    build() {
        let row = document.createElement('tr');
        for (let col in this.columns) {
            row.appendChild(this.columns[col]);
        }

        return row;
    }
}

export default class Table {
    constructor() {
        this.rows = [];
    }

    createHeader() {
        this.header = new Header();
        return this.header;
    }

    createRow() {
        let row = new Row();
        this.rows.push(row);
        return row;
    }

    setId(id) {
        this.id = id;
    }

    build() {
        let table = document.createElement('table');
        table.id = 'cal';
        table.classList.add("calendar");
        table.classList.add("prevent-select");

        table.appendChild(this.header.build());
        for (const row in this.rows) {
            table.appendChild(this.rows[row].build())
        }
        return table;
    }
};

// module.exports = Table;