import { Color, Feedback } from "./types";

type EventMap = Record<string, unknown>;

type EventNames<T extends EventMap> = keyof T;

type EventCallback<T extends EventMap, K extends EventNames<T>> = (
  arg: T[K]
) => void;

class EventManager<T extends EventMap> {
  private eventMap = {} as Record<keyof T, EventCallback<T, EventNames<T>>[]>;

  public emit<K extends EventNames<T>>(eventName: K, arg: T[K]): void {
    const callbacks = this.eventMap[eventName];

    callbacks?.forEach((cb) => {
      cb(arg);
    });
  }

  public on<K extends EventNames<T>>(
    eventName: K,
    callback: EventCallback<T, K>
  ): void {
    const callbacks = this.eventMap[eventName] as EventCallback<T, K>[];
    if (callbacks) {
      callbacks.push(callback);
    } else {
      const initialValue = [callback] as EventCallback<T, EventNames<T>>[];
      this.eventMap[eventName] = initialValue;
    }
  }
}

type State = {
  feedback: Feedback;
  gameStart: null;
  computerGuess: {
    randomGuess: Color[];
    name: string;
  };
};

const E = new EventManager<State>();

export default E;
