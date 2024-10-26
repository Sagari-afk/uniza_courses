const { sequelize, User } = require('../models')
const jwt = require('jsonwebtoken')
const { body, validationResult } = require('express-validator')

const getUsers = async (req, res) => {
    try {
        const records = await User.findAll();        
        return res.status(200).json({ records })
    } catch (error) {
        console.log(error);
        res.status(500).json(error.message);
    }
}

const getUserBy = async (req, res) => {
    try {
        const records = await User.findByPk(req.params.id);
        
        return res.status(200).json(records);
    } catch (error) {
        console.log(error);
        res.status(500).json(error.message);
    }
  
  };

const newUser = [
    body('name').not().isEmpty(),
    body('personal_num').not().isEmpty().isNumeric().isLength({ min: 6, max: 6 }),
    body('email').not().isEmpty().isEmail(),
    body('password').not().isEmpty(),   //.isStrongPassword()
    body('type_id').not().isEmpty(),

    async (req, res) => {
        const errors = validationResult(req);

        if ( !errors.isEmpty() ) {
            const errMessage = errors.array().map((item) => `${item.path} - ${item.msg}`).join(',')
            res.status(400).json(errMessage);
        }

        const { name,
                personal_num,
                email,
                password,
                institute,
                salt,
                type_id
         } = req.body;
    
        try {
            const user = await User.create({ name,
                personal_num,
                email,
                password,
                institute,
                salt,
                type_id
            })
    
            return res.json(user);
        } catch (error) {
            console.log(error);
            res.status(500).json(error.message);
        }
    },
];

const loginUser = [
    body('personal_num').not().isEmpty().isNumeric().isLength({ min: 6, max: 6 }),
    body('password').not().isEmpty(),

    async (req, res) => {
        try {
            const { personal_num, password } = req.body;
            const existingUser = await User.findOne({ where: { personal_num: personal_num } })
            if(!existingUser) {
                return res.status(500).json("Invalid personal number", 400)
            }
            if(User.checkPassword(existingUser, password)) {
                return res.status(500).json("Invalid password", 400)
            }
    
            const token = jwt.sign({
                userId: existingUser.id,
                userName: existingUser.name
            }, process.env.API_KEY);
            res.send({ token })
            
        } catch (error) {
            console.log(error);
            res.status(500).json(error.message);
        }
    }
]

const updateUser = async (req, res) => {
    try {
        let data = req.body;
        const existingUser = await User.findByPk(req.params.id)
        if (!existingUser) return res.status(400).json('User s takym id neexistuje!')
        for (const [key, value] of Object.entries(data)) {
            await User.update(
                { [key]: value },
                {
                where: {
                    id: req.params.id,
                },
                },
            );
        }
        return res.status(200).json("Success");
    } catch (error) {
        console.log(error);
        res.status(500).json(error.message);
    }
};
  
  const deleteUser = async (req, res) => {
    try {
        const existingUser = await User.findByPk(req.params.id);
        if (!existingUser) return res.status(400).json('User s takym id neexistuje!');
        await User.destroy({
            where: {
              id: req.params.id,
            },
        });
        return res.status(200).json("Success");
    } catch (error) {
        console.log(error);
        res.status(500).json(error.message);
    }
};


module.exports = {
    getUsers,
    getUserBy,
    newUser,
    updateUser,
    deleteUser,
    loginUser,
}