import { writeMemory, queryMemory } from '../src/tools/memory';
import Database from 'better-sqlite3';

const db = new Database('memory.db');

beforeAll(() => {
    db.exec(`CREATE TABLE IF NOT EXISTS mem(
        id TEXT PRIMARY KEY,
        subject TEXT, text TEXT, tags TEXT, 
        created_at INTEGER, weight REAL
    )`);
});

afterAll(() => {
    db.exec(`DROP TABLE mem`);
});

describe('Memory Tool Functions', () => {
    test('writeMemory should save a memory entry', async () => {
        const subject = 'Test Subject';
        const text = 'This is a test memory.';
        const tags = ['test', 'memory'];

        const result = await writeMemory({ subject, text, tags });
        expect(result.content[0].text).toMatch(/saved/);

        const rows = db.prepare(`SELECT * FROM mem WHERE subject=?`).all(subject);
        expect(rows.length).toBe(1);
        expect(rows[0].text).toBe(text);
    });

    test('queryMemory should retrieve memory entries', async () => {
        const subject = 'Test Subject';
        const topK = 5;

        const result = await queryMemory({ subject, topK });
        expect(result.content[0].text).toContain('This is a test memory.');
    });
});