import css from './game.module.css'
import { classy } from '/src/lib/utils.js'

import Board from './board/Board'
import Info from './info/Info'

function Game() {
    
    return (
        <div className={classy(css, 'base')}>
          <Board />
          <Info />
        </div>
    )

}
export default Game