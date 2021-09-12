import dayjs from 'dayjs'

import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import customParseFormat from 'dayjs/plugin/customParseFormat'

dayjs.extend(isSameOrAfter)
dayjs.extend(customParseFormat)

export default dayjs
