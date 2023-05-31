const UserModel = require("../models/user-model");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const tokenService = require("./token-service");
const UserDto = require("../dtos/user-dto");
const ApiError = require("../exceptions/api-error");

class UserService {
    async registration(username, password) {
        const candidate = await UserModel.findOne({username})
        if (candidate) {
            throw ApiError.BadRequest(`A user ${username} already exists`)
        }

        const hashPassword = await bcrypt.hash(password, 3);
        const user = await UserModel.create({username, password: hashPassword})

        const userDto = new UserDto(user); // username, id
        const tokens = tokenService.generateToken({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {...tokens, user: userDto}
    }

    async login(username, password) {
        const user = await UserModel.findOne({username})
        if (!user) {
            throw ApiError. BadRequest(`User ${username} was not found`)
        }
        const isPasswordEquals = await bcrypt.compare(password, user.password);
        if (!isPasswordEquals) {
            throw ApiError.BadRequest('Wrong password');
        }
        const userDto = new UserDto(user);
        const tokens = tokenService.generateToken({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {...tokens, user: userDto}
    }

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError();
        }
        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);
        if (!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError();
        }
        const user = await UserModel.findById(userData.id);
        const userDto = new UserDto(user);
        const tokens = tokenService.generateToken({...userDto});

        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return {...tokens, user: userDto}
    }
}

module.exports = new UserService();