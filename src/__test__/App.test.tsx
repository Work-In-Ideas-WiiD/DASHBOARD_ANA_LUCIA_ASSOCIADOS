import { render } from "@testing-library/react";
import App from "../App";

describe("should works", () => {
    it("work", () => {
        expect(1).toBe(1);
    })

    it("Should render the main page", () => {
        render(<App />);
        expect(true).toBeTruthy();
    })
})