declare module '@signalk/nmea0183-utilities' {
  export function transform(v: number, inFormat: string, outFormat: string): number
}

declare module 'jest-matcher-deep-close-to'