import {generateRestTime, RestTime} from 'src/timer';

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