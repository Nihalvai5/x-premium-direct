import { describe, it, expect, beforeAll } from "vitest";
import { render, screen, fireEvent, waitFor, within } from "@testing-library/react";
import { DisabledPlanCard } from "./DisabledPlanCard";

// jsdom lacks pointer capture APIs Radix uses; stub them so Popover works.
beforeAll(() => {
  if (!(Element.prototype as unknown as { hasPointerCapture?: unknown }).hasPointerCapture) {
    Object.assign(Element.prototype, {
      hasPointerCapture: () => false,
      setPointerCapture: () => {},
      releasePointerCapture: () => {},
      scrollIntoView: () => {},
    });
  }
});

const plusPlan = { title: "6 Months Plus", original: "$302", price: "$15", isPlus: true };
const regularPlan = { title: "12 Months", original: "$80", price: "$14", isPlus: false };

async function expectPopoverVisible(matcher: RegExp | string) {
  await waitFor(() => {
    expect(screen.getByText(matcher)).toBeInTheDocument();
  });
  // Telegram link is inside the popover content
  const link = screen.getByRole("link", { name: /t\.me\/Discount_Store0/i });
  expect(link).toHaveAttribute("href", "https://t.me/Discount_Store0");
  expect(link).toHaveAttribute("target", "_blank");
}

describe("DisabledPlanCard popover", () => {
  it("shows the Premium+ message on hover (desktop pointer)", async () => {
    render(<DisabledPlanCard plan={plusPlan} />);
    const trigger = screen.getByRole("button", { name: /6 Months Plus/i });
    expect(screen.queryByText(/Premium\+ is temporarily offline\./)).not.toBeInTheDocument();

    fireEvent.mouseEnter(trigger);
    await expectPopoverVisible(/Premium\+ is temporarily offline\./);

    fireEvent.mouseLeave(trigger);
    await waitFor(() => {
      expect(screen.queryByText(/Premium\+ is temporarily offline\./)).not.toBeInTheDocument();
    });
  });

  it("opens on keyboard focus and closes on blur", async () => {
    render(<DisabledPlanCard plan={plusPlan} />);
    const trigger = screen.getByRole("button", { name: /6 Months Plus/i });

    trigger.focus();
    fireEvent.focus(trigger);
    await expectPopoverVisible(/Premium\+ is temporarily offline\./);

    fireEvent.blur(trigger);
    await waitFor(() => {
      expect(screen.queryByText(/Premium\+ is temporarily offline\./)).not.toBeInTheDocument();
    });
  });

  it("opens on tap (mobile click) and toggles closed on second tap", async () => {
    render(<DisabledPlanCard plan={plusPlan} />);
    const trigger = screen.getByRole("button", { name: /6 Months Plus/i });

    fireEvent.click(trigger);
    await expectPopoverVisible(/Premium\+ is temporarily offline\./);

    fireEvent.click(trigger);
    await waitFor(() => {
      expect(screen.queryByText(/Premium\+ is temporarily offline\./)).not.toBeInTheDocument();
    });
  });

  it("uses the non-Plus message for standard discontinued plans", async () => {
    render(<DisabledPlanCard plan={regularPlan} />);
    const trigger = screen.getByRole("button", { name: /12 Months/i });

    fireEvent.mouseEnter(trigger);
    await expectPopoverVisible(/This plan is temporarily unavailable\./);
  });

  it("exposes hover/focus/tap affordance via accessible name", () => {
    render(<DisabledPlanCard plan={plusPlan} />);
    const trigger = screen.getByRole("button", {
      name: /6 Months Plus.*Premium\+ is temporarily offline.*Tap for details/i,
    });
    expect(trigger).toBeInTheDocument();
    // Card still shows the price info regardless of popover state
    expect(within(trigger).getByText("$15")).toBeInTheDocument();
    expect(within(trigger).getByText("$302")).toBeInTheDocument();
  });
});
