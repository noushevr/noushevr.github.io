/*!
 * @see {@link http://docs.nwjs.io/en/latest/For%20Users/Getting%20Started/}
 * @see {@link http://docs.nwjs.io/en/latest/References/Window/#windowopenurl-options-callback}
 * icon must be PNG, not ICO
 */
nw.Window.open("index.html", {
	width: 1080,
	height: 688,
	icon: "favicon-32x32.png",
	title: "Частная школа в Тушино"
}, function (win) {});
