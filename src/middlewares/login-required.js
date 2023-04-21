import jwt from "jsonwebtoken";

function loginRequired(req, res, next) {
  const userToken = req.headers["authorization"]?.split(" ")[1] ?? "null";
  console.log("login 미들웨어 userToken:", userToken);

  if (!userToken || userToken === "null") {
    console.log("서비스 사용 요청이 있습니다.하지만, Authorization 토큰: 없음");

    res.status(401).json({
      result: "forbidden-approach",
      reason: "로그인한 유저만 사용할 수 있는 서비스입니다.",
    });

    return;
  }

  try {
    const secretKey = process.env.JWT_SECRET_KEY;
    console.log("login 미들웨어 secretKey:", secretKey);
    const jwtDecoded = jwt.verify(userToken, secretKey);
    console.log("login 미들웨어 jwtDecoded:", jwtDecoded);

    const { userId } = jwtDecoded;
    req.currentUserId = userId;
    console.log("login 미들웨어 userId:", userId);

    next();
  } catch (error) {
    res.status(401).json({
      result: "forbidden-approach",
      reason: "정상적인 토큰이 아닙니다.",
    });

    return;
  }
}

export { loginRequired };
