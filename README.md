# mysql-saver

This is a small script to save a database into an sql file

## How it works

The program will a save from two days ago, a week ago and a month ago.

Run the script : `node index.js -d nameOfTheDatabase -u username -h host -p password (optional) --folder folder to save the files to (optional)`

It is important to run `node index.js` otherwise the program will crash.

The arguments you provide can't include a double back slash (`\\`) and must be different from 'index.js', and can't include spaces

## Cron

You can use it in cron like this

`* 1 * * * node index.js -d draver -u root -h localhost -p 1234 --folder draversaves`

## Contact

If you want to contact me, you can send me a message via [instagram](https://instagram.com/draverindustries), mail (`draver.industries@proton.me`) or join the [discord server](https://discord.gg/fHyN5w84g6)
