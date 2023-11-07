const { rmSync, mkdirSync, existsSync } = require('node:fs')
const mysqldump = require('mysqldump')

const args = process.argv.filter(x => !x.includes('\\\\') && x !== 'index.js')
console.log("🚀 ~ file: index.js:4 ~ args:", args)

const getArg = (input, def = null) => {
    const item = args.find(x => x === `-${input.length > 1 ? '-' : ''}${input}`);
    if (!item) return def

    return args[args.indexOf(item) + 1] ?? def
}
const color = (text, col = 0) => `\x1b[${col}m${text}\x1b[0m`;

const db = getArg('d')
const user = getArg('u')
const password = getArg('p', '')
const host = getArg('h')
const folder = (x => {
    if (!x.startsWith('./')) return './' + x;
    if (!x.startsWith('.') && x.startsWith('/')) return '.' + x
    return x
})(getArg('folder', 'saves'));


if ([db, user, host].some(x => !x)) return console.log(color(`One of : db, user, host (-d, -u, -h) is not defined in the command line`, 31))

if (!existsSync(folder)) mkdirSync(folder)

const date = new Date()

const path = (ref, folder = true) => `${folder ? './saves/' : './'}${ref.getFullYear()}-${ref.getMonth()}-${ref.getDate()}-${db}.sql`
const check = (dest) => {
    const existed = existsSync(dest)
    if (existed) rmSync(dest)

    return existed
}

if (date.getDate() === 0) {
    const previousMonth = () => {
        const current = new Date(date)

        if (current.getMonth() === 0) {
            current.setMonth(11)
            current.setFullYear(ref.getFullYear() - 1)
        } else {
            current.setMonth(current.getMonth() - 1)
        }
        return current
    }
    const previous = previousMonth()
    check(path(previous))
} else if (date.getDate() % 7 === 0) {
    const previousWeek = () => {
        const current = new Date(date)

        current.setDate(current.getDate() - 7)
        return current
    }
    const previous = previousWeek()
    check(path(previous))
}

const twoDaysAgo = new Date(date.getTime() - 172800000)
check(path(twoDaysAgo))

mysqldump({
    connection: {
        host,
        user,
        database: db,
        password
    },
    dumpToFile: path(date)
})