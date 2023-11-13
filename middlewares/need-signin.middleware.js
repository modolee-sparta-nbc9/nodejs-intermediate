import jwt from 'jsonwebtoken';
import { JWT_ACCESS_TOKEN_SECRET } from '../constants/security.costant.js';
import db from '../models/index.cjs';

const { Users } = db;

export const needSignin = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(400).json({
        success: false,
        message: '로그인 필요합니다.',
      });
    }

    const [tokenType, accessToken] = req.headers.authorization?.split(' ');

    if (tokenType !== 'Bearer') {
      return res.status(400).json({
        success: false,
        message: '지원하지 않는 인증 방식입니다.',
      });
    }

    if (!accessToken) {
      return res.status(400).json({
        success: false,
        message: 'AccessToken 정보가 없습니다.',
      });
    }

    const decodedAccessToken = jwt.verify(
      accessToken,
      JWT_ACCESS_TOKEN_SECRET + '1',
    );

    const { userId } = decodedAccessToken;

    const user = (
      await Users.findByPk(userId, {
        attributes: ['id', 'email', 'name', 'createdAt', 'updatedAt'],
      })
    )?.toJSON();

    if (!user) {
      return res.status(401).json({
        success: false,
        message: '존재하지 않는 사용자입니다.',
      });
    }

    res.locals.user = user;

    next();
  } catch (error) {
    console.error(error);

    let statusCode = 500;
    let message = '';

    switch (error.message) {
      case 'jwt expired':
        statusCode = 401;
        message = '인증 정보 유효기간이 지났습니다.';
        break;
      case 'invalid signature':
        statusCode = 401;
        message = '유효하지 않는 인증 정보입니다.';
        break;
      default:
        statusCode = 500;
        message = '예상치 못한 에러가 발생하였습니다. 관리자에게 문의하세요.';
        break;
    }

    return res.status(statusCode).json({
      success: false,
      message,
    });
  }
};
