function Credits() {
    return (`
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width">
            <title>repl.it</title>
            <link href="style.css" rel="stylesheet" type="text/css" />
        </head>
        <body>
            <h1>Credits</h1>
            <h2>The credits for this game.</h2>
            <ul>
                <li>p5.js for their <b>amazing</b> rendering tool</li>
                <li>StackOverflow and Bing for some help</li>
                <li><a href = "https://www.piskelapp.com/">Piskel</a> for it's pixel art editor</li>
            </ul>
            This game was made for <b>Kajam</b>, a game jam on <a href = "https://replit.com">Replit</a>.
        </body>
        </html>
    `);
}

module.exports.Credits = Credits;