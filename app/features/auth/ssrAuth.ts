// app/utils/ssrAuth.ts
import * as jose from "jose";

interface JWTClaims {
  sub?: string;
  role?: string;
  permissions?: string[];
}

interface RolePermissionConfig {
  requiredRoles?: string[];
  requiredPermissions?: string[];
}

/** Extracts 'token=...' from the Cookie header and decodes it. */
export async function parseJWTFromRequest(
  cookieHeader: string
): Promise<JWTClaims | null> {
  try {
    // Basic parse of cookies:
    const cookies = parseCookies(cookieHeader);
    const token = cookies["token"];
    if (!token) return null;

    // Verify + decode with your secret (set it to .env):
    const secret = new TextEncoder().encode("secret");
    const { payload } = await jose.jwtVerify(token, secret);
    return payload as JWTClaims;
  } catch (error) {
    return null;
  }
}

/** Checks if the user has the needed roles & permissions. */
export function verifyRolesAndPermissions(
  payload: JWTClaims,
  config: RolePermissionConfig
): boolean {
  const userRole = payload.role || "";
  const userPermissions = payload.permissions || [];

  // Check roles if needed
  if (config.requiredRoles && config.requiredRoles.length > 0) {
    const roleMatch = config.requiredRoles.some((r) => r === userRole);
    if (!roleMatch) return false;
  }

  // Check permissions if needed
  if (config.requiredPermissions && config.requiredPermissions.length > 0) {
    const hasAll = config.requiredPermissions.every((perm) =>
      userPermissions.includes(perm)
    );
    if (!hasAll) return false;
  }

  return true;
}

/** Parse a raw Cookie header string into an object {token: 'xxx', ...} */
function parseCookies(cookieHeader: string): Record<string, string> {
  const pairs = cookieHeader.split(/; */);
  const result: Record<string, string> = {};
  for (const pair of pairs) {
    const [key, value] = pair.split("=");
    if (key && value) {
      result[key.trim()] = decodeURIComponent(value.trim());
    }
  }
  return result;
}
