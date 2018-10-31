const jwt = require('jsonwebtoken')

// create toekn
const token = jwt.sign(
    { username : 'nextmoonshot'  },                 // payload
    'secretKEY_nextm@@nshot!123',                   // 서명
    {                                               // options
        algorithm: 'HS256',     /* default HS256 */
        expiresIn : '365d',     /* 만료시간 exam 60, '2 days', '10h', '7d' */
        // notBefore : 5,       /* 활성시작 시간 exam 60, '2 days', '10h', '7d' */

    }
)

console.log(token)

// verify token
jwt.verify(token, 'secretKEY_nextm@@nshot!123', (_, e) => {

    console.log(e)

    // compare dates
    console.log(new Date() < new Date(e.exp * 1000))
})