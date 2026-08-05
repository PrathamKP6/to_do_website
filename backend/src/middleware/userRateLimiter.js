const WINDOW_MS = 60 * 1000;
const MAX_REQUESTS = 100;

const requestHistory = new Map();

const userRateLimiter = (req, res, next) => {
  const userId = req.user?._id?.toString();

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const now = Date.now();
  const timestamps = requestHistory.get(userId) || [];
  const recentTimestamps = timestamps.filter((timestamp) => now - timestamp < WINDOW_MS);

  if (recentTimestamps.length >= MAX_REQUESTS) {
    return res.status(429).json({ message: "Too many requests, please try again later" });
  }

  recentTimestamps.push(now);
  requestHistory.set(userId, recentTimestamps);

  next();
};

export default userRateLimiter;