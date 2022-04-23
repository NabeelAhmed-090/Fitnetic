import bcrypt from 'bcryptjs'

const users = [
    {
        name: 'Hadiya Kashif',
        age: 22,
        password: bcrypt.hashSync('11223344', 10),
        weight: 48,
        email: 'HK@gmail.com',
        height: 5.3,
        image: ''
    },
    {
        name: 'Laiba Arshad',
        age: 22,
        password: bcrypt.hashSync('11223344', 10),
        weight: 48,
        email: 'LA@gmail.com',
        height: 5.3,
        image: ''
    },
    {
        name: 'Ayesha Rizwan',
        age: 22,
        password: bcrypt.hashSync('11223344', 10),
        weight: 48,
        email: 'AR@gmail.com',
        height: 5.3,
        image: ''
    },
    {
        name: 'Nabeel Ahmed',
        age: 22,
        password: bcrypt.hashSync('11223344', 10),
        weight: 48,
        email: 'NA@gmail.com',
        height: 5.3,
        image: ''
    },
]

export default users