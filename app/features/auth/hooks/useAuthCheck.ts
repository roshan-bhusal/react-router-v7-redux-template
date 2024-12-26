// app/features/auth/useAuthCheck.ts
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../../store/store";

// Example config for required roles/permissions:
interface AuthCheckConfig {
  requiredRoles?: string[];
  requiredPermissions?: string[];
}

export function useAuthCheck(config: AuthCheckConfig) {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Suppose we store user data in Redux:
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    if (!user) {
      setIsAuthorized(false);
      setIsLoading(false);
      return;
    }

    // roles & permissions from the user object:
    const userRoles = user.role ? [user.role] : [];
    const userPermissions = user.permissions || [];

    // Check roles:
    const rolesOK =
      !config.requiredRoles?.length ||
      config.requiredRoles.some((role) => userRoles.includes(role));

    // Check permissions:
    const permsOK =
      !config.requiredPermissions?.length ||
      config.requiredPermissions.every((permission) =>
        userPermissions.includes(permission)
      );

    setIsAuthorized(rolesOK && permsOK);
    setIsLoading(false);
  }, [user, config]);

  return { isAuthorized, isLoading };
}
