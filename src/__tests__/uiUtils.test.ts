import {
  showStar,
  discountCalculation,
  getErrorMessageFromCode,
} from "@/utils/uiUtils";
import "@testing-library/jest-dom";

describe("uiUtils", () => {
  test("showStar returns correct value", () => {
    expect(showStar(1)).toEqual("★☆☆☆☆");
    expect(showStar(2)).toEqual("★★☆☆☆");
    expect(showStar(1.5)).toEqual("★⯨☆☆☆");
    expect(showStar(3.5)).toEqual("★★★⯨☆");
    expect(showStar(0)).toEqual("☆☆☆☆☆");
    expect(showStar(5)).toEqual("★★★★★");
  });

  test("discountCalculation returns correct value", () => {
    expect(discountCalculation(100, 10)).toEqual(90);
    expect(discountCalculation(200, 10)).toEqual(180);
    expect(discountCalculation(100, 50)).toEqual(50);
  });

  test("getErrorMessageFromCode returns correct value", () => {
    expect(getErrorMessageFromCode("auth/user-not-found")).toEqual(
      "No account found with this email.",
    );
    expect(getErrorMessageFromCode("auth/wrong-password")).toEqual(
      "Incorrect password. Please try again.",
    );
    expect(getErrorMessageFromCode("auth/popup-closed-by-user")).toEqual(
      "The popup was closed before completing the sign in.",
    );
    expect(getErrorMessageFromCode("auth/test-dummy-err-code")).toEqual(
      "An unexpected error occurred. Please try again.",
    );
  });
});
