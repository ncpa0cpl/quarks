import { createEventsDispatcher } from "../../../src/Utilities/StateUpdates/EventsDispatcher";
import { sleep } from "../../helpers";

describe("createEventsDispatcher", () => {
  it("should only execute the latest dispatched event when multiple actions are dispatched simultaneously", async () => {
    const events = createEventsDispatcher();

    const ev1 = jest.fn();
    const ev2 = jest.fn();
    const ev3 = jest.fn();
    const ev4 = jest.fn();
    const ev5 = jest.fn();

    events.dispatchEvent(ev1);
    events.dispatchEvent(ev2);
    events.dispatchEvent(ev3);
    events.dispatchEvent(ev4);
    events.dispatchEvent(ev5);

    await sleep(1);

    expect(ev1).toHaveBeenCalledTimes(0);
    expect(ev2).toHaveBeenCalledTimes(0);
    expect(ev3).toHaveBeenCalledTimes(0);
    expect(ev4).toHaveBeenCalledTimes(0);
    expect(ev5).toHaveBeenCalledTimes(1);
  });

  it("should allow for all dispatched events to execute if not dispatched simultaneously", async () => {
    const events = createEventsDispatcher();

    const ev1 = jest.fn();
    const ev2 = jest.fn();
    const ev3 = jest.fn();
    const ev4 = jest.fn();
    const ev5 = jest.fn();

    events.dispatchEvent(ev1);
    await sleep(0);
    events.dispatchEvent(ev2);
    await sleep(0);
    events.dispatchEvent(ev3);
    await sleep(0);
    events.dispatchEvent(ev4);
    await sleep(0);
    events.dispatchEvent(ev5);

    await sleep(1);

    expect(ev1).toHaveBeenCalledTimes(1);
    expect(ev2).toHaveBeenCalledTimes(1);
    expect(ev3).toHaveBeenCalledTimes(1);
    expect(ev4).toHaveBeenCalledTimes(1);
    expect(ev5).toHaveBeenCalledTimes(1);
  });
});