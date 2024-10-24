import css from './square.module.css'
import { classy } from '../../lib/utils'

function Square({coord}) {
    const [rank, file] = coord
    let color
    if (rank % 2) {
        color = file % 2 ? 'dark' : 'light'
    }
    else {
        color = file % 2 ? 'light' : 'dark'
    }
    
    return (
        <div className={classy(css, 'empty', color)}></div>
    )

}
export default Square