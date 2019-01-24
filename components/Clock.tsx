import React from 'react'

const pad = n => (n < 10 ? `0${n}` : n)

const format = t => {
  const hours = t.getUTCHours()
  const minutes = t.getUTCMinutes()
  const seconds = t.getUTCSeconds()
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`
}

interface Props {
  lastUpdate: number,
  light: boolean,
}

export default ({ lastUpdate, light }: Props) =>
  <div className={light ? 'light' : ''}>
    {format(new Date(lastUpdate))}
  </div>
