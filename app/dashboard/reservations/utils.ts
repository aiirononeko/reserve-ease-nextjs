'use client'

import { addMinute, diffMinutes } from '@formkit/tempo'

/**
 * 指定された開始時刻から終了時刻までの30分おきのDateオブジェクトの配列を生成します。
 *
 * @param {Date} startTime - 開始時刻
 * @param {Date} endTime - 終了時刻
 * @returns {Date[]} 30分間隔のDateオブジェクトの配列
 * @throws {Error} 終了時刻が開始時刻より前の場合にエラーをスローします
 */
export function generateHourlyIntervals(
  startTime: Date,
  endTime: Date,
): Date[] {
  if (endTime < startTime) {
    throw new Error('終了時刻は開始時刻より後でなければなりません。')
  }

  const intervalMinutes = 30
  const totalMinutes = diffMinutes(endTime, startTime)
  const intervalsCount = Math.floor(totalMinutes / intervalMinutes) + 1

  return Array.from({ length: intervalsCount }, (_, index) =>
    addMinute(startTime, index * intervalMinutes),
  )
}
