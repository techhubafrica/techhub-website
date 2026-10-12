import { describe, expect, it } from "vitest";
import { featuredEvent, hubEvents } from "@/data/eventsHub";

describe("corporate event presentation", () => {
  it("does not display the Tech4ALL seminar", () => {
    expect(hubEvents.some((event) => event.slug.includes("seminar"))).toBe(false);
  });

  it("orders paid tickets ascending using the published corporate rate", () => {
    const paid = featuredEvent.tickets.filter((ticket) => !ticket.isFree);
    expect(paid.map((ticket) => ticket.price)).toEqual([50, 100, 200, 250]);
    expect(paid[0].name).toBe("Student Ticket Fee");
  });

  it("keeps complimentary registration after paid tiers", () => {
    expect(featuredEvent.tickets.at(-1)?.isFree).toBe(true);
  });
});