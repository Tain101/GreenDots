# Green Dots
[Play here](https://tain101.github.io/GreenDots/)
An Incremental based on super-imposed cursors. As you progress the game's layout will also. You must manage your cursors carefully as the layout changes.

# TODO:
## basic game progression:
* following cursors cost [currency0]
* 1st cursor is free
* list all buttons as vertical columns by type. (cursor col, currency col, upgrade col)
* clicking on a bought cursor button destroys it, shifts everything up.
* Once [currency1] is unlocked, create tab bar at the top, shifting everything down.
* Add buttons horizontally to tab bar for each [currencyN].
* If a row/column reaches beyond the edge of the screen, shift everything adding an adjacent col/row. 
* If entire window is full, scale everything down by x% and redraw. probably down so that there are no repeat columns/rows
## Cursors
* cursor should be numbered with corresponding button
* cursor should start red, have yellow during recording, then go to green during playback
