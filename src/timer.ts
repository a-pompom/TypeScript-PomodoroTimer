// 残り時間を表現
export type RestTime = {
    minute: number;
    second: number;
}
// 残りの時間を表現するオブジェクトを生成
type GenerateRestTime = (totalMs: number, elapsedMs: number) => RestTime;

const SECOND_MS = 1000;
const MINUTE_MS = 60 * 1000;

/**
 * 残りの時間を表現するオブジェクトを全体の時間・経過時間をもとに生成
 *
 * @param totalMs タイマーでカウントする全体の時間(ミリ秒)
 * @param elapsedMs 経過時間(ミリ秒)
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

