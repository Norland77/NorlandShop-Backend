const User = require('../models/User.ts');

/*interface UserType {
    name: string,
    email: string,
    password: string,
    street: string,
    city: string,
    state: string,
    zip: string
}*/

   async function addUser(data, user_tg_id){
        const name = data.name;
        const email = data.email;
        const password = data.password;
        const state = data.region;
        const city = data.city;
        const street = data.street;

        const zip = data.postalCode;
        const newUser = new User({user_tg_id, name, email, password, street, city, state, zip});
        await newUser.save();
    }

module.exports = {addUser};