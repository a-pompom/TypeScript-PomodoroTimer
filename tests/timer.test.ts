import {generateRestTime, RestTime, toRestTimeString} from 'src/timer';

describe('時刻オブジェクト生成処理', () => {

    test.each([
        [
            60 * 1000 * 25, 30 * 1000, {minute: 24, second: 30},
        ],
        [
            60 * 1000 * 25, 301 * 1000, {minute: 19, second: 59},
        ],
        [
            60 * 1000 * 25, 180 * 1000, {minute: 22, second: 0},
        ],
        [
            60 * 1000 * 25, 60 * 24 * 1000, {minute: 1, second: 0},
        ],
        [
            60 * 1000 * 25, (601 * 1000 - 1), {minute: 14, second: 59},
        ]
    ])('分・秒それぞれを持つ時刻オブジェクトがつくられるか: %i, %i, %p', (totalMs: number, elapsedMs: number, expected: RestTime) => {
        // GIVEN
        const sut = generateRestTime;
        // WHEN
        const actual = sut(totalMs, elapsedMs);
        // THEN
        expect(actual).toMatchObject(expected);
    });
});

describe('表示用の残り時間文字列を組み立てられるか', () => {

    test.each([
        [
            {minute: 25, second: 0}, '25:00'
        ],
        [
            {minute: 8, second: 40}, '08:40',
        ],
        [
            {minute: 14, second: 30}, '14:30',
        ],
    ])('分:秒の形式の残り時間を表示する文字列が組み立てられるか', (rest: RestTime, expected: string) => {
        // GIVEN
        const sut = toRestTimeString;
        // WHEN
        const actual = sut(rest);
        // THEN
        expect(actual).toBe(expected);
    });
});
