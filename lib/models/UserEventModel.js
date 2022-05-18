const pool = require('./../utils/pool')

module.exports = class UserEventModel {
    id;
    title;
    url;
    date;
    host;
    note;
    linkedUser;

    constructor(row) {
        this.id = row.event_id;
        this.title = row.title;
        this.url = row.url;
        this.date = row.date;
        this.host = row.host;
        this.note = row.note;
        this.linkedUser = row.linked_user
    }

    static async saveEventsById({title, url, date, host, note, linkedUser}) {
        const { rows } = await pool.query(`
        INSERT INTO user_events (title, url, date, host, note, linked_user)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *   
        `,
        [title, url, date, host, note, linkedUser]
    )
    return new UserEventModel(rows[0])
    }

    static async selectAllUserEvents(userId) {
        const { rows } = await pool.query(`
        SELECT 
        user_events.event_id,
        user_events.title,
        user_events.url,
        user_events.date,
        user_events.host,
        user_events.note,
        user_events.linked_user
        FROM user_events
        INNER JOIN users
        ON user_events.linked_user = users.id
        WHERE id=$1
        `,
        [userId]
        );
        return rows.map((row) => new UserEventModel(row));
    }

    static async getUserEventById(id) {
        const { rows } = await pool.query(`
        SELECT * FROM user_events WHERE event_id=$1
        `,
        [id]
        );
        return new UserEventModel(rows[0])
    }
    

}








