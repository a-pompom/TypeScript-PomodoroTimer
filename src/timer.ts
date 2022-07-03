// 残り時間を表現
export type RestTime = {
    minute: number;
    second: number;
}
// 残りの時間を表現するオブジェクトを生成
type GenerateRestTime = (totalMs: number, elapsedMs: number) => RestTime;
type ToRestTimeString = (rest: RestTime) => string;

const SECOND_MS = 1000;
const MINUTE_MS = 60 * 1000;

/**
 * 残りの時間を表現するオブジェクトを全体の時間・経過時間をもとに生成
 *
 * @param totalMs タイマーでカウントする全体の時間(ミリ秒)
 * @param elapsedMs 経過時間(ミリ秒)
 *
 * @return 残り時間の分・秒部分を表現するオブジェクト
 */
export const generateRestTime: GenerateRestTime = (totalMs, elapsedMs) => {
    const rest = totalMs - elapsedMs;

    const minute = Math.floor(rest / MINUTE_MS);
    const secondMs = rest - minute * MINUTE_MS;
    const second = Math.floor(secondMs / SECOND_MS);

    return {
        minute,
        second
    };
};

/**
 * 画面へ表示する残り時間文字列を取得
 *
 * @param rest 残り時間の分数・秒数部分を持つオブジェクト
 * @return 00:30, 20:31のような、残り時間を表現する文字列
 */
export const toRestTimeString: ToRestTimeString = (rest) => {
    const TIME_PART_LENGTH = 2;
    // 00, 51のような表示用フォーマットへ整形
    const minutePart = rest.minute.toString().padStart(TIME_PART_LENGTH, '0');
    const secondPart = rest.second.toString().padStart(TIME_PART_LENGTH, '0');

    return `${minutePart}:${secondPart}`;
};