const pool = require('./../utils/pool')

module.exports = class UserEventModel {
    id;
    title;
    url;
    date;
    host;
    note

    constructor(row) {
        this.id = row.id;
        this.title = row.title;
        this.url = row.url;
        this.date = row.date;
        this.host = row.host;
        this.note = row.note
    }

    static async saveEventsById({title, url, date, host, note}) {
        const { rows } = await pool.query(`
        INSERT INTO user_events (title, url, date, host, note)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *   
        `,
        [title, url, date, host, note]
    )
    return new UserEventModel(rows[0])
    }

    static async selectAllUserEvents() {
        const { rows } = await pool.query(`SELECT * FROM user_events`);
        return rows.map((row) => new UserEventModel(row));
    }

    static async getUserEventById(id) {
        const { rows } = await pool.query(`
        SELECT * FROM user_events WHERE id=$1
        `,
        [id]
        );
        return new UserEventModel(rows[0])
    }
    

}








