//@ts-ignore
import paperstack from 'paperstack/index.js'

const client = new paperstack(
    'alidejando@gmail.com',
    'secret',
    'e5e05d7c9049a60e86de29b2c23268402351e64b2b98fa472aeaed4fb149771f',
    'afdf63967335fb40e4b43881949daceacf764b55f5e01ba54abf8ac27aa11052'
)
const init = client.init()

export const paperstackClient = client