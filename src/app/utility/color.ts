export type RgbValues = {
    red: number,
    green: number,
    blue: number
}

export function getColorInRange(from: RgbValues, to: RgbValues, modifier: RgbValues) {
    const getColor = (key: keyof RgbValues) => {
        const min = Math.min(from[key], to[key])
        const max = Math.max(from[key], to[key])

        const delta = max- min
        return min + modifier[key] % delta
    }

    const red = getColor('red')
    const green = getColor('green')
    const blue = getColor('blue')

    return `#${ toHex(red) }${ toHex(green) }${ toHex(blue) }`;
}

export function getRgbValues(color: string): RgbValues {
    const colors = color.substring(4, color.length - 1)
        .replace(/ /g, '')
        .split(',')
        .map(value => +value);
    return {
        red: colors[0],
        green: colors[1],
        blue: colors[2],
    }
}

export function toHex(value: number): string {
    return value.toString(16).padStart(2, "0");
}