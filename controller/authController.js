
const User = require('../model/User');


exports.registerUser = async (req, res) => {
    const users = Array.isArray(req.body) ? req.body : [req.body]; // Ensure it's an array

    try {
        // Process each user in the array
        for (const { username, password } of users) {
            // Create a new user instance with the provided username and password
            const newUser = new User({ username, password });

            // Save the new user to the database
            await newUser.save();
        }

        // Send a success response to the client
        res.render('index', { message: 'Registration successful!' });
    } catch (error) {
        // Handle any errors that occur during the registration process
        res.status(500).send('Error registering users: ' + error.message);
    }
};
exports.loginPage = async (req, res) => {
    const { username, password } = req.body; // Directly extract username and password from the request body

    try {

        // Find user by username (case insensitive)
        const user = await User.findOne({ username: new RegExp(`^${username}$`, 'i') });

        if (user && user.password === password) {
            // Successful login
            res.status(200).json({
                success: true,
                username: user.username,
                password: user.password 
            });

        } else {
            // Failed login
            res.status(401).json({ // Changed to 401 for failed login attempts
                success: false,
                message: 'Invalid username or password'
            });
        }
    } catch (error) {
        // Handle any errors that occur during the login process
        res.status(500).json({
            success: false,
            message: 'Error logging in: ' + error.message
        });
    }
};
