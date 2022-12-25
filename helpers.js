export function updateValues(selector, value) {
    document.querySelector(selector).innerText = value
}

export function updateIcon(selector, value) {
    document.querySelector(selector).src = value
}

export function updateValuesDay(selector, value) {
    selector.innerText = value
}

export function updateIconDay(selector, value) {
    selector.src = value
}

export function updateValuesHourly(parent, selector, value) {
    parent.querySelector(selector).innerText = value
}

export function updateIconHourly(parent, selector, value) {
    parent.querySelector(selector).src = value
}

export function getWeatherIcon(weatherCode) {
    switch(weatherCode) {
        case 0:
        case 1:
            return "./public/icons/sun.svg"
        case 2:
        case 3:
           return "./public/icons/cloud-sun.svg"
        case 45:
        case 48:
            return "./public/icons/smog.svg"
        case 51:
        case 53:
        case 55:
        case 56:
        case 57:
        case 61:
        case 63:
        case 65:
        case 66:
        case 67:
        case 80:
        case 81:
        case 82:
            return "./public/icons/cloud-showers-heavy.svg"
        case 71:
        case 73:
        case 75:
        case 77:
        case 85:
        case 86:
            return "./public/icons/snowflake.svg"
        case 95:
        case 96:
        case 98:
            return "./public/icons/cloud-bolt.svg"
    }
}

export function formatDay(time) {
    return new Intl.DateTimeFormat(undefined, { weekday: "long"}).format(time * 1000)
}

export function formatHour(time) {
    return new Intl.DateTimeFormat(undefined, { hour: "numeric"}).format(time * 1000)
}