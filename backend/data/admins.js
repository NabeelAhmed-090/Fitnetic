import bcrypt from 'bcryptjs'

const admins = [
    {
        email: "hadiya@gmail.com",
        password: bcrypt.hashSync('11223344', 10)
    },
    {
        email: "nabeel@gmail.com",
        password: bcrypt.hashSync('11223344', 10)
    },
    {
        email: "ayesha@gmail.com",
        password: bcrypt.hashSync('11223344', 10)
    },
    {
        email: "laiba@gmail.com",
        password: bcrypt.hashSync('11223344', 10)
    }
]
export default admins