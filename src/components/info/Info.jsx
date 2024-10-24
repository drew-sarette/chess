import css from './info.module.css'
import { classy } from '/src/lib/utils.js'

function Info() {

    return (
        <div className={classy(css, 'red', 'pad')}>here is some info</div>
    )

}
export default Info