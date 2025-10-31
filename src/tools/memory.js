import crypto from 'node:crypto';
import db from '../database/db.js';

export const writeMemory = async ({ subject, text, tags = [] }) => {
    const id = crypto.randomUUID();
    db.prepare(
        `INSERT INTO mem VALUES(?,?,?,?,?,?)`
    ).run(id, subject, text, JSON.stringify(tags), Date.now(), 1);

    return {
        content: [{
            type: 'text',
            text: `Memory saved successfully!\nID: ${id}\nSubject: ${subject}`
        }]
    };
};

export const queryMemory = async ({ subject, topK = 5 }) => {
    const rows = db.prepare(
        `SELECT id, subject, text, tags, created_at FROM mem 
     WHERE subject=? 
     ORDER BY created_at DESC 
     LIMIT ?`
    ).all(subject, topK);

    const formatted = rows.map(row => ({
        id: row.id,
        text: row.text,
        tags: JSON.parse(row.tags || '[]'),
        created_at: new Date(row.created_at).toISOString()
    }));

    return {
        content: [{
            type: 'text',
            text: JSON.stringify(formatted, null, 2)
        }]
    };
};