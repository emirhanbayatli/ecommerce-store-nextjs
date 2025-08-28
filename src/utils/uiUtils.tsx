export function showStar(n: number) {
  const full = Math.floor(n);
  const half = n - full >= 0.5 ? "⯨" : "";
  const empty = "☆".repeat(5 - full - (half ? 1 : 0));
  return "★".repeat(full) + half + empty;
}
export function discountCalculation(
  price: number,
  discountPercentage: number,
): number {
  if (discountPercentage > 0) {
    const discountAmount = (price * discountPercentage) / 100;
    const finalPrice = price - discountAmount;
    return parseFloat(finalPrice.toFixed(2));
  }
  return price;
}

export function getErrorMessageFromCode(code: string): string {
  switch (code) {
    case "auth/user-not-found":
      return "No account found with this email.";
    case "auth/wrong-password":
      return "Incorrect password. Please try again.";
    case "auth/email-already-in-use":
      return "This email is already in use.";
    case "auth/invalid-email":
      return "Invalid email address format.";
    case "auth/weak-password":
      return "Password should be at least 6 characters.";
    case "auth/missing-password":
      return "Please enter your password.";
    case "auth/too-many-requests":
      return "Too many failed attempts. Please try again later.";
    case "auth/invalid-login-credentials":
      return "Invalid email or password.";
    case "auth/network-request-failed":
      return "Network error. Please check your internet connection.";
    case "auth/internal-error":
      return "An internal error occurred. Please try again.";
    case "auth/operation-not-allowed":
      return "This sign-in method is not enabled.";
    case "auth/user-disabled":
      return "This account has been disabled.";
    case "auth/popup-closed-by-user":
      return "The popup was closed before completing the sign in.";
    case "auth/popup-blocked":
      return "Popup was blocked by your browser.";
    case "auth/requires-recent-login":
      return "Please log in again to perform this action.";
    case "auth/invalid-credential":
      return "The provided credential is invalid. Please try again.";
    default:
      return "An unexpected error occurred. Please try again.";
  }
}
