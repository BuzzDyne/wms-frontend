export interface JwtDecoded {
  sub: string; // Username
  iat: number; // Issued at timestamp (in seconds)
  nbf: number; // Not before timestamp (in seconds)
  jti: string; // Unique token identifier
  exp: number; // Expiry timestamp (in seconds)
  type: string; // Token type (e.g., "access")
  fresh: boolean; // Whether the token is fresh
  role_id: number; // Role ID of the user
  user_id: number; // User ID
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
}
