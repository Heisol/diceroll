import paperstack from 'paperstack'

const client = new paperstack(
    'alidejando@gmail.com',
    'secret',
    'a7b7bcf85d9448288bfa1990c9102f1bd44f6b98c9132327efdd76028ccb1a8f',
    '77be5cfe4db29302d2c89e81e4ca98b8c75942c9f0f31375c7aa9ae4c492588d'
)
const init = client.init()

export const paperstackClient = client