export interface CommandBar {
  isEnteringCommand: boolean;
  currentCommand: string;
  history: string[];
}

export namespace CommandBar {
  export const create = (): CommandBar => {
    return {
      isEnteringCommand: false,
      currentCommand: "",
      history: [],
    };
  };

  export const clone = (cb: CommandBar) => {
    const ret = {
      ...cb,
      history: [...cb.history],
    };
    return ret;
  };

  export const startCommandEntry = (cb: CommandBar) => {
    cb.isEnteringCommand = true;
    cb.currentCommand = "";
  };

  export const stopCommandEntry = (cb: CommandBar) => {
    const command = cb.currentCommand;
    cb.isEnteringCommand = false;
    cb.currentCommand = "";
    return command;
  };
}
