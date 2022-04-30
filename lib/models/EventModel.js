const pool = require('./../utils/pool')

module.exports = class EventModel {
    id;
    title;
    url;
    date;
    host

    constructor(row) {
        this.id = row.id;
        this.title = row.title;
        this.url = row.url;
        this.date = row.date;
        this.host = row.host
    }

    static async selectAllEvents() {
        const { rows } = await pool.query('SELECT * FROM events');
        return rows.map((row) => new EventModel(row));
    }


}