
export function toArray(text) {
        let line = ''
        let array = []
        for (let i = 0; i < text.length; i++) {
                if (text[i] === '\n') {
                        array.push(line.trim()) // trim() removes spaces from the beggining and end
                        line = ''
                        continue
                }

                line += text[i]

                if (i + 1 === text.length) {
                        array.push(line.trim())
                }
        }
        return array
}

export function capitalize(text) {
        return text.charAt(0).toUpperCase() + text.slice(1)
}